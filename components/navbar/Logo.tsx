import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 relative overflow-hidden group scale-[1.01] hover:scale-[1.04] transition-all mb-[2px]"
    >
      <Image src={logo} alt="Expandit Logo" width={40} height={40} />
      <span className="text-2xl font-bold text-gray-900 mt-[2px] relative">
        Expandit
      </span>
      <span
        className="absolute inset-0 opacity-50
        bg-gradient-to-r from-transparent via-white to-transparent
        -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"
      ></span>
    </Link>
  );
};

export default Logo;
