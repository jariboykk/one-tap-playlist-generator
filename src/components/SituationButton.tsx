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
      className="flex flex-col items-center justify-center p-6 bg-black/30 backdrop-blur-sm rounded-xl hover:bg-[#2ebd59]/10 transition-all duration-300 group animate-fade-in border border-white/5"
    >
      <Icon className="w-12 h-12 mb-3 text-[#2ebd59] group-hover:scale-110 transition-transform duration-300" />
      <span className="text-white/90 font-medium">{label}</span>
    </button>
  );
};