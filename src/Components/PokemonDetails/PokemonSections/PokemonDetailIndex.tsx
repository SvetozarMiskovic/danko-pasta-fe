import { HashIcon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContextProvider';

const PokemonDetailIndex = ({ index }: { index: number }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className='flex gap-1 items-center'>
      <HashIcon className={`${isLight ? 'text-black' : 'text-white'}`} />
      <h2 className={`text-3xl ${isLight ? 'text-black' : 'text-white'}`}>
        {index + 1}
      </h2>
    </div>
  );
};

export default PokemonDetailIndex;
