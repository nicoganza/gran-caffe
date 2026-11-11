(function () {
  "use strict";

  var DAYS_IT = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  var OPEN_MIN = 7 * 60;
  var CLOSE_MIN = 21 * 60;
  var CLOSED_DAY = 1; // lunedì

  /* ---------- Utilità ---------- */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fold(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function euro(n) {
    return n.toFixed(2).replace(".", ",");
  }

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    var folded = fold(text);
    var idx = folded.indexOf(q);
    if (idx === -1) return safe;
    // fold() preserva la lunghezza per i caratteri latini usati nel menu
    return escapeHtml(text.slice(0, idx)) +
      "<mark>" + escapeHtml(text.slice(idx, idx + q.length)) + "</mark>" +
      escapeHtml(text.slice(idx + q.length));
  }

  function priceHtml(p) {
    if (typeof p === "number") return euro(p) + " €";
    if (typeof p === "string") return escapeHtml(p) + " €";
    var parts = [];
    if (p.glass != null) parts.push("<small>calice</small>" + euro(p.glass));
    if (p.bottle != null) parts.push("<small>bottiglia</small>" + euro(p.bottle));
    return parts.join('<span class="sep" aria-hidden="true">|</span>') + " €";
  }

  /* ---------- Stato aperto / chiuso ---------- */

  function romeNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    return { day: day, minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
  }

  function statusFor(now) {
    var openToday = now.day !== CLOSED_DAY;
    if (openToday && now.minutes >= OPEN_MIN && now.minutes < CLOSE_MIN) {
      var left = CLOSE_MIN - now.minutes;
      return {
        open: true,
        text: left <= 60
          ? "Aperto ancora per " + left + " min · chiude alle 21:00"
          : "Aperto ora · chiude alle 21:00"
      };
    }
    if (openToday && now.minutes < OPEN_MIN) {
      return { open: false, text: "Chiuso ora · apre oggi alle 7:00" };
    }
    var next = (now.day + 1) % 7;
    if (next === CLOSED_DAY) next = (next + 1) % 7;
    var tomorrow = (now.day + 1) % 7 === next;
    var when = tomorrow ? "domani" : DAYS_IT[next];
    var prefix = now.day === CLOSED_DAY ? "Chiuso il lunedì" : "Chiuso ora";
    return { open: false, text: prefix + " · riapre " + when + " alle 7:00" };
  }

  function renderStatus() {
    var now = romeNow();
    var s = statusFor(now);
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.classList.toggle("is-open", s.open);
      el.classList.toggle("is-closed", !s.open);
      var t = el.querySelector("[data-status-text]");
      if (t) t.textContent = s.text;
    });
    document.querySelectorAll("[data-hours] tr").forEach(function (tr) {
      tr.classList.toggle("is-today", Number(tr.getAttribute("data-day")) === now.day);
    });
  }

  /* ---------- Menu ---------- */

  var data = window.GC_MENU;
  var body = document.querySelector("[data-menu-body]");
  var tabs = document.querySelector("[data-menu-tabs]");
  var search = document.querySelector("[data-menu-search]");
  var results = document.querySelector("[data-menu-results]");
  var note = document.querySelector("[data-menu-note]");
  var index = []; // { el, text, nameEl, detailEl, item }
  var current = null; // sottopagina del menu attualmente aperta
  var baseTitle = document.title;

  function sectionById(id) {
    for (var i = 0; i < data.sections.length; i++) {
      if (data.sections[i].id === id) return data.sections[i];
    }
    return null;
  }

  function idFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    return sectionById(id) ? id : data.sections[0].id;
  }

  function pagerLink(sec, dir) {
    if (!sec) return "<span></span>";
    return '<a class="menu-pager__' + dir + '" href="#' + sec.id + '" data-go="' + sec.id + '">' +
      "<small>" + (dir === "prev" ? "Sezione precedente" : "Sezione successiva") + "</small>" +
      '<span class="menu-pager__title">' +
      (dir === "prev" ? '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>' : "") +
      escapeHtml(sec.title) +
      (dir === "next" ? '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>' : "") +
      "</span></a>";
  }

  function renderMenu() {
    if (!data || !body) return;
    var html = "";
    var tabsHtml = "";
    data.sections.forEach(function (sec, si) {
      tabsHtml += '<a href="#' + sec.id + '" data-tab="' + sec.id + '" data-go="' + sec.id + '">' + escapeHtml(sec.title) + "</a>";
      html += '<section class="menu-section" data-section="' + sec.id + '" aria-labelledby="mh-' + sec.id + '">';
      html += '<h2 id="mh-' + sec.id + '" tabindex="-1">' + escapeHtml(sec.title) + "</h2>";
      html += '<div class="menu-groups">';
      sec.groups.forEach(function (g) {
        html += '<div class="menu-group">';
        html += "<h3>" + escapeHtml(g.title) + (g.mark ? '<span class="menu-item__mark" aria-label="contrassegnato">**</span>' : "") + "</h3>";
        if (g.intro) html += '<p class="menu-group__intro">' + escapeHtml(g.intro) + "</p>";
        html += '<ul class="menu-items">';
        g.items.forEach(function (it) {
          html += '<li class="menu-item"><div class="menu-item__row">' +
            '<span class="menu-item__name">' + escapeHtml(it.name) + "</span>" +
            (it.mark ? '<span class="menu-item__mark" aria-label="contrassegnato">**</span>' : "") +
            '<span class="menu-item__price">' + priceHtml(it.price) + "</span></div>" +
            (it.detail ? '<p class="menu-item__detail">' + escapeHtml(it.detail) + "</p>" : "") +
            "</li>";
        });
        html += "</ul>";
        if (g.note) html += '<p class="menu-group__note">' + escapeHtml(g.note) + "</p>";
        html += "</div>";
      });
      html += "</div>";
      html += '<nav class="menu-pager" aria-label="Altre sezioni del menu">' +
        pagerLink(data.sections[si - 1], "prev") + pagerLink(data.sections[si + 1], "next") + "</nav>";
      html += "</section>";
    });
    body.innerHTML = html;
    tabs.innerHTML = tabsHtml;
    if (note && data.markNote) note.textContent = data.markNote;

    // indice di ricerca
    var secEls = body.querySelectorAll(".menu-section");
    data.sections.forEach(function (sec, si) {
      var groupEls = secEls[si].querySelectorAll(".menu-group");
      sec.groups.forEach(function (g, gi) {
        var itemEls = groupEls[gi].querySelectorAll(".menu-item");
        g.items.forEach(function (it, ii) {
          var el = itemEls[ii];
          index.push({
            el: el,
            item: it,
            nameEl: el.querySelector(".menu-item__name"),
            detailEl: el.querySelector(".menu-item__detail"),
            text: fold([it.name, it.detail || "", g.title, sec.title].join(" "))
          });
        });
      });
    });
  }

  function applySearch() {
    var q = fold(search.value.trim());
    var count = 0;
    index.forEach(function (entry) {
      var hit = !q || entry.text.indexOf(q) !== -1;
      entry.el.hidden = !hit;
      if (hit) count++;
      entry.nameEl.innerHTML = highlight(entry.item.name, q);
      if (entry.detailEl) entry.detailEl.innerHTML = highlight(entry.item.detail, q);
    });
    body.querySelectorAll(".menu-group").forEach(function (g) {
      g.hidden = !g.querySelector(".menu-item:not([hidden])");
    });
    // senza ricerca si vede solo la sottopagina corrente; con la ricerca, i risultati di tutto il menu
    body.classList.toggle("is-searching", !!q);
    body.querySelectorAll(".menu-section").forEach(function (s) {
      var id = s.getAttribute("data-section");
      var empty = !s.querySelector(".menu-item:not([hidden])");
      s.hidden = q ? empty : id !== current;
      var tab = tabs.querySelector('[data-tab="' + id + '"]');
      if (tab) tab.classList.toggle("is-empty", !!q && empty);
    });
    setCurrent(tabs, "data-tab", q ? "" : current);

    if (!q) {
      results.textContent = "";
    } else if (count === 0) {
      results.innerHTML = "Nessun risultato per «" + escapeHtml(search.value.trim()) +
        "». <button type=\"button\" data-clear>Mostra tutto il menu</button>";
    } else {
      results.innerHTML = count + (count === 1 ? " voce trovata" : " voci trovate") +
        " per «" + escapeHtml(search.value.trim()) + "». <button type=\"button\" data-clear>Azzera</button>";
    }
  }

  function setupSearch() {
    if (!search) return;
    var t;
    search.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        applySearch();
        var bar = document.querySelector("[data-menu-bar]");
        var top = results.getBoundingClientRect().top;
        var limit = bar.getBoundingClientRect().bottom;
        if (top < limit || top > window.innerHeight * 0.6) {
          window.scrollTo({ top: window.scrollY + top - limit - 16 });
        }
      }, 120);
    });
    search.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { search.value = ""; applySearch(); }
    });
    results.addEventListener("click", function (e) {
      if (e.target.closest("[data-clear]")) {
        search.value = "";
        applySearch();
        search.focus();
      }
    });
  }

  /* ---------- Sottopagine del menu ---------- */

  // porta l'inizio del menu appena sotto l'intestazione, se l'utente è già sceso oltre
  function scrollToMenuStart(force) {
    var header = document.querySelector("[data-header]");
    var menuEl = document.querySelector(".menu");
    var top = menuEl.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height;
    // cambio di sottopagina: salto immediato, come un cambio pagina (lo scroll fluido del sito qui disorienta)
    if (force || window.scrollY > top) window.scrollTo({ top: top, behavior: "instant" });
  }

  function centerTab() {
    var cur = tabs.querySelector("[aria-current]");
    if (cur) tabs.scrollTo({ left: cur.offsetLeft - tabs.clientWidth / 2 + cur.clientWidth / 2 });
  }

  function showSection(id, opts) {
    opts = opts || {};
    current = id;
    if (opts.push) history.pushState(null, "", "#" + id);
    if (search.value) {
      search.value = "";
    }
    applySearch();
    document.title = sectionById(id).title + " · " + baseTitle;
    centerTab();
    if (opts.scroll !== false) scrollToMenuStart(opts.forceScroll);
    if (opts.focus) {
      var h = body.querySelector('[data-section="' + id + '"] h2');
      if (h) h.focus({ preventScroll: true });
    }
  }

  function setupSubpages() {
    document.querySelector(".menu").addEventListener("click", function (e) {
      var a = e.target.closest("[data-go]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      var id = a.getAttribute("data-go");
      if (id === current && !search.value) { scrollToMenuStart(); return; }
      showSection(id, { push: true, focus: !a.hasAttribute("data-tab") });
    });
    window.addEventListener("popstate", function () {
      showSection(idFromHash());
    });
  }

  /* ---------- Intestazione e navigazione ---------- */

  function setCurrent(container, attr, id) {
    container.querySelectorAll("a").forEach(function (a) {
      var on = a.getAttribute(attr) === id;
      if (on) a.setAttribute("aria-current", container === tabs ? "page" : "true");
      else a.removeAttribute("aria-current");
    });
  }

  function setupSpy() {
    var header = document.querySelector("[data-header]");
    var fixedSolid = header.hasAttribute("data-header-solid");
    var bar = document.querySelector("[data-menu-bar]");
    var navLinks = document.querySelector(".site-nav");
    var pageSections = (body ? [] : ["giornata", "menu", "eventi", "dove"]).map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);
    var ticking = false;

    function update() {
      ticking = false;
      var line = window.innerHeight * 0.32;
      var activePage = null;
      pageSections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) activePage = s;
      });
      if (navLinks && pageSections.length) setCurrent(navLinks, "href", activePage ? "#" + activePage.id : "");

      if (!fixedSolid) header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.6);

      if (bar) {
        var headerH = header.getBoundingClientRect().height;
        bar.classList.toggle("is-stuck", bar.getBoundingClientRect().top <= headerH + 1);
      }
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Mappa su richiesta ---------- */

  function setupMap() {
    var btn = document.querySelector("[data-map-load]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var box = document.querySelector("[data-map]");
      box.innerHTML = '<iframe title="Mappa: Gran Caffè, Via Mazzini 11, Cusano Milanino" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
        'src="https://www.google.com/maps?q=Gran+Caff%C3%A8,+Via+Giuseppe+Mazzini+11,+20095+Cusano+Milanino+MI&output=embed"></iframe>';
      box.classList.add("is-loaded");
    });
  }

  /* ---------- Avvio ---------- */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  renderStatus();
  setInterval(renderStatus, 60 * 1000);
  if (body && data) {
    renderMenu();
    setupSearch();
    setupSubpages();
    // arrivando da un link a una sezione (es. menu.html#cantina) si apre quella sottopagina
    var fromLink = location.hash.length > 1;
    showSection(idFromHash(), { scroll: fromLink, forceScroll: fromLink });
  }
  setupSpy();
  setupMap();
})();
