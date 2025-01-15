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
  // 初期トークンを localStorage から読み込み
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem('spotify_access_token');
    console.log('Initial access token from localStorage:', token);
    return token;
  });
  const [error, setError] = useState<string | null>(null);

  // ログイン処理: Spotify認可画面へ飛ばす
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

  // リフレッシュトークンでアクセストークンを更新
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
      console.log('Access token refreshed. New token:', data.access_token);
    } catch (err) {
      setError('Failed to refresh access token');
      console.error(err);
      localStorage.removeItem('spotify_access_token');
      localStorage.removeItem('spotify_refresh_token');
    }
  }, []);

  // コールバックURL(?code=xxx) を受け取る処理
  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        console.log('Authorization code found:', code);
        try {
          // トークン取得
          const data = await exchangeCodeForToken(code);
          console.log('Token data received:', data);

          // ローカルストレージに保存
          setAccessToken(data.access_token);
          localStorage.setItem('spotify_access_token', data.access_token);
          if (data.refresh_token) {
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
          }

          // 保存できたか確認ログ
          console.log('Stored token in localStorage:', localStorage.getItem('spotify_access_token'));

          // コールバックURL ( /callback ) からトップURL へ移動
          const baseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL || 'https://one-tap-playlist-generator.lovable.app';
          window.location.href = baseUrl;
        } catch (err) {
          console.error(err);
          setError('Failed to authenticate with Spotify');
          const baseUrl = import.meta.env.VITE_SPOTIFY_BASE_URL || 'https://one-tap-playlist-generator.lovable.app';
          window.location.href = baseUrl;
        }
      }
    };

    // URLに code が付いていればcallback処理を実行
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code')) {
      handleCallback();
    }
  }, []);

  // アクセストークンがあれば、50分ごとに自動リフレッシュ
  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(() => {
      refreshToken();
    }, 50 * 60 * 1000); // 50分
    return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

  return { accessToken, error, login, refreshToken };
};
