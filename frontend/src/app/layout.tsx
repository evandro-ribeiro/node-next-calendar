import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu Calendário",
  description: "Projeto criado para o desafio da Tokenlab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
