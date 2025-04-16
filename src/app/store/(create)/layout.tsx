import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type React from "react"
export default async function CreateStoreLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
      isActive: true,
    }
  });

  if (store) {
    redirect(`/store/${store.id}`);
  }

  return <div className="min-h-screen bg-[#050A18]">{children}</div>
}
