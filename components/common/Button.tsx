interface ButtonProps {
  children?: React.ReactNode;
  icon?: JSX.Element;
  tip?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "icon" | "square";
  color?: string;
  hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  tip,
  onClick,
  className = "",
  disabled = false,
  variant = "default",
  color = "bg-gray-400",
  hoverColor = "hover:bg-gray-500",
}) => {
  const baseClasses = `
    flex items-center justify-center transition-all rounded
    ${disabled ? "disabled:bg-gray-200 disabled:text-gray-500" : ""}
  `;

  let variantClasses = "";

  switch (variant) {
    case "icon":
      variantClasses = "bg-transparent text-gray-700 focus:outline-none p-2";
      break;
    case "square":
      variantClasses = `${color} ${hoverColor} text-white p-4 rounded-xl disabled:hidden`;
      break;
    default:
      variantClasses = `
        ${color} ${hoverColor} text-white p-2 rounded 
        ${className ? "" : "bg-gray-600 hover:bg-gray-500"}
      `;
      break;
  }

  return (
    <button
      onClick={onClick}
      title={tip}
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
