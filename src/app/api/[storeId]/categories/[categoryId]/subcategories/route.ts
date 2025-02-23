import prismadb from "@/lib/db/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; categoryId:string }> }
) {
    const params = await props.params
    try {

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const subcategories = await prismadb.subcategory.findMany({
            where: {
                categoryId: params.categoryId
            }
        });

        return NextResponse.json(subcategories);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}