import React from "react";

interface SquareButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
  className?: string;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-300 text-white p-5 rounded-lg hover:bg-gray-400 ${className}`}
    >
      {icon}
    </button>
  );
};

export default SquareButton;
