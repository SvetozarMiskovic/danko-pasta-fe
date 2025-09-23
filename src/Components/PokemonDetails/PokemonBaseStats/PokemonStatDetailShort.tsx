import { useTheme } from '../../../contexts/ThemeContextProvider';

const PokemonStatDetailShort = ({ name }: { name: string | undefined }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <h4
      className={`text-white text-lg md:text p-2 ${
        isLight ? 'bg-cyan-800' : 'bg-cyan-600'
      } rounded-md font-bold`}
    >
      {name?.toUpperCase()}
    </h4>
  );
};

export default PokemonStatDetailShort;
