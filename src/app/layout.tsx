"use client" 
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./pageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
                 <Loading>

        {children}
        </Loading>
        <Footer />
      </body>
    </html>
  );
}
