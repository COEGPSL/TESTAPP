"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RetourAccueil from "@/components/RetourAccueil";
import { lireModeles, type ModeleTournee } from "@/lib/modelesTournees";

export default function PageTourneesTerrain() {
  const [modeles, setModeles] = useState<ModeleTournee[]>([]);
  useEffect(() => setModeles(lireModeles()), []);

  return (
    <main className="page">
      <RetourAccueil />
      <header className="tt-entete">
        <div><h1 className="titre-page">Tournées terrain</h1><p className="texte-doux">Sélectionnez la tournée à réaliser.</p></div>
        <Link href="/tournees/parametres" className="tt-engrenage" aria-label="Paramètres des tournées terrain" title="Paramètres TT">⚙</Link>
      </header>
      <div className="tt-grille">
        {modeles.map((modele) => (
          <Link className="tt-carte tt-carte-lien" href={`/tournees/realiser/${modele.id}`} key={modele.id}>
            <strong>{modele.titre}</strong><span>{modele.items.length} item{modele.items.length > 1 ? "s" : ""} à renseigner</span>
          </Link>
        ))}
      </div>
      {modeles.length === 0 && <div className="tt-carte tt-vide">Aucune tournée configurée. Utilisez la roue crantée pour en créer une.</div>}
    </main>
  );
}
