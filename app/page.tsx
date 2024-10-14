import RecipeCard from '@/components/RecipeCard';
// import { Recipe } from '@/types/recipe';
import { auth } from '@/lib/auth';

// import { getRecipes } from '@/lib/localStorage';

export default async function HomePage() {
  const session = await auth();
  if (!session || !session.user?.email)
    return (
      <div className='flex flex-col h-full justify-center items-center p-4 gap-3 border-2 text-2xl'>
        레시피를 확인하려면 로그인해주세요
      </div>
    );

  // const recipes = getRecipes(session.user?.email);
  // console.log('recipes', recipes);

  const recipes = [
    {
      id: '1',
      title: 'Spaghetti Bolognese',
      tags: ['pasta', 'italian'],
      ingredients: [
        'spaghetti',
        'ground beef',
        'tomato sauce',
        'onion',
        'garlic',
      ],
      steps: [
        'Boil spaghetti according to package instructions.',
        'Cook ground beef in a pan until browned.',
        'Add onion and garlic, cook until soft.',
        'Stir in tomato sauce and simmer for 10 minutes.',
      ],
      versions: [],
    },
    {
      id: '2',
      title: 'Chicken Curry',
      tags: ['curry', 'spicy'],
      ingredients: [
        'chicken breast',
        'curry powder',
        'coconut milk',
        'onion',
        'bell pepper',
      ],
      steps: [
        'Cut chicken into cubes.',
        'Cook onion and bell pepper in a pan until soft.',
        'Add chicken and curry powder, cook until chicken is done.',
        'Pour in coconut milk and simmer for 20 minutes.',
      ],
      versions: [],
    },
    {
      id: '3',
      title: 'Caesar Salad',
      tags: ['salad', 'healthy'],
      ingredients: [
        'romaine lettuce',
        'croutons',
        'parmesan cheese',
        'Caesar dressing',
      ],
      steps: [
        'Chop romaine lettuce into bite-sized pieces.',
        'Toss lettuce with Caesar dressing.',
        'Top with croutons and parmesan cheese.',
      ],
      versions: [],
    },
    {
      id: '4',
      title: 'Pancakes',
      tags: ['breakfast', 'sweet'],
      ingredients: ['flour', 'milk', 'egg', 'sugar', 'baking powder'],
      steps: [
        'Mix flour, sugar, and baking powder in a bowl.',
        'Add milk and egg, whisk until smooth.',
        'Pour batter onto a hot griddle and cook until bubbles form.',
        'Flip and cook the other side until golden brown.',
      ],
      versions: [],
    },
    {
      id: '5',
      title: 'Grilled Cheese Sandwich',
      tags: ['sandwich', 'cheese'],
      ingredients: ['bread', 'cheddar cheese', 'butter'],
      steps: [
        'Butter one side of each bread slice.',
        'Place cheese between two slices, buttered sides out.',
        'Grill on a pan until golden brown on both sides.',
      ],
      versions: [],
    },
    {
      id: '6',
      title: 'Spaghetti Bolognese',
      tags: ['pasta', 'italian'],
      ingredients: [
        'spaghetti',
        'ground beef',
        'tomato sauce',
        'onion',
        'garlic',
      ],
      steps: [
        'Boil spaghetti according to package instructions.',
        'Cook ground beef in a pan until browned.',
        'Add onion and garlic, cook until soft.',
        'Stir in tomato sauce and simmer for 10 minutes.',
      ],
      versions: [],
    },
    {
      id: '7',
      title: 'Chicken Curry',
      tags: ['curry', 'spicy'],
      ingredients: [
        'chicken breast',
        'curry powder',
        'coconut milk',
        'onion',
        'bell pepper',
      ],
      steps: [
        'Cut chicken into cubes.',
        'Cook onion and bell pepper in a pan until soft.',
        'Add chicken and curry powder, cook until chicken is done.',
        'Pour in coconut milk and simmer for 20 minutes.',
      ],
      versions: [],
    },
    {
      id: '8',
      title: 'Caesar Salad',
      tags: ['salad', 'healthy'],
      ingredients: [
        'romaine lettuce',
        'croutons',
        'parmesan cheese',
        'Caesar dressing',
      ],
      steps: [
        'Chop romaine lettuce into bite-sized pieces.',
        'Toss lettuce with Caesar dressing.',
        'Top with croutons and parmesan cheese.',
      ],
      versions: [],
    },
    {
      id: '9',
      title: 'Pancakes',
      tags: ['breakfast', 'sweet'],
      ingredients: ['flour', 'milk', 'egg', 'sugar', 'baking powder'],
      steps: [
        'Mix flour, sugar, and baking powder in a bowl.',
        'Add milk and egg, whisk until smooth.',
        'Pour batter onto a hot griddle and cook until bubbles form.',
        'Flip and cook the other side until golden brown.',
      ],
      versions: [],
    },
    {
      id: '10',
      title: 'Grilled Cheese Sandwich',
      tags: ['sandwich', 'cheese'],
      ingredients: ['bread', 'cheddar cheese', 'butter'],
      steps: [
        'Butter one side of each bread slice.',
        'Place cheese between two slices, buttered sides out.',
        'Grill on a pan until golden brown on both sides.',
      ],
      versions: [],
    },
  ];
  // const recipes = [] as Recipe[];

  return (
    <div className='flex h-full justify-center overflow-y-hidden '>
      <div className='p-4 w-2/3 overflow-y-scroll no-scrollbar'>
        <div className='flex flex-wrap gap-3 '>
          {recipes.length ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className='flex h-full items-center'>
              <h2 className='text-center items-center text-xl font-semibqold'>
                아직 저장한 레시피가 없어요.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
