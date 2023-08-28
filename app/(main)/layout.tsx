import "../globals.css";
import "../../public/assets/css/all.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Headers/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D3M Dashboard",
  description: "Developed by Genesis Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
