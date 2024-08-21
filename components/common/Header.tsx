interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, size }) => {
  return (
    <h2
      className={`${size ? `text-${size}` : "text-xl"} font-bold ${className}`}
    >
      {children}
    </h2>
  );
};

export default Header;
