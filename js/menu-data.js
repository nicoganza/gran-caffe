/*
  MENU DEL GRAN CAFFÈ
  Trascritto dal menu cartaceo (novembre 2026).
  Per aggiornare un prezzo basta modificare il numero qui sotto.

  Campi di ogni voce:
    name   nome del piatto o della bevanda
    detail ingredienti o varianti (facoltativo)
    price  prezzo in euro: un numero, oppure un testo per prezzi multipli
           (es. "4,50 / 5,50" oppure { glass: 6, bottle: 23 } per i vini)
    mark   true se nel menu cartaceo la voce ha il segno **
*/

window.GC_MENU = {
  markNote: "** Voci contrassegnate nel menu: chiedi al personale per i dettagli.",
  sections: [
    {
      id: "caffetteria",
      title: "Caffetteria",
      moment: "colazione",
      groups: [
        {
          title: "Il caffè",
          items: [
            { name: "Caffè", price: 1.3 },
            { name: "Decaffeinato / Orzo", price: 1.5 },
            { name: "Ginseng", price: 1.9 },
            { name: "Corretto", price: 2.2 },
            { name: "Con panna", price: 3.0 },
            { name: "Marocchino", detail: "Cremosa Caffarel", price: 2.2 },
            { name: "Caffè special", detail: "Kinder Bueno, pistacchio", price: 2.2 },
            { name: "Caffè macchiato soia", price: 1.5 },
            { name: "Cappuccino", price: 2.0 },
            { name: "Cappuccino con panna", price: 2.5 },
            { name: "Cappuccino ginseng", price: 2.5 },
            { name: "Cappuccino d'orzo / deca", price: 2.3 },
            { name: "Cremino freddo", price: 3.0 },
            { name: "Shakerato", price: 3.5 },
            { name: "Shakerato corretto", detail: "Baileys, Disaronno o Frangelico", price: 4.5 },
            { name: "Caffè con gelato", price: 3.0 },
            { name: "Latte macchiato", detail: "anche con latte di soia", price: "2,20 / 2,70" }
          ]
        },
        {
          title: "La cioccolata",
          items: [
            { name: "Cioccolata", price: 4.5 },
            { name: "Cioccolata con panna", price: 5.5 },
            { name: "Speciale variegata", detail: "Kinder Bueno, pistacchio, Cremosa Caffarel", price: 5.5 },
            { name: "Speciale con panna", price: 6.5 },
            { name: "Speciale al rum premium", price: 6.5 }
          ]
        }
      ]
    },
    {
      id: "dolci",
      title: "Dolci e colazione",
      moment: "colazione",
      groups: [
        {
          title: "La colazione",
          items: [
            { name: "Bombolone", detail: "crema pasticcera", price: 2.5, mark: true },
            { name: "Bombolone caldo con gelato", price: 3.0, mark: true },
            { name: "Brioche gourmet", price: 2.5 },
            { name: "Frolle / crostatina", detail: "disponibili anche senza glutine", price: 2.5 },
            { name: "Biscottini da tè", price: 0.9 }
          ]
        },
        {
          title: "Le sfiziosità",
          mark: true,
          items: [
            { name: "Croccante", detail: "classico o pistacchio", price: 5.5 },
            { name: "Cheesecake", detail: "pistacchio, Kinder Bueno, Caffarel o frutti di bosco", price: 5.5 },
            { name: "Tortino della nonna", price: 5.5 },
            { name: "Tortino di mele", price: 5.5 },
            { name: "Tortino Sacher", price: 5.5 },
            { name: "Soufflé", detail: "cioccolato o pistacchio", price: 5.5 }
          ],
          note: "Croffle: impasto al burro francese, cotto al momento. Chiedi il nostro menu dedicato."
        },
        {
          title: "Pancake",
          mark: true,
          items: [
            { name: "Classico allo sciroppo d'acero canadese", price: 7.0 },
            { name: "Sciroppo d'acero e gelato", price: 8.5 },
            { name: "Sciroppo d'acero e frutta di stagione", price: 9.0 },
            { name: "Alla Nutella", price: 6.5 },
            { name: "Nutella e frutta", price: 9.0 },
            { name: "Al Kinder Bueno", price: 7.5 },
            { name: "Al pistacchio", price: 8.0 },
            { name: "Marmellata di albicocca", price: 7.0 },
            { name: "Marmellata di frutti di bosco", price: 7.0 }
          ]
        },
        {
          title: "Gelateria",
          items: [
            { name: "Coppetta piccola o media", detail: "cioccolato, pistacchio, fiordilatte, crema, limone, fragola", price: "4,50 / 5,50" },
            { name: "Frappé", price: 4.5 },
            { name: "Torroncino", price: 4.5 },
            { name: "Affogato al caffè", price: 6.5 },
            { name: "Torroncino affogato al caffè", price: 5.5 },
            { name: "Granita", detail: "menta, limone, fragola, orzata, passion fruit, frutti di bosco", price: 4.0 }
          ]
        },
        {
          title: "La frutta",
          items: [
            { name: "Macedonia", detail: "anche con gelato", price: "6,50 / 7,50" },
            { name: "Frullato di frutta fresca", detail: "base acqua, latte o latte di soia", price: 5.0 },
            { name: "Spremuta d'arancia", price: 4.5 }
          ]
        }
      ]
    },
    {
      id: "te",
      title: "I nostri tè",
      moment: "pomeriggio",
      groups: [
        {
          title: "Tè in fiore",
          intro: "Servito in teiera di vetro per veder sbocciare il fiore, con un bastoncino di zucchero. Ogni tè permette una seconda infusione.",
          items: [
            { name: "Love at first sight", price: 10.0 },
            { name: "Osmanthus lily", price: 10.0 },
            { name: "Oriental beauty", price: 10.0 }
          ]
        },
        {
          title: "Tè a Parigi",
          items: [
            { name: "Ruschka", detail: "tè nero alla russa, frutta e agrumi · 4–5 min", price: 4.5 },
            { name: "Alexandra David-Néel", detail: "tè nero speziato: pepe, chiodi di garofano, zenzero, cannella, cardamomo · 4–5 min", price: 4.5 },
            { name: "Eros", detail: "tè nero con malva, ibisco e fiordaliso · 5 min", price: 4.5 },
            { name: "Blanc & Rose", detail: "tè bianco e petali di rosa · 5 min", price: 4.5 },
            { name: "Marco Polo", detail: "tè verde, frutti maturi e fiori · 4 min", price: 4.5 }
          ]
        }
      ]
    },
    {
      id: "cucina",
      title: "La cucina",
      moment: "pranzo",
      groups: [
        {
          title: "Primi",
          items: [
            { name: "Primo del giorno", price: 12.0 },
            { name: "Tortellini in brodo", price: 13.0 },
            { name: "Pasta fresca ai porcini", price: 13.0 },
            { name: "Tonnarelli cacio e pepe", price: 12.0, mark: true },
            { name: "Spaghetti al pomodoro", price: 12.0, mark: true },
            { name: "Risotto allo zafferano", price: 12.0, mark: true },
            { name: "Risotto ai funghi", price: 12.0, mark: true },
            { name: "Fusilli al ragù", detail: "senza glutine", price: 13.0 }
          ]
        },
        {
          title: "Secondi",
          items: [
            { name: "Secondo del giorno", price: 15.0 },
            { name: "Tagliata di manzo", detail: "rucola e grana o pomodorini", price: 16.0 },
            { name: "Tartare di manzo", detail: "battuta di Scottona, capperi, cipolla, senape e uovo", price: 13.5 },
            { name: "Bresaola, rucola e grana", price: 12.5 },
            { name: "Caprese di bufala", price: 12.5 },
            { name: "Tagliata di pollo con contorno", price: 13.5, mark: true },
            { name: "Arrosto di tacchino al vino bianco", detail: "con contorno", price: 14.0 },
            { name: "Arrosticini abruzzesi", detail: "10 pezzi, con pane caldo", price: 15.0, mark: true },
            { name: "Hamburger di Fassona piemontese", detail: "200 g, con contorno", price: 13.5 },
            { name: "Contorno", price: 4.0 }
          ]
        },
        {
          title: "Le insalate",
          items: [
            { name: "Caesar", detail: "misticanza, pomodori, pollo, acciughe, salsa Caesar, bacon, grana", price: 10.0 },
            { name: "Valtellina", detail: "bresaola, misticanza, carote, mais, caprino e grana", price: 10.0 },
            { name: "Classica", detail: "misticanza, carote, tonno, mozzarella, mais e pomodoro", price: 10.0 }
          ]
        }
      ]
    },
    {
      id: "paninoteca",
      title: "La paninoteca",
      moment: "pranzo",
      groups: [
        {
          title: "Panini",
          items: [
            { name: "Cotoletta", detail: "scamorza, bacon, pomodoro, misticanza e ketchup", price: 10.0, mark: true },
            { name: "Bresaola", detail: "rucola e grana", price: 7.5 },
            { name: "Crudo di Parma", detail: "scaglie di grana e salsa rosa", price: 7.5 },
            { name: "Speck", detail: "brie e salsa rosa", price: 7.5 },
            { name: "Pastrami", detail: "punta di petto di manzo, insalata, pomodoro, maionese", price: 7.5 },
            { name: "Toast", detail: "farcitura extra 0,50 €", price: 4.5 },
            { name: "Maxi toast", detail: "farcitura extra 0,50 €", price: 5.5 }
          ]
        },
        {
          title: "Special bread",
          items: [
            { name: "Club sandwich", detail: "pastrami, scamorza, insalata, pomodoro, coleslaw", price: 12.0 },
            { name: "Schiacciata stracciatella", detail: "stracciatella, pistacchio e mortadella", price: 8.5, mark: true },
            { name: "Schiacciata tonno", detail: "tonno, pomodoro, maionese e misticanza", price: 8.5, mark: true },
            { name: "Schiacciata iberica", detail: "paleta ibérica de bellota, olive, pomodoro e olio EVO", price: 9.5, mark: true },
            { name: "Schiacciata salmone", detail: "salmone affumicato, misticanza, spalmabile ed erba cipollina", price: 9.5, mark: true }
          ]
        },
        {
          title: "Piadine",
          items: [
            { name: "Crudo di Parma", detail: "mozzarella e rucola", price: 8.5 },
            { name: "Salmone", detail: "scamorza, maionese e rucola", price: 9.5 },
            { name: "Bresaola", detail: "rucola, grana e olio EVO", price: 8.5 },
            { name: "Cotto", detail: "brie e misticanza", price: 8.5 }
          ]
        }
      ]
    },
    {
      id: "aperitivo",
      title: "Aperitivo",
      moment: "aperitivo",
      groups: [
        {
          title: "Taglieri",
          items: [
            { name: "Gran tagliere", detail: "coppa di Zibello, salame Felino, crudo iberico, chorizo de bellota, crostoni con lardo di Pata Negra · consigliato per 2", price: 25.0 },
            { name: "Selezione iberica", detail: "chorizo de bellota, crudo iberico e formaggi DOP", price: 9.5 },
            { name: "Selezione italiana", detail: "Felino IGP, coppa di Zibello DOP e formaggi DOP", price: 9.5 }
          ],
          note: "Chiedi dei nostri special!"
        },
        {
          title: "Stuzzicheria",
          items: [
            { name: "Arrosticini abruzzesi", detail: "10 pezzi", price: 15.0, mark: true },
            { name: "Trancio di pizza", price: 5.5, mark: true },
            { name: "Nachos", detail: "cheddar, salsa dip e guacamole", price: 4.0 },
            { name: "Gyoza vegetariani", detail: "5 ravioli giapponesi, 100% verdure", price: 5.5, mark: true }
          ]
        },
        {
          title: "Specialità",
          items: [
            { name: "Sandwich NY", detail: "pastrami di manzo, coleslaw, scamorza", price: 5.5 },
            { name: "Hummus di ceci con crostini", price: 5.0 },
            { name: "Miniburger", detail: "hamburger, cheddar, pomodoro, insalata, salsa", price: 3.5 },
            { name: "Focaccina farcita", detail: "selezione del giorno", price: 2.5 }
          ]
        },
        {
          title: "Cocktail signature",
          items: [
            { name: "Salvo Tonic 2.0", detail: "Gin Mare Capri, Indian tonic", price: 12.0 },
            { name: "Salvo a Cali", detail: "rum giamaicano, bouquet di menta, limone, agave, soda", price: 9.0 },
            { name: "Sbagliato-Giusto", detail: "Campari, liquore al tè nero T+, Licor 43, ginger beer", price: 9.0 },
            { name: "Mon Chéri", detail: "Vermouth Cocchi Dopo Teatro, Heering Cherry, vaniglia, Indian tonic", price: 9.0 },
            { name: "Milano-Modena", detail: "Campari, vermouth al mallo di noce T. Agnini, soda", price: 9.0 },
            { name: "Pummarola", detail: "tequila bianco, succo di pomodoro, spicy mix, lime", price: 9.0 },
            { name: "House Mojito", detail: "rum Bacardi Carta Blanca infuso alla menta, mastika, lime, Angostura", price: 9.0 }
          ]
        }
      ]
    },
    {
      id: "cantina",
      title: "Dalla cantina",
      moment: "aperitivo",
      groups: [
        {
          title: "Bollicine",
          items: [
            { name: "Franciacorta", price: { glass: 7, bottle: 38 } },
            { name: "Contadi Castaldi Satèn", price: { bottle: 46 } },
            { name: "Sansevè Satèn", detail: "Monte Rossa", price: { bottle: 46 } },
            { name: "P.R. Brut Blanc de Blancs", detail: "Monte Rossa", price: { bottle: 46 } },
            { name: "Bellavista Franciacorta", price: { bottle: 50 } },
            { name: "Ca' del Bosco Franciacorta", price: { bottle: 50 } },
            { name: "Ferrari Perlé", detail: "Trento DOC", price: { bottle: 55 } }
          ]
        },
        {
          title: "Champagne",
          items: [
            { name: "Billecart-Salmon", detail: "Brut Réserve", price: { bottle: 90 } },
            { name: "Lallement Massonnot 2019", detail: "Brut Premier Cru", price: { bottle: 95 } }
          ]
        },
        {
          title: "Bianchi",
          items: [
            { name: "Friulano", price: { glass: 6, bottle: 23 } },
            { name: "Ribolla Gialla", price: { glass: 6, bottle: 22 } },
            { name: "Gewürztraminer", detail: "Südtirol Alto Adige DOC", price: { glass: 6, bottle: 24 } },
            { name: "Vermentino Toscano", price: { glass: 6, bottle: 23 } },
            { name: "Nicosia Etna Bianco", detail: "Etna Bianco DOC", price: { glass: 6, bottle: 25 } },
            { name: "Arneis", detail: "Langhe DOC", price: { glass: 6, bottle: 24 } }
          ]
        },
        {
          title: "Rossi",
          items: [
            { name: "Syrah", detail: "Toscana", price: { bottle: 23 } },
            { name: "Primitivo di Manduria", detail: "DOC", price: { glass: 6, bottle: 22 } },
            { name: "Rosso di Montefalco", detail: "Umbria", price: { bottle: 22 } },
            { name: "Valpolicella Ripasso Superiore", price: { glass: 6, bottle: 25 } },
            { name: "Nobile di Montepulciano", detail: "DOCG", price: { glass: 6, bottle: 25 } }
          ]
        }
      ]
    },
    {
      id: "bevande",
      title: "Bevande",
      moment: "sempre",
      groups: [
        {
          title: "Acqua",
          items: [
            { name: "Minerale in bottiglia", detail: "0,75 l", price: 2.8 },
            { name: "Minerale", detail: "0,5 l", price: 1.5 }
          ]
        },
        {
          title: "Succhi",
          items: [
            { name: "Succo al bicchiere", detail: "ananas, pompelmo, pesca, ACE, albicocca, pera", price: 3.5 },
            { name: "Spremuta d'arancia", price: 4.5 }
          ]
        },
        {
          title: "Soft drink",
          items: [
            { name: "Coca-Cola", detail: "Classic o Zero", price: 3.5 },
            { name: "Sprite", price: 3.5 },
            { name: "Aranciata o aranciata amara", price: 3.5 },
            { name: "Tè limone o pesca", price: 3.5 },
            { name: "Lemon soda", price: 3.5 },
            { name: "Acqua tonica", price: 3.5 },
            { name: "Ginger beer / ginger ale", price: 4.0 },
            { name: "Chinotto", price: 3.5 },
            { name: "San Bitter", price: 4.0 },
            { name: "Crodino", price: 4.0 },
            { name: "Campari Soda", price: 4.0 }
          ]
        },
        {
          title: "Birre",
          items: [
            { name: "Birra in bottiglia", detail: "33 cl", price: 5.0 }
          ]
        }
      ]
    }
  ]
};
