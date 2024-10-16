'use client';

import { mySignOut } from '@/actions/myauth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function SignInOut({
  whoami,
}: {
  whoami: () => Promise<string>;
}) {
  const [name, setName] = useState('');

  useEffect(() => {
    (async function () {
      setName(await whoami());
    })();
  }, [whoami]);

  if (name)
    return (
      <Button
        onClick={async () => {
          await mySignOut();
        }}
      >
        로그아웃
      </Button>
    );

  return (
    <Button asChild>
      <Link href='/api/auth/signin'>로그인</Link>
    </Button>
  );
}
