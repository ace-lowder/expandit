import { SquareButton } from "@/components";
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
      <SquareButton
        icon={
          isCollapsed ? (
            <PiSidebar className="w-8 h-8" />
          ) : (
            <PiSidebarFill className="w-8 h-8" />
          )
        }
        onClick={collapseToolbar}
      />
    </div>
  );
};

export default CollapseButton;
