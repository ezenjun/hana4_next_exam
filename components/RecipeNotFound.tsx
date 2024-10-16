import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  title: string;
  subTitle: string;
  buttonName: string;
  href: string;
};

const RecipeNotFound = ({ title, subTitle, buttonName, href }: Props) => {
  return (
    <div className='text-center p-8 bg-white rounded-lg shadow-md font-pretendard'>
      <DocumentMagnifyingGlassIcon className='h-24 w-24 text-gray-400 mx-auto mb-4' />
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h2>
      <p className='text-gray-600 mb-6'>{subTitle}</p>
      <Button asChild>
        <Link href={href}>{buttonName}</Link>
      </Button>
    </div>
  );
};

export default RecipeNotFound;
