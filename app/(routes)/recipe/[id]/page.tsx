import RecipeDetail from '@/components/RecipeDetail';
import { auth } from '@/lib/auth';

export default async function RecipeDetailPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const session = await auth();
  if (!session || !session.user?.email) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className='flex flex-col items-center p-6 w-full overflow-y-scroll no-scrollbar'>
      <RecipeDetail userId={session.user.email} recipeId={id} />
    </div>
  );
}
