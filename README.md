# voyage-aventure
projet scolaire

## Conventions de l'équipe

### Bootstrap
- Bootstrap **5.3.3** via CDN jsDelivr : CSS dans le `<head>`, `bootstrap.bundle.min.js` (inclut Popper) juste avant `</body>`.
- Pas de jQuery.

### CSS
- `css/custom.css` : variables de la palette (`--va-*`) et surcharge des couleurs Bootstrap (`--bs-primary`, `.btn-primary`…).
- Une section commentée par page, chacune gérée par son développeur : **50 lignes max par page**.
- Ordre de chargement : `bootstrap.min.css` → `styles.css` → `custom.css`.
- `css/styles.css` est l'ancien CSS, conservé pendant la transition. Chacun le délie de sa page une fois migrée, puis il sera supprimé.

| Variable | Couleur | Usage |
|---|---|---|
| `--va-dark` | `#2c3e50` | Header, footer, titres (`bg-dark`, `text-dark`) |
| `--va-dark-alt` | `#34495e` | Bandeaux de page |
| `--va-primary` | `#3498db` | Boutons et liens (`btn-primary`, `text-primary`) |
| `--va-danger` | `#e74c3c` | CTA, prix (`btn-danger`, `text-danger`) |
| `--va-success` | `#27ae60` | Envoi du formulaire (`btn-success`) |

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
