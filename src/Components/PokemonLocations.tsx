import { useLocations } from '../hooks/useLocations';
import Pagination from './Reusable/Pagination/Pagination';
import { useTheme } from '../contexts/ThemeContextProvider';
import type { TranslationKeys } from '../types';
import { useTranslate } from '../hooks/useTranslate';

function PokemonLocations() {
  const { locations, pagination, loadingLocations, goNextPage, goPrevPage } =
    useLocations();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslate();

  return (
    <div className='max-w-7xl w-full mx-auto my-4  flex flex-col gap-4 p-2'>
      {locations.length > 0 && (
        <Pagination
          loading={loadingLocations}
          pagination={pagination}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      )}
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className={`${isLight ? 'bg-cyan-800' : 'bg-cyan-600'} w-full`}>
              {Object.keys(locations[0] || {}).map((key) => {
                const string = 'pokemon_locations_' + key;
                return (
                  <th
                    key={key}
                    className='border border-gray-400 p-2 text-white'
                  >
                    {t(string as TranslationKeys)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => {
              const name = location.name
                .split('-')
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
              const url = location.url;
              return (
                <tr
                  key={location.name}
                  className={`${
                    isLight ? 'bg-white text-black' : 'bg-gray-700 text-white'
                  }`}
                >
                  <td className='w-1/2 border border-gray-400 p-2'>{name}</td>
                  <td className='w-1/2 border border-gray-400 p-2'>{url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {locations.length > 0 && (
        <Pagination
          loading={loadingLocations}
          pagination={pagination}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      )}
    </div>
  );
}

export default PokemonLocations;
