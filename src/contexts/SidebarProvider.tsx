import React, { createContext, useCallback, useContext, useState } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const openSidebar = useCallback(() => setIsOpen(true), []);

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, closeSidebar, openSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
};
