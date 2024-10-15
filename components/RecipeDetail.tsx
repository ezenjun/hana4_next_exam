'use client';

import Timer from '@/components/Timer';
import Link from 'next/link';
import { useState } from 'react';
import { getRecipeById, updateRecipe } from '@/lib/localStorage';
import { Button } from './ui/button';

const RecipeDetail = ({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: number;
}) => {
  const [recipe, setRecipe] = useState(getRecipeById(userId, recipeId));

  if (!recipe) {
    return (
      <div className='text-center text-red-500'>레시피를 찾을 수 없습니다.</div>
    );
  }

  const restoreVersion = (versionIndex: number) => {
    const restoredVersion = recipe.versions[versionIndex];
    const updatedRecipe = {
      ...recipe,
      title: restoredVersion.title,
      tags: restoredVersion.tags,
      ingredients: restoredVersion.ingredients,
      steps: restoredVersion.steps,
    };
    updateRecipe(userId, updatedRecipe, recipeId);
    setRecipe(updatedRecipe);
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete recipe');
  };

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
              <p>{version.date.toLocaleString()}</p>
              <p>{version.title}</p>
            </div>
            <Button
              onClick={() => restoreVersion(index)}
              variant='default'
              size='sm'
            >
              복원
            </Button>
          </div>
        ))
      ) : (
        <p>수정 기록이 없습니다.</p>
      )}

      <div className='flex items-center justify-center gap-2 mt-6'>
        <Button className='bg-blue-500 text-white px-4 py-2 rounded'>
          <Link href={`/recipe/edit/${recipeId}`}>수정</Link>
        </Button>
        <Button
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 rounded'
        >
          삭제
        </Button>
        <Button className='bg-gray-500 text-white px-4 py-2 rounded'>
          <Link href='/'>목록</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecipeDetail;
