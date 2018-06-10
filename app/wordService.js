var request = require('request');
var htmlparser = require("htmlparser");

module.exports = function() {
    /*
     * Try to get a random word from palabrasaleatorias.com
     * if a word can't be retrieved return a random word from
     * the local list
     */
    this.getRandomWord = function() {
        return new Promise(function(resolve, reject) {
            var index = Math.floor(Math.random() * wordList.length);
            var localRandomWord = wordList[index].toUpperCase();

            request('https://www.palabrasaleatorias.com/mots-aleatoires.php', function (error, response, body) {
                var handler = new htmlparser.DefaultHandler(function (error, dom) {
                    var remoteWord = "";
                    if (!error) {
                        /*
                         * Manual parsing, bitch!
                         * TODO: make it cleaner
                         */
                        remoteWord = dom.find(html => { return html.name === "html";}).children
                            .find(html => { return html.name === "body";}).children
                            .find(html => { return html.name === "center";}).children
                            .find(html => { return html.name === "center";}).children
                            .find(html => { return html.name === "table";}).children
                            .find(html => { return html.name === "tr";}).children
                            .find(html => { return html.name === "td";}).children
                            .find(html => { return html.name === "div";}).children[0].data.trim().toUpperCase();
                    }

                    var wordToReturn = localRandomWord;
                    if (remoteWord) {
                        wordToReturn = remoteWord;
                    }
                    resolve(wordToReturn);
                });
                var parser = new htmlparser.Parser(handler);
                parser.parseComplete(body);
            });
        });
    };

    var wordList = [
"angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "coin", "couloir",
"dossier", "eau", "escalier", "lavabo", "lecture", "lit", "marche", "matelas", "maternelle", "meuble",
"mousse", "mur", "peluche", "placard", "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe",
"rideau", "robinet", "salle", "savon", "serrure", "serviette", "sieste", "silence", "sol", "sommeil",
"sonnette", "sortie", "table", "tableau", "tabouret", "tapis", "tiroir", "toilette", "vitre", "aller",
"amener", "apporter", "appuyer", "attendre", "bosser", "dormir", "emmener", "emporter", "entrer", "fermer",
"frapper", "lire", "ouvrir", "rentrer", "rester", "sonner", "sortir", "tricher", "venir", "absent",
"assis", "bas", "haut", "debout", "dedans", "dehors", "loin", "tard", "au", "avant",
"contre", "dans", "de", "devant", "du", "sous", "sur", "affiche", "alphabet", "appareil",
"cassette", "chanson", "chiffre", "contraire", "doigt", "film", "fois", "instrument", "intrus", "lettre",
"liste", "main", "micro", "musique", "nom", "nombre", "orchestre", "ordinateur", "photo", "point",
"poster", "pouce", "question", "radio", "sens", "tambour", "trait", "trompette", "voix", "xylophone",
"chanter", "chercher", "choisir", "chuchoter", "coller", "colorier", "commencer", "comparer", "compter", "construire",
"continuer", "copier", "couper", "demander", "dessiner", "dire", "discuter", "effacer", "entendre", "entourer",
"envoyer", "faire", "finir", "fouiller", "imiter", "laisser", "lire", "mettre", "montrer", "ouvrir",
"parler", "peindre", "plier", "poser", "prendre", "ranger", "recommencer", "regarder", "remettre", "sentir",
"souligner", "tailler", "tenir", "terminer", "toucher", "travailler", "trier", "ami", "attention", "camarade",
"copain", "coquin", "dame", "directeur", "directrice", "droit", "effort", "enfant", "fatigue", "faute",
"fille", "gardien", "madame", "mensonge", "ordre", "personne", "retard", "sourire", "travail", "aider",
"distribuer", "expliquer", "gronder", "obliger", "partager", "priver", "promettre", "punir", "raconter", "refuser",
"blond", "brun", "calme", "curieux", "doux", "gentil", "grand", "jaloux", "moyen", "muet",
"noir", "nouveau", "petit", "poli", "propre", "roux", "sage", "sale", "sourd", "tranquille",
"arrosoir", "assiette", "balle", "bateau", "bouchon", "bouteille", "bulles", "canard", "casserole", "cuvette",
"douche", "entonnoir", "gouttes", "litre", "moulin", "pluie", "poisson", "pont", "pot", "roue",
"sac", "saladier", "seau", "tablier", "tasse", "trous", "verre", "agiter", "arroser", "attraper",
"avancer", "baigner", "barboter", "boucher", "bouger", "doucher", "essuyer", "envoyer", "flotter", "gonfler",
"inonder", "jouer", "laver", "mouiller", "nager", "patauger", "pleuvoir", "plonger", "pousser", "pouvoir",
"presser", "recevoir", "remplir", "renverser", "serrer", "souffler", "tirer", "tourner", "tremper", "verser",
"vider", "vouloir", "amusant", "chaud", "froid", "humide", "sec", "transparent", "autant", "beaucoup",
"encore", "moins", "peu", "plus", "trop", "anorak", "arc", "bagage", "baguette", "barbe",
"bonnet", "botte", "bouton", "bretelle", "cagoule", "casque", "casquette", "ceinture", "chapeau", "chaussette",
"chausson", "chaussure", "chemise", "cigarette", "col", "collant", "couronne", "cravate", "culotte", "fusil",
"gant", "habit", "jean", "jupe", "lacet", "laine", "linge", "lunettes", "magicien", "magie",
"maillot", "manche", "manteau", "mouchoir", "moufle", "paire", "pantalon", "pied", "poche", "prince",
"pyjama", "reine", "robe", "roi", "ruban", "semelle", "soldat", "tache", "taille", "talon",
"tissu", "tricot", "uniforme", "valise", "veste", "enlever", "lacer", "porter", "ressembler", "clair",
"court", "joli", "large", "long", "multicolore", "nu", "bien", "mal", "mieux", "presque",
"aiguille", "ampoule", "avion", "bois", "bout", "bricolage", "bruit", "cabane", "carton", "clou",
"colle", "crochet", "ficelle", "fil", "marionnette", "marteau", "morceau", "moteur", "objet", "outil",
"peinture", "pinceau", "planche", "scie", "tournevis", "vis", "voiture", "arracher", "attacher", "casser",
"coudre", "enfiler", "enfoncer", "fabriquer", "mesurer", "percer", "servir", "taper", "trouer", "adroit",
"difficile", "dur", "facile", "lisse", "maladroit", "pointu", "rugueux", "tordu", "accident", "auto",
"camion", "engin", "feu", "frein", "garage", "gare", "grue", "moto", "panne", "parking",
"pilote", "pneu", "quai", "train", "virage", "vitesse", "voyage", "wagon", "zigzag", "atterrir",
"bouder", "charger", "conduire", "donner", "garder", "manquer", "partir", "reculer", "rouler", "tendre",
"transporter", "voler", "ancien", "blanc", "bleu", "cinq", "dernier", "deux", "dix", "gris",
"gros", "huit", "jaune", "neuf", "pareil", "premier", "quatre", "rouge", "sept", "seul",
"six", "solide", "trois", "un", "vert", "autour", "vite", "avec", "sur", "vers",
"acrobate", "barre", "barreau", "bord", "bras", "cerceau", "chaises", "cheville", "chute", "corde",
"corps", "cou", "coude", "cuisse", "danger", "doigts", "dos", "escabeau", "fesse", "filet",
"fond", "genou", "gymnastique", "hanche", "jambes", "jeu", "mains", "milieu", "montagne", "muscle",
"ongle", "parcours", "pas", "passerelle", "pente", "peur", "pieds", "plongeoir", "poignet", "poing",
"prises", "roulade", "saut", "serpent", "sport", "suivant", "toboggan", "tour", "trampoline", "tunnel",
"ventre", "arriver", "bondir", "bousculer", "courir", "danser", "descendre", "escalader", "gagner", "glisser",
"grimper", "monter", "perdre", "ramper", "rater", "remplacer", "respirer", "revenir", "sauter", "soulever",
"suivre", "tomber", "transpirer", "traverser", "dangereux", "fort", "gauche", "immobile", "rond", "souple",
"ensemble", "ici", "jamais", "souvent", "toujours", "", "bagarre", "ballon", "bande", "bicyclette",
"bille", "cadenas", "coup", "cour", "course", "flaque", "paix", "pardon", "partie", "pelle",
"pompe", "raquette", "rayon", "sable", "sifflet", "signe", "tas", "tricycle", "tuyau", "filet",
"cracher", "creuser", "crier", "galoper", "hurler", "jongler", "lancer", "pleurer", "poursuivre", "saigner",
"siffler", "surveiller", "trouver", "fou", "allumette", "anniversaire", "beurre", "coquille", "dessert", "envie",
"faim", "four", "galette", "invitation", "langue", "liquide", "louche", "mie", "moule", "odeur",
"part", "recette", "rouleau", "sel", "soif", "tarte", "tranche", "yaourt", "aimer", "allumer",
"avaler", "battre", "chauffer", "cuire", "falloir", "inviter", "jeter", "oublier", "remercier", "remuer",
"souhaiter", "sucer", "demi", "entier", "gourmand", "mauvais", "meilleur", "mince", "jus", "kiwi",
"lame", "noyau", "paille", "pamplemousse", "croquer", "bassine", "cocotte", "rondelle", "soupe", "potage",
"bouillir", "mixer", "cru", "cuit", "vide", "frite", "gobelet", "jambon", "os", "poulet",
"radis", "restaurant", "sole", "animal", "bouche", "cage", "caresse", "foin", "graines", "hamster",
"lapin", "maison", "nez", "oreille", "patte", "toit", "yeux", "accoucher", "agacer", "appeler",
"caresser", "changer", "enfermer", "enterrer", "gratter", "grignoter", "installer", "mordre", "mourir", "nourrir",
"ronger", "soigner", "vivre", "voir", "enceinte", "maigre", "mort", "vivant", "abeille", "agneau",
"aile", "arbre", "bain", "barque", "bassin", "bec", "boue", "bouquet", "bourgeon", "branche",
"caillou", "campagne", "car", "champ", "chariot", "chat", "cheval", "chien", "cochon", "colline",
"coq", "coquelicot", "crapaud", "cygne", "dindon", "escargot", "ferme", "fermier", "feuille", "flamme",
"fleur", "fontaine", "grain", "graine", "grenouille", "griffe", "herbe", "insecte", "jardin", "mare",
"marguerite", "miel", "mouche", "mouton", "oie", "oiseau", "pierre", "pigeon", "plante", "plume",
"poney", "poule", "poussin", "prairie", "rat", "route", "tortue", "tracteur", "tulipe", "vache",
"accompagner", "couver", "fumer", "griffer", "habiter", "piquer", "ramasser", "traire", "bizarre", "immense",
"malade", "nain", "utile", "aigle", "animaux", "aquarium", "cerf", "chouette", "cigogne", "crocodile",
"dauphin", "girafe", "hibou", "hippopotame", "kangourou", "lion", "loup", "ours", "panda", "perroquet",
"phoque", "renard", "requin", "singe", "tigre", "zoo", "bonhomme", "bottes", "canne", "cauchemar",
"cri", "danse", "dinosaure", "drapeau", "figure", "gens", "joie", "joue", "journaux", "maquillage",
"masque", "monsieur", "moustache", "ogre", "princesse", "rue", "trottoir", "essayer", "marcher", "plaire",
"rencontrer", "retourner", "rire", "danser", "sauter", "chanter", "content", "heureux", "joyeux", "riche",
"terrible", "boule", "cadeau", "chance", "cube", "guirlande", "humeur", "papillon", "spectacle", "surprise",
"trou", "visage", "lever", "maquiller", "an", "calendrier", "dimanche", "fin", "heure", "hiver",
"horloge", "jeudi", "jour", "lundi", "lune", "mardi", "matin", "mercredi", "midi", "minuit",
"minute", "mois", "moment", "montre", "nuit", "ombre", "pendule", "retour", "saison", "samedi",
"semaine", "soir", "soleil", "temps", "univers", "vacances", "vendredi", "avancer", "briller", "grandir",
"suivre", "retarder", "jeune", "lent", "patient", "rapide", "sombre", "vieux", "demain", "hier",
"maintenant", "puis", "air", "brouillard", "ciel", "flocon", "goutte", "hirondelle", "luge", "neige",
"nuage", "orage", "ouragan", "parapluie", "parasol", "ski", "tonnerre", "vent", "geler", "neiger",
"pleuvoir", "venter", "triste", "chaud", "froid", "pluvieux", "nuageux", "humide", "instable", "changeant",
"assiette", "balai", "biscuit", "boisson", "bol", "bonbon", "confiture", "coquetier", "couteau", "couvercle",
"couvert", "cuisine", "four", "fourchette", "lait", "lessive", "machine", "nappe", "pain", "pile",
"plat", "plateau", "repas", "tartine", "torchon", "vaisselle", "accrocher", "balayer", "boire", "frotter",
"manger", "nettoyer", "cuisiner", "bon", "creux", "argent", "aspirateur", "bague", "barrette", "bijou",
"bracelet", "brosse", "cadre", "chambre", "cheveu", "chiffon", "cil", "coffre", "coffret", "collier",
"couette", "coussin", "couverture", "dent", "dentifrice", "drap", "fauteuil", "frange", "glace", "lampe",
"lit", "or", "oreiller", "parfum", "peigne", "pouf", "poussette", "shampoing", "sourcil", "tube",
"vase", "passer", "repasser", "secouer", "beau", "belle", "confortable", "coquet", "douillet", "adulte",
"album", "amour", "baiser", "bavoir", "biberon", "bisou", "caprice", "cousin", "cousine", "fils",
"homme", "femme", "jumeau", "maman", "mari", "mariage", "papa", "parent", "rasoir", "baver",
"bercer", "consoler", "offrir", "penser", "ronfler", "tricoter", "ambulance", "bosse", "champignon", "dentiste",
"docteur", "front", "gorge", "infirmier", "jambe", "larme", "menton", "mine", "ordonnance", "pansement",
"peau", "poison", "sang", "squelette", "trousse", "devoir", "recoudre", "souffrir", "tousser", "trembler",
"brouette", "chenille", "coccinelle", "fourmi", "herbe", "jonquille", "souris", "taupe", "terrain", "terre",
"terrier", "tige", "ver", "cueillir", "jardiner", "planter", "profond", "assez", "sac", "voyager",
"billet", "caisse", "farce", "grimace", "grotte", "pays", "regard", "ticket", "tuer", "cruel",
"buisson", "camp", "chasseur", "chemin", "corbeau", "gourde", "lac", "loupe", "lutin", "marron",
"moustique", "muguet", "nid", "paysage", "pin", "rocher", "sapin", "sommet", "tente", "camper",
"chasser", "entendre", "griller", "grimper", "guetter", "jeter", "lancer", "manger", "marcher", "montrer",
"patauger", "photographier", "pleuvoir", "poser", "poursuivre", "ramasser", "regarder", "rencontrer", "respirer", "revoir",
"sentir", "siffler", "transpirer", "traverser", "trouver", "vivre", "adresse", "appartement", "ascenseur", "balcon",
"boucherie", "boulanger", "boulangerie", "boutique", "bus", "caniveau", "caravane", "carrefour", "cave", "charcuterie",
"cirque", "cloche", "clocher", "clown", "coiffeur", "courrier", "croix", "embouteillage", "endroit", "enveloppe",
"essence", "facteur", "fleuriste", "foire", "immeuble", "incendie", "laisse", "magasin", "moineau", "monde",
"monument", "ouvrier", "palais", "panneau", "paquet", "parc", "passage", "pharmacie", "pharmacien", "piscine",
"place", "police", "policier", "pompier", "poste", "promenade", "quartier", "square", "timbre", "travaux",
"usine", "village", "ville", "voisin", "volet", "barrer", "clignoter", "garer", "photographier", "retrouver",
"revoir", "saluer", "savoir", "visiter", "important", "impossible", "prudent", "chez", "abricot", "ail",
"aliment", "ananas", "banane", "bifteck", "carotte", "cerise", "chocolat", "chou", "citron", "citrouille",
"concombre", "coquillage", "corbeille", "crabe", "crevette", "endive", "farine", "fraise", "framboise", "fromage",
"fruit", "haricot", "huile", "marchand", "melon", "monnaie", "navet", "noisette", "noix", "nourriture",
"oignon", "orange", "panier", "persil", "poire", "poireau", "pomme", "prix", "prune", "queue",
"raisin", "riz", "salade", "sucre", "tomate", "viande", "vin", "acheter", "ajouter", "payer",
"peser", "rendre", "vendre", "cher", "lourd", "plein", "baleine", "jumelles", "marin", "mer",
"mouette", "navire", "plage", "poisson", "port", "sardine", "serviette", "vague", "voile", "ramer", "nager"
    ];

};
