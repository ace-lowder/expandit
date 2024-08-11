interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <h2 className="text-xl font-bold mb-2">{children}</h2>;
};

export default Header;
