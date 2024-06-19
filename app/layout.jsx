import { Inter } from "next/font/google";
import "@/styles/globals.css";
import NavigationBar from "@/components/navigationBar/NavigationBar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropertyPulse",
  description: "Find Your Dream Rental Property",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavigationBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
