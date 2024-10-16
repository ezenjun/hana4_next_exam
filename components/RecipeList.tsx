'use client';

import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { useEffect, useState } from 'react';
import { getRecipes } from '@/lib/localStorage';
import RecipeNotFound from './RecipeNotFound';
import { Skeleton } from './ui/skeleton';

const RecipeList = ({ userId }: { userId: string }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      const userRecipes = getRecipes(userId);
      setRecipes(userRecipes);
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className='flex w-full h-full justify-between '>
        <div className='flex flex-wrap justify-around gap-3 items-start '>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className='flex flex-col space-y-3'>
              <Skeleton className='h-[150px] w-[300px] rounded-xl bg-white ' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px] bg-white ' />
                <Skeleton className='h-4 w-[200px] bg-white ' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className='flex flex-col gap-4 w-full h-full justify-center items-center'>
        <RecipeNotFound
          title='아직 저장한 레시피가 없어요'
          subTitle='새로운 레시피를 추가해보세요'
          buttonName='레시피 추가'
          href='/recipe/create'
        />
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {recipes.map((recipe, idx) => (
        <RecipeCard key={idx} recipe={recipe} idx={idx} />
      ))}
    </div>
  );
};

export default RecipeList;
