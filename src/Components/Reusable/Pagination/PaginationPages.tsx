import React, { useMemo } from 'react';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import { useSearchParams } from '../../../hooks/useSearchParams';
import type { PaginationMeta } from '../../../hooks/usePokemons';
import { CircleDashed } from 'lucide-react';

const PaginationPages = ({
  pagination,
  loading,
}: {
  pagination: PaginationMeta | null;
  loading: boolean;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { updateSearchParams, limit, page } = useSearchParams();

  const pageNumbers = useMemo(() => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      );
    }

    return pages;
  }, [pagination]);

  const handlePageClick = (number: number) => {
    updateSearchParams({ page: number });
  };

  return (
    <div
      className={`hidden text-black md:flex items-center gap-3 p-3 ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      {!loading ? (
        pageNumbers.map((number, index) => {
          if (number === '...') {
            return <span key={index}>{number}</span>;
          }
          return (
            <div
              key={index}
              onClick={() => handlePageClick(Number(number))}
              className={`${
                page.toString() === number.toString()
                  ? isLight
                    ? 'bg-cyan-800 text-white'
                    : 'bg-cyan-600 text-white'
                  : isLight
                  ? 'hover:text-cyan-800'
                  : 'hover:text-cyan-600'
              } w-9 cursor-pointer  h-9 flex items-center justify-center  border border-gray-400 rounded-md p-2`}
            >
              {number}
            </div>
          );
        })
      ) : (
        <CircleDashed
          className={`animate-spin ${isLight ? 'text-black' : 'text-white'}`}
        />
      )}
    </div>
  );
};

export default PaginationPages;
