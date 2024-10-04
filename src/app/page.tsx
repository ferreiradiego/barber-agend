// import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  // const session = await auth();

  // // if (!session?.user) redirect("/signin");

  return redirect("/home");
};

export default Page;
