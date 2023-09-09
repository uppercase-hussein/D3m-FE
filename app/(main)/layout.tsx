import "../globals.css";
import { metadata } from "../metadata";
import "../../public/assets/css/all.css";
import { Inter } from "next/font/google";
import Header from "./components/Headers/Header";
import CustomProvider from "../libs/tanstack-query/Provider";
import Toastr from "../libs/toast/Toastr";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
      <CustomProvider>
      <Toastr/>
        <Header />
        {children}
      </CustomProvider>
      </body>
    </html>
  );
}
