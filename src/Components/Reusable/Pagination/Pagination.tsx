import { useTheme } from '../../../contexts/ThemeContextProvider';
import PaginationLimit from './PaginationLimit';
import PaginationPages from './PaginationPages';
import PaginationControl from './PaginationControl';
import type { PaginationMeta } from '../../../types';

const Pagination = ({
  loading,
  goNextPage,
  goPrevPage,
  pagination,
}: {
  loading: boolean;
  pagination: PaginationMeta | null;
  goNextPage: (page: number) => void;
  goPrevPage: (page: number) => void;
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  if (!pagination) {
    return <div>...</div>;
  }

  return (
    <div
      className={`flex items-center justify-between w-full  duration-200 ${
        isLight
          ? 'bg-white border border-gray-400'
          : 'bg-gray-800 border border-white'
      } rounded-md text-lg`}
    >
      <PaginationLimit />

      <PaginationPages
        loading={loading}
        pagination={pagination}
      />

      <PaginationControl
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
        pagination={pagination}
      />
    </div>
  );
};

export default Pagination;
