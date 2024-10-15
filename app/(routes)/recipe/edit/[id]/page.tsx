'use client';

import RecipeForm from '@/components/RecipeForm';
import { Recipe } from '@/types/recipe';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRecipeById, updateRecipe } from '@/lib/localStorage';

export default function Edit({ params: { id } }: { params: { id: number } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const fetchedRecipe = getRecipeById(session.user.email, id);
      console.log('fetchedRecipe', fetchedRecipe);
      setRecipe(fetchedRecipe);
    }
  }, [session, id]);

  const handleSubmit = async (
    formData: Omit<Recipe, 'id' | 'createdAt' | 'versions'>
  ) => {
    if (session?.user?.email && recipe) {
      const updatedRecipe: Recipe = {
        ...recipe,
        ...formData,
        versions: [
          ...recipe.versions,
          {
            ...recipe,
            date: new Date(),
          },
        ],
      };
      updateRecipe(session.user.email, updatedRecipe, id);
      router.push(`/recipe/${id}`);
    }
  };

  if (!recipe) return <div>로딩 중...</div>;

  return (
    <div className='flex flex-col items-center p-6 w-full overflow-y-scroll no-scrollbar'>
      <RecipeForm initialRecipe={recipe} onSubmit={handleSubmit} />
    </div>
  );
}
