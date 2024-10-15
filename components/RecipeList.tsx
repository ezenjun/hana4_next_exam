'use client';

import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { useEffect, useState } from 'react';
import { getRecipes } from '@/lib/localStorage';

const RecipeList = ({ userId }: { userId: string }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (userId) {
      const userRecipes = getRecipes(userId);
      setRecipes(userRecipes);
    }
  }, [userId]);

  return (
    <div className='flex flex-wrap gap-3'>
      {recipes.length ? (
        recipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} idx={idx} />
        ))
      ) : (
        <div className='flex h-full items-center'>
          <h2 className='text-center items-center text-xl font-semibold'>
            아직 저장한 레시피가 없어요.
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
