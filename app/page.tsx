import RecipeList from '@/components/RecipeList';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return (
      <div className='flex flex-col h-full justify-center items-center p-4 gap-3 border-2 text-2xl'>
        레시피를 확인하려면 로그인해주세요
      </div>
    );
  }

  return (
    <div className='flex h-full justify-center overflow-y-hidden'>
      <div className='p-4 w-2/3 overflow-y-scroll no-scrollbar'>
        <Suspense fallback={<div>Loading...</div>}>
          <RecipeList userId={session.user.email} />
        </Suspense>
      </div>
    </div>
  );
}
