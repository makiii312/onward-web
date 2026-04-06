import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { SidebarProvider } from './context/sidebar/SidebarProvider.tsx';
import { router } from './config/router.tsx';

const App = () => {
  return (
    <SidebarProvider>
      <Toaster id="global" position="top-right" />
      <RouterProvider router={router} />
    </SidebarProvider>
  );
};

export default App;
