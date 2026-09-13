"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CHOIX_CONTROLE, NOMS_DISPONIBLES, enregistrerRealisation, lireModele, type ModeleTournee } from "@/lib/modelesTournees";

function maintenantLocal() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export default function PageRealiserTournee() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [modele, setModele] = useState<ModeleTournee | null | undefined>(undefined);
  const [reponses, setReponses] = useState<Record<string, string>>({});

  useEffect(() => {
    const trouve = lireModele(params.id);
    setModele(trouve);
    if (trouve) {
      setReponses(Object.fromEntries(trouve.items.map((item) => [item.id, item.type === "dateHeure" ? maintenantLocal() : item.type === "choix" ? "NC" : item.type === "nom" ? NOMS_DISPONIBLES[0] : ""])));
    }
  }, [params.id]);

  if (modele === undefined) return <main className="page">Chargement…</main>;
  if (modele === null) return <main className="page"><h1>Tournée introuvable</h1><Link href="/tournees">Retour</Link></main>;

  function soumettre(e: React.FormEvent) {
    e.preventDefault();
    enregistrerRealisation(modele!, reponses);
    router.push("/tournees");
  }

  return (
    <main className="page">
      <div className="barre-retour"><Link href="/tournees" className="bouton bouton--discret">← Annuler</Link></div>
      <h1 className="titre-page">{modele.titre}</h1><p className="texte-doux">Complétez les éléments de cette tournée terrain.</p>
      <form onSubmit={soumettre} className="tt-formulaire">
        {modele.items.map((item) => (
          <section className="tt-carte" key={item.id}>
            <label className="tt-label" htmlFor={item.id}>{item.libelle}</label>
            {item.type === "dateHeure" && <input id={item.id} className="tt-input" type="datetime-local" value={reponses[item.id] ?? ""} onChange={(e) => setReponses({ ...reponses, [item.id]: e.target.value })} required />}
            {item.type === "nom" && <select id={item.id} className="tt-input" value={reponses[item.id] ?? NOMS_DISPONIBLES[0]} onChange={(e) => setReponses({ ...reponses, [item.id]: e.target.value })}>{NOMS_DISPONIBLES.map((nom) => <option key={nom}>{nom}</option>)}</select>}
            {item.type === "commentaires" && <textarea id={item.id} className="tt-input tt-textarea" value={reponses[item.id] ?? ""} onChange={(e) => setReponses({ ...reponses, [item.id]: e.target.value })} rows={5} />}
            {item.type === "choix" && <div className="tt-choix" role="radiogroup" aria-label={item.libelle}>{CHOIX_CONTROLE.map((choix) => <button key={choix} type="button" role="radio" aria-checked={reponses[item.id] === choix} className={`tt-option tt-option-${choix.toLowerCase()} ${reponses[item.id] === choix ? "active" : ""}`} onClick={() => setReponses({ ...reponses, [item.id]: choix })}>{choix}</button>)}</div>}
          </section>
        ))}
        <div className="tt-actions"><button className="tt-bouton tt-bouton-principal" type="submit">Enregistrer la tournée</button></div>
      </form>
    </main>
  );
}
