# Pack Assets — Coach AI Mobile

Tous les assets visuels nécessaires pour le développement et la publication de l'application mobile Coach AI.

---

## Contenu

```
assets/
├── svg/                            # Logos vectoriels (modifiables, scalables sans perte)
│   ├── logo-icon.svg              # Cerveau seul, dégradé blue → green
│   ├── logo-icon-white.svg        # Cerveau monochrome blanc (sur fond sombre)
│   ├── logo-icon-black.svg        # Cerveau monochrome noir (sur fond clair)
│   ├── logo-monogram.svg          # Monogramme « C » dégradé (anneau ouvert + dot)
│   ├── logo-monogram-white.svg    # Monogramme « C » blanc
│   ├── logo-monogram-black.svg    # Monogramme « C » noir
│   ├── logo-lockup-dark.svg       # Lockup horizontal "Coach AI" — version dark mode (texte blanc)
│   ├── logo-lockup-light.svg      # Lockup horizontal — version light mode (texte noir)
│   ├── logo-lockup-mono-white.svg # Lockup tout en blanc
│   └── logo-lockup-mono-black.svg # Lockup tout en noir
│
├── png/                            # Exports PNG pour les builds mobile
│   ├── app-icon-ios-1024.png            # iOS — soumission App Store
│   ├── app-icon-android-foreground-432.png # Android — adaptive icon foreground
│   ├── app-icon-android-background-432.png # Android — adaptive icon background
│   └── splash-1242x2436.png             # Splash screen (iPhone X+, 3x density)
│
├── fonts/                          # Inter (police de la marque)
│   ├── Inter-Regular.woff
│   ├── Inter-SemiBold.woff
│   └── Inter-Bold.woff
│
└── README.md                       # Ce fichier
```

---

## Quoi utiliser, où

### Dans le code React Native + Expo

**App icon iOS** dans `app.json` :

```json
{
  "expo": {
    "icon": "./assets/png/app-icon-ios-1024.png",
    "ios": {
      "icon": "./assets/png/app-icon-ios-1024.png"
    }
  }
}
```

**App icon Android adaptive** dans `app.json` :

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/png/app-icon-android-foreground-432.png",
        "backgroundImage": "./assets/png/app-icon-android-background-432.png"
      }
    }
  }
}
```

**Splash screen** dans `app.json` :

```json
{
  "expo": {
    "splash": {
      "image": "./assets/png/splash-1242x2436.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    }
  }
}
```

**Polices** chargées via `expo-font` dans `_layout.tsx` :

```ts
import { useFonts } from "expo-font";

const [loaded] = useFonts({
  "Inter-Regular":  require("../assets/fonts/Inter-Regular.woff"),
  "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.woff"),
  "Inter-Bold":     require("../assets/fonts/Inter-Bold.woff"),
});
```

> **Note :** pour la production iOS / Android, télécharge aussi les fichiers `.ttf` depuis [rsms.me/inter](https://rsms.me/inter/). Les `.woff` sont parfaits pour le web mais certaines versions d'Expo / React Native exigent du `.ttf` natif.

### Dans Figma / Illustrator

Importe les fichiers SVG depuis `/svg/`. Les dégradés et tracés sont 100% éditables.

### Dans un agent UI builder

Réfère-toi au logo via `assets/svg/logo-icon.svg` ou colle le contenu SVG inline. Les agents (v0, Lovable, Cursor) gèrent le SVG nativement.

---

## Variantes du logo — quand utiliser quoi

| Variante | Usage |
|----------|-------|
| `logo-icon.svg` | Logo principal partout où c'est possible (light + dark mode supportés grâce au dégradé) |
| `logo-icon-white.svg` | Quand le contexte exige une seule couleur claire (impression mono, watermark, accentuation forte) |
| `logo-icon-black.svg` | Quand le contexte exige une seule couleur sombre (papier, cartes de visite light, contextes corporate) |
| `logo-monogram.svg` | Espaces très restreints (favicon 16px, avatar 32px, badge unitaire) |
| `logo-lockup-dark.svg` | Header de l'app, splash screen, écran login (fond noir) |
| `logo-lockup-light.svg` | Documents print clairs, présentations slides blancs |
| `logo-lockup-mono-*.svg` | Cas de mono-impression (gravure laser, écriture monochrome) |

---

## Specs techniques

### App icon iOS (`app-icon-ios-1024.png`)

- Résolution : 1024 × 1024 px
- Format : PNG 24-bit + alpha
- Couleur de fond : dégradé radial `#0A0A1A` → `#000000`
- Brain centré avec padding 160 dp pour tenir compte du squircle iOS automatique
- iOS arrondira automatiquement les coins lors du build

### App icon Android (adaptive)

- Résolution : 432 × 432 px chaque (foreground + background)
- Foreground : brain centré dans la safe zone 264 × 264 (61% du canvas)
- Background : dégradé sombre uni
- Android compose les deux et applique le masque (cercle, squircle, teardrop selon launcher)

### Splash screen (`splash-1242x2436.png`)

- Résolution : 1242 × 2436 px (iPhone 11 Pro / X / 12 mini @3x)
- Fond : `#000000` plein
- Brain centré, taille 432 × 432, légèrement au-dessus du milieu
- Texte « Coach AI » en Inter Bold 88px sous le brain (vectorisé, pas dépendant de la font système)
- 3 dots `#4A53FF` en bas (suggestion de chargement statique)
- Pour autres résolutions : régénérer via `generate-assets.js` ou laisser Expo redimensionner avec `resizeMode: "contain"`

### Logos SVG

- ViewBox : 96 × 96 (icon, monogramme) ou auto-fit (lockup)
- Stroke 4 dp, linecap/linejoin round
- Dégradé linéaire `#4A53FF` (top-left) → `#5DC2A8` (centre) → `#41FF31` (bottom-right)
- Monogramme : arc « C » stroke 8 dp + dot central rayon 6 dp

---

## Régénérer les assets

Si tu veux modifier le logo (changer le brain, le dégradé, ajouter des variantes), édite le script `generate-assets.js` à la racine et relance :

```bash
cd outputs
node generate-assets.js
```

Toutes les variantes SVG et tous les PNG sont régénérés en une commande.

---

## Checklist de validation avant build store

- [ ] Tester l'icon iOS sur un vrai device (l'arrondi du squircle change selon iOS version)
- [ ] Tester l'icon Android sur 3 launchers différents (Pixel, Samsung, Xiaomi) pour vérifier les masques
- [ ] Vérifier que le splash s'affiche correctement sur iPhone SE (petit écran) et iPhone 15 Pro Max (grand écran)
- [ ] Confirmer que la police Inter est bien chargée avant la disparition du splash
- [ ] Compresser les PNG via `pngquant` pour réduire la taille du bundle (`pngquant --quality 80-95 *.png`)
- [ ] Convertir les `.woff` en `.ttf` pour la production native iOS / Android

---

**Pack assets complet — Coach AI Mobile**
