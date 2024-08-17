import { Button } from "@/components";
import { PiSidebar, PiSidebarFill } from "react-icons/pi";

interface CollapseButtonProps {
  isCollapsed: boolean;
  collapseToolbar: () => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  isCollapsed,
  collapseToolbar,
}) => {
  return (
    <div className="absolute z-30 top-4 left-4">
      <Button
        icon={
          isCollapsed ? (
            <PiSidebar className="w-8 h-8" />
          ) : (
            <PiSidebarFill className="w-8 h-8" />
          )
        }
        onClick={collapseToolbar}
        variant="square"
        color="bg-gray-400"
      />
    </div>
  );
};

export default CollapseButton;
