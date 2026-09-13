/**
 * En-tete commun aux pages internes : titre de la page et courte description.
 *
 * @param titre - Titre affiche en haut de la page.
 * @param description - Phrase d'introduction optionnelle.
 */
export default function EntetePage({
  titre,
  description,
}: {
  titre: string;
  description?: string;
}) {
  return (
    <header>
      <h1 className="titre-page">{titre}</h1>
      {description ? <p className="texte-doux">{description}</p> : null}
    </header>
  );
}
