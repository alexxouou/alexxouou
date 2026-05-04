# Maison Étoile | Haute Couture Nuptiale

Une plateforme de prestige pour l'atelier de robes de mariée et chaussures Maison Étoile.

## Déploiement

### Vercel
Ce projet est optimisé pour un déploiement sur [Vercel](https://vercel.com/).
1. Importez votre dépôt GitHub sur Vercel.
2. Vercel détectera automatiquement Vite et configurera les paramètres de build (`npm run build` et dossier `dist`).
3. **Variables d'environnement** : Ajoutez `GEMINI_API_KEY` dans les paramètres du projet si vous utilisez des fonctionnalités IA.

### GitHub Pages
La configuration GitHub Actions est incluse dans `.github/workflows/deploy.yml`.
1. Dans votre dépôt GitHub, allez dans **Settings > Pages**.
2. Sous **Build and deployment > Source**, choisissez **GitHub Actions**.
3. Poussez votre code sur la branche `main` pour déclencher le déploiement.

## Images (Google Drive)
Les images sont hébergées sur Google Drive. Pour garantir l'affichage :
1. Assurez-vous que les fichiers sur Drive sont partagés en mode "Tous les utilisateurs disposant du lien".
2. Utilisez les IDs ou les liens de partage dans `src/constants/images.ts`. L'application utilise un proxy (`lh3.googleusercontent.com`) pour contourner les limitations de hotlinking classiques.

## Développement Local

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.
