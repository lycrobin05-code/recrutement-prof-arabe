# SETUP — Funnel recrutement prof d'arabe

## Résumé du funnel

```
Ad Instagram (static)
      ↓
GitHub Pages → index.html (vidéo Thomas + formulaire JotForm)
      ↓
JotForm → Airtable "Business OS" → table "Prof arabe"
```

---

## ÉTAPE 1 — Tourner la vidéo Thomas

1. Utilisez le script dans `script-video.md`
2. Uploadez la vidéo sur YouTube (non répertorié suffit)
3. Copiez l'ID vidéo (ex: `dQw4w9WgXcQ`)
4. Dans `index.html`, remplacez `VIDEO_ID` par cet ID

---

## ÉTAPE 2 — Créer le formulaire JotForm

### Accès
→ https://www.jotform.com (compte gratuit, 5 forms / 100 réponses/mois)

### Questions à créer dans cet ordre

| # | Champ JotForm | Type | Notes |
|---|---|---|---|
| 1 | Quel est ton Prénom / Nom ? | Champ texte court | Obligatoire |
| 2 | Adresse email | Email | Obligatoire |
| 3 | Numéro WhatsApp | Numéro de téléphone | Obligatoire |
| 4 | Ville / Pays | Champ texte court | Obligatoire |
| 5 | Êtes-vous un homme ou une femme ? | Boutons radio | Homme / Femme |
| 6 | Parlez-vous parfaitement français ? | Boutons radio | Oui / Non |
| 7 | Enseignez-vous l'arabe coranique ? (pas l'arabe littéraire moderne) | Boutons radio | Oui / Non |
| 8 | Depuis combien d'années enseignez-vous l'arabe ? | Champ texte court | — |
| 9 | Est-ce que l'enseignement est votre activité principale ? | Boutons radio | Oui / Non |
| 10 | Souhaitez-vous en faire votre activité principale ? | Boutons radio | Oui / Non |
| 11 | Combien d'heures par semaine pouvez-vous consacrer à l'enseignement ? | Boutons radio | 5-10h / 10-20h / +20h |
| 12 | Quels jours êtes-vous disponible ? | Cases à cocher | Lundi / Mardi / Mercredi / Jeudi / Vendredi / Samedi / Dimanche |
| 13 | Enseignez-vous aux hommes et aux femmes ? | Boutons radio | Hommes et femmes / Seulement aux femmes / Seulement aux hommes |
| 14 | Quelle méthode utilisez-vous pour enseigner la lecture ? | Champ texte court | — |
| 15 | Êtes-vous disposé à suivre un cadre pédagogique structuré et une formation interne ? | Boutons radio | Oui / Non |
| 16 | Êtes-vous OK pour adapter votre méthode à celle de l'Institut ? | Boutons radio | Oui / Non |
| 17 | Comment avez-vous appris l'arabe coranique ? | Zone de texte | — |
| 18 | Quelle approche utilisez-vous pour enseigner la compréhension du Coran ? | Zone de texte | — |
| 19 | Pourquoi rejoindre un institut plutôt que développer vos propres élèves en indépendant ? | Zone de texte | — |
| 20 | Selon vous, quelles sont les 3 qualités essentielles d'un bon prof d'arabe coranique ? | Zone de texte | — |
| 21 | Avez-vous une certification ou diplôme d'enseignant ? | Zone de texte | "Si non, écrivez Non" |
| 22 | Quel est votre tarif horaire actuel pour un cours individuel ? | Champ texte court | — |
| 23 | Profil Preply / Italki (si vous en avez un) | URL | Optionnel |
| 24 | Connaissez-vous l'institut Bayyinah de Nouman Ali Khan ? | Boutons radio | Oui / Non *(bonus, optionnel)* |
| 25 | **Message vocal** | **Voice Recording** *(widget JotForm)* | Texte affiché : "Enregistrez un message de 60 à 90 secondes. Présentez-vous et expliquez votre rapport à l'arabe coranique. Cliquez sur le micro ci-dessous — pas besoin d'application." |

### Logique conditionnelle
- Question 10 ("Souhaitez-vous en faire votre activité principale ?") → **afficher seulement si** question 9 = "Non"

### Paramètres du formulaire
- **Titre** : "Candidature — Professeur d'arabe coranique"
- **Message de confirmation** : "Votre candidature a bien été reçue. Nous lisons chaque message avec attention. Si votre profil correspond, nous vous recontacterons sous 7 jours."
- **Couleurs** : vert foncé `#1B4A47`, or `#C9A97E`
- **Police** : Inter ou similar

---

## ÉTAPE 3 — Connecter JotForm → Airtable

1. Dans JotForm → **Paramètres** → **Intégrations** → chercher **Airtable**
2. Connecter votre compte Airtable
3. Sélectionner base **"Business OS"** → table **"Prof arabe"**
4. Mapper les champs JotForm ↔ champs Airtable :

| Champ JotForm | Champ Airtable |
|---|---|
| Prénom / Nom | Quel est ton Prénom / Nom ? |
| Email | Email *(à ajouter — voir étape 4)* |
| WhatsApp | Numéro de téléphone (WhatsApp) |
| Ville / Pays | Ville *(à ajouter — voir étape 4)* |
| Homme ou Femme | Est-tu un Homme ou une Femme ? |
| Français ? | Parles-tu parfaitement français? |
| Arabe coranique ? | Arabe Coranique |
| Années d'enseignement | Depuis combien d'années enseignez-vous? |
| Activité principale ? | Est-ce que l'enseignement est votre activité principale? |
| Souhaitez-vous l'activité principale ? | Souhaitez-vous faire de l'enseignement votre activité principale ? |
| Heures par semaine | Combien d'heures par semaine pouvez-vous consacrer à l'enseignement ? |
| Jours disponible | Quels jours êtes-vous disponible? |
| Hommes et femmes ? | Enseignez-vous aux hommes et aux femmes? |
| Méthode lecture | Quelle méthode utilises-tu pour l'apprentissage de la lecture? |
| Cadre pédagogique OK ? | Êtes-vous disposé à suivre un cadre pédagogique structuré... |
| OK pour méthodo différente ? | Ok pour méthodo différente ? |
| Comment appris l'arabe | Comment avez-vous appris l'arabe coranique ? |
| Approche enseignement compréhension | Quelle approche utilisez-vous pour enseigner la compréhension... |
| Pourquoi rejoindre institut | Pourquoi souhaitez-vous rejoindre un institut... |
| 3 qualités | Selon vous, quelles sont les trois qualités essentielles... |
| Certification | Avez-vous obtenu une certification spécifique... |
| Tarif horaire | Quel est actuellement votre tarif horaire... |
| Profil Preply/Italki | Si vous avez un profil sur une plateforme d'éducation... |
| Bayyinah | (Bonus) Connaissez-vous l'institut Bayyinah... |
| Message vocal | Notes *(champ pièce jointe — JotForm envoie l'URL du fichier audio)* |

---

## ÉTAPE 4 — Ajouter les champs manquants dans Airtable

Dans la table **"Prof arabe"** (base "Business OS"), ajouter :

| Champ | Type | Options |
|---|---|---|
| Email | Email | — |
| Ville | Texte court | — |
| Statut | Sélection simple | Nouveau / À écouter / À contacter / Entretien planifié / Retenu / Refusé |

> Ces 3 champs ont été ajoutés automatiquement via l'outil MCP si vous lisez ceci après l'exécution du plan.

---

## ÉTAPE 5 — Déployer sur GitHub Pages

1. Créer un repo GitHub : `recrutement-prof-arabe` (public)
2. Uploader `index.html` et `style.css`
3. Dans **Settings → Pages** → Source : `main` branch, dossier `/root`
4. L'URL sera : `https://[votre-username].github.io/recrutement-prof-arabe/`
5. Mettre à jour l'URL dans l'ad

---

## ÉTAPE 6 — Créer l'ad statique

Format recommandé :
- **Image** : fond vert foncé `#1B4A47`, texte en blanc et or
- **Texte principal** : "Vous enseignez l'arabe coranique ? L'Institut À la lumière du Coran recrute."
- **Call to action** : "En savoir plus"
- **Ciblage** : intérêts Islam, Coran, arabe — pays France, Belgique, Suisse, Maroc, Algérie, Tunisie

---

## Pipeline Airtable — vue Kanban recommandée

Créer une vue **Kanban** groupée par le champ **Statut** :

```
Nouveau → À écouter → À contacter → Entretien planifié → Retenu → Refusé
```

Chaque fiche = un candidat. Écouter le message vocal depuis la fiche Airtable.
