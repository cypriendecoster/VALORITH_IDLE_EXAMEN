# Valorith Idle (Projet Examen)

Projet full‑stack réalisé pour l’examen (BAC +2).  
Frontend en React + Vite, backend en Node.js/Express avec base MySQL.

## Fonctionnalités principales
- Authentification (register / login / reset password) avec JWT
- Profil utilisateur, paramètres et gestion du compte
- Système de jeu “idle” : ressources, usines, compétences, royaumes
- Classements, badges, patch notes, FAQ, tutoriel, lore
- Espace admin et support (tickets)
- Pages légales (CGU / confidentialité)

## Stack technique
**Frontend**
- React 19, Vite
- Tailwind CSS + PostCSS
- React Router
- React Hook Form + Zod
- Axios
- Framer Motion, Lucide, Sonner

**Backend**
- Node.js (ESM)
- Express 5
- MySQL (`mysql2`)
- JWT + bcrypt
- dotenv, cors
- nodemon (dev)

## Prérequis
- Node.js 18+ (recommandé)
- MySQL 8+
- npm

## Installation

### 1) Backend
cd Server
npm install

### 2) Server
cd Client
npm install

Configuration
Créer un fichier Server/.env (exemple ci‑dessous) :

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=valorith_idle
DB_PORT=3307
JWT_SECRET=change_me
IDLE_OFFLINE_THRESHOLD_SECONDS=30

## DÉMARRAGE
### Backend
cd Server
npm run dev

L’API démarre sur http://localhost:3000

### FRONTEND
cd Client
npm run dev

L’app démarre sur http://localhost:5173

Structure du projet
Client/ : application React
Server/ : API Express + accès DB MySQL

Remarques
Le CORS côté backend est configuré pour http://localhost:5173.
Ne pas versionner le fichier .env (danger)
Auteur : Decoster Cyprien / Promotion DWWM Bac +2 / 2026
