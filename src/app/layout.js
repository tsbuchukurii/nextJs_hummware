import "./globals.css";
import HeaderComponent from "@/components/HeaderComponent";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
          <HeaderComponent />
              {children}
          <footer>hummware</footer>
      </body>
    </html>
  );
};

export default RootLayout;
