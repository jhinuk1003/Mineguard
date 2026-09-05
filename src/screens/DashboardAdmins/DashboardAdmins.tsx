import { useState } from "react";
import { ScanSession } from "../../Module/geminiService";
import { DashboardPage } from "./sections/DashboardPage";
import { DashNav } from "./sections/DashNav";
import { EquipmentCheckSection } from "./sections/EquipmentCheckSection";
import { LogBookPage } from "./sections/LogBookPage";
import { MainMenuSection } from "./sections/MainMenuSection/MainMenuSection";
import { OCRLogsPage } from "./sections/OCRLogsPage";
import { ProductionPage } from "./sections/ProductionPage";
import { ScanActionsSection } from "./sections/ScanActionsSection";
import { SchedulePage } from "./sections/SchedulePage";
import { VRTrainingPage } from "./sections/VRTrainingPage";
import { QRTrackingPage } from "./sections/QRTrackingPage";
import { MainMenu } from "../../components/MainMenu";

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

interface DashboardAdminsProps {
  user: User;
  onLogout: () => void;
  onNavigateToLanding: () => void;
}

export const DashboardAdmins = ({ user, onLogout, onNavigateToLanding }: DashboardAdminsProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleMenuClick = (menuItem: string) => {
    setCurrentPage(menuItem);
  };

  const handleScanComplete = (session: ScanSession) => {
    // You can add additional logic here like notifications, analytics, etc.
    console.log('Scan completed:', session);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage user={user} />;
      case "Shift & Schedule":
        return <SchedulePage />;
      case "LogBook":
        return <LogBookPage />;
      case "Production Stats":
        return <ProductionPage />;
      case "VR Training":
        return <VRTrainingPage />;
      case "Equipment Verification":
        return (
          <>
            <EquipmentCheckSection onScanComplete={handleScanComplete} />
            <ScanActionsSection />
          </>
        );
      case "QR Tracking":
        return <QRTrackingPage />;
      case "OCR Logs":
        return <OCRLogsPage />;
      default:
        return <DashboardPage user={user} />;
    }
  };

  return (
    <div className="bg-[#120726] text-[#FFF8E7] flex flex-col w-full min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 jali-pattern opacity-10 pointer-events-none"></div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <DashNav user={user} onLogout={onLogout} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 relative z-10">
        {/* Sticky Sidebar - Hidden on mobile, shown on desktop */}
        <aside className="hidden lg:block sticky top-0 h-screen z-40">
          <MainMenuSection onMenuItemClick={handleMenuClick} selectedItem={currentPage} />
        </aside>
        
        {/* Mobile Menu - Always rendered but controlled by MainMenu component */}
        <aside className="lg:hidden">
          <MainMenuSection onMenuItemClick={handleMenuClick} selectedItem={currentPage} />
        </aside>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 flex flex-col overflow-auto min-h-screen w-full lg:ml-0 bg-[#120726]/60 backdrop-blur-sm">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};
