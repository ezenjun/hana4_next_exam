import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-pretendard'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-white mb-4'>404</h1>
        <h2 className='text-4xl font-semibold text-white mb-8'>
          페이지를 찾을 수 없습니다
        </h2>
        <p className='text-lg text-white mb-8'>
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
          <br />
          주소를 다시 확인해주시거나 아래 버튼을 눌러 홈으로 돌아가세요.
        </p>
        <Link
          href='/'
          className='px-6 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-purple-100 transition duration-300'
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
