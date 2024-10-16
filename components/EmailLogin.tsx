'use client';

import { mySignIn } from '@/actions/myauth';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function EmailLogin({
  redirectTo = '/',
}: {
  redirectTo?: string;
}) {
  const [errorMsg, setErrorMsg] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const login = async (formData: FormData) => {
    const email = emailRef?.current?.value;
    const passwd = formData.get('passwd');
    if (!email || !passwd) return alert('input email & passwd!');

    try {
      await mySignIn('credentials', { email, passwd, redirectTo });
    } catch (error) {
      if (error instanceof Error) setErrorMsg(error.message);
      else setErrorMsg(String(error));
    }
  };
  return (
    <form action={login} className='flex flex-col gap-2'>
      <Input
        ref={emailRef}
        type='email'
        name='email'
        placeholder='example@example.com'
      />

      <Input type='password' name='passwd' placeholder='password...' />

      <Button>Login</Button>
      <div className='text-red-600'>{errorMsg}</div>
    </form>
  );
}
