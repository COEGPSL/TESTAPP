"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lireModeles, supprimerModele, type ModeleTournee } from "@/lib/modelesTournees";

export default function PageParametresTT() {
  const [modeles, setModeles] = useState<ModeleTournee[]>([]);
  const [aSupprimer, setASupprimer] = useState<ModeleTournee | null>(null);
  useEffect(() => setModeles(lireModeles()), []);

  function confirmerSuppression() {
    if (!aSupprimer) return;
    supprimerModele(aSupprimer.id);
    setModeles(lireModeles());
    setASupprimer(null);
  }

  return (
    <main className="page">
      <div className="barre-retour"><Link href="/tournees" className="bouton bouton--discret">← Retour aux tournées terrain</Link></div>
      <header className="tt-entete">
        <div><h1 className="titre-page">Paramètres TT</h1><p className="texte-doux">Créez, modifiez ou supprimez les modèles de tournées terrain.</p></div>
        <Link href="/tournees/parametres/nouvelle" className="tt-bouton tt-bouton-principal">+ Ajouter une tournée</Link>
      </header>

      <section className="tt-carte">
        <h2>Tournées existantes ({modeles.length})</h2>
        {modeles.length === 0 ? <p className="tt-vide">Aucune tournée configurée.</p> : (
          <div className="tt-tableau">
            {modeles.map((modele) => (
              <div className="tt-ligne-modele" key={modele.id}>
                <div><strong>{modele.titre}</strong><span>{modele.items.length} item{modele.items.length > 1 ? "s" : ""}</span></div>
                <div className="tt-actions-ligne">
                  <Link className="tt-bouton tt-bouton-secondaire" href={`/tournees/parametres/${modele.id}/modifier`}>Modifier</Link>
                  <button className="tt-bouton tt-bouton-danger" type="button" onClick={() => setASupprimer(modele)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {aSupprimer && (
        <div className="tt-modal-fond" role="presentation">
          <div className="tt-modal" role="dialog" aria-modal="true" aria-labelledby="titre-confirmation">
            <h2 id="titre-confirmation">Supprimer « {aSupprimer.titre} »</h2>
            <p>Cette suppression retire le modèle de la liste. Cette action est irréversible sur cet appareil.</p>
            <div className="tt-actions">
              <button type="button" className="tt-bouton tt-bouton-danger" onClick={confirmerSuppression}>Confirmer la suppression</button>
              <button type="button" className="tt-bouton tt-bouton-secondaire" onClick={() => setASupprimer(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
