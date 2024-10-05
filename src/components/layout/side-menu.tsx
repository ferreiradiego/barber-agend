import { Avatar, AvatarImage } from "../ui/avatar";
import {
  UserIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import SignoutButton from "../auth/signout-button";
import { getLoggedInUser } from "@/actions/get-logged-in-user";

const SideMenu = async () => {
  const user = await getLoggedInUser();
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-left border-b border-solid border-secondary p-5">
          Menu
        </SheetTitle>
      </SheetHeader>

      {user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.image ?? ""} alt={user?.name as string} />
            </Avatar>
            <h2 className="font-bold">{user?.name}</h2>
          </div>
          <SignoutButton variant={"secondary"}>
            <LogOutIcon />
          </SignoutButton>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2>Olá, faça seu login</h2>
          </div>
          <Button variant="secondary" className="w-full justify-start" asChild>
            <Link href="/signin">
              <LogInIcon className="mr-2" size={18} />
              Fazer Login
            </Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon className="mr-2" size={18} />
            Início
          </Link>
        </Button>

        {user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href={"/agendamentos"}>
              <CalendarIcon className="mr-2" size={18} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
