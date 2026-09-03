import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "De Palethoeve | Routeplanner",
  description: "Eenvoudige routeplanning voor maaltijdleveringen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
