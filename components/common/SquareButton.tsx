interface SquareButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  color?: string;
  className?: string;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  onClick,
  color = "bg-gray-400",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white p-4 rounded-xl hover:bg-gray-500 ${className}`}
    >
      {icon}
    </button>
  );
};

export default SquareButton;
