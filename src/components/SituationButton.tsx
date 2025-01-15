import { LucideIcon } from "lucide-react";

interface SituationButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const SituationButton = ({ icon: Icon, label, onClick }: SituationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-spotify-purple/10 transition-all duration-300 group animate-fade-in"
    >
      <Icon className="w-12 h-12 mb-3 text-spotify-purple group-hover:scale-110 transition-transform duration-300" />
      <span className="text-white/90 font-medium">{label}</span>
    </button>
  );
};