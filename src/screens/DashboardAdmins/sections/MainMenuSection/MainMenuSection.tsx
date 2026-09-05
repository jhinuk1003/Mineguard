import { MainMenu } from "../../../../components/MainMenu";

interface MainMenuSectionProps {
  onMenuItemClick?: (label: string) => void;
  selectedItem?: string;
}

export const MainMenuSection = ({ onMenuItemClick, selectedItem = "Dashboard" }: MainMenuSectionProps): JSX.Element => {
  const handleMenuItemClick = (label: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(label);
    }
    console.log(`Menu item clicked: ${label}`);
    // Add your navigation logic here
  };

  return <MainMenu onMenuItemClick={handleMenuItemClick} selectedItem={selectedItem} />;
};
