import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Recipe } from '@/types/recipe';
import Link from 'next/link';

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { id, title, tags } = recipe;
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <h2 className='text-2xl font-bold'>{title}</h2>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-500'>
          {tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/recipe/${id}`}>자세히 보기</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
