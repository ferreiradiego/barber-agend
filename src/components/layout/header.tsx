import { MenuIcon } from "lucide-react";
import Logo from "../shared/logo";
import ModeToggle from "../shared/mode-toogle";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between h-20 container border-b-2 border-zinc-500/20">
      <Logo />
      <div className="flex gap-2 items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
