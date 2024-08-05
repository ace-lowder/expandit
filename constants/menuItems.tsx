import Link from "next/link";

export const menuItems = [
  { href: "/expand", label: "Expand", position: "left" },
  { href: "/pricing", label: "Pricing", position: "left" },
  { href: "/login", label: "Log In", position: "right" },
  { href: "/signup", label: "Sign Up", position: "right", button: true },
];

export const renderMenuItem = ({
  href,
  label,
  button,
  onClick,
}: {
  href: string;
  label: string;
  button?: boolean;
  onClick?: () => void;
}) => {
  return button ? (
    <Link
      key={href}
      href={href}
      className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300 px-6 py-2 rounded-full"
      onClick={onClick}
    >
      {label}
    </Link>
  ) : (
    <Link
      key={href}
      href={href}
      className="text-gray-700 hover:bg-gray-200 transition duration-300 px-3 py-1 rounded"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};
