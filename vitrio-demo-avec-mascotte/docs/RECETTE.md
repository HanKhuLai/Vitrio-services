# Recette — 17 novembre 2026

## Exécuté

- Dépôt cloné et inspecté ; aucun push, aucune publication.
- `npm test` : 6 tests réussis (configuration inactive, validation du lien Cal.com, URL sans données personnelles, date Europe/Paris, configuration livrée, liens/ancres locaux).
- `npm run build` : réussi, sortie statique autonome dans `dist`.
- `npm run check:release` : doit échouer tant que les éléments réels manquent ; ce blocage est intentionnel.
- Inspection dans Chrome de l’accueil sur ordinateur (~1 350 px).
- Inspection à 390 px et 320 px via cadres de même origine : menu mobile, navigation vers prestation puis formulaire. Ce sont des largeurs mobiles simulées, pas des tests sur téléphones physiques.
- Débordement horizontal observé à 320 px dans le bloc marque, puis corrigé : largeur document 305 px / largeur visible 305 px (barre de défilement exclue).
- Correction des flèches diagonales mal rendues dans la police du navigateur.
- Formulaire ordinateur rempli avec données fictives : résultat « aperçu uniquement, aucune demande envoyée » vérifié.
- Formulaire mobile : e-mail invalide refusé, e-mail de test valide accepté par la validation locale, message d’aperçu correct.
- Préselection de Canapés depuis sa carte vérifiée.
- Aucun journal d’erreur lié à l’origine du site lors de l’inspection ; les erreurs de l’extension du navigateur ne concernent pas le site.

## Non effectué / limites

- Aucun compte Cal.com configuré ou authentifié. Aucun événement réel créé.
- Envoi de notifications, acceptation/refus, synchronisation et concurrence des demandes NON testés en réel. Protocole détaillé dans MISE_EN_SERVICE.md.
- Module intégré en mode actif non testé avec un événement réel. L’intégration suit le bootstrap et l’API inline officiels, avec lien de secours.
- Mascotte originale non intégrée, faute de fichier identifiable avec certitude.
- Coordonnées et informations légales non fournies ; emplacements explicites, publication bloquée.
- Pas d’audit exhaustif d’accessibilité, de test Safari/iOS ni de test sur connexion mobile réelle.

La livraison constitue une version préparée du site et de son intégration, pas une réservation déjà mise en production.
