# Mise à jour — Paramètres des tournées terrain

Décompressez l'archive, puis glissez le dossier `src` dans la zone d'import de
la racine du dépôt GitHub TESTAPP. Acceptez le remplacement de
`src/app/tournees/page.tsx`. Les autres fichiers du projet sont conservés.

## Parcours ajouté

- `/tournees` : liste dynamique des tournées et roue crantée.
- `/tournees/parametres` : liste, modification et suppression des modèles.
- `/tournees/parametres/nouvelle` : création d'un modèle.
- `/tournees/parametres/[id]/modifier` : modification du titre et des items.
- `/tournees/realiser/[id]` : formulaire généré depuis le modèle.

## Types d'items

- Dates et heures : date et heure actuelles par défaut.
- Choix OK / NC / KO : nom personnalisable, NC par défaut.
- Commentaires : zone de texte libre.
- Nom : liste Jérôme, Nacéra, Édouard.

## Stockage provisoire

Les modèles et les tournées réalisées sont enregistrés dans `localStorage`.
Ils sont donc propres au navigateur et à l'appareil utilisés. Ils ne sont pas
encore partagés entre agents et ne sont pas enregistrés dans SharePoint.
