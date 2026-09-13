"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import EditeurModeleTournee from "@/components/EditeurModeleTournee";
import { creerModele, type ItemControle } from "@/lib/modelesTournees";

export default function PageNouvelleTournee() {
  const router = useRouter();
  function enregistrer(titre: string, items: ItemControle[]) {
    creerModele(titre, items);
    router.push("/tournees/parametres");
  }
  return <main className="page"><div className="barre-retour"><Link href="/tournees/parametres" className="bouton bouton--discret">← Annuler</Link></div><h1 className="titre-page">Créer une tournée terrain</h1><p className="texte-doux">Définissez son titre et les champs que l’utilisateur devra remplir.</p><EditeurModeleTournee libelleBouton="Créer la tournée" onEnregistrer={enregistrer} /></main>;
}
