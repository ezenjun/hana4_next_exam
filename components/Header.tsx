import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import SignInOut from './SignInOut';

export default async function Header() {
  const session = await auth();

  return (
    <header className='flex justify-between items-center p-4 bg-white shadow-md'>
      <div className='logo'>
        <Link href='/' className='text-xl font-bold'>
          나만의 레시피
        </Link>
      </div>
      <div className='actions space-x-2'>
        {session?.user && (
          <Button variant='outline' asChild>
            <Link href='/recipe/create'>레시피 추가</Link>
          </Button>
        )}
        <SignInOut />
      </div>
    </header>
  );
}
