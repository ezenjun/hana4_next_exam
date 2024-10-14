import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '나만의 레시피',
  description: 'Recipe app just for you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <SessionProvider>
        <body className='flex flex-col w-screen h-screen bg-blue-50'>
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
