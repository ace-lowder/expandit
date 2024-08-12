interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

export default Header;
