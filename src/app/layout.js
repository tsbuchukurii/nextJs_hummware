import "./globals.css";
import {AuthProvider} from "@/context/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <header>
              <nav>
                  <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/api/auth/signin">Login</a>
                    </li>
                  </ul>
              </nav>
          </header>
          <AuthProvider>{children}</AuthProvider>
          <footer>hummware</footer>
      </body>
    </html>
  );
}
