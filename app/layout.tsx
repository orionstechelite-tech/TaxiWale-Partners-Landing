import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taxi Wale Partners - One Platform. Zero Chaos.',
  description:
    "India's first dedicated taxi lead-sharing platform – eliminating WhatsApp chaos, frauds, and mismatched bookings.",
  keywords: 'taxi, leads, sharing, platform, India, drivers, vendors, agents',
  authors: [{ name: 'Taxi Wale Partners' }],
};

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
