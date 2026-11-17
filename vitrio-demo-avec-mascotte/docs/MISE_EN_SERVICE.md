# Mise en service Vitrio

## Décision et comparaison (vérifiée le 17 novembre 2026)

| Solution | Coût de départ annoncé | Validation | Gestion du planning | Décision |
|---|---|---|---|---|
| GitHub Pages + Cal.com Individuals | Hébergement public GitHub Free + compte Cal.com gratuit pour 1 utilisateur | Requires confirmation | Agenda, demandes en attente, notifications | Retenu |
| SimplyBook.me Free | Gratuit, 50 réservations/mois, 1 custom feature | Approve Bookings | Outil métier complet ; limites et champs supplémentaires à vérifier | Alternative |
| Formulaire + e-mail | Variable selon prestataire | Manuelle par e-mail | Aucun verrouillage de créneau natif | Insuffisant seul |
| Backend sur mesure | Hébergement et maintenance variables | À développer et sécuriser | À développer et tester en concurrence | Disproportionné pour un responsable |

Pas de SMS, paiement, domaine payant ni abonnement à activer sans accord. Le domaine github.io peut suffire au départ. Tarifs et fonctionnalités peuvent évoluer.

Sources officielles :
- https://cal.com/pricing
- https://cal.com/help/event-types/how-to-requires
- https://cal.com/features/requires-confirmation
- https://cal.com/help/embedding/embed-instructions
- https://help.simplybook.me/index.php/Special:MyLanguage/Approve_Bookings_custom_feature
- https://help.simplybook.me/index.php?mobileaction=toggle_view_mobile&title=Important_for_Free_accounts%2Fen
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## 1. Créer/configurer le compte

Yves doit disposer de son compte Cal.com Individuals et de son adresse professionnelle. La création et l’acceptation des conditions restent à effectuer avec lui. Pas de compte créé pendant cette préparation.

1. Régler la langue française et le fuseau `Europe/Paris`.
2. Connecter son agenda principal et tous les agendas dont les événements doivent empêcher une réservation. Cocher le contrôle des conflits ; choisir l’agenda où seront inscrites les interventions acceptées.
3. Créer **un seul type d’événement** `demande-intervention`, intitulé « Demande d’intervention Vitrio — sous réserve de validation ».
4. Lieu : domicile du client / adresse fournie ; ne pas laisser une visioconférence par défaut.
5. Définir avec Yves une durée prudente, les jours/heures travaillés, une marge avant/après pour les trajets et un délai minimal. Une demande occupe une durée définie : ce n’est pas une simple heure de début sans durée. Si la durée d’un chantier est incertaine, la vérifier AVANT d’accepter et bloquer tout le temps nécessaire dans l’agenda.
6. Ne pas créer quatre calendriers séparés pour les quatre prestations. La prestation est une question du même événement, pour un seul planning.

## 2. Réglages obligatoires

Dans l’événement, sous les règles de confidentialité / confirmation (intitulés susceptibles d’évoluer) :

- `Requires confirmation` : ACTIVÉ.
- Confirmation : `Always` (toujours), jamais uniquement à court préavis ou pour certains domaines e-mail.
- `Unconfirmed bookings still block calendar slots` : ACTIVÉ.
- Pas de paiement ; pas de réservation de groupe ni de sièges multiples.
- Événement actif seulement après les tests ci-dessous.
- Notifications e-mail du responsable activées ; vérifier leur réception et les indésirables.

L’état attendu est `Unconfirmed` / en attente après soumission. Le responsable accepte ou refuse depuis son tableau de bord ou l’e-mail. Le client ne reçoit sa confirmation et son invitation qu’après acceptation. Un refus déclenche une notification, et libère le créneau.

Ce sont des réglages **du compte Cal.com**, non des garanties qu’un fichier statique peut imposer. La propriété locale `verified` est une attestation de recette, pas un contrôle distant. Toute modification du compte nécessite une nouvelle vérification.

## 3. Champs du vrai formulaire Cal.com

Configurer les questions dans le même événement. Le choix effectué sur la page Vitrio sert à orienter le visiteur ; le choix définitif est enregistré dans Cal.com. La page demande explicitement de le confirmer. Aucun nom, adresse ou e-mail n’est transmis dans une URL.

| Champ | Type | Obligatoire |
|---|---|---|
| Prestation | Choix unique : Vitres, Ménage, Canapés, Extérieurs | Oui |
| Adresse ou commune | Texte | Oui |
| Nom | Champ natif | Oui |
| E-mail | Champ natif | Oui |
| Téléphone | Téléphone/texte | Oui |
| Précisions | Texte long | Non |

Date et heure sont choisies dans les disponibilités natives du calendrier. Afficher le fuseau. Ajouter un lien vers la politique de confidentialité Vitrio. Examiner les cookies et les traitements du prestataire avant mise en service ; le calendrier n’est chargé qu’après clic dans cette version.

## 4. Brancher le site

Dans `config.js`, renseigner le vrai lien (sans `https://cal.com/`) :

```js
booking: {
  calLink: 'identifiant-reel/demande-intervention',
  verified: true
}
```

Ne passer `verified` à `true` qu’après la recette complète sur le compte. Le mode actif remplace les champs d’aperçu par le calendrier officiel. Le lien d’ouverture dans un nouvel onglet reste disponible en cas de blocage du module intégré. Aucune clé API ni serveur intermédiaire.

Compléter `phone`, `email`, `area`, `hours`, `mascot`. Ajouter l’image originale dans `assets/`. Les chemins sont relatifs et compatibles avec `/Vitrio-services/` sur GitHub Pages.

## 5. Recette obligatoire sur le compte (non effectuée sans accès)

Utiliser des adresses de test contrôlées par Yves / Anthony. Les soumissions de test envoient réellement des e-mails.

| Test | Résultat attendu |
|---|---|
| Demande complète A | En attente, visible chez Yves ; notification reçue ; aucune confirmation client |
| Champs requis absents / e-mail incorrect | Envoi bloqué par Cal.com |
| Acceptation de A | Client notifié ; événement à la bonne heure dans l’agenda |
| Demande B puis refus | Client averti du refus ; créneau libéré |
| Deux sessions choisissent simultanément le même créneau | Une seule demande occupe le créneau ; l’autre ne doit pas créer de doublon |
| Demande en attente, autre visiteur | Créneau déjà demandé indisponible |
| Événement occupé dans l’agenda externe | Créneau absent de l’offre |
| Demande sur un intervalle chevauchant une intervention | Chevauchement empêché, marges incluses |
| Annulation / reprogrammation | Agenda, notifications et libération des anciens créneaux cohérents ; recontrôler la validation |
| Changement heure hiver/été | Heure Europe/Paris identique côté client et responsable |
| Mobile et calendrier bloqué | Parcours utilisable ; lien de secours fonctionnel |
| Échec du fournisseur | Aucun faux message de succès sur Vitrio |

Si un doublon est observé : laisser `verified: false`, corriger le réglage ou réévaluer le prestataire AVANT publication. Ne pas considérer la recette de l’interface locale comme une preuve du comportement réel de Cal.com.

## 6. Publication GitHub Pages — après accord

1. Finaliser `mentions-legales.html` et `confidentialite.html`, retirer les avertissements de préparation ; renseigner `legalCompleted: true`. Les textes sont une trame à valider, pas un audit juridique.
2. Lancer `npm run check:release`, `npm test`, `npm run build`.
3. Après autorisation seulement, créer une branche/commit et pousser les changements vers le dépôt existant. Aucune de ces actions distantes n’a été faite.
4. Dans les paramètres GitHub Pages, choisir GitHub Actions comme source (si l’ancien mode publie depuis une branche, le désactiver AVANT le push pour éviter une publication involontaire).
5. Déclencher manuellement le workflow « Publication Vitrio (manuelle) ». Pas de déclenchement au push.
6. Vérifier HTTPS, chemins d’assets, mobile, formulaire et liens légaux sur l’URL réellement retournée par GitHub.
7. Refaire une demande réelle de test, vérifier notification, acceptation et conflit.

Retour arrière : redéployer la version validée précédente via GitHub. Conserver le compte Cal.com et son agenda comme source de vérité ; aucune donnée client n’est dans les fichiers du site.

## Administration quotidienne pour Yves

Ouvrir « Bookings / Unconfirmed », vérifier lieu, durée, faisabilité, déplacements et tarif convenu, puis accepter ou refuser. Répondre aux demandes en attente pour ne pas immobiliser inutilement des créneaux. Saisir aussi les rendez-vous pris par téléphone dans l’agenda connecté. Toute indisponibilité personnelle doit bloquer cet agenda.
