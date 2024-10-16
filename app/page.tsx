import RecipeList from '@/components/RecipeList';
import { Button } from '@/components/ui/button';
import { UserCheck2Icon } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  const session = await auth();
  if (!session || !session.user?.email) {
    return (
      <div className='text-center p-8 bg-white rounded-b-lg shadow-md font-pretendard'>
        <UserCheck2Icon className='h-24 w-24 text-gray-400 mx-auto mb-4' />
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          레시피를 확인하려면 로그인해주세요
        </h2>
        <p className='text-gray-600 mb-6'>
          로그인하여 마음대로 레시피를 저장해보세요
        </p>
        <Button asChild>
          <Link href='/api/auth/signin'>로그인하기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex h-full justify-center overflow-y-hidden font-pretendard'>
      <div className='p-4 w-2/3 overflow-y-scroll no-scrollbar'>
        <RecipeList userId={session.user.email} />
      </div>
    </div>
  );
}
