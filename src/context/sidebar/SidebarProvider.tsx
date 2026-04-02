import { useState } from 'react';
import { SidebarContext } from './SidebarContext';

type SidebarProviderProps = {
  children?: React.ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};
