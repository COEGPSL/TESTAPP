import Link from "next/link";

/**
 * Page d'entree de l'application (URL : "/").
 * Volontairement minimaliste : un titre et un bouton "Entrer".
 */
export default function PageEntree() {
  return (
    <main className="page page--centre">
      <h1 className="titre-marque">COEG</h1>

      <p className="texte-doux">
        Centre Op&eacute;rationnel d&rsquo;Exploitation en Gare
      </p>

      {/* Link assure une navigation instantanee cote client */}
      <Link href="/accueil" className="bouton bouton--principal">
        Entrer
      </Link>
    </main>
  );
}
