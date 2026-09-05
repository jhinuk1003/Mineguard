import { useRef } from "react";
import { AiFeaturesSection } from "./sections/AiFeaturesSection";
import { BlockchainIntegrationSection } from "./sections/BlockchainIntegrationSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { DashboardSection } from "./sections/DashboardSection";
import { FeaturesOverviewSection } from "./sections/FeaturesOverviewSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";

interface LandingPageProps {
  onNavigateToDashboard?: () => void;
}

export const LandingPage = ({ onNavigateToDashboard }: LandingPageProps): JSX.Element => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const aiFeaturesRef = useRef<HTMLDivElement>(null);
  const safetyRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (section: string) => {
    let ref;
    switch (section) {
      case "Features":
        ref = featuresRef;
        break;
      case "Dashboard":
        ref = dashboardRef;
        break;
      case "Training":
        ref = aiFeaturesRef;
        break;
      case "Safety":
        ref = safetyRef;
        break;
      default:
        return;
    }
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col w-full bg-[#120726] text-[#FFF8E7] min-h-screen relative overflow-hidden">
      <NavigationBarSection onNavigateToDashboard={onNavigateToDashboard} onNavItemClick={handleNavClick} />
      <HeroSection />
      <div ref={featuresRef}>
        <FeaturesOverviewSection />
      </div>
      <div ref={dashboardRef}>
        <DashboardSection />
      </div>
      <div ref={aiFeaturesRef}>
        <AiFeaturesSection />
      </div>
      <div ref={safetyRef}>
        <BlockchainIntegrationSection />
      </div>
      <CallToActionSection onNavigateToDashboard={onNavigateToDashboard} />
      <FooterSection />
    </main>
  );
};
