# PRD COMPLET — COACH AI MOBILE

> **Version** : 1.0 — MVP
> **Statut** : Validé pour développement
> **Date** : 29 Avril 2026
> **Projet parent** : Assistant Personnel Contextuel Multimodal (IoT & Edge AI)
> **Pôle responsable** : Application Mobile — Karamo Sylla
> **Encadrant** : Prof. Dr. Otman AGHZOUT
> **Auteur du PRD** : IA5D Consulting — Karamo Sylla

---

## CHANGELOG v1.0

| Décision | Détail |
|----------|--------|
| **Périmètre mobile uniquement** | Le PRD couvre uniquement l'app mobile, pas le système global (boîtier IoT, Decision Engine, Context Builder déjà couverts par les autres pôles) |
| **Stack React Native + Expo** | Validation IA5D, cross-platform iOS + Android dès la V1 |
| **Backend consommé déjà existant** | FastAPI + MongoDB + Groq/Ollama livrés par Jadli & Zakaria — l'app mobile est un client |
| **Canal temps réel** | WebSocket direct vers FastAPI (foreground) + Expo Push Notifications (background) |
| **Auth Google OAuth 2.0** | Aligné avec l'authentification déjà branchée côté backend |
| **Pairing IoT exclu V1** | Le boîtier Raspberry Pi est associé à l'utilisateur côté backend (paramètre `user_id`), pas via l'app |
| **Vue temps réel boîtier exclue V1** | Reportée en V2 — on consomme uniquement les notifications produites par le Decision Engine |
| **Charte graphique nouvelle** | Direction visuelle dédiée mobile, distincte du prototype web "COACH AI" |

---

## TABLE DES MATIÈRES

1. [Contexte du projet](#1-contexte-du-projet)
2. [Vision produit](#2-vision-produit)
3. [Personas utilisateurs](#3-personas-utilisateurs)
4. [Parcours utilisateur](#4-parcours-utilisateur)
5. [Architecture du système — l'app mobile dans l'écosystème](#5-architecture-du-système)
6. [Spécifications fonctionnelles MVP](#6-spécifications-fonctionnelles-mvp)
7. [Architecture des données — côté mobile](#7-architecture-des-données)
8. [Contrats d'API consommés (FastAPI backend équipe)](#8-contrats-dapi-consommés)
9. [Protocole temps réel — WebSocket](#9-protocole-temps-réel)
10. [Charte graphique COACH AI Mobile](#10-charte-graphique)
11. [Spécifications UI/UX — écrans détaillés](#11-spécifications-uiux)
12. [Authentification & Sécurité](#12-authentification--sécurité)
13. [Notifications push](#13-notifications-push)
14. [Règles métier](#14-règles-métier)
15. [Stack technique justifiée](#15-stack-technique)
16. [Estimation des coûts](#16-estimation-des-coûts)
17. [Phasage de l'implémentation](#17-phasage-de-limplémentation)
18. [Indicateurs de succès](#18-indicateurs-de-succès)
19. [Roadmap V2+](#19-roadmap-v2)
20. [Checklist pré-implémentation](#20-checklist-pré-implémentation)

---

## 1. CONTEXTE DU PROJET

### 1.1 Résumé exécutif

**COACH AI Mobile** est l'interface mobile (iOS + Android) de l'**Assistant Personnel Contextuel Multimodal**, un système Edge AI qui observe l'environnement de l'utilisateur via un boîtier IoT (Raspberry Pi 5 + caméra + micro + GPS), comprend son contexte, agit en temps réel et apprend de ses habitudes.

Le système global se découpe en deux axes complémentaires :

| Axe | Fonction | Composant équipe |
|-----|----------|------------------|
| **Temps Réel** | Détecter les situations importantes et notifier instantanément (oublis, sédentarité prolongée, dépassement de tâche, urgences) | Decision Engine (Adnane / Konate) |
| **Analytique** | Analyser l'historique multimodal pour répondre intelligemment aux questions de l'utilisateur via RAG + Chatbot | Backend + RAG (Jadli / Zakaria) |

L'application mobile est le **point de contact unique** entre l'utilisateur et l'écosystème : elle reçoit les alertes en push, expose un chatbot conversationnel branché sur le système RAG, et restitue les habitudes sous forme de dashboards exploitables.

### 1.2 Problème à résoudre

Les assistants vocaux classiques (Siri, Google Assistant, Alexa) sont **purement réactifs** : ils répondent à des commandes mais ne comprennent jamais le contexte de l'utilisateur. Conséquences :

- L'utilisateur doit se rappeler de demander — **pas de proactivité**
- Aucune mémoire à long terme structurée des habitudes
- Aucune notification contextuelle déclenchée par la situation réelle
- Pas de couplage entre perception multimodale (vision/audio/localisation) et action

Notre boîtier IoT et son pipeline Edge AI résolvent ces limites côté serveur. **Reste à exposer cette intelligence à l'utilisateur final dans une interface qu'il consulte au quotidien — c'est le rôle de l'app mobile.**

### 1.3 Solution proposée par l'app mobile

Une application iOS + Android qui :

- **Authentifie** l'utilisateur via Google OAuth 2.0 et lie son profil au backend
- **Reçoit les alertes** du Decision Engine en temps réel (push + in-app)
- **Permet d'interagir avec le chatbot RAG** pour poser des questions sur les habitudes ("Combien de fois j'ai sauté le déjeuner cette semaine ?", "Sur quoi j'ai passé le plus de temps lundi ?")
- **Visualise les habitudes** via un dashboard graphique alimenté par MongoDB
- **Historise les alertes** avec filtres et recherche
- **Centralise les paramètres** (préférences de notifications, profil, déconnexion)

### 1.4 Contexte académique et organisationnel

Projet réalisé dans le cadre d'un module encadré par le **Prof. Dr. Otman AGHZOUT**. L'équipe est répartie en pôles techniques :

| Pôle | Responsable(s) | Périmètre |
|------|----------------|-----------|
| Conception & Rédaction | Mohamed Channa | Architecture fonctionnelle, schémas globaux |
| IoT & Matériel | Yassir Adila | Boîtier Raspberry Pi, caméra, micro, GPS |
| IA & Context Builder | Yasser Nadi, Aymane Azaagag, amine | VLM, ASR, géocodage, agrégation Kafka + Spark |
| Decision Engine | Adnane Qassiri, Bachirou Konate | Rule Engine, LLM Interpreter, State Manager |
| Backend & LLM | said Jadli, Zakaria Tahiri | FastAPI, MongoDB, RAG, Groq, LangChain, Ollama |
| **Application Mobile** | **Karamo Sylla** | **C'est l'objet de ce PRD** |
| Gestion projet | Aymane Hayoun | PV, présentations |

L'app mobile est **dépendante** des livrables des pôles Backend (API FastAPI), Decision Engine (notifications) et IA (qualité du RAG). L'intégration end-to-end se fait via les contrats d'API définis en [section 8](#8-contrats-dapi-consommés) et le protocole WebSocket en [section 9](#9-protocole-temps-réel).

### 1.5 Positionnement

> **"L'écran de contrôle d'un coach IA qui vit avec vous — votre journée, vos habitudes, vos alertes, dans votre poche."**

L'app n'est ni un simple chatbot (comme ChatGPT mobile) ni un dashboard de tracking passif (comme Google Fit). Elle combine **proactivité contextuelle** (alertes générées par un système qui voit ce que vous faites) et **rétrospection intelligente** (un chatbot qui connaît votre semaine).

---

## 2. VISION PRODUIT

### 2.1 Proposition de valeur

**Titre court :** Votre coach personnel, qui vous voit vraiment.

**Paragraphe explicatif :**
COACH AI Mobile est l'interface qui transforme un flux de données multimodales (vision, audio, GPS, calendrier) en alertes utiles et en réponses contextualisées. Le boîtier observe, le système comprend, l'app vous parle. Quand vous oubliez de boire, l'app vous rappelle. Quand vous dépassez d'une heure sur une tâche, l'app vous alerte. Quand vous voulez savoir comment s'est passée votre semaine, l'app vous répond avec des données réelles, pas des suppositions.

**Formule de Steve Blank :**

> Nous aidons les utilisateurs équipés du boîtier IoT à reprendre le contrôle de leurs habitudes en exposant les alertes du Decision Engine et l'historique multimodal via une app mobile qui combine notifications temps réel et chatbot RAG conversationnel.

### 2.2 Bénéfices clés

| Bénéfice | Description |
|----------|-------------|
| **Zéro friction** | Les alertes arrivent en push — pas besoin d'ouvrir l'app pour être averti |
| **Mémoire augmentée** | Le chatbot répond à des questions précises ("Combien d'heures de réunion lundi ?") avec les données réelles |
| **Visualisation actionnable** | Les habitudes sont graphiques et filtrables, pas du texte mou |
| **Confidentialité** | OAuth 2.0 + tokens en SecureStore + données chiffrées en transit (HTTPS / WSS) |
| **Cross-platform** | iOS + Android dès la V1 grâce à React Native + Expo |

### 2.3 Scope MVP (V1) — ce que l'app fait et ne fait pas

| ✅ Inclus V1 | ❌ Exclus V1 (V2+) |
|-------------|-------------------|
| Auth Google OAuth 2.0 | Pairing du boîtier IoT depuis l'app |
| Notifications push (background) + in-app (foreground) | Vue temps réel du contexte courant (caméra/audio live) |
| Chatbot RAG en streaming | Personnalisation des règles du Decision Engine |
| Dashboard habitudes (vue jour / semaine) | Multi-utilisateurs / partage familial |
| Historique des alertes avec filtres | Mode hors-ligne complet |
| Profil + préférences de notifications | Widgets iOS / Android home screen |
| Mode sombre par défaut | Watch app (Apple Watch / Wear OS) |
| Export CSV de l'historique | Voice input / TTS pour le chatbot |

---

## 3. PERSONAS UTILISATEURS

### 3.1 Persona principal — Sami, l'étudiant en filière ingénieur

| Attribut | Valeur |
|----------|--------|
| **Nom** | Sami |
| **Age** | 22 ans |
| **Activité** | Étudiant ingénieur, alterne cours, projets, sport, vie sociale |
| **Équipement** | Smartphone Android milieu de gamme + boîtier Raspberry Pi déposé sur son bureau |

**Citation :**
> "Je passe 8 heures sur l'écran sans m'en rendre compte, je saute le déj, je bois deux verres d'eau dans la journée. Je veux qu'un truc me dise stop, et qu'à la fin de la semaine je puisse savoir où mon temps est parti."

**Jobs to Be Done :**
1. Recevoir une notification quand il oublie de s'hydrater ou bouger
2. Savoir combien de temps il a passé sur chaque type de tâche dans sa journée
3. Avoir une trace consultable de ses habitudes pour identifier ce qui ne va pas
4. Pouvoir poser des questions naturelles sans naviguer dans 15 menus

**Pains :**
1. Les apps de tracking classiques demandent de la saisie manuelle qu'il oublie
2. Les notifications génériques (Apple Health) ne tiennent pas compte de ce qu'il fait vraiment
3. Pas de mémoire structurée — il oublie ce qu'il a fait la veille

**Gains recherchés :**
1. Un coach passif qui prend la donnée tout seul
2. Des réponses concrètes, pas des moyennes nationales
3. Une vue claire de la semaine

### 3.2 Persona secondaire — Le professionnel en télétravail

| Attribut | Valeur |
|----------|--------|
| **Profil** | Cadre, 35-50 ans, télétravail majoritaire |
| **Besoin** | Optimiser ses journées, ne pas dépasser sur les tâches, suivre ses temps de réunion |
| **Cycle d'usage** | Allume le boîtier en début de journée, consulte l'app 2-3 fois (matin, midi, fin de journée) |

**Besoin principal :** Suivre le temps réellement passé sur chaque type d'activité, recevoir des rappels "tu es en réunion depuis 2h non-stop" et générer un résumé hebdomadaire automatique.

### 3.3 Anti-persona — qui n'est pas la cible V1

- L'utilisateur sans boîtier IoT (l'app a besoin du flux de données pour être utile)
- L'utilisateur 60+ qui ne maîtrise pas le smartphone (UX mobile-natif)
- L'usage entreprise / multi-utilisateurs (pas de gestion d'équipe en V1)

---

## 4. PARCOURS UTILISATEUR

### 4.1 Vue d'ensemble

```
PREMIÈRE OUVERTURE
       │
       ▼
ÉCRAN DE BIENVENUE (1 écran d'introduction)
       │
       ▼
LOGIN GOOGLE OAUTH 2.0 (redirection système)
       │
       ▼
ONBOARDING (3 écrans)
       │
       ├── Permission notifications push
       ├── Préférences alertes (santé, productivité, réunion)
       └── Validation du boîtier associé (info read-only)
       │
       ▼
ÉCRAN PRINCIPAL — DASHBOARD
       │
       ├── ▲ Notifications récentes (carte top)
       ├── ▲ Insight du jour (résumé RAG)
       ├── ▲ Graphique d'activité (jour/semaine)
       └── ▲ Bouton "Discuter avec mon coach" → Chatbot
       │
       ▼
NOTIFICATIONS PUSH (en parallèle, déclenchées par le Decision Engine)
       │
       ▼
USAGE QUOTIDIEN
       │
       ├── Tab Dashboard
       ├── Tab Alertes (historique)
       ├── Tab Chat (RAG)
       └── Tab Profil
```

### 4.2 Premier lancement — onboarding

| Étape | Écran | Durée | Objectif |
|-------|-------|-------|----------|
| 1 | Splash + bienvenue | 2 s | Marque + valeur en une phrase |
| 2 | Login Google | 30 s | Auth OAuth 2.0 — redirection système |
| 3 | Permission notifications | 10 s | Demander l'autorisation push iOS / Android |
| 4 | Préférences alertes | 30 s | 3 toggles : Santé, Productivité, Réunions |
| 5 | Confirmation boîtier | 5 s | Affiche le `device_id` lié côté backend, read-only |
| 6 | Dashboard | — | Atterrissage final |

**Moment "aha" :** Premier push de "Tu n'as pas bougé depuis 1h30, lève-toi 5 min" reçu sur le téléphone — l'utilisateur comprend que le système agit vraiment en fonction de ce qu'il fait.

### 4.3 Parcours quotidien type

**Matin (07h30) :**
1. L'utilisateur consulte le dashboard → voit son insight de la veille ("Tu as passé 6h en code lundi, 1h en réunion")
2. Lit les alertes ratées pendant la nuit (alarme oubli)

**Journée (10h-18h) :**
1. Reçoit 2-4 notifications push contextuelles (hydratation, dépassement de tâche)
2. Optionnel : ouvre le chatbot pour poser une question ponctuelle ("J'ai mangé à quelle heure hier ?")

**Soir (21h00) :**
1. Consulte le dashboard pour avoir le récap de la journée
2. Génère via le chatbot un mini-résumé textuel ("Résume-moi ma journée")

### 4.4 Parcours notification push

```
[Decision Engine] → Génère une décision → Push WebSocket → FastAPI
       │
       ▼
[FastAPI] → Trigger Expo Push Notifications API
       │
       ▼
[Expo Push Service] → APNS (iOS) / FCM (Android)
       │
       ▼
[Mobile OS] → Affiche la notification (background)
       │
       ├── L'utilisateur tape la notif
       │       │
       │       ▼
       │  L'app s'ouvre sur l'écran "Détail alerte" (deep link)
       │
       └── L'utilisateur ignore
               │
               ▼
          L'alerte reste dans l'historique (badge tab Alertes)
```

---

## 5. ARCHITECTURE DU SYSTÈME

### 5.1 Vue macroscopique — l'app mobile dans l'écosystème

```
┌────────────────────────────────────────────────────────────────────┐
│                      BOÎTIER IoT (Raspberry Pi 5)                  │
│   Caméra │ Micro │ GPS                                             │
└──────────────────────────┬─────────────────────────────────────────┘
                           │ Streams Kafka (context.events)
                           ▼
┌────────────────────────────────────────────────────────────────────┐
│             PIPELINE IA — Context Builder + Decision Engine        │
│   VLM + ASR + Géocodage → Spark Streaming → LLM Interpreter        │
│                          → Rule Engine → State Manager             │
└──────────────────────────┬─────────────────────────────────────────┘
                           │ Décisions structurées
                           ▼
┌────────────────────────────────────────────────────────────────────┐
│                   BACKEND FastAPI (Jadli, Zakaria)                 │
│   ─ MongoDB (users, contexts, decisions, notifications,            │
│              conversations, alerts)                                │
│   ─ RAG (Vector DB + Groq / Ollama Gemma)                          │
│   ─ WebSocket /ws/notifications                                    │
│   ─ REST /api/v1/...                                               │
│   ─ Push Trigger → Expo Push Service                               │
└──────────────────────────┬─────────────────────────────────────────┘
                           │ HTTPS REST + WSS WebSocket + APNS/FCM
                           ▼
┌────────────────────────────────────────────────────────────────────┐
│              📱 APP MOBILE COACH AI (React Native + Expo)          │
│   ─ Auth Google OAuth 2.0 (Expo AuthSession)                       │
│   ─ Expo Push Notifications (background)                           │
│   ─ WebSocket client (foreground)                                  │
│   ─ TanStack Query (cache REST)                                    │
│   ─ Zustand (state UI)                                             │
│   ─ MMKV (storage local)                                           │
│   ─ Tamagui + NativeWind (UI)                                      │
└────────────────────────────────────────────────────────────────────┘
```

### 5.2 Vue détaillée — flux de données mobile

**Cas A — Lancement de l'app :**

```
1. Splash → Vérification token MMKV
2. Si token valide → /api/v1/auth/me → User profile
3. Préchargement parallèle :
      ├── /api/v1/notifications?limit=20  (alertes récentes)
      ├── /api/v1/insights/today          (résumé du jour)
      └── /api/v1/habits?range=week       (data dashboard)
4. Connexion WebSocket /ws/notifications?token={jwt}
5. Render Dashboard
```

**Cas B — Réception d'une alerte (foreground) :**

```
1. WebSocket reçoit event {type: "notification", payload: {...}}
2. Zustand store ajoute la notif en tête de liste
3. Toast visuel s'affiche (TanStack notify pattern)
4. Badge tab Alertes s'incrémente
5. TanStack Query invalide /api/v1/notifications (refetch silent)
```

**Cas C — Réception d'une alerte (background) :**

```
1. Backend FastAPI génère la décision
2. FastAPI POST → Expo Push API (avec ExponentPushToken du device)
3. APNS / FCM délivre la notif
4. OS affiche la notification système
5. Tap → deep link expo://alert/{id} → ouvre l'écran Détail Alerte
```

**Cas D — Question chatbot :**

```
1. User tape "Sur quoi j'ai passé le plus de temps mardi ?"
2. App POST /api/v1/chat/stream avec {message, conversation_id}
3. FastAPI détecte intention → sélectionne contexte multimodal pertinent
4. RAG Vector DB → récupère les frames de mardi
5. LLM Groq génère réponse en streaming SSE
6. App affiche les tokens au fur et à mesure (Tamagui Typing animation)
7. Réponse complète stockée en MongoDB conversations + cache MMKV
```

### 5.3 Stack architecture mobile (zoom)

```
┌──────────────────────────────────────────────────────┐
│                 React Native + Expo                  │
├──────────────────────────────────────────────────────┤
│  app/ (Expo Router file-based routing)               │
│  ├── (auth)/login.tsx                                │
│  ├── (onboarding)/                                   │
│  ├── (tabs)/                                         │
│  │    ├── index.tsx       (Dashboard)                │
│  │    ├── alerts.tsx      (Historique)               │
│  │    ├── chat.tsx        (Chatbot RAG)              │
│  │    └── profile.tsx     (Profil)                   │
│  ├── alert/[id].tsx       (Détail alerte deep link)  │
│  └── _layout.tsx                                     │
├──────────────────────────────────────────────────────┤
│  lib/                                                │
│  ├── api.ts          (axios + intercepteurs JWT)     │
│  ├── ws.ts           (WebSocket manager)             │
│  ├── auth.ts         (Google OAuth + SecureStore)    │
│  ├── notifications.ts (Expo Push registration)       │
│  └── store/                                          │
│       ├── useAuth.ts        (Zustand)                │
│       ├── useNotifications.ts                        │
│       └── useChat.ts                                 │
├──────────────────────────────────────────────────────┤
│  components/                                         │
│  ├── ui/             (Tamagui design system)         │
│  ├── chat/                                           │
│  ├── alerts/                                         │
│  └── dashboard/                                      │
└──────────────────────────────────────────────────────┘
```

---

## 6. SPÉCIFICATIONS FONCTIONNELLES MVP

### 6.1 F1 — Authentification Google OAuth 2.0

**Objectif :** L'utilisateur s'authentifie via son compte Google et obtient un JWT du backend pour toutes les requêtes API.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F1.1 | Bouton "Se connecter avec Google" sur l'écran de login |
| F1.2 | Redirection vers le navigateur système via Expo AuthSession |
| F1.3 | Récupération du `id_token` Google et POST → `/api/v1/auth/google` |
| F1.4 | Backend retourne un JWT applicatif + profil user |
| F1.5 | JWT stocké en `Expo SecureStore` (Keychain iOS / Keystore Android) |
| F1.6 | Logout efface le JWT et redirige vers login |
| F1.7 | Refresh token automatique en cas d'expiration (intercepteur axios) |

### 6.2 F2 — Notifications push temps réel

**Objectif :** L'utilisateur reçoit en temps réel les alertes générées par le Decision Engine, que l'app soit ouverte ou non.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F2.1 | À l'onboarding, l'app demande la permission push iOS + Android |
| F2.2 | Le `ExponentPushToken` est envoyé au backend via `/api/v1/devices/register` |
| F2.3 | Foreground : WebSocket délivre les notifs en moins de 500ms |
| F2.4 | Background : push système via Expo Push reçue en moins de 5 secondes |
| F2.5 | Tap sur une notif → deep link vers l'écran Détail Alerte |
| F2.6 | Badge sur l'icône d'app + badge tab Alertes synchronisés |
| F2.7 | L'utilisateur peut désactiver/réactiver chaque catégorie (Santé, Productivité, Réunions) dans Profil |

### 6.3 F3 — Chatbot RAG conversationnel

**Objectif :** L'utilisateur pose des questions en langage naturel et reçoit des réponses contextualisées par le système RAG.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F3.1 | Interface chat avec bulles utilisateur / assistant |
| F3.2 | Streaming token-par-token via SSE pour la réponse |
| F3.3 | Indicateur de typing animé pendant la génération |
| F3.4 | Liste des conversations passées dans un drawer latéral |
| F3.5 | Bouton "Nouvelle conversation" |
| F3.6 | Suggestions de questions au démarrage (chips cliquables) |
| F3.7 | Fonction copier la réponse (long press) |
| F3.8 | Toute conversation est synchronisée avec MongoDB côté backend |

**Suggestions de questions de démarrage (V1) :**
- "Résume-moi ma journée d'hier"
- "Combien de temps en réunion cette semaine ?"
- "Quelles habitudes je dois améliorer ?"
- "Sur quoi j'ai passé le plus de temps lundi ?"

### 6.4 F4 — Dashboard habitudes

**Objectif :** L'utilisateur visualise ses habitudes via des graphiques exploitables.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F4.1 | Toggle de période (Jour / Semaine / Mois) |
| F4.2 | Graphique de répartition du temps par catégorie d'activité (donut ou stacked bar) |
| F4.3 | Carte "Insight du jour" générée par le RAG (résumé textuel court) |
| F4.4 | Compteur de notifications actionnées vs ignorées |
| F4.5 | Carte "Cas d'usage actifs" (Hydratation, Posture, Réunions, Tâches) |
| F4.6 | Pull-to-refresh manuel |
| F4.7 | Skeleton loaders pendant le chargement |

### 6.5 F5 — Historique des alertes

**Objectif :** L'utilisateur consulte son historique d'alertes avec filtres et recherche.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F5.1 | Liste paginée infinie (20 alertes par page) |
| F5.2 | Groupement par jour (sticky headers : Aujourd'hui / Hier / Date) |
| F5.3 | Filtres rapides : Toutes / Santé / Productivité / Réunions |
| F5.4 | Recherche full-text dans le titre et la description |
| F5.5 | Tap sur une alerte → écran détail (texte complet + horodatage + contexte) |
| F5.6 | Action "Marquer comme lu" / "Marquer comme actionné" |
| F5.7 | Action "Supprimer" (soft delete) |
| F5.8 | Indicateur visuel des alertes non lues |

### 6.6 F6 — Profil + paramètres

**Objectif :** L'utilisateur gère son profil et ses préférences.

**Critères d'acceptation :**

| ID | Critère |
|----|---------|
| F6.1 | Affichage avatar + nom + email Google |
| F6.2 | Affichage `device_id` du boîtier associé (read-only V1) |
| F6.3 | Toggle par catégorie d'alerte (Santé, Productivité, Réunions) |
| F6.4 | Toggle "Mode silencieux" (plage horaire 22h-7h par défaut) |
| F6.5 | Toggle dark mode (système / clair / sombre) — par défaut sombre |
| F6.6 | Lien "Confidentialité" (page web Politique RGPD) |
| F6.7 | Bouton "Exporter mes données" (CSV de l'historique) |
| F6.8 | Bouton "Déconnexion" (clear SecureStore + logout backend) |
| F6.9 | Bouton "Supprimer mon compte" (cascade backend) |

### 6.7 Synthèse — priorisation MoSCoW

| Feature | Priorité | Sprint visé |
|---------|----------|-------------|
| F1 Auth Google OAuth | **Critique** | S1 |
| F2 Notifications push | **Critique** | S2 |
| F3 Chatbot RAG | **Critique** | S2 |
| F4 Dashboard habitudes | **Haute** | S3 |
| F5 Historique alertes | **Haute** | S3 |
| F6 Profil + paramètres | **Haute** | S3 |

---

## 7. ARCHITECTURE DES DONNÉES

### 7.1 Modèle côté mobile

L'app ne stocke pas de données métier persistantes — c'est un client. Elle gère :

| Stockage | Usage | Outil | Persistance |
|----------|-------|-------|-------------|
| **JWT + refresh token** | Auth | Expo SecureStore | Survit aux redémarrages |
| **Cache API REST** | Performances | TanStack Query Cache (mémoire) + MMKV (persistance) | Survit aux redémarrages |
| **State UI (notifications, chat draft, filtres)** | Réactivité | Zustand | Mémoire |
| **Préférences utilisateur** | Toggles UI | MMKV | Survit aux redémarrages |
| **Conversations chat** | Streaming + offline read | MMKV (synchro avec backend MongoDB) | Survit aux redémarrages |

### 7.2 Schéma TypeScript des entités principales

```typescript
// lib/types/api.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  deviceId: string | null;        // ID du boîtier IoT associé
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  notifications: {
    health: boolean;
    productivity: boolean;
    meetings: boolean;
  };
  silentHours: { start: string; end: string } | null;  // "22:00" / "07:00"
  theme: "system" | "light" | "dark";
  language: "fr" | "en";
}

export interface Notification {
  id: string;
  userId: string;
  category: "health" | "productivity" | "meeting" | "reminder";
  severity: "info" | "warning" | "critical";
  title: string;
  body: string;
  contextSnapshot: ContextSnapshot;
  createdAt: string;
  readAt: string | null;
  actionedAt: string | null;
}

export interface ContextSnapshot {
  timestamp: string;
  detectedActivity: string;
  confidence: number;
  location: { lat: number; lng: number; label: string } | null;
  audioKeywords: string[];
  visualObjects: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  isStreaming: boolean;
  createdAt: string;
  sources?: ContextSnapshot[];   // Sources RAG utilisées
}

export interface Conversation {
  id: string;
  title: string;
  lastMessageAt: string;
  messageCount: number;
}

export interface HabitInsight {
  range: "day" | "week" | "month";
  startDate: string;
  endDate: string;
  totalActiveTime: number;        // en minutes
  categories: {
    name: string;
    duration: number;
    percentage: number;
    color: string;
  }[];
  topInsight: string;             // texte généré par le RAG
  notificationsTriggered: number;
  notificationsActioned: number;
}
```

### 7.3 Mapping avec MongoDB côté backend

| Collection MongoDB (équipe) | Type côté mobile | Endpoint REST |
|----------------------------|------------------|---------------|
| `users` | `User` | `GET /api/v1/auth/me` |
| `contexts` (VLM, STT, GPS) | `ContextSnapshot` (en lecture seule via notifications + RAG) | Lu par RAG, pas exposé directement |
| `decisions` | Source des notifications | Transformé côté backend |
| `notifications` | `Notification` | `GET /api/v1/notifications` |
| `conversations` | `Conversation` + `ChatMessage[]` | `GET /api/v1/conversations` |

> **Règle :** L'app mobile ne consomme JAMAIS directement les `contexts` bruts (trop volumineux, RGPD). Elle ne lit que les agrégats (notifications, insights, RAG output).

---

## 8. CONTRATS D'API CONSOMMÉS

### 8.1 Convention générale

| Aspect | Valeur |
|--------|--------|
| **Base URL** | `https://api.coach-ai.com/api/v1` (prod) / `http://localhost:8000/api/v1` (dev) |
| **Auth** | Header `Authorization: Bearer <jwt>` |
| **Format** | JSON exclusivement |
| **Pagination** | `?page=1&limit=20` (cursor-based en V2) |
| **Erreurs** | Standard HTTP + body `{error: {code, message, details?}}` |
| **Versioning** | URL `/api/v1/` |

### 8.2 Endpoints d'authentification

| Méthode | Endpoint | Body | Réponse |
|---------|----------|------|---------|
| `POST` | `/auth/google` | `{ idToken: string }` | `{ jwt: string, refreshToken: string, user: User }` |
| `POST` | `/auth/refresh` | `{ refreshToken: string }` | `{ jwt: string, refreshToken: string }` |
| `POST` | `/auth/logout` | (vide) | `204 No Content` |
| `GET` | `/auth/me` | — | `User` |
| `DELETE` | `/auth/account` | — | `204 No Content` (cascade backend) |

### 8.3 Endpoints notifications

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/notifications?page=1&limit=20&category=health` | Liste paginée |
| `GET` | `/notifications/:id` | Détail (avec contextSnapshot complet) |
| `PATCH` | `/notifications/:id` | Body `{readAt?, actionedAt?}` |
| `DELETE` | `/notifications/:id` | Soft delete |
| `POST` | `/notifications/mark-all-read` | Reset badge |

### 8.4 Endpoints devices (push token)

| Méthode | Endpoint | Body |
|---------|----------|------|
| `POST` | `/devices/register` | `{ expoPushToken: string, platform: "ios" | "android", deviceName?: string }` |
| `DELETE` | `/devices/:tokenId` | — (au logout) |

### 8.5 Endpoints chat (RAG)

| Méthode | Endpoint | Body | Réponse |
|---------|----------|------|---------|
| `GET` | `/conversations` | — | `Conversation[]` |
| `POST` | `/conversations` | `{title?: string}` | `Conversation` |
| `GET` | `/conversations/:id/messages` | — | `ChatMessage[]` |
| `POST` | `/chat/stream` | `{conversationId, message}` | Stream SSE de tokens |
| `DELETE` | `/conversations/:id` | — | Soft delete |

**Format SSE retourné par `/chat/stream` :**

```
data: {"type":"token","content":"Sur "}\n\n
data: {"type":"token","content":"votre "}\n\n
data: {"type":"token","content":"journée "}\n\n
data: {"type":"sources","sources":[{...}]}\n\n
data: {"type":"done","messageId":"msg_abc123"}\n\n
```

### 8.6 Endpoints insights & habitudes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/insights/today` | Insight texte du jour (généré par RAG) |
| `GET` | `/habits?range=week&from=2026-04-21` | Agrégats temps par catégorie |
| `GET` | `/habits/export?format=csv` | Export CSV |

### 8.7 Endpoints préférences

| Méthode | Endpoint | Body |
|---------|----------|------|
| `GET` | `/me/preferences` | — |
| `PATCH` | `/me/preferences` | `Partial<UserPreferences>` |

### 8.8 Codes d'erreur attendus

| Code | Cas | Action mobile |
|------|-----|---------------|
| `401` | JWT expiré | Tenter refresh, sinon logout |
| `403` | Action interdite | Toast d'erreur |
| `404` | Ressource introuvable | Vue d'état vide |
| `429` | Rate limit | Retry avec backoff exponentiel |
| `500` | Erreur serveur | Toast + logging Sentry |
| `503` | Backend down | Bannière "Service indisponible" |

---

## 9. PROTOCOLE TEMPS RÉEL

### 9.1 Architecture WebSocket

| Aspect | Valeur |
|--------|--------|
| **URL** | `wss://api.coach-ai.com/ws/notifications?token=<jwt>` |
| **Authentification** | JWT en query param (handshake) |
| **Heartbeat** | Ping/pong toutes les 30s |
| **Reconnexion** | Backoff exponentiel (1s → 2s → 4s → 8s → max 60s) |
| **Quand on se connecte** | Quand l'app passe en foreground et que l'écran principal est monté |
| **Quand on se déconnecte** | Quand l'app passe en background depuis plus de 30s, ou logout |

### 9.2 Format des messages

**Serveur → Client :**

```json
{
  "type": "notification",
  "payload": {
    "id": "notif_abc123",
    "category": "health",
    "severity": "warning",
    "title": "Hydratation rappel",
    "body": "Tu n'as pas bu depuis 2h. Pense à t'hydrater.",
    "contextSnapshot": { ... },
    "createdAt": "2026-04-29T14:32:11Z"
  }
}
```

```json
{
  "type": "habit_update",
  "payload": {
    "range": "day",
    "totalActiveTime": 425,
    "categoriesChanged": ["work", "meeting"]
  }
}
```

**Client → Serveur :**

```json
{ "type": "ping" }
```

```json
{ "type": "ack", "notificationId": "notif_abc123" }
```

### 9.3 Logique mobile détaillée

```typescript
// lib/ws.ts (pseudo-code)

class NotificationWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempt = 0;
  private maxReconnectDelay = 60_000;

  connect(jwt: string) {
    this.ws = new WebSocket(`wss://api.coach-ai.com/ws/notifications?token=${jwt}`);
    this.ws.onopen = () => { this.reconnectAttempt = 0; this.startHeartbeat(); };
    this.ws.onmessage = (e) => this.handleMessage(JSON.parse(e.data));
    this.ws.onclose = () => this.scheduleReconnect();
    this.ws.onerror = (err) => Sentry.captureException(err);
  }

  private handleMessage(msg: WsMessage) {
    if (msg.type === "notification") {
      useNotificationsStore.getState().addNotification(msg.payload);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
    if (msg.type === "habit_update") {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    }
  }

  private scheduleReconnect() {
    const delay = Math.min(2 ** this.reconnectAttempt * 1000, this.maxReconnectDelay);
    setTimeout(() => this.connect(getJwt()), delay);
    this.reconnectAttempt++;
  }
}
```

### 9.4 Stratégie foreground / background

| État de l'app | Canal de réception | Comportement |
|---------------|-------------------|--------------|
| **Foreground actif** | WebSocket | Toast in-app + ajout liste + son court |
| **Foreground inactif (autre tab)** | WebSocket | Badge tab Alertes + ajout liste |
| **Background récent (<30s)** | WebSocket maintenu | Idem foreground inactif |
| **Background prolongé / killed** | Expo Push (APNS / FCM) | Notification système OS |

> **Règle de coût :** Le WebSocket est désactivé en background pour économiser batterie + connectivité backend. Le push système prend le relai.

---

## 10. CHARTE GRAPHIQUE COACH AI MOBILE

> Direction visuelle dédiée mobile, pensée pour le dark mode par défaut, dans l'esprit "intelligence ambiante calme".

### 10.1 Palette de couleurs

**Mode sombre (défaut) :**

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0B0F1A` | Background principal |
| `--bg-surface` | `#141A2A` | Cartes, bottom sheets |
| `--bg-elevated` | `#1C2438` | Modales, headers, modal sheets |
| `--text-primary` | `#F5F7FA` | Texte principal |
| `--text-secondary` | `#A0A8B8` | Texte secondaire, labels |
| `--text-tertiary` | `#6B7280` | Hints, placeholders |
| `--accent-primary` | `#7C5CFF` | Violet principal — boutons, actions, links |
| `--accent-secondary` | `#22D3EE` | Cyan — graphiques, success states |
| `--accent-warning` | `#F59E0B` | Alertes productivité |
| `--accent-danger` | `#F43F5E` | Alertes critiques santé |
| `--accent-success` | `#10B981` | Confirmations |
| `--border-default` | `#252D42` | Séparateurs, bordures cartes |

**Mode clair (option système) :**

| Token | Hex |
|-------|-----|
| `--bg-primary` | `#FFFFFF` |
| `--bg-surface` | `#F8F9FB` |
| `--bg-elevated` | `#FFFFFF` |
| `--text-primary` | `#0B0F1A` |
| `--text-secondary` | `#4B5363` |
| `--accent-primary` | `#5B3FE8` |

### 10.2 Mapping sémantique des couleurs par catégorie d'alerte

| Catégorie | Couleur | Token |
|-----------|---------|-------|
| Santé (hydratation, posture) | Rose | `#F43F5E` |
| Productivité (dépassement de tâche) | Orange | `#F59E0B` |
| Réunions (synthèse, dépassements) | Cyan | `#22D3EE` |
| Rappels génériques | Violet | `#7C5CFF` |

### 10.3 Typographie

| Usage | Police | Taille | Poids |
|-------|--------|--------|-------|
| **Titres principaux** | Inter | 28px | 600 |
| **Titres sections** | Inter | 20px | 600 |
| **Body** | Inter | 16px | 400 |
| **Body small** | Inter | 14px | 400 |
| **Labels / Caps** | Inter | 12px | 500 |
| **Mono (timestamps, codes)** | JetBrains Mono | 13px | 400 |

> Inter est inclus via `expo-font`. JetBrains Mono pour les timestamps et device IDs.

### 10.4 Espacement (système 8pt)

| Token | Valeur |
|-------|--------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |

### 10.5 Composants clés (Tamagui)

| Composant | Style |
|-----------|-------|
| **Bouton primaire** | Background `--accent-primary`, texte blanc, radius 12px, hauteur 52px |
| **Bouton secondaire** | Border `--accent-primary`, texte `--accent-primary`, transparent |
| **Carte alerte** | `--bg-surface`, radius 16px, border-left 4px (couleur catégorie), padding 16px |
| **Bulle chat user** | Background `--accent-primary`, radius 20px (sauf coin bas-droit 4px) |
| **Bulle chat assistant** | Background `--bg-surface`, radius 20px (sauf coin bas-gauche 4px) |
| **Tab bar** | `--bg-elevated`, hauteur 64px, indicateur top 3px `--accent-primary` |
| **Input** | Background `--bg-surface`, border `--border-default`, radius 12px, hauteur 48px |

### 10.6 Logo & icônes

- **Logo COACH AI :** brain monoligne stylisé, dégradé violet → cyan, 64×64
- **Icônes :** Lucide React Native (cohérence cross-projet IA5D)
- **Tailles** : 16 / 20 / 24 / 32 px (jamais entre)

### 10.7 Mode sombre = défaut

Toutes les maquettes sont conçues dark-first. Le mode clair est une adaptation, pas le canon. Justification :
- Cohérence avec l'esprit "ambient computing" (le boîtier observe, l'app éclaire calmement)
- Confort visuel pour usage matin / soir
- Économie batterie sur écrans OLED Android

---

## 11. SPÉCIFICATIONS UI/UX

### 11.1 Inventaire des écrans

| Code | Écran | Statut V1 | Note |
|------|-------|-----------|------|
| S01 | Splash | ✅ | Logo animé 1.5s max |
| S02 | Bienvenue | ✅ | Carrousel 1 écran |
| S03 | Login Google | ✅ | Bouton unique |
| S04 | Onboarding 1 — permissions push | ✅ | |
| S05 | Onboarding 2 — préférences alertes | ✅ | |
| S06 | Onboarding 3 — boîtier associé | ✅ | Read-only V1 |
| S07 | Dashboard | ✅ | Tab principal |
| S08 | Historique alertes | ✅ | Tab |
| S09 | Détail alerte | ✅ | Push deep link |
| S10 | Chatbot — liste conversations | ✅ | Drawer du tab Chat |
| S11 | Chatbot — conversation active | ✅ | Tab |
| S12 | Profil | ✅ | Tab |
| S13 | Préférences notifications | ✅ | Sub-screen Profil |
| S14 | Export données | ✅ | Sub-screen Profil |
| S15 | À propos / Confidentialité | ✅ | Sub-screen Profil |
| S16 | État vide / erreur réseau | ✅ | Composant transverse |

### 11.2 Détail des écrans critiques

#### S07 — Dashboard

**Layout (de haut en bas) :**

```
┌─────────────────────────────────────────┐
│  [Avatar]  Bonjour, Sami                │ ← Header
│            Mardi 29 avril               │
│                                  [Bell] │
├─────────────────────────────────────────┤
│  💡 Insight du jour                     │ ← Carte RAG
│  Tu as déjà passé 3h en code et pris    │
│  2 pauses. Bien parti pour la journée.  │
├─────────────────────────────────────────┤
│  [Jour] [Semaine] [Mois]                │ ← Toggle période
│                                         │
│         ◉ Code   45%                    │ ← Donut chart
│     ╱ ◉ Réunion  20%                    │   (Victory Native)
│    │  ◉ Pause    15%                    │
│     ╲ ◉ Autre    20%                    │
│         Total: 7h12                     │
├─────────────────────────────────────────┤
│  📊 Cas d'usage actifs                  │
│  ┌───────────┐  ┌───────────┐           │
│  │💧 Hydra-  │  │📍 Posture │           │ ← Cards 2x2
│  │ tation    │  │           │           │
│  │ 3 alertes │  │ 1 alerte  │           │
│  └───────────┘  └───────────┘           │
│  ┌───────────┐  ┌───────────┐           │
│  │📞 Réunion │  │⏰ Tâches  │           │
│  │ 2 résumés │  │ 0 dépass. │           │
│  └───────────┘  └───────────┘           │
├─────────────────────────────────────────┤
│  💬 Discuter avec mon coach             │ ← FAB chat
└─────────────────────────────────────────┘
```

#### S09 — Détail alerte

```
┌─────────────────────────────────────────┐
│  ←                              [Plus]  │
├─────────────────────────────────────────┤
│         ┌─────────────────┐             │
│         │   💧            │             │ ← Icône grande
│         └─────────────────┘             │
│         Hydratation rappel              │
│         Aujourd'hui à 14:32             │
├─────────────────────────────────────────┤
│  Tu n'as pas bu depuis 2h.              │
│  Pense à t'hydrater pour rester focus.  │
├─────────────────────────────────────────┤
│  Contexte détecté                       │
│  ─ Activité : Code (laptop, écran)      │
│  ─ Lieu : Bureau                        │
│  ─ Durée assise : 1h45                  │
├─────────────────────────────────────────┤
│  [Marquer comme actionnée]              │ ← CTA primaire
│  [Demander à mon coach]                 │ ← Lien vers chat
└─────────────────────────────────────────┘
```

#### S11 — Chatbot conversation

```
┌─────────────────────────────────────────┐
│  ☰   Conversation #4           [Nouveau]│
├─────────────────────────────────────────┤
│                                         │
│   ┌─────────────────────────┐           │
│   │ Sur quoi j'ai passé le  │           │ ← Bulle user
│   │ plus de temps mardi ?   │           │   (violette)
│   └─────────────────────────┘  14:35    │
│                                         │
│   ┌─────────────────────────┐           │
│   │ Mardi, tu as passé 3h45 │           │
│   │ en code (matin) et 1h en│           │ ← Bulle assistant
│   │ réunion (après-midi).   │           │   (surface)
│   │ ▍                       │           │   ← Curseur typing
│   └─────────────────────────┘  14:35    │
│                                         │
├─────────────────────────────────────────┤
│  [+ ] Pose ta question…   [→ Send]      │ ← Input ancré
└─────────────────────────────────────────┘
```

### 11.3 Navigation

```
Stack navigator (Expo Router)
├── (auth)/login
├── (onboarding)/[1,2,3]
└── (tabs)/                    ← Bottom tabs (4 onglets)
     ├── index               (Dashboard)
     ├── alerts              (Historique)
     ├── chat                (Chatbot)
     └── profile             (Profil)

Deep links :
- coachai://alert/:id
- coachai://chat/:conversationId
```

### 11.4 États transverses

| État | Visuel |
|------|--------|
| **Loading** | Skeleton loaders Tamagui (jamais de spinner plein écran) |
| **Vide** | Illustration SVG simple + texte court + CTA |
| **Erreur réseau** | Bannière haut écran + bouton "Réessayer" |
| **Hors ligne** | Bannière persistante "Mode hors ligne — données partielles" |
| **Token expiré** | Redirection silencieuse vers login |

### 11.5 Animations

| Animation | Usage | Tech |
|-----------|-------|------|
| Apparition cartes | Stagger 80ms | Reanimated |
| Streaming chat | Curseur clignotant | Reanimated |
| Toast notification | Slide-in haut | Reanimated |
| Tab switch | Cross-fade 200ms | Expo Router default |
| Pull-to-refresh | Spinner rotatif natif | RefreshControl |

### 11.6 Accessibilité

| Critère | Implémentation |
|---------|----------------|
| Contraste minimum WCAG AA | Validé sur toute la palette dark mode |
| Tailles de police dynamiques | `accessibilityLabel` + `Text` natif |
| VoiceOver / TalkBack | Tous les boutons ont un `accessibilityLabel` |
| Tap targets | Minimum 44x44 (iOS) / 48x48 (Android) |
| Animations désactivables | Respect du flag `Reduce Motion` système |

---

## 12. AUTHENTIFICATION & SÉCURITÉ

### 12.1 Flow Google OAuth 2.0

```
┌────────────┐                                          ┌──────────┐
│   Mobile   │                                          │  Google  │
└─────┬──────┘                                          └────┬─────┘
      │  1. expo-auth-session.startAsync                     │
      │  ───────────────────────────────────────────────────▶│
      │                                                      │
      │            2. User consent screen                    │
      │  ◀───────────────────────────────────────────────────│
      │                                                      │
      │  3. id_token (JWT Google)                            │
      │  ◀───────────────────────────────────────────────────│
      │                                                      │
┌─────┴──────┐                                          ┌────┴─────┐
│   Mobile   │                                          │ FastAPI  │
└─────┬──────┘                                          └────┬─────┘
      │  4. POST /api/v1/auth/google {id_token}              │
      │  ───────────────────────────────────────────────────▶│
      │                                                      │
      │  5. Vérification id_token (lib google-auth)          │
      │  6. Création/lookup user en MongoDB                  │
      │  7. Génération JWT applicatif (HS256)                │
      │                                                      │
      │  8. {jwt, refreshToken, user}                        │
      │  ◀───────────────────────────────────────────────────│
      │                                                      │
      │  9. SecureStore.setItemAsync("jwt", jwt)             │
      │  10. SecureStore.setItemAsync("refresh", refresh)    │
      │  11. Redirect onboarding                             │
```

### 12.2 Stockage des secrets

| Secret | Stockage | Lifecycle |
|--------|----------|-----------|
| JWT applicatif | Expo SecureStore (key: `jwt`) | Durée 1h |
| Refresh token | Expo SecureStore (key: `refresh`) | Durée 30 jours |
| Expo Push Token | MMKV (non sensible) | Tant que device installé |
| Préférences | MMKV | Tant que l'app n'est pas désinstallée |

### 12.3 Refresh automatique

Intercepteur axios :

```typescript
// lib/api.ts (extrait)

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refreshToken = await SecureStore.getItemAsync("refresh");
      if (!refreshToken) return logout();

      try {
        const { data } = await axios.post("/auth/refresh", { refreshToken });
        await SecureStore.setItemAsync("jwt", data.jwt);
        await SecureStore.setItemAsync("refresh", data.refreshToken);
        error.config.headers.Authorization = `Bearer ${data.jwt}`;
        return api.request(error.config);
      } catch {
        return logout();
      }
    }
    return Promise.reject(error);
  }
);
```

### 12.4 Sécurité réseau

| Aspect | Règle |
|--------|-------|
| **HTTPS only** | Aucun HTTP en prod |
| **Certificate pinning** | V2 (V1 = trust system CA) |
| **CORS** | Restriction backend aux domaines autorisés |
| **Token JWT** | Signé HS256, claim `exp` 1h, `userId`, `deviceId` |
| **WebSocket** | wss:// + JWT en query string handshake |
| **Logs** | Aucun log de tokens, body censuré côté Sentry |

### 12.5 RGPD & vie privée

| Droit | Implémentation V1 |
|-------|-------------------|
| Information | Écran Confidentialité + politique web |
| Accès | Export CSV (`/habits/export`) |
| Rectification | Édition profil (V2) |
| Suppression | Bouton "Supprimer mon compte" |
| Portabilité | Export CSV |
| Opposition | Toggle catégories notifications |

---

## 13. NOTIFICATIONS PUSH

### 13.1 Architecture push

```
┌─────────────────┐
│ Decision Engine │
│  (génère alerte)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│   FastAPI BE    │────────▶│  WebSocket      │ ← App foreground
│  (notif handler)│         └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Expo Push API  │
│ (POST /send)    │
└────────┬────────┘
         │
         ├──────────▶  APNS (iOS)
         └──────────▶  FCM (Android)
                          │
                          ▼
                    ┌──────────┐
                    │  Mobile  │ ← App background
                    └──────────┘
```

### 13.2 Format Expo Push

**Payload backend → Expo Push Service :**

```json
{
  "to": "ExponentPushToken[abc123...]",
  "title": "💧 Hydratation rappel",
  "body": "Tu n'as pas bu depuis 2h",
  "data": {
    "type": "notification",
    "notificationId": "notif_abc123",
    "category": "health",
    "deepLink": "coachai://alert/notif_abc123"
  },
  "sound": "default",
  "priority": "high",
  "channelId": "health"  // Android only
}
```

### 13.3 Channels Android

| Channel ID | Importance | Son | Usage |
|------------|------------|-----|-------|
| `health` | High | Default | Hydratation, posture |
| `productivity` | Default | Subtle | Dépassements |
| `meeting` | Default | Subtle | Résumés réunion |
| `urgent` | Max | Alarm | Urgences |

### 13.4 Mode silencieux

L'app respecte les préférences de plage horaire (par défaut 22h-7h) :
- Le client mobile envoie `silent_hours` au backend via `/me/preferences`
- Le backend applique le filtre **avant** d'appeler Expo Push (les notifs urgentes passent quand même)

### 13.5 Deep linking

| Notif | Deep link | Écran cible |
|-------|-----------|-------------|
| Alerte santé/productivité | `coachai://alert/{id}` | S09 Détail alerte |
| Synthèse réunion | `coachai://chat/{conversationId}` | S11 Chat (résumé pré-chargé) |
| Rappel générique | `coachai://` | S07 Dashboard |

---

## 14. RÈGLES MÉTIER

### 14.1 Limites & quotas

| Règle | Valeur V1 | Justification |
|-------|-----------|--------------|
| Notifications stockées par user | 500 (rolling) | Au-delà, archivage backend |
| Conversations chat par user | 50 | Limite UX, scroll infini sinon |
| Messages par conversation | 200 | Limite contextuelle RAG |
| Taille max d'un message user | 2 000 caractères | Anti-abuse RAG |
| Refresh dashboard | 1x / 60s manuel | Anti spam backend |
| Push par jour par user | 30 max | Anti fatigue notif |
| WebSocket reconnect attempts | 10 max avant fallback push | Économie batterie |

### 14.2 Priorité d'affichage des alertes

```
1. Severity = "critical"  →  Toujours en haut, badge rouge
2. Severity = "warning"   →  Tri chronologique
3. Severity = "info"      →  Tri chronologique, opacité 80%
```

### 14.3 Logique d'agrégation Dashboard

**Calcul du `totalActiveTime` :**
- Somme des durées des `contexts` où `detectedActivity ∈ {work, code, meeting, learning, sport}`
- Exclus : `idle`, `transit`

**Catégorisation activité :**

| Détection (LLM Interpreter) | Catégorie Dashboard |
|----------------------------|---------------------|
| `code`, `work`, `email` | "Travail" |
| `meeting`, `call` | "Réunion" |
| `eat`, `drink`, `break` | "Pause" |
| `walk`, `sport` | "Activité physique" |
| Autre | "Autre" |

> **Source de vérité :** Le calcul est fait côté backend via `/insights/today` et `/habits`. Le mobile affiche uniquement.

### 14.4 Gestion des erreurs métier

| Erreur backend | Comportement mobile |
|----------------|---------------------|
| `device_not_paired` | Bannière "Aucun boîtier associé. Contacte ton équipe IoT." |
| `rag_unavailable` | Désactivation tab Chat + message d'attente |
| `rate_limit_chat` | Toast "Tu as atteint la limite. Réessaie dans X min" |
| `invalid_id_token` | Logout + retour login |

---

## 15. STACK TECHNIQUE

### 15.1 Stack mobile retenue

| Couche | Outil | Version | Rôle | Justification |
|--------|-------|---------|------|--------------|
| **Framework** | React Native + Expo | RN 0.74 / Expo 51 | Cross-platform iOS + Android | Stack IA5D mobile validée, écosystème JS, EAS Build |
| **Langage** | TypeScript | 5.x | Typage strict | `strict: true` obligatoire IA5D |
| **Navigation** | Expo Router | 4+ | File-based routing + deep links | Standard IA5D, deep links auto, type-safe |
| **UI System** | Tamagui | Latest | Design system performant | Animations natives, theming dark/light |
| **Styling** | NativeWind | Latest | Tailwind pour RN | Cohérence avec projets web IA5D |
| **State global** | Zustand | Latest | UI state | Minimaliste, pas de boilerplate |
| **Cache API** | TanStack Query | Latest | Cache REST + optimistic | Standard IA5D |
| **HTTP** | axios | Latest | Client HTTP avec intercepteurs | Refresh token natif via interceptors |
| **WebSocket** | native WebSocket API | — | Temps réel | Pas besoin de Socket.io côté FastAPI |
| **Storage** | MMKV | Latest | Storage persistant | 5x plus rapide qu'AsyncStorage (IA5D) |
| **Secrets** | Expo SecureStore | Native | JWT, refresh token | Keychain iOS / Keystore Android |
| **Auth Google** | Expo AuthSession | Native | OAuth 2.0 | Pas besoin d'Auth0 (Google direct, Mongo backend) |
| **Notifications** | Expo Notifications | Native | Push iOS + Android | API unifiée, deep linking |
| **Charts** | Victory Native | Latest | Donut + bars dashboard | Stable, animations fluides |
| **Animations** | Reanimated | Latest | Animations performantes | Thread natif |
| **Forms** | React Hook Form + Zod | Latest | Validation profil | Standard IA5D |
| **Icônes** | Lucide React Native | Latest | Iconographie cohérente | Tree-shaking |
| **Monitoring** | Sentry | Latest | Erreurs + performance | Standard IA5D mobile |
| **Build** | EAS Build | Cloud | iOS + Android cloud builds | Pas besoin de Mac pour iOS |
| **Distribution** | EAS Submit + Update | Cloud | Stores + OTA updates | Standard IA5D |
| **CI/CD** | GitHub Actions | — | Tests + EAS triggers | Standard IA5D |

### 15.2 Comparaison des alternatives rejetées

| Choix retenu | Alternative | Raison du rejet |
|-------------|-------------|-----------------|
| React Native + Expo | Flutter | Écosystème JS plus riche, partage de code futur avec frontend web, EAS cloud |
| React Native + Expo | Kotlin natif Android seul | Cible iOS exigée par le périmètre, doublerait la charge |
| Expo AuthSession | Auth0 SDK | Backend Mongo + Google OAuth direct suffisent en V1, Auth0 ajoute coût et complexité non justifiés |
| WebSocket natif | Socket.io | FastAPI gère natif WebSocket, pas besoin de la couche supplémentaire |
| Victory Native | Recharts | Recharts non optimisé RN |
| MMKV | AsyncStorage | 5x plus rapide, règle IA5D |
| Tamagui | Native Base | Performance native pure (pas de re-render JS) |
| Expo Notifications | OneSignal | Expo intégré nativement, gratuit, suffisant pour V1 |

### 15.3 Backend déjà en place — adaptations à demander à l'équipe

L'app mobile dépend de 4 ajustements côté backend (à coordonner avec Jadli & Zakaria) :

| # | Ajustement | Pôle | Priorité |
|---|------------|------|----------|
| 1 | Endpoint `POST /auth/google` (vérifie id_token Google + retourne JWT applicatif) | Backend | Critique |
| 2 | Endpoint `POST /devices/register` (stocke ExponentPushToken par user) | Backend | Critique |
| 3 | WebSocket `/ws/notifications?token=` (foreground push) | Backend | Critique |
| 4 | Trigger Expo Push API depuis le Decision Engine quand l'app est background | Decision Engine + Backend | Critique |

> **À confirmer en réunion équipe la semaine de S0.**

### 15.4 Configuration Expo

**`app.json` clés principales :**

```json
{
  "expo": {
    "name": "COACH AI",
    "slug": "coach-ai-mobile",
    "scheme": "coachai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#0B0F1A"
    },
    "ios": {
      "bundleIdentifier": "com.coachai.mobile",
      "supportsTablet": false,
      "infoPlist": {
        "NSUserNotificationsUsageDescription": "COACH AI vous envoie vos alertes contextuelles."
      }
    },
    "android": {
      "package": "com.coachai.mobile",
      "permissions": ["NOTIFICATIONS"]
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-notifications",
      "expo-font"
    ]
  }
}
```

### 15.5 Variables d'environnement

```bash
# .env.development
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
EXPO_PUBLIC_WS_URL=ws://localhost:8000/ws/notifications
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=...
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=...
EXPO_PUBLIC_SENTRY_DSN=...

# Privées (EAS Secrets uniquement)
SENTRY_AUTH_TOKEN=...
EXPO_TOKEN=...
```

---

## 16. ESTIMATION DES COÛTS

### 16.1 Coûts mensuels — V1 MVP

| Poste | Service | Plan | Coût/mois |
|-------|---------|------|-----------|
| Build cloud iOS + Android | Expo EAS | Production | ~$29 |
| OTA Updates | Expo EAS Update | Inclus EAS | $0 |
| Monitoring erreurs | Sentry | Free tier | $0 |
| CI/CD | GitHub Actions | Free public | $0 |
| Push Notifications | Expo Push Service | Gratuit | $0 |
| Apple Developer Program | Apple | Annuel $99 | ~$8.25 |
| Google Play Console | Google | One-time $25 | ~$2 |
| **TOTAL infrastructure mobile** | | | **~$39/mois** |

### 16.2 Coûts non-mobile (rappel — gérés par autres pôles)

| Poste | Coût/mois | Pôle |
|-------|-----------|------|
| Backend FastAPI hosting | ~$20-50 | Backend |
| MongoDB Atlas | $0 (free tier 512MB) | Backend |
| Groq API (LLM) | Variable selon usage | Backend |
| Boîtier IoT électricité | ~$1 | IoT |

### 16.3 Coûts de développement (estimation Karamo)

| Sprint | Heures dev | Tâches |
|--------|-----------|--------|
| S0 | 8h | Setup projet, EAS, config Expo, charte Tamagui |
| S1 | 16h | Auth Google + onboarding + navigation |
| S2 | 24h | WebSocket + push + chatbot RAG streaming |
| S3 | 24h | Dashboard + historique + profil |
| S4 | 16h | Polish + tests + builds stores |
| **TOTAL** | **88h** | ~3-4 semaines à temps plein |

---

## 17. PHASAGE DE L'IMPLÉMENTATION

### 17.1 Sprint 0 — Setup (semaine 1)

| Tâche | Livrable |
|-------|----------|
| Init projet `npx create-expo-app` + TypeScript strict | Repo git |
| Setup Expo Router + structure dossiers | Skeleton app |
| Setup Tamagui + thème dark/light + tokens couleurs | `tamagui.config.ts` |
| Setup MMKV + Zustand + TanStack Query | Stores prêts |
| Setup Sentry + EAS config | EAS Build dev fonctionnel |
| Branche les variables d'env Expo | `.env.development` validé |

### 17.2 Sprint 1 — Auth + Navigation (semaine 1-2)

| Tâche | Livrable |
|-------|----------|
| Implémenter Google OAuth via Expo AuthSession | Flow login fonctionnel |
| `POST /auth/google` côté backend (alignement Jadli) | Endpoint live |
| SecureStore + intercepteur axios refresh token | Auth persistante |
| Onboarding 3 écrans + permissions push | Onboarding fini |
| Navigation tabs + deep links | Navigation testée |

### 17.3 Sprint 2 — Notifications + Chat (semaine 2-3)

| Tâche | Livrable |
|-------|----------|
| Enregistrement Expo Push Token | `/devices/register` consommé |
| Implémentation WebSocket client | Notifs foreground OK |
| Intégration Expo Push Notifications | Notifs background OK |
| Écran Détail Alerte + deep link | Tap notif → ouvre détail |
| UI Chatbot + streaming SSE | Chat fonctionnel end-to-end |
| Drawer conversations | Multi-conversations OK |

### 17.4 Sprint 3 — Dashboard + Historique + Profil (semaine 3-4)

| Tâche | Livrable |
|-------|----------|
| Dashboard avec graphiques Victory | Vue jour/semaine OK |
| Carte Insight RAG du jour | `/insights/today` consommé |
| Historique alertes paginé + filtres | Tab Alertes complet |
| Recherche full-text alertes | Filtre opérationnel |
| Profil + préférences (toggles) | `/me/preferences` |
| Export CSV | Téléchargement OK |

### 17.5 Sprint 4 — Polish + Stores (semaine 4-5)

| Tâche | Livrable |
|-------|----------|
| Tests E2E des 4 scénarios projet (hydratation, productivité, réunion, RAG) | Bugs fixés |
| Skeletons + states vides + erreurs réseau | UX robustifiée |
| Performance (mémoire, FPS Reanimated, bundle size) | App < 50MB |
| EAS Build production iOS + Android | APK + IPA générés |
| Documentation README + screenshots | Repo prêt soutenance |

### 17.6 Diagramme de Gantt simplifié

```
S0  S1  S2  S3  S4
█   ─   ─   ─   ─    Setup
─   ███ ─   ─   ─    Auth + Nav
─   ─   ███ ─   ─    Notif + Chat
─   ─   ─   ███ ─    Dashboard + Historique + Profil
─   ─   ─   ─   ███  Polish + Stores
```

---

## 18. INDICATEURS DE SUCCÈS

### 18.1 KPIs techniques

| KPI | Cible V1 | Mesure |
|-----|----------|--------|
| Temps de cold start app | < 2.5s | Sentry Performance |
| Latence push WebSocket → UI | < 500ms | Sentry custom span |
| Latence push background OS → tap | < 5s | Tests manuels |
| Crash-free sessions | > 99% | Sentry |
| Taille bundle iOS / Android | < 50 MB | Metro bundler |
| Couverture types TS | 100% (zéro `any`) | tsc --noEmit |

### 18.2 KPIs produit (V1)

| KPI | Cible | Comment |
|-----|-------|---------|
| Taux de complétion onboarding | > 85% | Analytics events |
| Taux d'opt-in notifications | > 70% | Permission system |
| Sessions / jour / utilisateur actif | > 2 | Sentry / Mixpanel V2 |
| Notifications actionnées vs reçues | > 30% | Backend tracking |
| Conversations RAG par user actif | > 1 / jour | Backend logs |

### 18.3 Critères "Definition of Done" V1

| # | Critère |
|---|---------|
| 1 | Les 6 features F1-F6 sont fonctionnelles end-to-end |
| 2 | Les 4 scénarios projet (hydratation, productivité, réunion, RAG) déclenchent des notifs visibles |
| 3 | Builds production iOS + Android signés, prêts pour TestFlight + Play Console internal |
| 4 | Tests manuels d'au moins 30 min sur chaque plateforme sans crash |
| 5 | README à jour avec setup, env vars, scripts |
| 6 | Démo enregistrée (vidéo 3-5 min) pour la soutenance |

---

## 19. ROADMAP V2+

### 19.1 Features V2 (post-soutenance)

| Feature | Priorité | Effort estimé |
|---------|----------|---------------|
| Pairing du boîtier IoT depuis l'app (QR code / BLE) | Haute | 16h |
| Vue temps réel du contexte courant (caméra/audio statut) | Haute | 24h |
| Voice input pour le chatbot (Whisper côté backend) | Moyenne | 16h |
| Text-to-speech des réponses (ElevenLabs) | Moyenne | 12h |
| Widgets iOS / Android home screen | Moyenne | 20h |
| Apple Watch / Wear OS companion | Basse | 40h |
| Mode hors ligne complet | Moyenne | 24h |
| Personnalisation des règles Decision Engine depuis l'app | Haute | 32h |

### 19.2 Features V3+

- Multi-utilisateurs / partage familial
- Marketplace de "skills" du coach (yoga, sommeil, focus)
- Intégrations externes (Calendar Google, Slack, Notion)
- Génération automatique de rapports hebdomadaires en PDF

---

## 20. CHECKLIST PRÉ-IMPLÉMENTATION

### 20.1 Comptes et accès à créer

- [ ] Compte Expo + projet `coach-ai-mobile`
- [ ] Compte Apple Developer (99$/an) + bundle ID `com.coachai.mobile`
- [ ] Compte Google Play Console (25$ one-time) + package `com.coachai.mobile`
- [ ] Projet Google Cloud + OAuth Client IDs (iOS, Android, Web)
- [ ] Compte Sentry + projet React Native
- [ ] Repo GitHub `coach-ai-mobile`

### 20.2 Clés API à obtenir

- [ ] `EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS`
- [ ] `EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID`
- [ ] `EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB` (utilisé par AuthSession)
- [ ] `EXPO_PUBLIC_SENTRY_DSN`
- [ ] `SENTRY_AUTH_TOKEN` (CI)
- [ ] `EXPO_TOKEN` (CI)

### 20.3 Validations à obtenir de l'équipe

- [ ] Backend FastAPI : confirmer URL prod et endpoints listés en section 8
- [ ] Backend FastAPI : ajouter `POST /auth/google` (vérification id_token Google)
- [ ] Backend FastAPI : ajouter `POST /devices/register` + table mongodb `expo_push_tokens`
- [ ] Backend FastAPI : exposer WebSocket `/ws/notifications` avec auth JWT
- [ ] Decision Engine : intégrer trigger Expo Push API quand l'utilisateur est background
- [ ] Pôle IoT : confirmer le mécanisme d'association `device_id` ↔ `user_id`
- [ ] Encadrant : valider la charte graphique proposée

### 20.4 Risques identifiés

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Backend FastAPI non prêt à temps | Bloquant pour intégration end-to-end | Mock API local + sync hebdo avec Jadli |
| Decision Engine pas branché à Expo Push | Pas de notifs background | Alternative : WebSocket only en V1, push V1.1 |
| Latence RAG > 5s | UX chat dégradée | Streaming SSE obligatoire + skeleton |
| Refus Apple App Store (auth Google) | Délai store | Fallback : distribution TestFlight pour la soutenance |
| Coût Apple Developer non couvert | Délai store iOS | Distribuer en EAS Internal Distribution V1 |

### 20.5 Sprint 0 — premiers commits attendus

```bash
git init
npx create-expo-app . --template
git add . && git commit -m "chore: scaffold Expo + TypeScript"
# Setup Tamagui
npx tamagui init
git commit -am "chore: init Tamagui design system"
# Setup Expo Router
git commit -am "chore: setup Expo Router + tabs structure"
# Setup MMKV + Zustand + TanStack Query
git commit -am "chore: setup MMKV + Zustand + TanStack Query"
# Setup Sentry
git commit -am "chore: setup Sentry monitoring"
```

---

## ANNEXE A — Glossaire technique

| Terme | Définition |
|-------|-----------|
| **Edge AI** | Inférence IA exécutée localement sur l'appareil (Raspberry Pi) plutôt qu'au cloud |
| **VLM** | Vision-Language Model — modèle qui combine vision et texte (ex : LLaVA) |
| **ASR** | Automatic Speech Recognition — transcription audio (ex : Whisper) |
| **RAG** | Retrieval-Augmented Generation — LLM enrichi par recherche vectorielle |
| **Context Builder** | Composant qui agrège les flux multimodaux en un contexte structuré |
| **Decision Engine** | Composant qui décide d'agir ou non en fonction du contexte |
| **Vector DB** | Base de données qui stocke des embeddings pour recherche sémantique |
| **JWT** | JSON Web Token — token d'authentification signé |
| **APNS / FCM** | Apple Push Notification Service / Firebase Cloud Messaging |
| **EAS** | Expo Application Services — cloud build/submit/update |
| **MMKV** | Mobile Key-Value storage performant (Tencent) |
| **OTA Update** | Over-the-Air update — mise à jour sans passer par les stores |

---

## ANNEXE B — Liens et ressources

- Documentation Expo : https://docs.expo.dev
- Tamagui : https://tamagui.dev
- TanStack Query : https://tanstack.com/query
- Expo Router : https://docs.expo.dev/router/introduction/
- Lucide Icons : https://lucide.dev
- Victory Native : https://commerce.nearform.com/open-source/victory-native/
- Sentry React Native : https://docs.sentry.io/platforms/react-native/

---

**Fin du PRD v1.0**

> Ce PRD couvre l'application mobile uniquement. Pour les composants serveur, IoT, IA et Decision Engine, se référer aux livrables des autres pôles de l'équipe Aghzout.
