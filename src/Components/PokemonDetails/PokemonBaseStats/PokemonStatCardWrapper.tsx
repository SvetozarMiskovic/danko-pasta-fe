import React from 'react';
import { useTheme } from '../../../contexts/ThemeContextProvider';

interface PokemonStatCardWrapperProps<T> {
  items: T[] | undefined;
  renderItem: (item: T, index: number) => React.ReactNode;
  title: string;
}
const PokemonStatCardWrapper = <T,>({
  items,
  renderItem,
  title,
}: PokemonStatCardWrapperProps<T>) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className='w-full border border-gray-400 h-full rounded-md p-2 flex flex-col gap-4'>
      <h3
        className={`${
          isLight ? 'text-black' : 'text-white'
        } text-xl md:text-2xl font-semibold underline`}
      >
        {title}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 h-full'>
        {items?.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  );
};

export default PokemonStatCardWrapper;
