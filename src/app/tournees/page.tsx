import EntetePage from "@/components/EntetePage";
import RetourAccueil from "@/components/RetourAccueil";

/**
 * Page "Tournées" (URL : "/tournees").
 */
export default function PageTournees() {
  return (
    <div className="page">
      <RetourAccueil />

      <EntetePage
        titre="Tournées"
        description="Organisation, planning et suivi des tournées."
      />

      <section className="bloc">
        <h2>À compléter</h2>
        <p className="texte-doux">
          Cette page accueillera la liste des tournées. Contenu à définir :
        </p>
        <ul className="liste">
          <li>liste des tournées du jour ;</li>
          <li>agent affecté et périmètre ;</li>
          <li>points de contrôle et horaires ;</li>
          <li>observations et suites à donner.</li>
        </ul>
      </section>
    </div>
  );
}
