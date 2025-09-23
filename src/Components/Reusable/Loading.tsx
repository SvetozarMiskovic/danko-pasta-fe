import { Bug, CircleDashed } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContextProvider';

const Loading = ({ text }: { text?: string }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <div className='flex flex-1 h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <CircleDashed
          size={50}
          className={`animate-spin self-center ${
            isLight ? 'text-black' : 'text-white'
          }`}
        />
        <h2
          className={`text-xl animate-pulse flex items-center gap-4 italic ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {text || 'Loading...'}
          <span>
            <Bug
              size={30}
              className='text-red-400 animate-pulse'
            />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Loading;
