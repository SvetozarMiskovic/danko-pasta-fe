import { CircleDashed, PackageOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContextProvider';
import { useTranslate } from '../../hooks/useTranslate';
import type { SectionDetails } from '../../types';

type PokemonSectionProps<T> = {
  title: string;
  section: keyof SectionDetails;
  items: { name: string; url: string }[];
  details: T[] | null;
  loading: boolean;
  onLoad: (
    section: keyof SectionDetails,
    items: { name: string; url: string }[],
    id: string
  ) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  pokemonId: string | undefined;
};

export function PokemonSection<T>({
  title,
  section,
  items,
  details,
  loading,
  onLoad,
  renderItem,
  pokemonId,
}: PokemonSectionProps<T>) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  return (
    <div
      className={` w-full border border-gray-400 rounded-md p-4 flex flex-col gap-4 ${
        isLight ? 'bg-white' : 'bg-gray-600'
      }`}
    >
      <h3
        className={`${
          isLight ? 'text-black' : 'text-white'
        } text-2xl font-semibold border-b border-black pb-2`}
      >
        {title}
      </h3>
      <div className='flex items-center gap-3 flex-wrap max-h-96 overflow-auto'>
        {!details ? (
          <button
            disabled={loading}
            onClick={() => pokemonId && onLoad(section, items, pokemonId)}
            className={`text-white font-semibold cursor-pointer hover:bg-cyan-700 p-2 border-gray-400 border rounded-md ${
              isLight ? 'bg-cyan-800' : 'bg-cyan-600'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {loading ? (
              <div className='flex items-center gap-2 justify-center font-semibold'>
                <h3>Loading...</h3>
                <CircleDashed className='animate-spin' />
              </div>
            ) : (
              `${t('load')} ${title.toLowerCase()}`
            )}
          </button>
        ) : details.length === 0 ? (
          <div
            className={`flex items-center gap-2 text-2xl ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            <PackageOpen size={30} /> No data available!
          </div>
        ) : (
          details.map((item, index) => renderItem(item, index))
        )}
      </div>
    </div>
  );
}
