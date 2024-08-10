import { MenuButton, RoundedMenuButton } from "@/components";

const DesktopMenu: React.FC = () => {
  return (
    <div className="hidden md:flex flex-grow items-center justify-between">
      <div className="flex flex-grow items-center gap-4">
        <MenuButton label="Home" href="/" />
        <MenuButton label="Expand" href="/expand" />
        <MenuButton label="Pricing" href="/pricing" />
      </div>

      <div className="flex items-center gap-4">
        <RoundedMenuButton label="Log In" href="/login" />
        <RoundedMenuButton label="Sign Up" href="/signup" outline />
      </div>

      {/* <div className="flex flex-grow items-center gap-4">
        {menuItems
          .filter(({ position }) => position === "left")
          .map(renderMenuItem)}
      </div>

      <div className="flex items-center gap-4">
        {menuItems
          .filter(({ position }) => position === "right")
          .map(renderMenuItem)}
      </div> */}
    </div>
  );
};

export default DesktopMenu;
