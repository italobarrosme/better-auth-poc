import Image from "next/image";
import { UserInfo } from "@/modules/authentication/components/UserInfo";

export const MenuAuth = () => {
  return (
    <header className="flex items-center justify-between gap-8 bg-zinc-50 font-sans dark:bg-black p-8">
    <Image
      className="dark:invert"
      src="/next.svg"
      alt="Next.js logo"
      width={100}
      height={20}
      priority
    />
    <UserInfo />
  </header>
  )
};
