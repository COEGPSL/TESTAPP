import EntetePage from "@/components/EntetePage";
import RetourAccueil from "@/components/RetourAccueil";

/**
 * Page "OSEG" (URL : "/oseg").
 */
export default function PageOseg() {
  return (
    <div className="page">
      <RetourAccueil />

      <EntetePage
        titre="OSEG"
        description="Informations, procédures et documents associés."
      />

      <section className="bloc">
        <h2>À compléter</h2>
        <p className="texte-doux">
          Cette page regroupera les éléments relatifs à l’OSEG. Contenu à
          définir :
        </p>
        <ul className="liste">
          <li>procédures applicables ;</li>
          <li>documents de référence ;</li>
          <li>points de vigilance ;</li>
          <li>historique des évolutions.</li>
        </ul>
      </section>
    </div>
  );
}
