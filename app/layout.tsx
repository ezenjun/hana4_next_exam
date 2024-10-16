import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { auth } from '@/lib/auth';
import './globals.css';

export const metadata: Metadata = {
  title: '나만의 레시피',
  description: 'Recipe app just for you',
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='kr'>
      <SessionProvider session={session}>
        <body
          className={`flex flex-col min-w-800px w-screen h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ${pretendard.variable}`}
        >
          <Header />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
