import EntetePage from "@/components/EntetePage";
import RetourAccueil from "@/components/RetourAccueil";

/**
 * Structure d'un lien affiche dans la page.
 */
type LienUtile = {
  libelle: string;
  url: string;
  description: string;
};

/**
 * Liste des liens a afficher.
 * Remplacer ces exemples par vos veritables adresses.
 */
const liens: LienUtile[] = [
  {
    libelle: "Exemple - Intranet",
    url: "https://exemple.interne",
    description: "Remplacer par l’adresse réelle.",
  },
  {
    libelle: "Exemple - Outil de suivi",
    url: "https://exemple.interne/suivi",
    description: "Remplacer par l’adresse réelle.",
  },
];

/**
 * Page "Liens Utiles" (URL : "/liens-utiles").
 */
export default function PageLiensUtiles() {
  return (
    <div className="page">
      <RetourAccueil />

      <EntetePage
        titre="Liens Utiles"
        description="Accès rapide aux outils et applications du quotidien."
      />

      {liens.map((lien) => (
        <section className="bloc" key={lien.url}>
          <h2>
            {/* rel="noreferrer" par securite pour les liens ouverts en onglet */}
            <a href={lien.url} target="_blank" rel="noreferrer">
              {lien.libelle}
            </a>
          </h2>
          <p className="texte-doux">{lien.description}</p>
        </section>
      ))}
    </div>
  );
}
