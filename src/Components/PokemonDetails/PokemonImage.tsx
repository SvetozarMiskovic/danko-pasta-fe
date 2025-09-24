import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContextProvider';

const PokemonImage = ({ string }: { string: string }) => {
  const [noImage, setNoImage] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    setNoImage(false);
  }, [string]);
  return (
    <div
      className={`w-full h-full rounded-md border border-gray-400 flex  ${
        isLight ? 'bg-white' : 'bg-gray-600'
      } items-center justify-center shadow`}
    >
      <img
        className='h-full w-full'
        onError={() => {
          setNoImage(true);
        }}
        loading='lazy'
        src={noImage ? '/placeholder.png' : string}
        alt='slika'
      />
    </div>
  );
};

export default PokemonImage;
