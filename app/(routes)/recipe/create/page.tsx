'use client';

import RecipeForm from '@/components/RecipeForm';
import { Recipe } from '@/types/recipe';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { saveRecipe } from '@/lib/localStorage';

export default function Create() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (recipeData: Omit<Recipe, 'id' | 'versions'>) => {
    if (session?.user?.email) {
      const newRecipe: Recipe = {
        ...recipeData,
        versions: [],
      };
      console.log('new Recipe', newRecipe);
      saveRecipe(session.user.email, newRecipe);
      router.push('/');
    }
  };

  return (
    <div className='flex flex-col items-center p-6 w-full overflow-y-scroll no-scrollbar'>
      <h2 className='text-2xl'>새 레시피 만들기</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}
