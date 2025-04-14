import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    // const params = await props.params
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId,
        }
    });

    if (!store) {
        redirect('/store');
    }

    return (
        <>
            {children}
        </>
    )

}