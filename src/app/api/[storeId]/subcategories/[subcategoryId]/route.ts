import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string; subcategoryId: string }> }
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

        if (!params.subcategoryId) {
            return new NextResponse("subcategoryId is required", { status: 400 })
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

        const subcategory = await prismadb.subcategory.updateMany({
            where: {
                id: params.subcategoryId,
            },
            data: {
                name:name,
                seoTitle:seoTitle,
                seoDescription:seoDescription,
                categoryId:categoryId,
            }
        });
        return NextResponse.json(subcategory);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string; subcategoryId: string }> }
) {
    const params = await props.params
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.subcategoryId) {
            return new NextResponse("categoryId is required", { status: 400 })
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

        const subcategory = await prismadb.subcategory.deleteMany({
            where: {
                id: params.subcategoryId,
            },
        });
        return NextResponse.json(subcategory);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; subcategoryId: string }> }
) {
    const params = await props.params
    try {

        if (!params.subcategoryId) {
            return new NextResponse("subcategoryId is required", { status: 400 })
        }

        const subcategory = await prismadb.subcategory.findUnique({
            where: {
                id: params.subcategoryId,
            },
        });
        return NextResponse.json(subcategory);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}