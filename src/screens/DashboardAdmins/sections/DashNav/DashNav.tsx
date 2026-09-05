import { useUser } from "@civic/auth/react";
import { BellIcon, LogOut, User as UserIcon, Shield, Settings, Menu } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

// Use a more flexible User type consistent with App.tsx
type User = {
  name?: string;
  avatar?: string;
  email?: string;
  id?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

interface DashNavProps {
  user: User;
  onLogout: () => void;
}

export const DashNav = ({ user, onLogout }: DashNavProps): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user: civicUser, signOut } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback to local logout
      onLogout();
    }
    setIsDropdownOpen(false);
  };

  // Use Civic user data if available, otherwise fallback to prop user
  const displayUser = civicUser ? {
    name: civicUser.name || civicUser.given_name || civicUser.email || user.name,
    avatar: civicUser.picture || user.avatar,
    email: civicUser.email,
    id: civicUser.id,
    givenName: civicUser.given_name,
    familyName: civicUser.family_name
  } : user;

  // Get display name with fallbacks
  const getDisplayName = () => {
    if (civicUser) {
      if (civicUser.name) return civicUser.name;
      if (civicUser.given_name && civicUser.family_name) {
        return `${civicUser.given_name} ${civicUser.family_name}`;
      }
      if (civicUser.given_name) return civicUser.given_name;
      if (civicUser.email) return civicUser.email.split('@')[0];
    }
    return user.name;
  };

  const displayName = getDisplayName();

  return (
    <header className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-3.5 bg-[#180A30]/95 backdrop-blur-md border-b-2 border-[#F5D061]/40 shadow-xl shadow-black/50 marigold-border-top">
      {/* Logo and Brand with Royal Crest */}
      <div className="flex items-center gap-2.5 lg:gap-3">
        <div className="relative w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-tr from-[#BE123C] via-[#E11D74] to-[#FF7A00] rounded-xl p-[2px] shadow-md border border-[#F5D061] flex-shrink-0">
          <div className="w-full h-full bg-[#1A0B36] rounded-[8px] flex items-center justify-center">
            <img
              className="w-5 h-5 lg:w-6 lg:h-6 object-contain filter drop-shadow-[0_2px_4px_rgba(245,208,97,0.8)]"
              alt="MineGuard"
              src="/game-icons-mine-truck.svg"
            />
          </div>
        </div>

        <div className="flex flex-col items-start min-w-0">
          <div className="self-stretch font-['Rozha_One',serif] text-sm lg:text-base whitespace-nowrap tracking-wide">
            <span className="text-[#FFF8E7]">MINE</span>
            <span className="text-[#FF7A00]">GUARD</span>
            <span className="text-[10px] font-['Rajdhani',sans-serif] font-bold text-[#F5D061] px-1.5 py-0.5 rounded bg-[#FF7A00]/20 border border-[#F5D061]/40 ml-1.5 hidden sm:inline-block">
              सुरक्षा
            </span>
          </div>

          <div className="self-stretch font-['Rajdhani',sans-serif] font-bold text-[#F5D061]/80 text-[8px] lg:text-[10px] uppercase tracking-widest hidden sm:block">
            खान प्रबंधन एवं सुरक्षा नियंत्रण
          </div>
        </div>
      </div>

      {/* User Profile Section with Royal Accents */}
      <div className="flex items-center justify-center gap-3 lg:gap-5">
        <div className="p-2 rounded-xl bg-[#260E45] border border-[#F5D061]/30 hover:border-[#FF7A00] transition-colors cursor-pointer text-[#F5D061] relative">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BE123C] border border-[#F5D061]"></span>
        </div>

        <div className="relative">
          <div 
            className="flex items-center justify-center gap-2.5 lg:gap-3 cursor-pointer bg-[#260E45]/80 hover:bg-[#32135C] px-3 py-1.5 rounded-xl border border-[#F5D061]/40 transition-all duration-200 shadow-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="w-8 h-8 lg:w-9 lg:h-9 flex-shrink-0 border border-[#F5D061]">
              <AvatarImage src={displayUser.avatar} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-tr from-[#FF7A00] to-[#E11D74] text-white font-bold text-xs">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start min-w-0 hidden sm:block">
              <span className="font-['Rozha_One',serif] text-xs lg:text-sm text-[#FFF8E7] truncate max-w-32 lg:max-w-40">
                {displayName}
              </span>
              {civicUser ? (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
                  <span className="text-[9px] font-['Rajdhani',sans-serif] font-bold text-[#10B981] uppercase tracking-wider">
                    सत्यापित • Verified
                  </span>
                </div>
              ) : (
                <span className="text-[9px] font-['Rajdhani',sans-serif] text-[#F5D061] tracking-wider uppercase">
                  अधिकारी • Officer
                </span>
              )}
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 lg:w-72 bg-[#1A0B36] border-2 border-[#F5D061]/60 rounded-2xl shadow-2xl shadow-black/80 z-50 overflow-hidden backdrop-blur-md">
              {/* User Info Header */}
              <div className="px-4 py-3.5 border-b border-[#F5D061]/30 bg-[#260E45]/90">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0 border-2 border-[#F5D061]">
                    <AvatarImage src={displayUser.avatar} alt={displayName} />
                    <AvatarFallback className="bg-gradient-to-tr from-[#FF7A00] to-[#E11D74] text-white font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-['Rozha_One',serif] text-white text-sm truncate">{displayName}</div>
                    {displayUser.email && (
                      <div className="text-xs text-[#FFF8E7]/60 truncate">{displayUser.email}</div>
                    )}
                  </div>
                </div>
                
                {civicUser && (
                  <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-['Rajdhani',sans-serif] font-bold tracking-wider uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Civic Blockchain Verified</span>
                  </div>
                )}
              </div>

              {/* Menu Items */}
              <div className="py-1.5">
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-[#FFF8E7] hover:bg-[#E11D74]/20 hover:text-[#F5D061] justify-start transition-colors duration-200"
                >
                  <UserIcon className="w-4 h-4 text-[#F5D061]" />
                  <span className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-xs">प्रोफ़ाइल • Profile</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-[#FFF8E7] hover:bg-[#E11D74]/20 hover:text-[#F5D061] justify-start transition-colors duration-200"
                >
                  <Settings className="w-4 h-4 text-[#F5D061]" />
                  <span className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-xs">सेटिंग्स • Settings</span>
                </Button>
                
                <div className="border-t border-[#F5D061]/20 my-1"></div>
                
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-3 px-4 py-2 text-[#FDA4AF] hover:bg-red-950/40 hover:text-red-300 justify-start transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span className="font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider text-xs">लॉग आउट • Logout</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};