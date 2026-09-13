# COEG - Application web

Squelette d'application Next.js (App Router, TypeScript) comprenant :

- une page d'entree avec un bouton "Entrer" ;
- un menu d'accueil titre "COEG" avec quatre acces ;
- quatre pages : Tournees, OSEG, Liens Utiles, Contacts Utiles ;
- un lien de retour a l'accueil sur chaque page.

## Arborescence

```
coeg-app/
├── src/
│   ├── app/
│   │   ├── page.tsx                  -> page d'entree              "/"
│   │   ├── layout.tsx                -> gabarit commun
│   │   ├── globals.css               -> styles
│   │   ├── accueil/page.tsx          -> menu principal             "/accueil"
│   │   ├── tournees/page.tsx         -> Tournees                   "/tournees"
│   │   ├── oseg/page.tsx             -> OSEG                       "/oseg"
│   │   ├── liens-utiles/page.tsx     -> Liens Utiles               "/liens-utiles"
│   │   └── contacts-utiles/page.tsx  -> Contacts Utiles            "/contacts-utiles"
│   └── components/
│       ├── EntetePage.tsx            -> en-tete reutilisable
│       └── RetourAccueil.tsx         -> bouton de retour a l'accueil
├── next.config.mjs
├── package.json
└── tsconfig.json
```

Regle de Next.js App Router : chaque dossier de `src/app/` devient une URL,
et le fichier `page.tsx` qu'il contient est la page affichee.

## Demarrage local

```bash
cd coeg-app
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Publication

```bash
git init
git add .
git commit -m "Squelette de l'application COEG"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/coeg-app.git
git push -u origin main
```

Importer ensuite le depot dans Vercel (Add New -> Project).

## Ajouter une page

1. creer un dossier dans `src/app/`, par exemple `src/app/consignes/` ;
2. y creer un fichier `page.tsx` ;
3. ajouter une entree dans le tableau `entreesMenu` de `src/app/accueil/page.tsx`.
