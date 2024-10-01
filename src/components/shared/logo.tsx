import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl tracking-wider">
      <span className="font-bold text-foreground">Barber</span>
      <span className="font-extrabold text-muted-foreground">Agend</span>
    </Link>
  );
};

export default Logo;
