import { useState } from "react";
import { SituationGrid } from "@/components/SituationGrid";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { ShareButtons } from "@/components/ShareButtons";

const Index = () => {
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-spotify-purple to-spotify-light bg-clip-text text-transparent">
            OneTap Music
          </h1>
          <p className="text-white/60 text-lg md:text-xl">
            Generate the perfect playlist for any moment
          </p>
        </header>

        <SituationGrid onSelect={setSelectedSituation} />

        {selectedSituation && (
          <div className="mt-12">
            <SpotifyPlayer situation={selectedSituation} />
            <ShareButtons situation={selectedSituation} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;