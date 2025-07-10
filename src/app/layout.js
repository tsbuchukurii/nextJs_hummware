'use client'
import "./globals.css";
import HeaderComponent from "@/components/HeaderComponent";
import {SessionProvider} from "next-auth/react";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
          <SessionProvider>
            <HeaderComponent />
              {children}
            <footer>hummware</footer>
          </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
