interface SpotifyPlayerProps {
  situation: string;
}

export const SpotifyPlayer = ({ situation }: SpotifyPlayerProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white/5 backdrop-blur-sm rounded-xl animate-fade-in">
      <div className="aspect-video bg-spotify-dark rounded-lg p-6 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-spotify-purple mb-2">
            Your {situation} Playlist
          </h3>
          <p className="text-white/60">
            This is where the Spotify player would be embedded
          </p>
        </div>
      </div>
    </div>
  );
};