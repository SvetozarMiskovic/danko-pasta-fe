import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContextProvider';
import type { PaginationMeta } from '../../../types';

const PaginationControl = ({
  pagination,
  goNextPage,
  goPrevPage,
}: {
  pagination: PaginationMeta;
  goNextPage: (page: number) => void;
  goPrevPage: (page: number) => void;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className='flex flex-col sm:flex-row items-center gap-2 py-2 px-4'>
      <h3 className={`${isLight ? 'text-black' : 'text-white'}`}>
        {pagination.currentPage} of {pagination.totalPages}
      </h3>
      <div className='flex items-center gap-2'>
        <button
          className={`border border-gray-400 rounded-md cursor-pointer ${
            !pagination.hasPreviousPage
              ? 'text-gray-400'
              : isLight
              ? 'text-black hover:text-cyan-800'
              : 'text-white hover:text-cyan-600'
          }`}
          onClick={() =>
            pagination.hasPreviousPage && goPrevPage(pagination.currentPage)
          }
        >
          <ArrowLeft size={25} />
        </button>
        <button
          className={`border border-gray-400 rounded-md cursor-pointer ${
            !pagination.hasNextPage
              ? 'text-gray-200'
              : isLight
              ? 'text-black hover:text-cyan-800'
              : 'text-white hover:text-cyan-600'
          }`}
          onClick={() =>
            pagination.hasNextPage && goNextPage(pagination.currentPage)
          }
        >
          <ArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControl;
