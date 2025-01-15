import axios from 'axios';

const getAuthHeader = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  return `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
};

export const exchangeCodeForToken = async (code: string) => {
  try {
    console.log('Exchanging code for token...');
    console.log('Request URL:', '/api/spotify/api/token');
    console.log('Request params:', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    });
    const response = await axios.post(
      '/api/spotify/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    console.log('Refreshing access token...');
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
