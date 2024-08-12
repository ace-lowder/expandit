interface DefaultButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  icon?: JSX.Element;
  className?: string;
  disabled?: boolean;
  action?: boolean;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
  disabled = false,
  action = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className}
      ${
        action
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-600 hover:bg-gray-500 "
      }
        flex items-center justify-center gap-3
        text-white p-2 rounded transition-all
        disabled:bg-gray-200 disabled:text-gray-500`}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default DefaultButton;
