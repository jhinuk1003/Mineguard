import { useState } from "react";

// Custom Icon component for using SVG files from public folder
const Icon = ({ name, className, ...props }: { name: string; className?: string; [key: string]: any }) => {
  return (
    <img 
      src={`/${name}.svg`} 
      alt={name} 
      className={className} 
      {...props}
    />
  );
};

interface MainMenuProps {
  className?: string;
  onMenuItemClick?: (label: string) => void;
  selectedItem?: string;
}

export const MainMenu = ({ className, onMenuItemClick, selectedItem = "Dashboard" }: MainMenuProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainMenuItems = [
    {
      icon: <Icon name="dashboard" className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      icon: <Icon name="schedule" className="w-5 h-5" />,
      label: "Shift & Schedule",
    },
    {
      icon: <Icon name="logbook" className="w-5 h-5" />,
      label: "LogBook",
    },
    {
      icon: <Icon name="production" className="w-5 h-5" />,
      label: "Production Stats",
    },
  ];

  const toolsMenuItems = [
    {
      icon: <Icon name="vr tranning" className="w-5 h-5" />,
      label: "VR Training",
    },
    {
      icon: <Icon name="Equipment" className="w-5 h-5" />,
      label: "Equipment Verification",
    },
    {
      icon: <Icon name="mingcute-link-fill" className="w-5 h-5" />,
      label: "QR Tracking",
    },
    {
      icon: <Icon name="ocrlog" className="w-5 h-5" />,
      label: "OCR Logs",
    },
  ];

  const handleMenuItemClick = (label: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(label);
    }
    // Close mobile menu when item is clicked
    setIsMobileMenuOpen(false);
  };

  const isItemSelected = (label: string) => selectedItem === label;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#260E45] border border-[#F5D061] rounded-xl hover:bg-[#32135C] shadow-lg text-[#F5D061]"
        title="Toggle menu"
      >
        <Icon 
          name="maki-arrow" 
          className={`w-5 h-5 transition-transform duration-300 ${
            isMobileMenuOpen ? 'rotate-90' : '-rotate-90'
          }`} 
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-[#120726]/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Menu */}
      <nav className={`flex flex-col h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16 lg:w-20' : 'w-64 lg:w-72'
      } py-4 ${isCollapsed ? 'px-2' : 'px-3.5 lg:px-5'} bg-[#180A30] border-r-2 border-[#F5D061]/35 shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed lg:relative z-50 lg:z-auto ${className || ''}`}>
        <div className="flex flex-col w-full items-start gap-3 h-full overflow-y-auto">
          {/* Desktop Toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="self-end p-2 rounded-xl text-[#F5D061] hover:bg-[#260E45] border border-transparent hover:border-[#F5D061]/40 transition-colors hidden lg:block"
            title={isCollapsed ? "Expand menu" : "Collapse menu"}
          >
            <Icon 
              name="maki-arrow" 
              className={`w-4 h-4 transition-transform duration-300 filter invert brightness-200 ${
                !isCollapsed ? 'rotate-90' : '-rotate-90'
              }`} 
            />
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end p-2 rounded-xl text-[#F5D061] hover:bg-[#260E45] border border-transparent hover:border-[#F5D061]/40 transition-colors lg:hidden"
            title="Close menu"
          >
            <Icon 
              name="maki-arrow" 
              className="w-4 h-4 rotate-90 filter invert brightness-200" 
            />
          </button>

          {/* Main Menu Items */}
          <div className="flex flex-col w-full items-start gap-1.5 mt-1">
            {!isCollapsed && (
              <div className="flex items-center gap-1.5 px-2.5 mb-1">
                <span className="text-[#FF7A00] text-xs">✦</span>
                <h3 className="font-['Rajdhani',sans-serif] font-bold text-[#F5D061] text-xs uppercase tracking-widest">
                  मुख्य नियंत्रण • Core
                </h3>
              </div>
            )}

            <div className="flex flex-col items-start gap-1.5 w-full">
              {mainMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 w-full cursor-pointer p-3 rounded-xl transition-all duration-200 group ${
                    isItemSelected(item.label) 
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white shadow-lg shadow-[#E11D74]/30 border border-[#F5D061]' 
                      : 'hover:bg-[#260E45] hover:border hover:border-[#F5D061]/40 border border-transparent text-[#FFF8E7]/80 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => handleMenuItemClick(item.label)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`transition-all duration-200 ${
                    isItemSelected(item.label) 
                      ? 'filter brightness-200' 
                      : 'filter brightness-0 invert opacity-70 group-hover:opacity-100'
                  }`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className={`font-['Poppins',sans-serif] font-medium text-sm transition-colors duration-200 ${
                      isItemSelected(item.label) 
                        ? "text-white font-bold" 
                        : "group-hover:text-[#F5D061]"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tools Menu Items */}
          <div className="flex flex-col w-full items-start gap-1.5 mt-4">
            {!isCollapsed && (
              <div className="flex items-center gap-1.5 px-2.5 mb-1">
                <span className="text-[#00A896] text-xs">✦</span>
                <h3 className="font-['Rajdhani',sans-serif] font-bold text-[#F5D061] text-xs uppercase tracking-widest">
                  उपकरण • Smart Tools
                </h3>
              </div>
            )}

            <div className="flex flex-col items-start gap-1.5 w-full">
              {toolsMenuItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 w-full cursor-pointer p-3 rounded-xl transition-all duration-200 group ${
                    isItemSelected(item.label) 
                      ? 'bg-gradient-to-r from-[#FF7A00] to-[#E11D74] text-white shadow-lg shadow-[#E11D74]/30 border border-[#F5D061]' 
                      : 'hover:bg-[#260E45] hover:border hover:border-[#F5D061]/40 border border-transparent text-[#FFF8E7]/80 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => handleMenuItemClick(item.label)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`transition-all duration-200 ${
                    isItemSelected(item.label) 
                      ? 'filter brightness-200' 
                      : 'filter brightness-0 invert opacity-70 group-hover:opacity-100'
                  }`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && (
                    <span className={`font-['Poppins',sans-serif] font-medium text-sm transition-colors duration-200 ${
                      isItemSelected(item.label) 
                        ? "text-white font-bold" 
                        : "group-hover:text-[#F5D061]"
                    }`}>
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}; 