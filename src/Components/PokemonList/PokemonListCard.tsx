import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';

interface PokemonListCardProps {
  pokeName: string;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
  hoveredPokemon: string | null;
}

const PokemonListCard = ({
  pokeName,
  onMouseLeave,
  onMouseEnter,
  backDefault,
  backShiny,
  frontDefault,
  frontShiny,
  hoveredPokemon,
}: PokemonListCardProps) => {
  const activePokemon = hoveredPokemon === pokeName;
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  return (
    <div
      key={pokeName}
      onMouseLeave={() => onMouseLeave()}
      onMouseEnter={() => onMouseEnter()}
      className={`${
        isLight ? 'bg-white hover:bg-gray-100' : 'bg-gray-800 hover:bg-gray-600'
      } duration-200 border-gray-400 border shadow-sm h-full rounded-lg `}
    >
      <div>
        <h2
          className={`p-4 capitalize ${
            isLight ? 'text-black' : 'text-white'
          } text-2xl w-full h-fit font-semibold border-b `}
        >
          {pokeName}
        </h2>
      </div>
      <div className='flex p-2 justify-evenly '>
        <div className='flex flex-col items-center text-center w-24 h-24 gap-3'>
          <img
            loading='lazy'
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
            }}
            className='h-24'
            src={activePokemon ? backDefault : frontDefault}
            alt='slika'
          />

          <h3
            className={`text-xl uppercase underline underline-offset-4 transition-all delay-75 ease-in ${
              activePokemon
                ? 'text-blue-500'
                : isLight
                ? 'text-black '
                : 'text-white'
            }`}
          >
            {t('pokemon_list_default')}
          </h3>
        </div>
        <div className='flex flex-col  items-center text-center w-24 gap-3'>
          <img
            loading='lazy'
            className='
                h-24'
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                '../../public/placeholder.png';
            }}
            src={activePokemon ? backShiny : frontShiny}
          />
          <h3
            className={`text-xl uppercase underline underline-offset-4 transition-all delay-75 ease-in ${
              activePokemon
                ? 'text-yellow-500'
                : isLight
                ? 'text-black '
                : 'text-white'
            }`}
          >
            {t('pokemon_list_shiny')}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default PokemonListCard;
