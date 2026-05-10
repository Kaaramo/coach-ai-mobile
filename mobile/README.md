# Coach AI · Mobile (Expo)

App iOS/Android pour Coach AI. Implémentation des 6 écrans d'onboarding (bloc 1)
à partir du design pack Claude Design.

## Stack

- Expo SDK 54 + Expo Router 6 (file-based routing)
- React Native 0.81, React 19
- TypeScript strict
- Bricolage Grotesque (Google Fonts) + JetBrains Mono pour les identifiants techniques
- Lucide pour les icônes (cohérent avec le design pack web)
- React Native Reanimated pour les animations (stepper, halo, switch, dot pulse)
- React Native SVG pour le logo Coach AI (gradient radial 8 rayons)

## Tokens

Tous les tokens couleurs / espacement / radius / typographie sont dans
`constants/theme.ts` (source : `_design_pack/coach-ai-app-ios/project/design-system/colors_and_type.css`).

## Écrans

| Route             | Écran                          | Comportement                                                |
|-------------------|--------------------------------|-------------------------------------------------------------|
| `/`               | Splash                         | Auto-advance vers `/welcome` après 1800 ms                  |
| `/welcome`        | Bienvenue                      | Carousel 3 features + dots, CTA primary `Commencer`         |
| `/login`          | Login Google                   | Bouton Google blanc, état loading 1400 ms vers `/permissions` |
| `/permissions`    | Push notifications             | Stepper 1/3, halo bleu + bell oscillate, double tap "Plus tard" |
| `/preferences`    | Catégories d'alertes           | Stepper 2/3, 3 toggles (Santé/Productivité/Réunion)         |
| `/device`         | Boîtier IoT                    | Stepper 3/3, halo vert + cpu pulse, pill `EN LIGNE` clignote |
| `/home`           | Post-onboarding                | Stub "Bloc 2 - App principale"                              |

## Lancer en local

```bash
cd mobile
npm install
npm run web        # demo navigateur la plus rapide
npm run ios        # necessite macOS
npm run android    # necessite Android Studio / device
```

Pour tester sur ton iPhone : installe **Expo Go**, lance `npm start`, scanne le QR.

## Vérifications

```bash
npx tsc --noEmit       # type-check
npm run lint           # ESLint (0 errors / 0 warnings)
npx expo-doctor        # 17/17 checks
```

## Source du design

Le design pack original est extrait dans `../_design_pack/coach-ai-app-ios/`. Les
écrans React Native ici sont une recréation pixel-aware des prototypes web :
on ne copie pas la structure interne, on reproduit le rendu visuel et les
interactions.
