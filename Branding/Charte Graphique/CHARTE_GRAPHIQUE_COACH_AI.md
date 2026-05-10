# Charte graphique. Coach AI

Système d'identité visuelle pour l'application mobile d'assistant personnel contextuel multimodal.

| Pôle | Auteur | Encadrant |
|---|---|---|
| Application Mobile | Karamo Sylla | Prof. Dr. Otman Aghzout |

---

## Manifeste

> « L'intelligence ambiante doit être lisible au premier coup d'œil. »

Cette charte définit l'identité visuelle de l'application mobile Coach AI. Elle pose un système cohérent : couleurs, typographie, espacement, composants. Ce système guide chaque écran, chaque interaction, chaque alerte.

Le mode sombre est la norme. Les chiffres sont gros. Les couleurs portent du sens. Le superflu n'a pas sa place.

---

## Sommaire

1. Direction artistique
2. Palette de couleurs
3. Typographie
4. Iconographie
5. Espacement et grille
6. Composants UI
7. Tokens et variables

---

## 01. Direction artistique

> Quatre principes, cinq attributs, deux anti-modèles.

### Mantra

**Le contexte avant l'interface.**

Coach AI ne demande pas. Il observe. L'interface n'est qu'un miroir de ce qui se passe en arrière-plan. Elle reste discrète, lisible, et ne s'éclaire que quand c'est utile.

### Positionnement

Le système reprend les codes des wearables haut de gamme : fond noir, gros chiffres, anneaux de progression colorés. Il les adapte à un assistant contextuel multimodal qui vit en arrière-plan. La palette repose sur trois piliers : un noir profond pour la toile de fond, un bleu électrique pour les actions, un vert vif pour les KPIs atteints.

### Principes directeurs

| # | Principe | Description |
|---|---|---|
| 01 | **Calme** | Le fond noir laisse les données respirer. Pas de décor inutile, pas de gradient, pas de halo. |
| 02 | **Lisible** | Gros chiffres, contraste fort, données toujours en évidence. Une métrique ne se cherche jamais. |
| 03 | **Signifiant** | Les couleurs vives portent du sens. Le bleu est une action. Le vert est un succès. Jamais de la décoration. |
| 04 | **Précis** | Une métrique par carte, une couleur par catégorie, un chiffre central. Jamais de mélange visuel. |

### Attributs de marque

`Contextuel`   ·   `Précis`   ·   `Calme`   ·   `Discret`   ·   `Augmenté`

### Tone of voice

**On utilise**

- Le tutoiement : « Tu n'as pas bu depuis 2h. »
- Des phrases courtes : sujet, verbe, complément. Point.
- Des chiffres concrets : « 3h45 de code ce matin »

**On évite**

- Le ton infantilisant : pas de « bravo ! » ni d'émojis hors contexte.
- Le jargon tech : pas de « contexte multimodal détecté ».
- Les métaphores poétiques : pas de « voyage », « parcours », « épanouissement ».

### Anti-modèles

**Visuel**

- Fonds clairs en mode par défaut
- Gradients décoratifs, halos, glows
- Plus de 3 niveaux de gris dans une vue
- Ombres portées sur les cartes en dark mode
- Plus de 2 couleurs sémantiques par écran

**Composants**

- Icônes pleines (toujours en outline)
- Boutons à coins droits (toujours arrondis)
- Polices serif ou décoratives
- Caractères inférieurs à 11 px sur mobile
- Animations supérieures à 400 ms

---

## 02. Palette de couleurs

> Trois couleurs primaires, quatre catégories, une règle de répartition.

La palette repose sur trois couleurs fondamentales. Le noir profond comme toile de fond, le bleu électrique comme couleur d'action, le vert vif comme accent vital. Tout le reste découle de ces trois piliers.

### Couleurs primaires

| Couleur | Hex | Nom | Rôle |
|---|---|---|---|
| ⬛ | `#000000` | Ink | Toile de fond principale |
| 🟦 | `#4A53FF` | Electric Blue | Couleur d'action principale |
| 🟩 | `#41FF31` | Vital Green | Accent vif, KPI atteint |

### Nuances Electric Blue

| Hex | Nom | Usage |
|---|---|---|
| `#6B73FF` | Blue Bright | Hover, focus |
| `#4A53FF` | Blue Core | Action principale |
| `#2E37D9` | Blue Deep | État pressed |

### Nuances Vital Green

| Hex | Nom | Usage |
|---|---|---|
| `#5DFF52` | Green Bright | Hover succès |
| `#41FF31` | Green Core | KPI plein, anneau atteint |
| `#2BCF1E` | Green Deep | Label sombre, état pressed |

### Fonds et surfaces

| Hex | Nom | Usage |
|---|---|---|
| `#000000` | BG Primary | Toile de fond |
| `#0E0E10` | BG Surface | Cartes, sheets |
| `#151518` | BG Elevated | Carte sur surface |
| `#27272A` | Border | Séparateurs subtils |

### Texte et neutres

| Hex | Nom | Usage |
|---|---|---|
| `#FFFFFF` | Text Primary | Titres, KPI, labels actifs |
| `#B7B7BD` | Text Secondary | Descriptions, métadonnées |
| `#6E6E76` | Text Tertiary | Hints, désactivé |

### Couleurs sémantiques

| Hex | Nom | Usage |
|---|---|---|
| `#41FF31` | Success | Validation, KPI atteint |
| `#FFB020` | Warning | Dépassement modéré |
| `#FF3B5C` | Error | Alerte critique |
| `#00C8E6` | Info | Information, lien |

### Catégories d'alerte

Chaque cas d'usage du projet est associé à une couleur dédiée. Cette couleur est utilisée pour la bordure gauche des cartes, l'icône, et le badge de catégorie.

| Catégorie | Hex | Token | Cas d'usage |
|---|---|---|---|
| Santé | `#FF3B5C` | `--cat-health` | Hydratation, posture |
| Productivité | `#FFB020` | `--cat-productivity` | Dépassement de tâche |
| Réunion | `#00C8E6` | `--cat-meeting` | Synthèses, décisions |
| RAG / Insight | `#9D5CFF` | `--cat-rag` | Questions contextuelles |

### Règle de répartition. 60 / 30 / 10

| Ratio | Couleur | Usage |
|---|---|---|
| **60%** | Ink | Toile de fond, neutralité visuelle |
| **30%** | Electric Blue | Actions, liens, états sélectionnés |
| **10%** | Vital Green | KPI atteints, succès, anneau plein |

---

## 03. Typographie

> Une seule police, dix niveaux, deux règles.

### Police principale

**Inter**, police géométrique, neutre, optimisée pour les écrans. Open source via Google Fonts, chargeable dans Expo via `expo-font`.

Fallback système : `-apple-system, Roboto, sans-serif`

### Hiérarchie typographique

| Niveau | Taille | Poids | Line-height | Usage |
|---|---|---|---|---|
| Display KPI | 72 px | 700 | 100% | Anneaux de progression, chiffres signature |
| Display | 48 px | 700 | 110% | Hero, titres de section |
| Heading 1 | 28 px | 600 | 120% | Titre d'écran |
| Heading 2 | 22 px | 600 | 130% | Sous-titre, sections |
| Heading 3 | 18 px | 600 | 140% | Titre de carte |
| Body Large | 17 px | 400 | 150% | Texte courant |
| Body | 15 px | 400 | 150% | Body par défaut |
| Body Small | 13 px | 400 | 150% | Métadonnées, timestamps |
| Label | 12 px | 500 | 140% | Boutons, formulaires |
| Caption | 11 px | 500 | 140% | Caps, étiquettes |

### Règles typographiques

**À faire**

- Tabular numbers sur tous les KPI
- Caps tracking +0.06em sur les labels
- Letter-spacing -0.02em sur Display KPI
- Antialiasing subpixel activé
- Hiérarchie par taille, pas par couleur

**À éviter**

- Italiques sur le body courant
- Soulignements (sauf liens hypertexte)
- Plus de 3 niveaux de hiérarchie par écran
- Caractères inférieurs à 11 px
- Polices serif ou décoratives

---

## 04. Iconographie

> Une bibliothèque, quatre tailles, quatorze symboles.

### Bibliothèque

| Aspect | Valeur |
|---|---|
| Bibliothèque | Lucide React Native |
| Source | lucide.dev |
| Style | Outline (jamais filled) |
| Stroke width | 1.5 px |
| Stroke linecap | round |
| Stroke linejoin | round |
| Couleur | `currentColor`, hérite du texte |

### Tailles standardisées

| Taille | Usage |
|---|---|
| 16 px | Inline. Texte courant, badges |
| 20 px | Boutons. Listes, actions |
| 24 px | Tab bar. Navigation, headers |
| 32 px | Empty. Décor, états vides |

### Mapping fonctionnel

| Fonction | Lucide icon | Usage |
|---|---|---|
| Dashboard | `LayoutDashboard` | Tab Accueil |
| Alertes | `BellRing` | Tab Alertes + push |
| Chatbot | `MessageCircle` | Tab Chat RAG |
| Profil | `User` | Tab Profil |
| Hydratation | `Droplet` | Catégorie Santé |
| Posture | `PersonStanding` | Catégorie Santé |
| Productivité | `TimerReset` | Catégorie Productivité |
| Réunion | `Users` | Catégorie Réunion |
| Insight RAG | `Sparkles` | Catégorie RAG |
| Boîtier IoT | `Cpu` | Statut device |
| Paramètres | `Settings` | Préférences |
| Déconnexion | `LogOut` | Profil |
| Recherche | `Search` | Recherche alertes |
| Ajouter | `Plus` | FAB, ajouts |

---

## 05. Espacement et grille

> Une unité, huit tokens, cinq rayons.

### Système 4 px

Toutes les valeurs d'espacement sont des multiples de 4. Aucune valeur arbitraire n'est tolérée. Cette contrainte garantit l'alignement vertical, la cohérence inter-écrans et facilite le développement.

| Token | Valeur | Multiple | Usage |
|---|---|---|---|
| `space-1` | 4 px | 1× | Gap minimal entre icône et texte |
| `space-2` | 8 px | 2× | Padding interne badges, chips |
| `space-3` | 12 px | 3× | Gap dans une carte |
| `space-4` | 16 px | 4× | Padding standard de carte |
| `space-5` | 24 px | 6× | Gap entre cartes, padding écran |
| `space-6` | 32 px | 8× | Séparation de sections |
| `space-7` | 48 px | 12× | Marges hero, headers |
| `space-8` | 64 px | 16× | Espacement entre blocs majeurs |

### Border radius

| Token | Valeur | Usage |
|---|---|---|
| `--radius-sm` | 4 px | Tags, badges |
| `--radius-md` | 8 px | Inputs, chips |
| `--radius-lg` | 16 px | Cartes, boutons |
| `--radius-xl` | 24 px | Bottom sheets |
| `--radius-pill` | ∞ | Avatars, anneaux |

### Layout mobile

| Aspect | Valeur |
|---|---|
| Largeur d'écran cible | 375 à 430 px |
| Padding écran | 24 px (left + right) |
| Hauteur top header | 56 px (hors status bar) |
| Hauteur bottom tab bar | 64 px + safe area bottom |
| Hauteur item liste | 72 px minimum |
| Tap target minimum | 44 × 44 px (iOS) / 48 × 48 px (Android) |
| Gap inter-cartes | 12 px (vertical) |

---

## 06. Composants UI

> Boutons, cartes, anneaux, badges. Le vocabulaire de l'application.

### Boutons

| Variante | Background | Text | Radius | Hauteur | Usage |
|---|---|---|---|---|---|
| Primary | Electric Blue | White | 16 px | 56 px | Action principale |
| Secondary | Ink | White | 16 px | 56 px | Action de second rang, border 1px subtle |
| Vital CTA | Vital Green | Ink | 16 px | 56 px | Validation forte, succès |

### Cartes

```
background: var(--bg-surface)   #0E0E10
padding:    24 px
radius:     16 px
border:     1px var(--bg-border) #27272A
shadow:     aucune
```

### Carte alerte (border-left coloré)

La bordure gauche colorée signale instantanément la catégorie. Largeur 4 px, couleur depuis le mapping de la section 02.

```
┌───┬─────────────────────────────────────┐
│   │ ALERTE SANTÉ                        │
│ ▌ │ Hydratation rappel                  │
│   │ Tu n'as pas bu depuis 2h.           │
│   │ Aujourd'hui · 14:32                 │
└───┴─────────────────────────────────────┘
  └─ 4px border, var(--cat-health)
```

### Anneau de progression

L'élément signature du système. Pourcentage central XXL (Display KPI 72 px), anneau coloré selon la métrique. La couleur de l'anneau suit le mapping :

- Récupération → Vital Green
- Sommeil → Electric Blue Bright
- Effort → Info Cyan

### Inputs

| Aspect | Valeur |
|---|---|
| Hauteur | 56 px |
| Background | `var(--bg-surface)` |
| Border | 1px `var(--bg-border)` |
| Focus border | 1px `var(--primary)` |
| Radius | 12 px |

### Badges et pills

| Catégorie | Background | Text |
|---|---|---|
| Santé | `var(--cat-health)` | White |
| Productivité | `var(--cat-productivity)` | White |
| Réunion | `var(--cat-meeting)` | White |
| RAG | `var(--cat-rag)` | White |

### Imagerie et illustration

**Photographie**

Photographie ambiante, cadrage serré, profondeur de champ courte. Toujours en noir et blanc ou désaturée à 80%. Pas de mannequins souriants, pas de bureaux blancs lumineux.

**Illustrations**

Outline minimaliste, stroke 1.5 px, palette restreinte aux trois piliers. Jamais de personnages photoréalistes. Privilégier formes géométriques, anneaux, courbes de données.

---

## 07. Tokens et variables

> Variables CSS, tokens Tamagui. Prêts à coller.

### Variables CSS

```css
:root {
  /* Backgrounds */
  --bg-primary: #000000;
  --bg-surface: #0E0E10;
  --bg-elevated: #151518;
  --bg-border: #27272A;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #B7B7BD;
  --text-tertiary: #6E6E76;

  /* Brand */
  --primary: #4A53FF;
  --primary-hover: #6B73FF;
  --primary-pressed: #2E37D9;
  --accent: #41FF31;
  --accent-hover: #5DFF52;
  --accent-pressed: #2BCF1E;

  /* Semantic */
  --success: #41FF31;
  --warning: #FFB020;
  --error: #FF3B5C;
  --info: #00C8E6;

  /* Categories */
  --cat-health: #FF3B5C;
  --cat-productivity: #FFB020;
  --cat-meeting: #00C8E6;
  --cat-rag: #9D5CFF;

  /* Typography */
  --font-sans: "Inter", -apple-system, "Roboto", "Arial", sans-serif;
  --font-mono: "JetBrains Mono", "Courier New", monospace;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;
}
```

### Tokens Tamagui

```ts
import { createTokens } from "tamagui";

export const tokens = createTokens({
  color: {
    bgPrimary: "#000000",
    bgSurface: "#0E0E10",
    bgElevated: "#151518",
    textPrimary: "#FFFFFF",
    textSecondary: "#B7B7BD",
    textTertiary: "#6E6E76",
    primary: "#4A53FF",
    accent: "#41FF31",
    catHealth: "#FF3B5C",
    catProductivity: "#FFB020",
    catMeeting: "#00C8E6",
    catRag: "#9D5CFF",
  },
  space:  { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 },
  size:   { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64 },
  radius: { sm: 4, md: 8, lg: 16, xl: 24, pill: 9999 },
  zIndex: { 0: 0, 1: 100, 2: 200, 3: 300 },
});
```

---

**Fin du document.**
