'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function SignInOut() {
  const { data: session } = useSession();
  if (session?.user)
    return (
      <Button
        className='font-pretendard'
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        로그아웃
      </Button>
    );

  return (
    <Button asChild className='font-pretendard'>
      <Link href='/api/auth/signin'>로그인</Link>
    </Button>
  );
}
