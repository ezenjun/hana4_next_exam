import RecipeList from '@/components/RecipeList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return (
      <div className='flex flex-col h-full justify-center items-center p-4 gap-3 border-2 text-2xl font-semibold'>
        레시피를 확인하려면 로그인해주세요
        <Button asChild>
          <Link href='/api/auth/signin'>로그인하기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex h-full justify-center overflow-y-hidden'>
      <div className='p-4 w-2/3 overflow-y-scroll no-scrollbar'>
        <RecipeList userId={session.user.email} />
      </div>
    </div>
  );
}
