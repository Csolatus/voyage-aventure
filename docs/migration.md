# Migration de VoyageAventure vers Bootstrap

## 1. Vue d'ensemble

Le site VoyageAventure (4 pages : Accueil, Destinations, À propos, Contact) était écrit en HTML et CSS « maison » : un fichier `css/styles.css` de 588 lignes, sans framework. Il a été migré vers **Bootstrap 5.3.3**.

- **Bootstrap** : chargé par CDN jsDelivr (CSS + `bootstrap.bundle.min.js`, qui inclut Popper), avec les attributs SRI. Pas de jQuery.
- **CSS personnalisé** : un seul fichier, `css/custom.css`, avec une section par page.
- **JavaScript** : un fichier par page qui en a besoin (`js/destinations.js`, `js/contact.js`).
- **Lancer le site** : ouvrir `index.html` dans un navigateur (aucune installation ni serveur requis).

### Déroulé de la migration

| MR | Branche | Contenu | Développeur |
|---|---|---|---|
| #1 | `chore/setup-bootstrap` | CDN Bootstrap, `custom.css` (palette), conventions dans le README | B |
| #2 | `feat/navbar` | Navbar responsive (collapse) | A |
| #3 | `feat/accueil` | Hero, cards services, carousel témoignages | A |
| #4 | `feat/apropos` | Timeline, cards valeurs et équipe, progress bars | A |
| #5 | `feat/footer` | Footer en grille | B |
| #6 | `feat/destinations` | Filtres, grille de cards, modal de détails | B |
| #7 | `feat/contact` | Formulaire, validation, alert, présélection de destination | B |
| #8 | `refactor/optimisation-css` | Suppression de `styles.css`, styles partagés regroupés en sections « Commun » | A |
| #9 | `docs/migration` | Documentation de la migration | B |

Convention : chaque MR est relue par l'autre développeur avant le merge sur `main`.

## 2. Composants communs

### Header (navbar)

| Avant | Après |
|---|---|
| `header.site-header` + `nav.main-nav` en flex | `nav.navbar.navbar-expand-md.bg-dark` dans un `header.sticky-top` |
| `h1.logo` (un 2ᵉ `h1` sur les pages internes) | `a.navbar-brand` : un seul `h1` par page |
| `ul.nav-list` (passait en colonne en mobile) | `ul.navbar-nav.ms-auto` dans un `.collapse.navbar-collapse` |
| Pas de menu mobile | `button.navbar-toggler` : menu hamburger sous 768px |
| `.nav-link.active` | `.nav-link.active` + `aria-current="page"` |

`data-bs-theme="dark"` donne automatiquement des liens et une icône hamburger clairs sur fond sombre.

### Footer

| Avant | Après |
|---|---|
| `footer.site-footer` | `footer.bg-dark.text-white.py-4` |
| `.footer-content` en flex + media query | `.row.gy-3` > 2 × `.col-md-6` (empilées en mobile) |
| Email et téléphone en texte | Liens `mailto:` et `tel:` (`.link-light`) |

### Bandeau de titre des pages internes

`section.page-header` → `section.bg-dark-alt.text-white.text-center.py-5` avec `h1.display-5.fw-bold` et `p.lead.opacity-75`. Même structure sur Destinations, À propos et Contact.

## 3. Page par page

### Accueil (`index.html`) — développeur A

| Avant | Après |
|---|---|
| `.hero` + `.hero-title` / `.hero-subtitle` | `.hero.text-white.text-center.py-5`, `h1.display-4`, `p.lead` |
| `button.cta-button` (ne menait nulle part) | `a.btn.btn-danger.btn-lg` vers `destinations.html` |
| `.services-grid` en flex, cards de 300px fixes | `.row.row-cols-1.row-cols-md-3.g-4` |
| `.service-card` | `.card.h-100.bg-body-tertiary.border-2` > `.card-body` |
| `.testimonials-grid` (2 cartes côte à côte) | `.carousel.slide` avec indicateurs et flèches |
| `.testimonial-text` / `.testimonial-author` | `figure` > `blockquote.blockquote` + `figcaption` |
| `.section-title` | `h2.text-center.fw-bold.mb-5` |

- **Composant JS Bootstrap** : carousel, entièrement déclaratif (`data-bs-ride`, `data-bs-slide`) : aucun JS écrit.
- **CSS personnalisé** : le dégradé du hero et la bordure bleue des cards services au survol. Le léger soulèvement est dans la section commune « cartes animées au survol ».

### Destinations (`destinations.html`) — développeur B

| Avant | Après |
|---|---|
| `.filter-buttons` + `.filter-btn` (sans effet) | `.btn-group.flex-wrap` + `.btn.btn-outline-primary`, `data-filter`, `aria-pressed` |
| `.destinations-grid` en CSS grid | `.row.row-cols-1.row-cols-md-2.row-cols-lg-3.g-4` |
| `.destination-card` | `.card.h-100.shadow-sm.border-0` > `.card-body.d-flex.flex-column` |
| `.destination-image` | `.card-img-top.display-3.bg-body-tertiary` |
| `.duration` / `.price` | `.badge.text-bg-secondary` / `.badge.text-bg-danger` |
| `.destination-btn` (sans effet) | `.btn.btn-primary.mt-auto` (boutons alignés en bas des cards) qui ouvre un modal |
| — | Un seul `.modal.fade` réutilisé pour les 6 destinations |

- **Composant JS Bootstrap** : modal.
- **JS écrit** : filtrage par continent et remplissage du modal (voir section 6).
- **CSS personnalisé** : aucun dans sa section ; le soulèvement des cards au survol est dans la section commune « cartes animées au survol ».

### À propos (`apropos.html`) — développeur A

| Avant | Après |
|---|---|
| `.story-content` en flex | `.row.g-5.align-items-center` > 2 × `.col-lg-6` |
| `.story-image` (emoji décoratif) | Timeline : `ol.list-unstyled.border-start.border-3.border-primary` avec 4 étapes datées (`.badge`) |
| `.values-grid` / `.value-card` | `.row.row-cols-1.row-cols-md-3.g-4` > `.card.border-0.shadow-sm` |
| `.team-grid` / `.team-member` | Même grille, `.card.border-0` |
| `.stats-grid` / `.stat-number` | `.row.row-cols-md-2` avec `.progress` + `.progress-bar` et chiffre en `.display-6` |

- Le bandeau de titre utilise `.bg-dark-alt`, défini dans la section commune « bandeaux de page » (partagé avec Destinations et Contact).
- La timeline n'existe pas dans Bootstrap. Elle est construite avec `border-start` et quelques lignes de CSS pour les pastilles (`.timeline-item::before`).
- Les progress bars : « 5000+ voyages » et « 50+ destinations » n'ont pas de maximum naturel. Elles sont donc rapportées à un objectif 2026 (6000 voyages, 75 destinations), indiqué sous la barre.

### Contact (`contact.html`) — développeur B

| Avant | Après |
|---|---|
| `.contact-content` en grid 1fr / 1fr | `.row.g-5` > `.col-lg-5` (coordonnées) + `.col-lg-7` (formulaire) |
| `.contact-item` | `.d-flex.gap-3`, adresse dans `<address>`, liens `tel:` / `mailto:` |
| `.contact-form-container` | `.card.shadow-sm.border-0` |
| `.form-group` | `.row.g-3` > `.col-md-6` / `.col-12` (2 champs par ligne à partir de 768px) |
| `input` / `select` / `textarea` | `.form-label` + `.form-control` / `.form-select` |
| `.checkbox-label` | `.form-check` > `.form-check-input` + `.form-check-label` |
| Validation native du navigateur | `.needs-validation` + `novalidate`, `.was-validated`, `.invalid-feedback` |
| — | `.alert.alert-success` de confirmation |
| `.submit-button` | `.btn.btn-success` |

- **Composants Bootstrap** : validation de formulaire, alert.
- **JS écrit** : validation et présélection de la destination (voir section 6).
- **CSS personnalisé** : aucun.

## 4. Fonctionnalités Bootstrap utilisées

| Fonctionnalité | Où |
|---|---|
| Grille (`row`, `col-*`, `row-cols-*`, `g-*`) | Toutes les pages |
| Collapse (menu hamburger) | Navbar, 4 pages |
| Cards | Accueil, Destinations, À propos, Contact |
| Boutons, groupe de boutons | Toutes les pages ; `btn-group` sur Destinations |
| Badges | Destinations, À propos (timeline) |
| Progress bars | À propos |
| Formulaires | Contact |
| Alert | Contact |
| Utilitaires (espacement, couleurs, flex, typographie, ombres) | Toutes les pages |
| **JS** : Carousel | Accueil |
| **JS** : Modal | Destinations |
| **JS** : Validation de formulaire | Contact |

## 5. CSS personnalisé et contrainte des 50 lignes

Tout le CSS personnalisé est dans `css/custom.css`. Lignes de code par section (hors commentaires et lignes vides) :

| Section | Lignes | Contenu |
|---|---|---|
| Variables + surcharge Bootstrap | 59 | Palette `--va-*`, polices, fonds, couleurs `--bs-*`, boutons, accent sable sur fond sombre |
| Commun : typographie | 13 | Titres en serif (Fraunces), petits surtitres (`.overline`) |
| Commun : header | 11 | Couleurs des liens de la navbar, soulignement du lien actif |
| Commun : footer | 0 | — |
| Accueil | 4 | Alignement des numéros des services |
| À propos | 15 | Pastilles de la timeline, monogrammes de l'équipe |
| Destinations | 0 | — |
| Contact | 0 | — |

**Toutes les pages restent sous les 50 lignes.**

**Optimisation (MR #8)** : `css/styles.css` (537 lignes, plus chargé par aucune page) a été supprimé. Les styles utilisés par plusieurs pages, auparavant écrits en double, sont regroupés dans les sections « Commun ».

**Pourquoi surcharger les couleurs de Bootstrap ?** Par défaut, `btn-primary` ou `text-primary` utilisent le bleu de Bootstrap (`#0d6efd`), et non celui du site. Redéfinir `--bs-primary`, `--bs-danger`, `--bs-success`, `--bs-dark` (et leur version `-rgb`) permet de garder la charte d'origine avec les classes Bootstrap standard. Les boutons ayant leurs propres variables (`--bs-btn-bg`…), ils sont surchargés à part.

| Variable | Couleur | Utilisée par |
|---|---|---|
| `--va-cream` | `#f5efe4` | Fond des pages (`--bs-body-bg`) |
| `--va-paper` | `#fbf8f2` | Cards, sections alternées (`bg-body-tertiary`) |
| `--va-ink` | `#1f2a24` | Texte (`--bs-body-color`) |
| `--va-muted` | `#595e56` | Texte secondaire (`text-body-secondary`) |
| `--va-green` | `#1f4d3f` | `btn-primary`, `text-primary`, liens |
| `--va-green-dark` | `#16302a` | `bg-dark` : footer, chiffres clés |
| `--va-terracotta` | `#a8492a` | `btn-danger`, prix, surtitres, lien actif |

**Contraste** : chaque couleur de texte dépasse 4.5:1 sur son fond (WCAG AA) : encre sur crème 13:1, texte secondaire 5.8:1, vert 8.4:1, terracotta 5:1, blanc sur vert 9.6:1. Sur fond sombre (`.bg-dark`), `text-primary` passe en sable (`#e9c9a8`, 9:1).

**La section Variables dépasse 50 lignes**, mais elle est commune au site entier et ne compte pour aucune page en particulier.

### Refonte graphique « Carnet de voyage » (phase 3)

Après la migration, le site gardait l'allure d'un gabarit générique : dégradé violet, emojis à la place des images, tout centré, grilles de 3 cards identiques, ombres et soulèvement au survol partout. La refonte lui donne une identité de guide de voyage imprimé, sans rien retirer de Bootstrap :

- **Typographie** : titres en *Fraunces* (serif), texte en *Work Sans*, chargées depuis Google Fonts et branchées sur `--bs-body-font-family`.
- **Palette** : fond crème, encre, vert profond et accent terracotta (voir le tableau ci-dessus), à la place des couleurs « Flat UI ».
- **Images** : 8 vraies photos dans `img/`, redimensionnées pour le web (764 Ko au total). Les cards utilisent `ratio ratio-4x3` + `object-fit-cover`.
- **Icônes** : [Bootstrap Icons](https://icons.getbootstrap.com/) 1.11.3 (CDN avec SRI) à la place des emojis.
- **Mises en page variées** : titres alignés à gauche avec un surtitre, hero en deux colonnes, services en liste numérotée, valeurs en colonnes de texte, équipe en monogrammes.
- **Moins d'effets** : plus de dégradé, d'ombres ni de soulèvement au survol ; des bordures fines et de l'espace à la place.
- **Carousel** : défilement automatique désactivé (règle WCAG sur le contenu en mouvement), navigation par deux boutons.

Crédits photos : toutes sous licence **CC0** (domaine public), trouvées via [Openverse](https://openverse.org/).

| Fichier | Banque d'images | Lien |
|---|---|---|
| `img/hero.jpg` | Stocksnap | [source](https://stocksnap.io/photo/hiking-trekking-5LXBN8H2CQ) |
| `img/paris.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/5917229/rooftops-paris-free-public-domain-cc0-photo) |
| `img/tokyo.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/4021501/photo-image-light-people-neon) |
| `img/new-york.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/8809243/photo-image-steam-smoke-public-domain) |
| `img/kenya.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/8811899/photo-image-public-domain-person-animal) |
| `img/rome.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/6035901/photo-image-public-domain-person-free) |
| `img/bali.jpg` | Rawpixel | [source](https://www.rawpixel.com/image/5968784/rice-paddy-the-morning) |
| `img/apropos.jpg` | Stocksnap | [source](https://stocksnap.io/photo/map-travel-EJAXI7R4TB) |

## 6. JavaScript

### `js/destinations.js`

- **Filtrage** : au clic sur un bouton de filtre, le bouton passe en `active` (et `aria-pressed="true"`), puis chaque colonne reçoit ou perd la classe `d-none` selon son `data-continent`. Le filtre porte sur la colonne entière et non sur la card, pour ne pas laisser de trous dans la grille.
- **Modal unique** : à l'événement `show.bs.modal`, le script récupère le bouton cliqué (`event.relatedTarget`). Il lit le titre, la description, la durée et le prix directement dans la card, et le programme et les prestations incluses dans les `data-*` du bouton. Le modal est rempli avec `textContent`, sans risque d'injection HTML.
- **Lien vers Contact** : le bouton « Demander un devis » du modal pointe vers `contact.html?destination=<continent>`.

### `js/contact.js`

- **Présélection** : si l'URL contient `?destination=asie`, l'option correspondante du menu est sélectionnée (uniquement si elle existe).
- **Validation** : à l'envoi, si `checkValidity()` échoue, le formulaire reçoit `was-validated` (affichage des messages d'erreur Bootstrap) et le curseur se place sur le premier champ invalide. Sinon, le formulaire est réinitialisé et l'alert de confirmation s'affiche. Aucun envoi réel : le site n'a pas de serveur.

## 7. Améliorations apportées pendant la migration

- **Un seul `h1` par page** : le logo n'est plus un titre.
- **Navigation mobile** : menu hamburger au lieu d'une liste qui passait en colonne.
- **Boutons qui ne faisaient rien** : le CTA de l'accueil mène aux destinations, les filtres filtrent, « Voir détails » ouvre un modal.
- **Accessibilité** : `aria-current` sur le lien actif, `aria-pressed` sur les filtres, `aria-label` sur les boutons sans texte, emojis décoratifs masqués (`aria-hidden`), focus sur le premier champ en erreur et sur le message de confirmation.
- **Formulaire conforme RGPD** : l'inscription à la newsletter, qui était obligatoire pour envoyer un message, devient facultative ; une case obligatoire de consentement au traitement de la demande est ajoutée.
- **Cohérence des données** : « Océanie », proposée dans le formulaire sans aucune destination correspondante, est remplacée par « Autre / je ne sais pas encore ».
- **Liens utiles** : email et téléphone cliquables (`mailto:`, `tel:`) ; les attributs `autocomplete` permettent au navigateur de préremplir le formulaire.

## 8. Tests responsive

Chaque page est testée à 3 largeurs : mobile **375px**, tablette **768px**, desktop **1200px**.

> Captures à ajouter en phase 3 dans `docs/captures/` (noms de fichiers ci-dessous).

| Page | 375px | 768px | 1200px |
|---|---|---|---|
| Accueil | ![](captures/accueil-375.png) | ![](captures/accueil-768.png) | ![](captures/accueil-1200.png) |
| Destinations | ![](captures/destinations-375.png) | ![](captures/destinations-768.png) | ![](captures/destinations-1200.png) |
| À propos | ![](captures/apropos-375.png) | ![](captures/apropos-768.png) | ![](captures/apropos-1200.png) |
| Contact | ![](captures/contact-375.png) | ![](captures/contact-768.png) | ![](captures/contact-1200.png) |

## 9. Limites connues

- Le formulaire de contact n'envoie rien : il n'y a pas de serveur.
- Les images sont des emojis, repris du site d'origine.
