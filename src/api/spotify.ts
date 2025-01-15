import axios from 'axios';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// 共通のaxiosインスタンスを作っておいてもOK
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// もしユーザープロフィールを読む関数が必要ならそのまま残す
export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await spotifyApi.get('/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * 検索APIを使ってSpotify全体からランダムに1曲を取得する関数
 * @param accessToken 
 * @returns { name, artist, album, image, preview_url }
 */
export const getRandomTrack = async (accessToken: string) => {
  console.log('Making request with access token:', accessToken);

  // アルファベットのランダム1文字を生成
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];

  // offsetを0〜999の範囲でランダムに
  const randomOffset = Math.floor(Math.random() * 1000);

  try {
    // SpotifyのSearch APIを使って曲を検索
    const response = await spotifyApi.get('/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        q: randomLetter,  // 検索キーワード (ランダム文字1つ)
        type: 'track',    // トラックを検索
        limit: 1,         // 1件のみ取得
        offset: randomOffset
      }
    });

    console.log('Search response:', response.data);

    const items = response.data.tracks.items;
    if (!items || items.length === 0) {
      throw new Error('No tracks found. Try again.');
    }

    const track = items[0];
    return {
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      image: track.album.images?.[0]?.url ?? '',
      preview_url: track.preview_url
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Spotify API error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('ランダムな曲の取得に失敗しました');
  }
};
