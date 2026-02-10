import localFont from "next/font/local";
import "./globals.css";
import Menu from "../components/layout/Menu";

const aktura = localFont({
  src: "../../public/fonts/Aktura-Regular.ttf",
  variable: "--font-aktura",
});

const harmond = localFont({
  src: "../../public/fonts/Harmond-ExtraBoldExpanded.otf",
  variable: "--font-harmond",
});

const mathos = localFont({
  src: "../../public/fonts/TGMathosDemo-Regular.otf",
  variable: "--font-mathos",
});

const mathosBold = localFont({
  src: "../../public/fonts/TGMathosDemo-Bold.otf",
  variable: "--font-mathos-bold",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aktura.variable} ${harmond.variable} ${mathos.variable} ${mathosBold.variable}`}>
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
