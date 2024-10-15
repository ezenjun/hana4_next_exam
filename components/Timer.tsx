'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('타이머가 종료되었습니다!');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  const toggleTimer = () => {
    if (!isRunning) {
      if (inputRef.current) {
        const newTimeInMinutes = parseInt(inputRef.current.value, 10);
        if (isNaN(newTimeInMinutes) || newTimeInMinutes <= 0) {
          alert('시간을 설정해주세요.');
          return;
        }
        // Only set time if it's not already running and timeLeft is zero
        if (timeLeft === 0) {
          const newTimeInSeconds = newTimeInMinutes * 60; // Convert minutes to seconds
          setTimeLeft(newTimeInSeconds);
        }
      }
      setIsRunning(true);
    } else {
      setIsRunning(false); // Pause the timer
    }
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsRunning(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='flex flex-col items-center space-y-2'>
      <div className='flex gap-2 items-center'>
        <div className='text-md font-bold'>{formatTime(timeLeft)}</div>
        <Button onClick={toggleTimer} size='sm'>
          {isRunning ? '일시정지' : '시작'}
        </Button>
        <Button onClick={resetTimer} size='sm'>
          리셋
        </Button>
      </div>
      <div className='flex space-x-2 mt-4'>
        <Input
          type='number'
          ref={inputRef}
          className='border rounded px-2 py-1'
          placeholder='요리시간(분)'
        />
      </div>
    </div>
  );
};

export default Timer;
