import { Inter } from "next/font/google";
import "./globals.css";
import TokenProvider from "@/context/TokenContext";
import UserProvider from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Password Safe",
  description: "Safe your passwords in a safe place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <TokenProvider>{children}</TokenProvider>
        </UserProvider>
      </body>
    </html>
  );
}
