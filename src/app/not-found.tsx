import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen">
      <main className="flex items-center justify-center flex-col w-full gap-4">
        <Image
          src={"/assets/404.svg"}
          alt="Not Found"
          width={300}
          height={300}
          className="object-contain"
        />

        <h2 className="text-xl mt-0 md:mt-4">Está página não existe!</h2>
        <Link href="/" className="flex items-center p-4 rounded-full bg-muted hover:bg-muted/50">
          <House className="mr-2" />
          Voltar para a Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
