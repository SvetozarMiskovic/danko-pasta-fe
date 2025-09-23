import { useTheme } from '../../contexts/ThemeContextProvider';

const PokemonModalHeader = ({
  title,
  setIsOpen,
}: {
  title: string | undefined;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <>
      <button
        onClick={() => setIsOpen(false)}
        className={`absolute top-2 right-2 text-2xl font-bold ${
          isLight
            ? 'text-black hover:text-gray-600'
            : 'text-white hover:text-gray-400'
        } focus:outline-none cursor-pointer`}
      >
        ✕
      </button>

      {title && (
        <h2
          className={`text-xl font-bold mb-4 ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {title}
        </h2>
      )}
    </>
  );
};

export default PokemonModalHeader;
