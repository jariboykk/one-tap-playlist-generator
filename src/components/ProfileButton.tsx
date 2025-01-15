import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { getUserProfile } from '../api/spotify';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ProfileButtonProps {
  onLogout: () => void;
}

const ProfileButton = ({ onLogout }: ProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const { accessToken } = useSpotifyAuth();

  useEffect(() => {
    if (accessToken) {
      getUserProfile(accessToken)
        .then(profile => setUserName(profile.display_name || profile.id))
        .catch(console.error);
    }
  }, [accessToken]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium max-w-[200px] truncate"
        >
          {userName || 'Guest'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={onLogout}>
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
