
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
// import ScrollToTop from "@/components/utils/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Header />
        {/* <ScrollToTop /> */}
        {children}
        {/* Footer */}
      <Footer />

      </body>
    </html>
  );
}
