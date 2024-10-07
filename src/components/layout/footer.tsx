import Link from "next/link";

const Footer = () => {
  const url = process.env.NEXT_PUBLIC_URL_PORTFOLIO as string;
  return (
    <footer className="flex justify-center items-center container h-10 border-t-2 border-zinc-500/20 mt-6">
      <p>
        Desenvolvido por{" "}
        <Link href={url} className="font-semibold">
          Diego Ferreira
        </Link>{" "}
        | Todos os direitos reservados &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
