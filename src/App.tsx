import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Callback from './pages/Callback';
import ProfileButton from './components/ProfileButton';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';

const queryClient = new QueryClient();

const App = () => {
  const { accessToken, login, error } = useSpotifyAuth();
  console.log('Current access token:', accessToken);

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="fixed top-0 right-0 p-4">
            {accessToken && <ProfileButton onLogout={handleLogout} />}
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
