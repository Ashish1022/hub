import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    });

    if (store) {
        redirect(`/store/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )

}