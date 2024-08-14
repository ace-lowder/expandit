interface SquareButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  color?: string;
  className?: string;
  disabled?: boolean;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  onClick,
  color = "bg-gray-400",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${color} disabled:hidden
      text-white p-4 rounded-xl hover:bg-gray-500
      ${className}`}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default SquareButton;
