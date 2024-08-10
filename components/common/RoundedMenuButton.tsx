import Link from "next/link";

interface RoundedMenuButtonProps {
  label: string;
  href: string;
  outline?: boolean;
  onClick?: () => void;
}

const RoundedMenuButton: React.FC<RoundedMenuButtonProps> = ({
  label,
  href = "",
  outline = false,
  onClick,
}) => {
  return (
    <Link
      className={` transition-all px-4 py-1.5 rounded-full ${
        outline
          ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
          : "text-white bg-gray-700 hover:bg-gray-500"
      }`}
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default RoundedMenuButton;
