import { useEffect, useState, useCallback } from 'react';
import { exchangeCodeForToken, refreshAccessToken } from '../api/auth';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ');

export const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem('spotify_access_token');
    console.log('Initial access token from localStorage:', token);
    return token;
  });
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(() => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      scope: SPOTIFY_SCOPES,
      show_dialog: 'true',
    });

    window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    if (!refreshToken) {
      setError('No refresh token available');
      return;
    }

    try {
      const data = await refreshAccessToken(refreshToken);
      setAccessToken(data.access_token);
      localStorage.setItem('spotify_access_token', data.access_token);
      console.log('Access token refreshed');
    } catch (err) {
      setError('Failed to refresh access token');
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
    }
  }, []);

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
          localStorage.setItem('spotify_access_token', data.access_token);
          if (data.refresh_token) {
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
          }
          
          const redirectUri = new URL(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
          window.location.href = redirectUri.origin;
        } catch (err) {
          setError('Failed to authenticate with Spotify');
          const redirectUri = new URL(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
          window.location.href = redirectUri.origin;
        }
      }
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get('code')) {
      handleCallback();
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // アクセストークンの有効期限を監視（50分ごとに更新）
    const interval = setInterval(() => {
      refreshToken();
    }, 50 * 60 * 1000); // 50分

    return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

  return { accessToken, error, login, refreshToken };
};
