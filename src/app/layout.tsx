import MouseGlow from '@/components/MouseGlow';
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
});

export const metadata: Metadata = {
  title: "AutoFeeder",
  description: "Your personal feed aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage.className}>
        <MouseGlow />
        <Navigation />
        <div className="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
