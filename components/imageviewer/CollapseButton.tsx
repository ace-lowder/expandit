import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SquareButton } from "@/components";

interface CollapseButtonProps {
  isCollapsed: boolean;
  collapseToolbar: () => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({
  isCollapsed,
  collapseToolbar,
}) => {
  return (
    <div className="absolute z-20 top-4 left-4">
      <SquareButton
        icon={
          isCollapsed ? (
            <FaArrowRight className="w-7 h-7" />
          ) : (
            <FaArrowLeft className="w-7 h-7" />
          )
        }
        onClick={collapseToolbar}
      />
    </div>
  );
};

export default CollapseButton;
