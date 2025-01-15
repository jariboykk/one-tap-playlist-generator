import { useEffect } from 'react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

const Callback = () => {
  console.log('Callback component rendered');

  // 1. ページマウント時に、現在のURLをログ出力
  useEffect(() => {
    console.log('Callback useEffect: window.location.search =', window.location.search);
  }, []);

  // 2. useSpotifyAuthからトークンとエラーを取得
  const { accessToken, error } = useSpotifyAuth();
  
  // 3. この時点でaccessTokenやerrorをログに出す
  console.log('Callback accessToken:', accessToken);
  console.log('Callback error:', error);

  // 4. errorが入ったときやaccessTokenが変わったときにさらに詳しくログ出力
  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
    } else {
      console.log('Authentication success or still pending. Current accessToken =', accessToken);
    }
  }, [error, accessToken]);

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
