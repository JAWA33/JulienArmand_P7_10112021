# GROUP'COM by GROUPOMANIA

Partie Frontend du Projet 7 - OC developpeur web

## Pré-requis "backend du projet":

Vous aurez également besoin du backend disponible ici : (https://github.com/JAWA33/JulienArmand_P7_back_10112021.git)

## Installation du "Frontend"", ce depot GIT :

Commencer par cloner ce dépot git, puis lancer npm install pour télécharger le node_modules.

Cette WebApp fonction sous REACT pour la partie frontend, vous aurez besoin des packages suivants :

"axios": "^0.24.0",
"compressorjs": "^1.1.1",
"cropperjs": "^1.5.12",
"dotenv": "^10.0.0",
"package": "^1.0.1",
"react": "^17.0.2",
"react-confirm-alert": "^2.7.0",
"react-dom": "^17.0.2",
"react-easy-crop": "^3.5.2",
"react-redux": "^7.2.6",
"react-router-dom": "^5.3.0",
"react-scripts": "4.0.3",
"redux": "^4.1.2",
"redux-devtools-extension": "^2.13.9",
"redux-thunk": "^2.4.1",

### Eléments à créer pour faire fonctionner le frontend :

Vous devrez également créer les éléments suivants :

1. un fichier .env avec les informations suivantes :

- L'adresse local de fonctionnement du frontend :
  REACT_APP_API_URL= http://localhost:5000/

### Lancement du serveur :

Pour lancer le serveur sur le port 5000 : Entrer npm start

## Fonctionnalités de l'application :

Ce projet est un réseau social d'entreprise, il a les fonctionnalités suivantes :

- Création de nouveaux utilsateurs
- Connexion de chaque utilsateurs avec email et mot de passe
- Création de profil personnalisé pour chaque utilisateur
- Possibilité de création de posts sur la partie Forum
- Consultation des profils des utilisateurs dans un organigramme de l'entreprise
- Modification ou suppression des posts, profils pour l'utilisateur qui les a créer
- Modification ou suppression des posts, profils par un modérateur (à renseigner dans la base de données)
- Stockage des images sur le serveur Backend : Dimensionnement et compression des images
- Supression des images obsolètes lors de la suppression ou modifictions des posts

## NOTA :

Cette WebApp n'est pas encore validée, pour consulter sa version la plus récente, vous devrez utiliser la branche : "modifcss".
