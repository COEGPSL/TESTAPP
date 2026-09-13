import Link from "next/link";

/**
 * Lien de retour vers le menu d'accueil.
 * Compose une seule fois puis reutilise sur les quatre pages internes,
 * afin d'eviter la duplication de code.
 */
export default function RetourAccueil() {
  return (
    <div className="barre-retour">
      <Link href="/accueil" className="bouton bouton--discret">
        &larr; Retour a l&rsquo;accueil
      </Link>
    </div>
  );
}
