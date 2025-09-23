import { useTheme } from '../../../contexts/ThemeContextProvider';

const PokemonStatCard = ({
  statName,
  statValue,
}: {
  statName: string;
  statValue: string;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div
      className={`flex justify-between flex-1 items-center h-full border border-gray-500 p-2 rounded-lg ${
        isLight ? 'bg-cyan-800' : 'bg-cyan-600'
      }`}
    >
      <h2 className={`text-white font-extrabold text-lg md:text-xl`}>
        {statName.toUpperCase()}
      </h2>
      <h4
        className={`${
          isLight ? 'text-amber-500' : 'text-amber-400'
        } font-bold text-xl md:text-2xl`}
      >
        {statValue}
      </h4>
    </div>
  );
};

export default PokemonStatCard;
