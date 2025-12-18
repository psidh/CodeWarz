import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

//@ts-ignore
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CodeWarz',
  description: 'Github Community GITAM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} bg-black font-mono antialiased`}>
        <AuthProvider>
          <Navbar />
          <div>{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
