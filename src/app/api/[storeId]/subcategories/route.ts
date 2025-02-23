import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    props: { params: Promise<{ storeId: string }> }
) {
    const params = await props.params
    try {

        const { userId } = await auth();
        const body = await req.json();

        const { name, seoTitle, seoDescription, categoryId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 })
        }

        if (!seoTitle) {
            return new NextResponse("seoTitle is required", { status: 400 })
        }

        if (!seoDescription) {
            return new NextResponse("seoDescription is required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("billboardId is required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const subcategory = await prismadb.subcategory.create({
            data: {
                name: name,
                seoTitle: seoTitle,
                seoDescription: seoDescription,
                categoryId: categoryId,
            }
        });

        return NextResponse.json({ subcategory, headers: corsHeaders });

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

