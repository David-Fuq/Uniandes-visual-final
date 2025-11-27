import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cámaras de Velocidad Bogotá",
  description: "Análisis de efectividad de cámaras de velocidad en Bogotá",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter. className}>{children}</body>
    </html>
  );
}