# AlloMedia Frontend

**AlloMedia** est l'application frontend construite avec React pour gérer l'inscription, la connexion et d'autres fonctionnalités d'utilisateur.

## Table des matières
- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Dockerisation](#dockerisation)
- [Structure du Projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Aperçu
Ce projet vise à fournir une interface utilisateur réactive pour les fonctionnalités d'inscription, de connexion et de réinitialisation de mot de passe.

## Fonctionnalités
- **Inscription des utilisateurs** : Création de compte avec des informations de base.
- **Validation des formulaires** : Assure que les champs sont remplis correctement.
- **Connexion** : Authentification des utilisateurs existants.
- **Réinitialisation de mot de passe** : Envoi d'un lien de réinitialisation.
- **Déconnexion** : Permet aux utilisateurs de se déconnecter.

## Technologies Utilisées
- **React**
- **React Router**
- **Axios**
- **Formik/React Hook Form**

## Prérequis
- Node.js (version 16 ou supérieure)
- Docker (pour la containerisation)

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/username/AlloMedia-frontend.git
   cd AlloMedia-frontend
2. Installez les dépendances :
         npm install

## Utilisation
Pour démarrer l'application en mode développement :
          npm start

## Dockerisation

1. Créez l'image Docker 
      docker build -t allomedia-frontend .

2. Exécutez le conteneur 
       docker run -p 3000:3000 allomedia-frontend

## Docker Compose
1. Démarrez les services avec Docker Compose 
      docker-compose up
