import { Recipe, Version } from '@/types/recipe';

export const getRecipes = (userId: string): Recipe[] => {
  if (typeof window !== 'undefined') {
    const recipes = localStorage.getItem(`recipes_${userId}`);
    return recipes ? JSON.parse(recipes) : [];
  }
  return [];
};

export const getRecipeById = (userId: string, recipeId: number): Recipe => {
  const recipes = getRecipes(userId);
  const recipe = recipes[recipeId] as Recipe;
  return recipe;
};

export const saveRecipe = (userId: string, recipe: Recipe) => {
  const recipes = getRecipes(userId);
  recipes.push(recipe);
  localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
};

export const updateRecipe = (
  userId: string,
  updatedRecipe: Recipe,
  recipeId: number
) => {
  const recipes = getRecipes(userId);
  const oldRecipe = recipes[recipeId];

  // 기존 레시피 데이터를 버전에 추가
  const newVersion: Version = {
    date: new Date(),
    title: oldRecipe.title,
    tags: oldRecipe.tags,
    ingredients: oldRecipe.ingredients,
    steps: oldRecipe.steps,
  };

  // 새로운 레시피 데이터로 업데이트
  recipes[recipeId] = {
    ...updatedRecipe,
    versions: [...oldRecipe.versions, newVersion],
  };

  localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
};

export const deleteRecipe = (userId: string, recipeId: number): void => {
  const recipes = getRecipes(userId);

  if (recipeId >= 0 && recipeId < recipes.length) {
    recipes.splice(recipeId, 1);
    localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
  } else {
    console.error(`Invalid recipeId: ${recipeId}`);
  }
};

export const removeVersion = (userId: string, recipeId: number, versionIndex: number) => {
  const recipes = getRecipes(userId);
  const recipe = recipes[recipeId];
  
  if (versionIndex >= 0 && versionIndex < recipe.versions.length) {
    recipe.versions.splice(versionIndex, 1);

    recipes[recipeId] = recipe;
    
    localStorage.setItem(`recipes_${userId}`, JSON.stringify(recipes));
  }
};