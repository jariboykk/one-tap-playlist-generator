import { Button } from './ui/button';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

export const SpotifyLoginButton = () => {
  const { login, error } = useSpotifyAuth();

  return (
    <div className="flex flex-col gap-2">
      <Button 
        onClick={login}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Login with Spotify
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
