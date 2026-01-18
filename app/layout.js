import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Medi.care - Doctor Appointment System",
  description: "this is Medicare Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`scroll-smooth ${inter.className}`}>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
