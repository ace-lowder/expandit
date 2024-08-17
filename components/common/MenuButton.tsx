import Link from "next/link";

interface MenuButtonProps {
  label: string;
  href: string;
  fill?: boolean;
  rounded?: boolean;
  outline?: boolean;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  href = "",
  fill = false,
  rounded = false,
  outline = false,
  onClick,
}) => {
  return (
    <Link
      className={`transition-all px-4 py-1.5 ${
        fill ? "bg-gray-700 text-white" : "text-gray-700"
      } ${rounded ? "rounded-full" : "rounded-lg"} ${
        outline
          ? "border border-gray-300 hover:bg-gray-100"
          : fill
          ? "hover:bg-gray-500"
          : "hover:bg-gray-200"
      }`}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default MenuButton;
