import { user } from "@/core/constants/user";
import { redirect } from "next/navigation";

const Page = () => {
  // const user = undefined;

  if (!user) redirect("/login");

  return redirect("/home");
};

export default Page;
