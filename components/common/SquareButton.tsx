interface SquareButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  color?: string;
  className?: string;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  onClick,
  color = "bg-gray-300",
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white p-4 rounded-xl hover:bg-gray-400 ${className}`}
    >
      {icon}
    </button>
  );
};

export default SquareButton;
