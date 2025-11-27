import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo/logo.png"
        alt="DreamSys Technologies"
        width={220}
        height={75}
        quality={100}
        className="h-auto w-auto max-h-16"
        priority
      />
    </Link>
  );
};

export default Logo;
