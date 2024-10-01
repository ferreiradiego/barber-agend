"use client";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  LogOutIcon,
  UserIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { SheetHeader, SheetTitle } from "../ui/sheet";
// import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

type User = {
  name: string;
  image: string;
};

const SideMenu = () => {
  //   const { data, status } = useSession();
  //   const { user } = data ?? {};
  const user: User = {
    name: "John Doe",
    image: "https://github.com/shadcn.png",
  };

  const handleLogoutClick = async () => {
    // await signOut();
  };

  const handleLoginClick = async () => {
    // await signIn();
  };

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

          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2>Olá, faça seu login</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
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
            <Link href={"/bookings"}>
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
