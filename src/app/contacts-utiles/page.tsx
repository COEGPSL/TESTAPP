import EntetePage from "@/components/EntetePage";
import RetourAccueil from "@/components/RetourAccueil";

/**
 * Structure d'un contact affiche dans la page.
 */
type Contact = {
  nom: string;
  fonction: string;
  telephone: string;
};

/**
 * Liste des contacts a afficher.
 * Exemples fictifs : a remplacer par vos donnees.
 * Attention : ne publier des donnees personnelles qu'en respectant
 * les regles internes applicables.
 */
const contacts: Contact[] = [
  {
    nom: "Exemple - Astreinte",
    fonction: "Permanence",
    telephone: "00 00 00 00 00",
  },
  {
    nom: "Exemple - Encadrement",
    fonction: "Responsable",
    telephone: "00 00 00 00 00",
  },
];

/**
 * Page "Contacts Utiles" (URL : "/contacts-utiles").
 */
export default function PageContactsUtiles() {
  return (
    <div className="page">
      <RetourAccueil />

      <EntetePage
        titre="Contacts Utiles"
        description="Interlocuteurs à joindre selon la situation."
      />

      {contacts.map((contact) => (
        <section className="bloc" key={contact.nom}>
          <h2>{contact.nom}</h2>
          <p className="texte-doux">{contact.fonction}</p>
          <p>
            <a href={"tel:" + contact.telephone.replace(/\s/g, "")}>
              {contact.telephone}
            </a>
          </p>
        </section>
      ))}
    </div>
  );
}
