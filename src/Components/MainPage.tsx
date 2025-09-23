import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useTranslate } from '../hooks/useTranslate';

const MainPage = () => {
  const { t } = useTranslate();
  const fe = [
    'React ',
    'TypeScript',
    'Vite',
    'Zod',
    'TailwindCSS',
    'React Router',
    'Lucide Icons',
  ];
  const be = [
    'Node.js',
    'Express',
    'TypeScript',
    'SQLite3',
    'Zod',
    'JWT',
    'Bcrypt',
    'Node-Cache',
  ];

  const [feIndex, setFeIndex] = useState(0);
  const [beIndex, setBeIndex] = useState(0);
  const [color, setColor] = useState('');
  const [colorSecond, setColorSecond] = useState('');

  function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }

  useEffect(() => {
    const feInterval = setInterval(() => {
      setFeIndex((prev) => (prev + 1) % fe.length);

      setColor(getRandomHexColor());
    }, 2000);

    const beInterval = setInterval(() => {
      setBeIndex((prev) => (prev + 1) % be.length);
      setColorSecond(getRandomHexColor());
    }, 2000);

    return () => {
      clearInterval(feInterval);
      clearInterval(beInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden '>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-full h-full object-cover'
      >
        <source
          src='/background.mp4'
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>

      <div className='relative flex flex-col items-center justify-center h-full bg-black/80 p-4'>
        <h1 className='text-4xl font-bold'>{t('home_page_welcome')}</h1>
        <p className='mt-4 text-lg'>{t('home_page_small')}</p>
        <Link
          to='/pokemons'
          className='mt-4 p-4 border text-lg rounded-xl bg-blue-500 text-white hover:underline'
        >
          {t('home_page_main_button')}
        </Link>

        <h2 className='mt-4 text-3xl'>{t('home_page_technologies')}</h2>

        <div className='flex sm:gap-16 mt-8  font-semibold'>
          <div className='min-w-[150px] text-center'>
            <p className={`opacity-70 text-md text-2xl`}>
              {t('home_page_technology_fe')}
            </p>
            <div
              style={{ color }}
              key={feIndex}
              className='transition-all duration-700 ease-in-out opacity-100 text-3xl'
            >
              {fe[feIndex]}
            </div>
          </div>

          {/* Backend keywords */}
          <div className='min-w-[150px] text-center'>
            <p className={`opacity-70 text-md text-2xl`}>
              {t('home_page_technology_be')}
            </p>
            <div
              style={{ color: colorSecond }}
              key={beIndex}
              className='transition-all duration-700 ease-in-out opacity-100 text-3xl'
            >
              {be[beIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
