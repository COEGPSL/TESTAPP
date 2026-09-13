export type TypeItem = "dateHeure" | "choix" | "commentaires" | "nom";

export type ItemControle = {
  id: string;
  type: TypeItem;
  libelle: string;
};

export type ModeleTournee = {
  id: string;
  titre: string;
  items: ItemControle[];
  creeLe: string;
  modifieLe: string;
};

export type TourneeRealisee = {
  id: string;
  modeleId: string;
  titreModele: string;
  reponses: Record<string, string>;
  enregistreeLe: string;
};

export const NOMS_DISPONIBLES = ["Jérôme", "Nacéra", "Édouard"] as const;
export const CHOIX_CONTROLE = ["OK", "NC", "KO"] as const;

const CLE_MODELES = "coeg.modeles-tournees.v2";
const CLE_REALISATIONS = "coeg.tournees-realisees.v2";

/** Premier modèle conservé. Il peut ensuite être modifié ou supprimé. */
const MODELE_INITIAL: ModeleTournee = {
  id: "tt-bureau",
  titre: "TT Bureau",
  creeLe: "2026-09-13T00:00:00.000Z",
  modifieLe: "2026-09-13T00:00:00.000Z",
  items: [
    { id: "date-tournee", type: "dateHeure", libelle: "Date et heure de la tournée" },
    { id: "nom-oseg", type: "nom", libelle: "Nom de l’OSEG" },
    { id: "controle-general", type: "choix", libelle: "Contrôle général" },
    { id: "commentaires", type: "commentaires", libelle: "Commentaires" },
  ],
};

function navigateurDisponible() {
  return typeof window !== "undefined";
}

function identifiant(prefixe: string) {
  return `${prefixe}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function nouvelIdentifiantItem() {
  return identifiant("item");
}

export function lireModeles(): ModeleTournee[] {
  if (!navigateurDisponible()) return [];
  try {
    const valeur = window.localStorage.getItem(CLE_MODELES);
    if (!valeur) {
      window.localStorage.setItem(CLE_MODELES, JSON.stringify([MODELE_INITIAL]));
      return [MODELE_INITIAL];
    }
    const donnees: unknown = JSON.parse(valeur);
    return Array.isArray(donnees) ? (donnees as ModeleTournee[]) : [];
  } catch {
    return [];
  }
}

export function lireModele(id: string): ModeleTournee | null {
  return lireModeles().find((modele) => modele.id === id) ?? null;
}

export function creerModele(titre: string, items: ItemControle[]): ModeleTournee {
  const maintenant = new Date().toISOString();
  const modele: ModeleTournee = {
    id: identifiant("tournee"),
    titre: titre.trim(),
    items,
    creeLe: maintenant,
    modifieLe: maintenant,
  };
  const modeles = lireModeles();
  window.localStorage.setItem(CLE_MODELES, JSON.stringify([...modeles, modele]));
  return modele;
}

export function modifierModele(id: string, titre: string, items: ItemControle[]): boolean {
  const modeles = lireModeles();
  const index = modeles.findIndex((modele) => modele.id === id);
  if (index < 0) return false;
  modeles[index] = {
    ...modeles[index],
    titre: titre.trim(),
    items,
    modifieLe: new Date().toISOString(),
  };
  window.localStorage.setItem(CLE_MODELES, JSON.stringify(modeles));
  return true;
}

export function supprimerModele(id: string): boolean {
  const modeles = lireModeles();
  const restants = modeles.filter((modele) => modele.id !== id);
  if (restants.length === modeles.length) return false;
  window.localStorage.setItem(CLE_MODELES, JSON.stringify(restants));
  return true;
}

export function enregistrerRealisation(
  modele: ModeleTournee,
  reponses: Record<string, string>,
): TourneeRealisee {
  const realisation: TourneeRealisee = {
    id: identifiant("realisation"),
    modeleId: modele.id,
    titreModele: modele.titre,
    reponses,
    enregistreeLe: new Date().toISOString(),
  };
  let existantes: TourneeRealisee[] = [];
  try {
    existantes = JSON.parse(window.localStorage.getItem(CLE_REALISATIONS) ?? "[]");
  } catch {
    existantes = [];
  }
  window.localStorage.setItem(CLE_REALISATIONS, JSON.stringify([realisation, ...existantes]));
  return realisation;
}
