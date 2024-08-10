import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <Image src={logo} alt="Expandit Logo" width={40} height={40} />
      <span className="text-2xl font-bold text-gray-900 mt-[2px]">
        Expandit
      </span>
    </Link>
  );
};

export default Logo;
