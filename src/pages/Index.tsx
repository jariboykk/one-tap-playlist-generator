import { useState } from "react";
import { SituationGrid } from "../components/SituationGrid";
import { SpotifyPlayer } from "../components/SpotifyPlayer";
import { ShareButtons } from "../components/ShareButtons";
import { SpotifyLoginButton } from "../components/SpotifyLoginButton";

const Index = () => {
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#2ebd59] to-[#1ed760] bg-clip-text text-transparent">
              Rhythm
            </span>
            <span className="text-white">Forge</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-light">
            Your instant playlist creator
          </p>
          <div className="mt-4">
            <SpotifyLoginButton />
          </div>
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
