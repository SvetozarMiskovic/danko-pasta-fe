import { useTheme } from '../../contexts/ThemeContextProvider';
import type { SpriteMap } from '../../types';

const PokemonImage = ({ sprites }: { sprites: SpriteMap | undefined }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full h-full rounded-md border border-gray-400 flex ${
        isLight ? 'bg-white' : 'bg-gray-600'
      } items-center justify-center shadow`}
    >
      <img
        loading='lazy'
        src={sprites?.other['official-artwork'].front_default as string}
        alt='slika'
      />
    </div>
  );
};

export default PokemonImage;
