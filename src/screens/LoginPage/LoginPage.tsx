import { useUser } from "@civic/auth/react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

interface LoginPageProps {
  onLogin: (user: { name: string; avatar: string; email?: string; id?: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps): JSX.Element => {
  const { user, signIn } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get display name with fallbacks
  const getDisplayName = (civicUser: any) => {
    if (civicUser.name) return civicUser.name;
    if (civicUser.given_name && civicUser.family_name) {
      return `${civicUser.given_name} ${civicUser.family_name}`;
    }
    if (civicUser.given_name) return civicUser.given_name;
    if (civicUser.email) return civicUser.email.split('@')[0];
    return "User";
  };

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    if (user) {
      const displayName = getDisplayName(user);
      onLogin({
        name: displayName,
        avatar: user.picture || "/image-8.png",
        email: user.email,
        id: user.id,
      });
    }
  }, [user, onLogin]);

  const handleCivicLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signIn();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#120726] text-[#FFF8E7] font-['Poppins',sans-serif] relative overflow-hidden">
      {/* Left side with ornate royal portal background */}
      <div
        className="w-full md:w-1/2 min-h-[340px] md:min-h-full bg-cover bg-center p-8 lg:p-14 flex flex-col justify-between relative border-b-2 md:border-b-0 md:border-r-2 border-[#F5D061]/50"
        style={{ backgroundImage: "url(/loginBG.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#120726]/95 via-[#1E0C38]/85 to-transparent"></div>

        {/* Top Logo */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3">
            <div className="relative w-11 h-11 bg-gradient-to-tr from-[#BE123C] to-[#FF7A00] rounded-xl p-[2px] shadow-lg border border-[#F5D061]">
              <div className="w-full h-full bg-[#1A0B36] rounded-[9px] flex items-center justify-center">
                <img
                  className="w-6 h-6 object-contain"
                  alt="MineGuard"
                  src="/game-icons-mine-truck.svg"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-['Rozha_One',serif] font-bold text-xl text-[#FFF8E7]">
                MINE<span className="text-[#FF7A00]">GUARD</span>
              </div>
              <div className="text-[9px] font-['Rajdhani',sans-serif] font-bold text-[#F5D061] tracking-widest uppercase">
                खान सुरक्षा एवं प्रबंधन प्रणाली
              </div>
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 py-10">
          <div className="truck-art-badge text-xs mb-4">
            <span>🪔 शुभ प्रवेश • ROYAL ACCESS GATEWAY</span>
          </div>

          <h1 className="font-['Rozha_One',serif] text-4xl sm:text-5xl lg:text-6xl text-[#FFF8E7] leading-tight">
            Sign in to <br />
            <span className="desi-text-gold">MineGuard</span>
          </h1>

          <p className="text-[#FFF8E7]/80 text-base sm:text-lg mt-3 font-['Poppins',sans-serif] max-w-md">
            Decentralized blockchain authentication guaranteeing uncompromised integrity across hazardous subterranean sectors.
          </p>

          <div className="flex items-center gap-2 mt-4 text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider">
            <span>POWERED BY</span>
            <span className="px-2 py-0.5 rounded bg-[#E11D74]/30 border border-[#E11D74] text-white">
              CIVIC DECENTRALIZED IDENTITY
            </span>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#FFF8E7]/50 font-['Rajdhani',sans-serif]">
          ✦ DIGITALLY SECURED • DGMS COMPLIANT ARCHITECTURE
        </div>
      </div>

      {/* Right side with the login form */}
      <div className="w-full md:w-1/2 min-h-full bg-[#15092A] p-6 lg:p-14 flex items-center justify-center relative">
        <div className="absolute inset-0 jali-pattern opacity-15 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#260E45]/95 via-[#1E0C38]/95 to-[#140826]/95 border-2 border-[#F5D061]/50 shadow-2xl shadow-black/80 backdrop-blur-md">
          {/* Corner star accents */}
          <div className="absolute top-3 left-4 text-[#F5D061] text-xs">✦</div>
          <div className="absolute top-3 right-4 text-[#F5D061] text-xs">✦</div>

          <div className="text-center mb-8">
            <h2 className="font-['Rozha_One',serif] text-3xl sm:text-4xl text-[#FFF8E7] tracking-wide">
              प्रवेश करें • Sign In
            </h2>
            <p className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#FF7A00] tracking-widest uppercase mt-1">
              AUTHORIZED PERSONNEL ONLY
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-500/60 rounded-xl text-red-300 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <Button
              size="lg"
              className="w-full h-14 font-['Rajdhani',sans-serif] text-lg font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF7A00] via-[#E11D74] to-[#BE123C] hover:from-[#FFA047] hover:to-[#E11D74] text-white shadow-lg shadow-[#E11D74]/40 border border-[#F5D061]/50 transition-all duration-300 hover:scale-[1.02]"
              onClick={handleCivicLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>Connecting to Civic...</span>
                </>
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#F5D061]"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Continue with Civic Identity</span>
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#FFF8E7]/60 text-xs">
              By accessing MineGuard, you confirm adherence to DGMS safety protocols.
            </p>
          </div>

          {/* Civic Auth Benefits with Kundan styling */}
          <div className="mt-6 p-4 bg-[#180A30] rounded-xl border border-[#F5D061]/30">
            <h3 className="text-xs font-['Rajdhani',sans-serif] font-bold text-[#F5D061] uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-ping"></span>
              अटल डिजिटल सुरक्षा • Cryptographic Protection
            </h3>
            <ul className="text-xs text-[#FFF8E7]/70 space-y-1.5 font-['Poppins',sans-serif]">
              <li>✦ Zero-Knowledge biometrics & identity verification</li>
              <li>✦ Real-time authorization for hazardous shafts</li>
              <li>✦ Immutable tamper-evident shift attendance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};