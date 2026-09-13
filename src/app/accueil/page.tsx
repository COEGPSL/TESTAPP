import Link from "next/link";

/**
 * Description d'une entree du menu principal.
 */
type EntreeMenu = {
  titre: string;
  description: string;
  lien: string;
};

/**
 * Les quatre rubriques du menu.
 * Pour ajouter une rubrique : completer ce tableau et creer le dossier
 * correspondant dans src/app/ avec un fichier page.tsx.
 */
const entreesMenu: EntreeMenu[] = [
  {
    titre: "Tournées",
    description: "Organisation et suivi des tournées.",
    lien: "/tournees",
  },
  {
    titre: "OSEG",
    description: "Informations et documents liés à l’OSEG.",
    lien: "/oseg",
  },
  {
    titre: "Liens Utiles",
    description: "Accès rapide aux outils et applications.",
    lien: "/liens-utiles",
  },
  {
    titre: "Contacts Utiles",
    description: "Annuaire des interlocuteurs clés.",
    lien: "/contacts-utiles",
  },
];

/**
 * Menu d'accueil (URL : "/accueil").
 * Affiche le titre COEG en tete de page puis les quatre acces.
 */
export default function PageAccueil() {
  return (
    <div className="page">
      <header className="entete">
        <h1 className="entete__titre">COEG</h1>
        <p className="entete__sous-titre">Menu principal</p>
      </header>

      <nav className="grille-menu" aria-label="Menu principal">
        {entreesMenu.map((entree) => (
          <Link key={entree.lien} href={entree.lien} className="carte-menu">
            <span className="carte-menu__titre">{entree.titre}</span>
            <span className="carte-menu__description">{entree.description}</span>
          </Link>
        ))}
      </nav>

      <footer className="pied-page">
        <Link href="/" className="bouton bouton--discret">
          Quitter
        </Link>
      </footer>
    </div>
  );
}
