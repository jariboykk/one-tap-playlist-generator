import { useState } from 'react';
import { Button } from './ui/button';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { getRandomTrack } from '../api/spotify';

export const RandomTrackButton = () => {
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // カスタムフックからアクセストークン取得
  const { accessToken } = useSpotifyAuth();

  // ボタンクリック時の処理
  const handleClick = async () => {
    console.log('Current accessToken:', accessToken);

    // 未ログインならエラー
    if (!accessToken) {
      setError('ログインが必要です');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling getRandomTrack with token:', accessToken);
      const randomTrack = await getRandomTrack(accessToken);
      console.log('Received track:', randomTrack);
      setTrack(randomTrack);
    } catch (err) {
      console.error('Error in handleClick:', {
        error: err,
        accessToken: accessToken
      });
      setError('ランダムな曲の取得に失敗しました。再度ログインしてください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* アクセストークンが無ければ注意文言 */}
      {!accessToken && (
        <p className="text-sm text-gray-400 mb-2">
          ランダムな曲を取得するにはログインが必要です
        </p>
      )}

      {/* ランダム曲取得ボタン */}
      <Button
        onClick={handleClick}
        disabled={loading || !accessToken}
        className="w-full max-w-[200px]"
      >
        {loading ? '読み込み中...' : 'ランダムな曲を取得'}
      </Button>

      {/* エラー表示 */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      {/* 取得したトラック情報 */}
      {track && (
        <div className="flex gap-4 items-center">
          <img 
            src={track.image} 
            alt={track.name}
            className="w-16 h-16 rounded"
          />
          <div>
            <p className="font-bold">{track.name}</p>
            <p className="text-sm text-gray-600">{track.artist}</p>
            <p className="text-sm text-gray-500">{track.album}</p>
          </div>
        </div>
      )}
    </div>
  );
};
