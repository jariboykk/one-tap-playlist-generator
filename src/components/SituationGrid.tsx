import { Sun, Moon, Headphones, Dumbbell, PartyPopper, Car, Gamepad2, Activity, Broom } from "lucide-react";
import { SituationButton } from "./SituationButton";
import { useToast } from "@/components/ui/use-toast";

const situations = [
  { icon: Sun, label: "Morning" },
  { icon: Headphones, label: "Relax" },
  { icon: Headphones, label: "Study" },
  { icon: Dumbbell, label: "Workout" },
  { icon: PartyPopper, label: "Party" },
  { icon: Car, label: "Drive" },
  { icon: Moon, label: "Sleep" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Activity, label: "On the Go" },
  { icon: Broom, label: "Housework" },
];

interface SituationGridProps {
  onSelect: (situation: string) => void;
}

export const SituationGrid = ({ onSelect }: SituationGridProps) => {
  const { toast } = useToast();

  const handleClick = (situation: string) => {
    toast({
      title: "Generating playlist...",
      description: `Creating the perfect ${situation.toLowerCase()} playlist for you!`,
    });
    onSelect(situation);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {situations.map((situation) => (
        <SituationButton
          key={situation.label}
          icon={situation.icon}
          label={situation.label}
          onClick={() => handleClick(situation.label)}
        />
      ))}
    </div>
  );
};