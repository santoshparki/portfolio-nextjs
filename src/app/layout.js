import "./globals.css";

export const metadata = {
  title: "Santosh Parki | Portfolio",
  description:
    "Santosh Parki portfolio - Web Developer, AI & ML Enthusiast, and Computer Science graduate from Nepal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
