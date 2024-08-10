interface IconButtonProps {
  icon: JSX.Element;
  className?: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-700 focus:outline-none ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
