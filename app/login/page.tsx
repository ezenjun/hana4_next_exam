'use client';

import { logIn } from '@/actions/myauth';
import EmailLogin from '@/components/EmailLogin';
import Image from 'next/image';

export default function Login() {
  return (
    <div className='flex w-full h-full items-center justify-center font-pretendard font-semibold '>
      <div className='flex flex-col  text-center p-8 bg-white rounded-lg shadow-md gap-6'>
        <h1 className='text-2xl '>로그인</h1>
        <EmailLogin></EmailLogin>

        <div className='flex justify-around'>
          <button
            onClick={() => logIn('google')}
            className='w-12 h-12 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center'
          >
            <Image
              src='https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'
              alt='Google Logo'
              width={24}
              height={24}
            />
          </button>

          <button
            onClick={() => logIn('github')}
            className='w-12 h-12 rounded-full bg-black shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center'
          >
            <Image
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='GitHub Logo'
              width={24}
              height={24}
              className='invert'
            />
          </button>
        </div>
      </div>
    </div>
  );
}
