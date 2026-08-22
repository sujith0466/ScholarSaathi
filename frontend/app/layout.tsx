import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarSaathi | Citizen Scholarship Journey Guide",
  description:
    "Empowering Indian students with plain-language scholarship diagnosis, document defect resolution, and grounded guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
