import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <header>
              <nav>
                  <a href="/">Home</a>
                  <a href="/dashboard">Dashboard</a>
                  <a href="/api/auth/signin">Login</a>
              </nav>
          </header>
        {children}
          <footer>My Next.js App</footer>
      </body>
    </html>
  );
}
