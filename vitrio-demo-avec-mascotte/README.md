# VITRIO — Nettoyage & services

Version 2 préparée le 17 novembre 2026 à partir du dépôt existant.

Site statique HTML/CSS/JavaScript, sans dépendance npm, avec calendrier Cal.com chargé à la demande. Aucun serveur métier à maintenir. Aucune modification du dépôt distant ni publication n’a été effectuée.

## Démarrage

Node.js 22+ :

```sh
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

Ouvrir http://localhost:8000. Ne pas ouvrir index.html en file:// : les modules JavaScript nécessitent un serveur HTTP.

- `index.html` : site et contenus.
- `styles.css` : présentation adaptative.
- `config.js` : coordonnées, mascotte et lien de réservation.
- `app.js` / `booking.mjs` : interface et intégration Cal.com.
- `mentions-legales.html` / `confidentialite.html` : documents à compléter.
- `docs/MISE_EN_SERVICE.md` : configuration et recette de bout en bout.
- `docs/RECETTE.md` : tests exécutés et limites.
- `.github/workflows/pages.yml` : publication GitHub Pages déclenchée manuellement uniquement.

**Statut : version de préparation fonctionnelle localement ; réservation externe inactive tant que le compte n’est pas configuré et vérifié.** Le formulaire d’aperçu valide les champs mais n’envoie et ne stocke rien. Il ne simule jamais une demande reçue. Une fois activé, le vrai parcours est pris en charge par le calendrier Cal.com et ses champs obligatoires.

## Choix d’architecture

Le dépôt initial contenait seulement un `index.html` de 9 919 octets, du CSS intégré, des images distantes et un formulaire avec `alert()` de démonstration. Il n’y avait ni réservation, ni backend, ni tests, ni configuration de déploiement. La structure statique a été conservée ; le contenu, le style et les interactions ont été remplacés. Les anciennes promesses non documentées ont été retirées.

Le dossier `dist` est généré, non versionné. Le manifeste `.openai/hosting.json` sert uniquement à l’aperçu local et ne déclare aucun site publié. GitHub Pages publie le contenu de `dist`, pas les documents internes.

## Conditions avant ouverture

1. Fournir le fichier du raton laveur **original**. Les variantes IVRIO retrouvées n’ont pas été substituées.
2. Configurer un compte gratuit Cal.com au nom du responsable et effectuer toute la recette décrite.
3. Compléter les coordonnées et documents légaux, retirer leurs mentions de préparation.
4. Exécuter `npm run check:release` puis `npm test` et `npm run build`.
5. Obtenir l’accord d’Anthony avant tout push ou publication.

Aucune clé API n’est nécessaire dans le navigateur. Ne jamais mettre de secret ni de données client dans ce dépôt public.
