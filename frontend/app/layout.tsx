import type { Metadata } from "next";
import { Fleur_De_Leah, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const fleurDeLeah = Fleur_De_Leah({
  weight: "400",
  variable: "--font-fleur-de-leah",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Scent Journal",
  description: "Scent Journal, your daily perfume research app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fleurDeLeah.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
