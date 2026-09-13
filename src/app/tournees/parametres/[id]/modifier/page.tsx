"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditeurModeleTournee from "@/components/EditeurModeleTournee";
import { lireModele, modifierModele, type ItemControle, type ModeleTournee } from "@/lib/modelesTournees";

export default function PageModifierTournee() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [modele, setModele] = useState<ModeleTournee | null | undefined>(undefined);
  useEffect(() => setModele(lireModele(params.id)), [params.id]);
  function enregistrer(titre: string, items: ItemControle[]) {
    if (modele) modifierModele(modele.id, titre, items);
    router.push("/tournees/parametres");
  }
  if (modele === undefined) return <main className="page">Chargement…</main>;
  if (modele === null) return <main className="page"><h1>Modèle introuvable</h1><Link href="/tournees/parametres">Retour aux paramètres</Link></main>;
  return <main className="page"><div className="barre-retour"><Link href="/tournees/parametres" className="bouton bouton--discret">← Annuler</Link></div><h1 className="titre-page">Modifier « {modele.titre} »</h1><p className="texte-doux">Renommez la tournée, ajoutez des items ou supprimez ceux devenus inutiles.</p><EditeurModeleTournee modele={modele} libelleBouton="Enregistrer les modifications" onEnregistrer={enregistrer} /></main>;
}
