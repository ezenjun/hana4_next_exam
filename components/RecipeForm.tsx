'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Recipe } from '@/types/recipe';
import { MinusCircleIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

interface RecipeFormProps {
  initialRecipe?: Recipe;
  onSubmit: (recipe: Omit<Recipe, 'id' | 'versions'>) => void;
}

const RecipeForm = ({ initialRecipe, onSubmit }: RecipeFormProps) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>(initialRecipe?.title || '');
  const [tags, setTags] = useState<string[]>(initialRecipe?.tags || []);
  const [ingredients, setIngredients] = useState<string[]>(
    initialRecipe?.ingredients || []
  );
  const [steps, setSteps] = useState<string[]>(initialRecipe?.steps || []);
  const [isModified, setIsModified] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const stepRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (tagRef.current && tagRef.current.value.trim()) {
      setTags([...tags, tagRef.current.value.trim()]);
      tagRef.current.value = '';
      setIsModified(true);
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const addIngredient = () => {
    if (ingredientRef.current && ingredientRef.current.value.trim()) {
      setIngredients([...ingredients, ingredientRef.current.value.trim()]);
      ingredientRef.current.value = '';
      setIsModified(true);
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const addStep = () => {
    if (stepRef.current && stepRef.current.value.trim()) {
      setSteps([...steps, stepRef.current.value.trim()]);
      stepRef.current.value = '';
      setIsModified(true);
    }
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
    setIsModified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && tags.length && ingredients.length && steps.length) {
      console.log({ title, tags, ingredients, steps });
      onSubmit({ title, tags, ingredients, steps });
      setIsModified(false);
    } else {
      alert('모든 항목이 채워지지 않았어요');
    }
  };

  useEffect(() => {
    if (initialRecipe) {
      setTitle(initialRecipe.title);
      setTags(initialRecipe.tags);
      setIngredients(initialRecipe.ingredients);
      setSteps(initialRecipe.steps);
    }
  }, [initialRecipe]);

  useEffect(() => {
    const checkIfModified = () => {
      if (initialRecipe) {
        const isModified =
          title !== initialRecipe.title ||
          JSON.stringify(tags) !== JSON.stringify(initialRecipe.tags) ||
          JSON.stringify(ingredients) !==
            JSON.stringify(initialRecipe.ingredients) ||
          JSON.stringify(steps) !== JSON.stringify(initialRecipe.steps);
        setIsModified(isModified);
      } else {
        setIsModified(
          title !== '' &&
            tags.length > 0 &&
            ingredients.length > 0 &&
            steps.length > 0
        );
      }
    };

    checkIfModified();
  }, [title, tags, ingredients, steps, initialRecipe]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 p-6'>
      <Input
        value={title}
        ref={titleRef}
        onChange={handleTitleChange}
        placeholder='레시피 제목'
        required
      />

      <div className='flex flex-col gap-2'>
        <div className='flex gap-8'>
          <Input ref={tagRef} placeholder='태그' />
          <Button type='button' onClick={addTag}>
            태그 추가
          </Button>
        </div>
        <div className='flex flex-wrap gap-y-2 list-inside list-disc'>
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className='flex mr-2 bg-white px-2 py-1 rounded-md items-center justify-between gap-2'
            >
              {tag}{' '}
              <MinusCircleIcon
                className='h-4 w-4 ml-1 cursor-pointer'
                onClick={() => removeTag(idx)}
              />
            </li>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-8'>
          <Input ref={ingredientRef} placeholder='재료' />
          <Button type='button' onClick={addIngredient}>
            재료 추가
          </Button>
        </div>
        <ul className='flex flex-wrap gap-y-2 list-inside list-disc'>
          {ingredients.map((ing, idx) => (
            <li
              key={idx}
              className='flex mr-2 bg-white px-2 py-1 rounded-md items-center justify-between gap-2'
            >
              {ing}
              <MinusCircleIcon
                className='h-4 w-4 ml-1 cursor-pointer'
                onClick={() => removeIngredient(idx)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-8'>
          <Input ref={stepRef} placeholder='조리 과정' />
          <Button type='button' onClick={addStep}>
            과정 추가
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          {steps.map((step, idx) => (
            <div key={idx} className='flex'>
              <div className='flex bg-white px-2 py-1 rounded-md justify-between items-center gap-2'>
                {idx + 1}. {step}
                <MinusCircleIcon
                  className='h-4 w-4 ml-1 cursor-pointer'
                  onClick={() => removeStep(idx)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center gap-2'>
        <Button
          type='submit'
          disabled={!isModified}
          className={`w-full ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {initialRecipe ? '레시피 수정' : '레시피 저장'}
        </Button>
        <Button
          variant='secondary'
          className='bg-white'
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
