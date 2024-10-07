import Link from "next/link";

const Footer = () => {
  const url = process.env.NEXT_PUBLIC_URL_PORTFOLIO as string;
  return (
    <footer className="flex justify-center items-center h-10 container text-center border-t-2 border-zinc-500/20 mt-6">
      <p>
        Desenvolvido por{" "}
        <Link href={url} className="font-semibold">
          Diego Ferreira
        </Link>
        , {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
