import { useEffect } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

const Callback = () => {
  const { accessToken, error } = useSpotifyAuth();

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      {accessToken ? (
        <p>認証に成功しました！リダイレクト中...</p>
      ) : (
        <p>認証中...</p>
      )}
    </div>
  );
};

export default Callback;
