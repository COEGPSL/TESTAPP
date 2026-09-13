import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/**
 * Metadonnees appliquees a toutes les pages (onglet du navigateur, SEO).
 */
export const metadata: Metadata = {
  title: "COEG",
  description: "Application COEG : tournees, OSEG, liens et contacts utiles.",
};

/**
 * Gabarit racine de l'application.
 * Tout ce qui est commun a toutes les pages se place ici.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
