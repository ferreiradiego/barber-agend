import { user } from "@/core/constants/user";
import { redirect } from "next/navigation";

const Page = () => {
  // const user = undefined;

  if (!user) redirect("/signin");

  return redirect("/home");
};

export default Page;
