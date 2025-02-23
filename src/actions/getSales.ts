import prismadb from "@/lib/db/prismadb"

export const getSalesCount = async (storeId: string) => {
    const salesCount = await prismadb.orders.count({
        where: {
            storeId: storeId,
            isPaid: true,
        },
    });
    return salesCount;
}