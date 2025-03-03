import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CryptoProvider } from '../context/CryptoContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Dashboard',
  description: 'A simple dashboard to display cryptocurrency prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CryptoProvider>{children}</CryptoProvider>
      </body>
    </html>
  );
}