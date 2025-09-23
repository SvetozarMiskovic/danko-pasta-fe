import { useTheme } from '../../contexts/ThemeContextProvider';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      onClick={toggleTheme}
      className={`relative my-2 flex items-center w-20 h-9 rounded-full cursor-pointer transition-colors
        ${isLight ? 'bg-gray-200' : 'bg-gray-600'} ${className}`}
    >
      <div
        className={`absolute top-1 left-1 w-9 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out
          ${isLight ? 'translate-x-0 bg-white' : 'translate-x-9 bg-gray-800'}`}
      >
        {isLight ? (
          <Sun className='w-4 h-4 text-yellow-400' />
        ) : (
          <Moon className='w-4 h-4 text-gray-300' />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
