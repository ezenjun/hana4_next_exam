'use client';

import Timer from '@/components/Timer';
import { Recipe } from '@/types/recipe';
import { MinusCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteRecipe,
  getRecipeById,
  removeVersion,
  updateRecipe,
} from '@/lib/localStorage';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const RecipeDetail = ({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchRecipe = useCallback(() => {
    const userRecipe = getRecipeById(userId, recipeId);
    setRecipe(userRecipe);
    setIsLoading(false);
  }, [userId, recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleEdit = useCallback(() => {
    router.push(`/recipe/edit/${recipeId}`);
  }, [router, recipeId]);

  const handleDelete = useCallback(() => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteRecipe(userId, recipeId);
      router.push('/');
    }
  }, [userId, router, recipeId]);

  const handleBack = useCallback(() => {
    router.push('/');
  }, [router]);

  const restoreVersion = useCallback(
    (versionIndex: number) => {
      if (recipe) {
        const restoredVersion = recipe.versions[versionIndex];
        const updatedRecipe = {
          ...recipe,
          title: restoredVersion.title,
          tags: restoredVersion.tags,
          ingredients: restoredVersion.ingredients,
          steps: restoredVersion.steps,
        };
        updateRecipe(userId, updatedRecipe, recipeId);
        fetchRecipe();
      }
    },
    [userId, recipeId, recipe, fetchRecipe]
  );

  const deleteVersion = useCallback(
    (versionIndex: number) => {
      if (confirm('이 버전을 삭제하시겠습니까?')) {
        removeVersion(userId, recipeId, versionIndex);
        fetchRecipe(); // Fetch fresh data from localStorage
      }
    },
    [userId, recipeId, fetchRecipe]
  );

  if (isLoading) {
    return (
      <div className='flex w-full h-full items-center justify-center '>
        <div className='flex flex-wrap justify-around gap-3 items-start '>
          <div className='flex flex-col space-y-3'>
            <Skeleton className='h-[500px] w-[500px] rounded-xl bg-white' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[500px] bg-white ' />
              <Skeleton className='h-4 w-[250px] bg-white ' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className='text-center text-red-500'>레시피를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className='w-2/3 p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-3xl font-bold mb-4'>{recipe.title}</h1>
      <div className='mb-4'>
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className='inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2'
          >
            #{tag}
          </span>
        ))}
      </div>
      <h2 className='text-2xl font-semibold mb-2'>재료</h2>
      <ul className='list-disc list-inside mb-4'>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className='text-gray-700'>
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className='text-2xl font-semibold mb-2'>조리 과정</h2>
      {recipe.steps.map((step, index) => (
        <div
          key={index}
          className='flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-md shadow-sm'
        >
          <p className='flex-grow text-gray-800'>
            {index + 1}. {step}
          </p>
          <Timer />
        </div>
      ))}

      <h2 className='text-xl font-semibold mt-6'>수정 기록</h2>
      {recipe.versions && recipe.versions.length > 0 ? (
        recipe.versions.map((version, index) => (
          <div
            key={index}
            className='flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm mb-2'
          >
            <div>
              <p>
                버전 {index + 1}. {version.title} 수정일 (
                {formatDate(new Date(version.date))})
              </p>
              <p></p>
              <p></p>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                onClick={() => restoreVersion(index)}
                variant='default'
                size='sm'
              >
                이 버전으로 복원
              </Button>
              <MinusCircleIcon
                className='h-6 w-6 text-red-500 cursor-pointer'
                onClick={() => deleteVersion(index)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>수정 기록이 없습니다.</p>
      )}

      <div className='flex items-center justify-center gap-2 mt-6'>
        <Button
          onClick={handleEdit}
          className='bg-blue-500 text-white px-4 py-2 rounded'
          asChild
        >
          <Link href={`/recipe/edit/${recipeId}`}>수정</Link>
        </Button>
        <Button
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 rounded'
        >
          삭제
        </Button>
        <Button
          onClick={handleBack}
          className='bg-gray-500 text-white px-4 py-2 rounded'
          asChild
        >
          <Link href={`/`}>목록으로</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecipeDetail;
