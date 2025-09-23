import { useTheme } from '../../contexts/ThemeContextProvider';
import { useSidebar } from '../../contexts/SidebarProvider';

const HamburgerIcon = () => {
  const { theme } = useTheme();
  const { toggleSidebar, isOpen } = useSidebar();
  return (
    <div
      onClick={() => toggleSidebar()}
      className='md:hidden w-fit h-fit cursor-pointer z-5'
    >
      <div
        className={`w-10 h-1 ${
          theme === 'light' ? 'bg-black' : 'bg-white'
        } my-1 transform transition-all duration-500 ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      ></div>
      <div
        className={`w-10 h-1 ${
          theme === 'light' ? 'bg-black' : 'bg-white'
        } my-1 transform transition-all duration-500 ${
          isOpen ? 'opacity-0' : ''
        }`}
      ></div>
      <div
        className={`w-10 h-1 ${
          theme === 'light' ? 'bg-black' : 'bg-white'
        } my-1 transform transition-all duration-500 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      ></div>
    </div>
  );
};

export default HamburgerIcon;
