import { useEffect, useState, type ReactNode } from 'react';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { useTheme } from '../../contexts/ThemeContextProvider';
import PokemonModalContent from './PokemonModalContent';
import PokemonModalHeader from './PokemonModalHeader';
import PokemonModalTrigger from './PokemonModalTrigger';

interface PokemonDetailModalProps {
  trigger: ReactNode;
  title?: string;
  children?: ReactNode;
  id: string | undefined;
}

const PokemonModal = ({ trigger, title, id }: PokemonDetailModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchPokemonDetails, pokemon, loading } = usePokemonDetails();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (isOpen) fetchPokemonDetails(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <PokemonModalTrigger
        setIsOpen={setIsOpen}
        trigger={trigger}
      />
      {isOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          onClick={() => setIsOpen(false)}
          className='z-10 fixed inset-0 flex items-center justify-center bg-black/50 px-2'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isLight ? 'bg-white' : 'bg-gray-800'
            } rounded-lg shadow-lg relative w-full max-w-5xl max-h-[95vh] overflow-y-auto p-4`}
          >
            <PokemonModalHeader
              setIsOpen={setIsOpen}
              title={title}
            />
            <PokemonModalContent
              loading={loading}
              pokemon={pokemon}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonModal;
