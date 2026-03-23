# 📊 Observatoire Dataviz Connecté (SAE 401)

Ce projet est une application web complète (Front-end React & Back-end Symfony) permettant de visualiser des KPI nationaux et départementaux français à travers une carte interactive.

## 🚀 Architecture du projet
- **`/API`** : Back-end Symfony 7 (PHP 8.2+). Fournit les données depuis la base de données via une API REST.
- **`/client`** : Front-end React 18 / Vite. Consomme l'API et gère l'interface (carte choroplèthe interactive, graphiques).
- **`database.sql`** : Le dump MySQL complet contenant la structure et les données nécessaires.

---

## 🛠️ Prérequis de lancement
Pour lancer ce projet en local, vous aurez besoin de :
1. **PHP 8.2+** et **Composer** (pour Symfony).
2. **Node.js** (pour React/Vite).
3. Un serveur MySQL local (comme **XAMPP / WAMP / MAMP**).

---

## ⚙️ Installation & Lancement Étape par Étape

### Étape 1 : Initialiser la Base de Données
1. Lancez votre serveur MySQL (ex: lancez XAMPP et démarrez Apache & MySQL).
2. Ouvrez **phpMyAdmin** (généralement `http://localhost/phpmyadmin`).
3. Créez une nouvelle base de données nommée **`sae401`**.
4. Importez le fichier **`database.sql`** fourni à la racine du projet dans cette nouvelle base de données.

### Étape 2 : Lancer l'API (Back-end)
Le fichier `.env` est déjà configuré globalement pour correspondre à un identifiant XAMPP standard (utilisateur `root` et pas de mot de passe, sur le port `3306`).
_Si vos identifiants sont différents, modifiez `DATABASE_URL` dans `API/.env.local`._

1. Ouvrez un terminal dans le dossier `/API` :
   ```bash
   cd API
   ```
2. Installez les dépendances PHP :
   ```bash
   composer install
   ```
3. Lancez le serveur de développement Symfony :
   ```bash
   symfony server:start -d
   ```
   > Le serveur Symfony devrait maintenant tourner sur l'adresse `https://127.0.0.1:8000` (ou `8001`). 

### Étape 3 : Lancer le Front-end React
1. Ouvrez un nouveau terminal dans le dossier `/client` :
   ```bash
   cd client
   ```
2. Installez les dépendances NPM :
   ```bash
   npm install
   ```
3. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

🎉 L'application s'ouvrira dans votre navigateur. Le front-end passera par le proxy configuré pour interroger directement le serveur Symfony local et afficher les données !

---
### ⚠️ Note en cas d'erreur 400 ou problème Proxy
Vite est configuré via `--host` proxy vers `https://127.0.0.1:8001` par défaut. Si votre serveur Symfony démarre sur `8000`, remplacez simplement `8001` par le bon port dans le fichier `client/vite.config.js`.
