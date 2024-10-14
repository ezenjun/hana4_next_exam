import { Recipe, Version } from '@/types/recipe';

export const getRecipes = (userId: string): Recipe[] => {
  if (typeof window !== 'undefined') {
    const recipes = window.localStorage.getItem(`recipes_${userId}`);
    return recipes ? JSON.parse(recipes) : [];
  }
  return [];
};

export const saveRecipe = (userId: string, recipe: Recipe) => {
  const recipes = getRecipes(userId);
  recipes.push(recipe);
  localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
};

export const updateRecipe = (userId: string, updatedRecipe: Recipe) => {
  const recipes = getRecipes(userId);
  const index = recipes.findIndex((r) => r.id === updatedRecipe.id);

  if (index !== -1) {
    // 기존 레시피의 버전 기록 추가
    const currentVersion: Version = {
      versionId: generateUniqueId(),
      date: new Date(),
      title: updatedRecipe.title,
      tags: [...updatedRecipe.tags],
      ingredients: [...updatedRecipe.ingredients],
      steps: [...updatedRecipe.steps],
    };
    updatedRecipe.versions.push(currentVersion);

    // 레시피 업데이트
    recipes[index] = updatedRecipe;
    localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
  }
};

const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
