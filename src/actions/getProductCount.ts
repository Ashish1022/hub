import prismadb from "@/lib/db/prismadb"

export const getProductCount = async (storeId: string) => {
    const productCount = await prismadb.product.count({
        where: {
            storeId: storeId,
            isArchived:false
        },
    });
    return productCount;
}