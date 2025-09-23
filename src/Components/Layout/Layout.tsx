import { Outlet } from "react-router"
import Navbar from "./Navbar"
import { useTheme } from '../../contexts/ThemeContextProvider'
import MobileSidebar from '../AuthComponents/MobileSidebar'

const Layout = () => {
  const {theme} = useTheme()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className={`w-full relative flex-1  ${theme === "light" ? "bg-slate-200" : "bg-gray-600"} flex items-center `}>
      <MobileSidebar/>
      <Outlet />
      </div>
    </div>
  )
}

export default Layout
