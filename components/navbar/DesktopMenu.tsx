import { UserButton, useUser } from "@clerk/nextjs";
import { MenuButton } from "@/components";
import { FaSpinner } from "react-icons/fa";
import { RiCopperCoinLine } from "react-icons/ri";
import { useSyncUser } from "@/hooks";
import Link from "next/link";

const DesktopMenu: React.FC = () => {
  const { isSignedIn } = useUser();
  const credits = useSyncUser();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Editor", href: "/editor" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="hidden md:flex justify-between flex-grow items-center">
      <div className="flex gap-4">
        {menuItems.map((item) => (
          <MenuButton key={item.label} {...item} />
        ))}
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link
            className="flex items-center gap-2 transition-all pl-3 pr-4 py-1.5 text-gray-700 rounded-lg hover:bg-gray-200"
            href="/pricing"
          >
            <RiCopperCoinLine className="w-6 h-6" />{" "}
            {credits ? credits : <FaSpinner className="animate-spin" />}
          </Link>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "36px", height: "36px" },
                userButtonAvatarImage: { width: "36px", height: "36px" },
              },
            }}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <MenuButton label="Log In" href="/login" fill rounded />
          <MenuButton label="Sign Up" href="/signup" rounded outline />
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
