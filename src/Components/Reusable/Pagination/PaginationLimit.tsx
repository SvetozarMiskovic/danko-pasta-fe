import { useTheme } from '../../../contexts/ThemeContextProvider';
import { useSearchParams } from '../../../hooks/useSearchParams';
import { useTranslate } from '../../../hooks/useTranslate';

const PaginationLimit = () => {
  const { theme } = useTheme();
  const { updateSearchParams, limit } = useSearchParams();
  const isLight = theme === 'light';
  const { t } = useTranslate();
  return (
    <div
      className={`flex flex-col items-start sm:flex-row sm:items-center gap-2 p-2 ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      <h2 className='font-semibold'>{t('pagination_limit')}:</h2>
      <select
        className={`border border-gray-400 rounded-md ${
          isLight ? 'bg-white' : 'bg-gray-800'
        }`}
        value={limit}
        onChange={(e) =>
          updateSearchParams({
            page: 1,
            limit: Number(e.currentTarget.value),
          })
        }
      >
        {[10, 20, 50].map((n) => (
          <option
            key={n}
            value={n}
          >
            {n}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaginationLimit;
