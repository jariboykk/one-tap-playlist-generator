import { Share2, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  situation: string;
}

export const ShareButtons = ({ situation }: ShareButtonsProps) => {
  const { toast } = useToast();

  const handleShare = (platform: string) => {
    toast({
      title: "Sharing...",
      description: `Sharing your ${situation} playlist on ${platform}!`,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6 animate-fade-in">
      <Button
        variant="outline"
        className="bg-white/5 hover:bg-spotify-purple/20"
        onClick={() => handleShare("Twitter")}
      >
        <Twitter className="mr-2 h-4 w-4" />
        Share on Twitter
      </Button>
      <Button
        variant="outline"
        className="bg-white/5 hover:bg-spotify-purple/20"
        onClick={() => handleShare("Facebook")}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Share on Facebook
      </Button>
      <Button
        variant="outline"
        className="bg-white/5 hover:bg-spotify-purple/20"
        onClick={() => handleShare("Copy Link")}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};