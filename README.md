# voyage-aventure
projet scolaire

Documentation de la migration vers Bootstrap : [docs/migration.md](docs/migration.md)

## Conventions de l'équipe

### Bootstrap
- Bootstrap **5.3.3** via CDN jsDelivr : CSS dans le `<head>`, `bootstrap.bundle.min.js` (inclut Popper) juste avant `</body>`.
- Pas de jQuery.
- Icônes : Bootstrap Icons 1.11.3 (CDN). Polices : Fraunces (titres) et Work Sans (texte), via Google Fonts.
- Photos dans `img/`, sous licence CC0 (crédits dans `docs/migration.md`).

### CSS
- `css/custom.css` : variables de la palette (`--va-*`) et surcharge des couleurs Bootstrap (`--bs-primary`, `.btn-primary`…).
- Une section commentée par page, chacune gérée par son développeur : **50 lignes max par page**.
- Ordre de chargement : `bootstrap.min.css` → `custom.css`.
- Les styles partagés par plusieurs pages (bandeaux, cartes au survol) sont dans les sections « Commun ».

| Variable | Couleur | Usage |
|---|---|---|
| `--va-cream` | `#f5efe4` | Fond des pages |
| `--va-paper` | `#fbf8f2` | Cards, sections alternées (`bg-body-tertiary`) |
| `--va-ink` | `#1f2a24` | Texte |
| `--va-green` | `#1f4d3f` | Boutons et liens (`btn-primary`, `text-primary`) |
| `--va-green-dark` | `#16302a` | Footer, chiffres clés (`bg-dark`) |
| `--va-terracotta` | `#a8492a` | Accent : CTA, prix, surtitres (`btn-danger`, `text-danger`) |

### JavaScript
- Un fichier par page : `js/<page>.js`, chargé après le bundle Bootstrap.

### Git
- Une branche par tâche : `feat/footer`, `feat/navbar`, `feat/accueil`, `feat/destinations`, `feat/apropos`, `feat/contact`.
- Merge request relue par l'autre développeur avant le merge sur `main`.

### Répartition
| | Développeur A | Développeur B |
|---|---|---|
| Composant partagé | Header (navbar) | Footer |
| Pages | Accueil, À propos | Destinations, Contact |
| Transverse | Optimisation CSS | Documentation |

### Tests responsive
Mobile **375px**, tablette **768px**, desktop **1200px**.
