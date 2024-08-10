import Link from "next/link";

interface MenuButtonProps {
  label: string;
  href: string;
  onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  href = "",
  onClick,
}) => {
  return (
    <Link
      className="text-gray-700 hover:bg-gray-100 transition-all px-3 py-1.5 rounded-lg"
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default MenuButton;
