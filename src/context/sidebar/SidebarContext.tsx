import { createContext } from 'react';

export type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);
