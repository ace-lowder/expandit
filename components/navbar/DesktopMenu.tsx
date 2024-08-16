import { UserButton, useUser } from "@clerk/nextjs";
import { MenuButton, RoundedMenuButton } from "@/components";

const DesktopMenu: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="hidden md:flex flex-grow items-center justify-between">
      <div className="flex flex-grow items-center gap-4">
        <MenuButton label="Home" href="/" />
        <MenuButton label="Expand" href="/expand" />
        <MenuButton label="Pricing" href="/pricing" />
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "36px",
                  height: "36px",
                },
                userButtonAvatarImage: {
                  width: "36px",
                  height: "36px",
                },
              },
            }}
          />
        ) : (
          <>
            <RoundedMenuButton label="Log In" href="/login" />
            <RoundedMenuButton label="Sign Up" href="/signup" outline />
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
