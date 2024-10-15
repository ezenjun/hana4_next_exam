import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  } as Intl.DateTimeFormatOptions;

  return date
    .toLocaleString('ko-KR', options)
    .replace(/\. /g, '.')
    .replace(/ /g, ' ')
    .replace(/:\d{2}$/, (match) => match.padStart(3, ':0'));
}
