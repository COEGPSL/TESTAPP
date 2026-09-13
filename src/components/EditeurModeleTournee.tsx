"use client";

import { useState } from "react";
import type { ItemControle, ModeleTournee, TypeItem } from "@/lib/modelesTournees";
import { nouvelIdentifiantItem } from "@/lib/modelesTournees";

const TYPES: { type: TypeItem; titre: string; aide: string }[] = [
  { type: "dateHeure", titre: "Dates et heures", aide: "Ajoute un sélecteur de date et d’heure." },
  { type: "choix", titre: "Choix OK / NC / KO", aide: "Ajoute un contrôle à nommer ; NC sera sélectionné par défaut." },
  { type: "commentaires", titre: "Commentaires", aide: "Ajoute une zone de commentaire libre." },
  { type: "nom", titre: "Nom", aide: "Ajoute la liste Jérôme, Nacéra et Édouard." },
];

export default function EditeurModeleTournee({
  modele,
  libelleBouton,
  onEnregistrer,
}: {
  modele?: ModeleTournee;
  libelleBouton: string;
  onEnregistrer: (titre: string, items: ItemControle[]) => void;
}) {
  const [titre, setTitre] = useState(modele?.titre ?? "");
  const [items, setItems] = useState<ItemControle[]>(modele?.items ?? []);
  const [typeAjout, setTypeAjout] = useState<TypeItem>("choix");
  const [libelleAjout, setLibelleAjout] = useState("");
  const [erreur, setErreur] = useState("");

  function ajouterItem() {
    const libelle = libelleAjout.trim();
    if (!libelle) {
      setErreur("Nommez l’item avant de l’ajouter.");
      return;
    }
    setItems((actuels) => [...actuels, { id: nouvelIdentifiantItem(), type: typeAjout, libelle }]);
    setLibelleAjout("");
    setErreur("");
  }

  function renommerItem(id: string, libelle: string) {
    setItems((actuels) => actuels.map((item) => (item.id === id ? { ...item, libelle } : item)));
  }

  function supprimerItem(id: string) {
    setItems((actuels) => actuels.filter((item) => item.id !== id));
  }

  function soumettre(e: React.FormEvent) {
    e.preventDefault();
    if (!titre.trim()) return setErreur("Le titre de la tournée est obligatoire.");
    if (items.length === 0) return setErreur("Ajoutez au moins un item à contrôler.");
    if (items.some((item) => !item.libelle.trim())) return setErreur("Chaque item doit avoir un nom.");
    onEnregistrer(titre.trim(), items.map((item) => ({ ...item, libelle: item.libelle.trim() })));
  }

  return (
    <form onSubmit={soumettre} className="tt-formulaire">
      <section className="tt-carte">
        <label className="tt-label" htmlFor="titre-tournee">Titre de la tournée terrain</label>
        <input id="titre-tournee" className="tt-input" value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex. TT Bureau" maxLength={100} />
      </section>

      <section className="tt-carte">
        <h2>Ajouter un item à contrôler</h2>
        <div className="tt-grille-ajout">
          <div>
            <label className="tt-label" htmlFor="type-item">Type d’item</label>
            <select id="type-item" className="tt-input" value={typeAjout} onChange={(e) => setTypeAjout(e.target.value as TypeItem)}>
              {TYPES.map((type) => <option key={type.type} value={type.type}>{type.titre}</option>)}
            </select>
          </div>
          <div>
            <label className="tt-label" htmlFor="nom-item">Nom de l’item</label>
            <input id="nom-item" className="tt-input" value={libelleAjout} onChange={(e) => setLibelleAjout(e.target.value)} placeholder="Ex. Téléphone OSEG" maxLength={150} />
          </div>
        </div>
        <p className="tt-aide">{TYPES.find((type) => type.type === typeAjout)?.aide}</p>
        <button type="button" className="tt-bouton tt-bouton-secondaire" onClick={ajouterItem}>+ Ajouter cet item</button>
      </section>

      <section className="tt-carte">
        <h2>Items de la tournée ({items.length})</h2>
        {items.length === 0 ? <p className="tt-vide">Aucun item ajouté.</p> : (
          <div className="tt-liste-items">
            {items.map((item, index) => (
              <div className="tt-item-edition" key={item.id}>
                <span className="tt-numero">{index + 1}</span>
                <div className="tt-item-corps">
                  <span className="tt-badge">{TYPES.find((type) => type.type === item.type)?.titre}</span>
                  <input className="tt-input" aria-label={`Nom de l’item ${index + 1}`} value={item.libelle} onChange={(e) => renommerItem(item.id, e.target.value)} />
                </div>
                <button type="button" className="tt-supprimer" onClick={() => supprimerItem(item.id)} aria-label={`Supprimer ${item.libelle}`}>Supprimer</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {erreur && <p className="tt-erreur" role="alert">{erreur}</p>}
      <div className="tt-actions"><button type="submit" className="tt-bouton tt-bouton-principal">{libelleBouton}</button></div>
    </form>
  );
}
