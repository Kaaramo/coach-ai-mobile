# Coach AI

Assistant personnel qui observe ton environnement de travail via un boîtier IoT (caméra, micro, capteurs), détecte les moments où agir (hydratation, posture, fin de réunion), et répond à tes questions sur ta journée grâce à un LLM.

Projet académique encadré par **Prof. Dr. Otman Aghzout**.

## Démo

🔗 **[coach-ai-mobile-pi.vercel.app](https://coach-ai-mobile-pi.vercel.app)**

## Stack

- **Application mobile** : Expo SDK 54 (React Native + react-native-web), Expo Router, TypeScript
- **Auth** : Google OAuth 2.0 via `expo-auth-session`
- **LLM** : Groq (`llama-3.3-70b-versatile`)
- **3D** : `@splinetool/react-spline`
- **Persistance** : `@react-native-async-storage/async-storage`
- **Backend IoT** : Python, Kafka, Docker Compose
- **Déploiement web** : Vercel

## Structure du dépôt

```
.
├── mobile/                      # Application Expo (web + mobile)
│   ├── app/                     # Écrans (Expo Router)
│   ├── components/              # Composants UI
│   ├── constants/               # Thème + données mock
│   ├── lib/                     # Logique métier (auth, chat, storage)
│   ├── assets/                  # Images, fonts, icônes
│   ├── package.json
│   ├── app.json                 # Config Expo
│   └── vercel.json              # Config déploiement Vercel
│
├── Producers/                   # Producers Kafka (ingestion IoT)
├── Consumer/                    # Consumer Kafka (traitement)
├── Decision_engine/             # Génération d'alertes via VLM
├── notebooks/                   # Prototypage des modèles
├── Branding/                    # Logos, fonts, charte graphique
├── _design_pack/                # Maquettes HTML/CSS de référence
│
├── docker-compose.yml           # Orchestration backend
├── requirements.txt             # Dépendances Python
├── PRD-COACH-AI-Mobile-v1.0.md  # Document produit
└── README.md
```

## Cloner et lancer

### Prérequis

- Node.js 20+ et npm
- Python 3.10+ et Docker (pour le backend)
- Un Client ID Google OAuth (type Web application)
- Une clé API Groq (gratuite sur [console.groq.com](https://console.groq.com))

### 1. Cloner le dépôt

```bash
git clone https://github.com/Kaaramo/coach-ai-mobile.git
cd coach-ai-mobile
```

### 2. Application mobile

```bash
cd mobile
npm install

# Variables d'environnement (jamais commitées)
cp .env.example .env.local
# Editer .env.local et y mettre tes vraies valeurs
```

Lancer en local :

```bash
npm run web        # Navigateur sur http://localhost:8081
npm run start      # Pour tester sur Expo Go (téléphone)
```

### 3. Backend IoT (optionnel pour la démo mobile)

```bash
docker-compose up
```

## Variables d'environnement

À placer dans `mobile/.env.local` (gitignored) et dans **Vercel → Settings → Environment Variables** pour la prod.

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_GOOGLE_CLIENT_ID` | Client ID OAuth 2.0 Google (type Web) |
| `EXPO_PUBLIC_GROQ_API_KEY` | Clé API Groq (commence par `gsk_`) |

## Équipe

| Pôle | Personne |
|---|---|
| Encadrement | **Prof. Dr. Otman Aghzout** |
| Application mobile | **Karamo Sylla** |
| Pipeline backend / IoT | **Yasser Nadi** |

## Licence

Voir [`LICENSE`](./LICENSE).
