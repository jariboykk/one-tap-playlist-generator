import { useEffect, useState } from 'react';
import { exchangeCodeForToken } from '../api/auth';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ');

export const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      scope: SPOTIFY_SCOPES,
      show_dialog: 'true',
    });

    window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
  };

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        console.log('Authorization code found:', code);
        try {
          const data = await exchangeCodeForToken(code);
          console.log('Token data received:', data);
          setAccessToken(data.access_token);
          // アクセストークンをlocalStorageに保存
          localStorage.setItem('spotify_access_token', data.access_token);
          console.log('Access token saved to localStorage');
          // リフレッシュトークンも保存（存在する場合）
          if (data.refresh_token) {
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
            console.log('Refresh token saved to localStorage');
          }
          
          // 認証後に元のページにリダイレクト
          console.log('Redirecting to:', import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
          const redirectUri = new URL(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
          window.location.href = redirectUri.origin;
        } catch (err) {
          setError('Failed to authenticate with Spotify');
          // エラー時も元のページにリダイレクト
          const redirectUri = new URL(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
          window.location.href = redirectUri.origin;
        }
      }
    };

    handleCallback();
  }, []);

  return { accessToken, error, login };
};
