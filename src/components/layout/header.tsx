import { MenuIcon } from "lucide-react";
import Logo from "../shared/logo";
import ModeToggle from "../shared/mode-toogle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { auth } from "@/auth";
import SignoutButton from "../auth/signout-button";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="w-full flex items-center justify-between h-20 container border-b-2 border-zinc-500/20">
      <Logo />

      <div className="hidden lg:flex gap-4 items-center">
        <nav className="flex gap-4 items-center justify-center mr-8">
          <Button asChild variant="link" className="rounded-2xl font-semibold">
            {user ? <SignoutButton /> : <Link href="/signin">Entrar</Link>}
          </Button>
          <Button asChild className="rounded-2xl font-semibold">
            <Link href="/dashboard">Área do barbeiro</Link>
          </Button>
        </nav>
        <ModeToggle />
      </div>
      <div className="flex lg:hidden gap-2 items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu user={user} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
