import { Inter } from "next/font/google";
import "@/styles/globals.css";
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropertyPulse",
  description: "Find Your Dream Rental Property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
