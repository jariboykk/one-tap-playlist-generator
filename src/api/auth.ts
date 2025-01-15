import axios from 'axios';

/**
 * Authorization ヘッダー用の Base64 エンコードを返す
 */
const getAuthHeader = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  return `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
};

/**
 * Authorization Code を使って Access Token を取得
 */
export const exchangeCodeForToken = async (code: string) => {
  try {
    console.log('Exchanging code for token...');
    console.log('Request URL:', '/api/spotify/api/token');
    console.log('Request params:', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    });

    // Basic認証でclient_id & client_secretを送るので
    // リクエストボディに重複して入れない
    const response = await axios.post(
      '/api/spotify/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: getAuthHeader(), // Basic <base64(clientId:clientSecret)>
        },
      }
    );

    console.log('Token exchange response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};

/**
 * リフレッシュトークンを使って新しい Access Token を取得
 */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    console.log('Refreshing access token...');
    // Basic認証 + リクエストボディは refresh_token など最小限
    const response = await axios.post(
      '/api/spotify/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: getAuthHeader(),
        },
      }
    );

    console.log('Token refresh response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
