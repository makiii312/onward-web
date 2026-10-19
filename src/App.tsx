import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { SidebarProvider } from './context/sidebar/SidebarProvider.tsx';
import { router } from './config/router.tsx';
import { TooltipProvider } from './shared/components/ui/tooltip.tsx';

const App = () => {
  return (
    <SidebarProvider>
      <Toaster id="global" position="top-right" />
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default App;
