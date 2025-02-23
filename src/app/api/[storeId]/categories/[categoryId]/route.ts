import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    const params = await props.params
    try {

        const { userId } = await auth();
        const body = await req.json();

        const { name, collectionId, seoTitle, seoDescription, handle } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!seoTitle) {
            return new NextResponse("seoTitle is required", { status: 400 });
        }

        if (!seoDescription) {
            return new NextResponse("seoDescription is required", { status: 400 });
        }

        if (!collectionId) {
            return new NextResponse("collectionId is required", { status: 400 });
        }

        if (!params.categoryId) {
            return new NextResponse("BillboardId is required", { status: 400 })
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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name: name,
                handle:handle,
                seoTitle: seoTitle,
                seoDescription: seoDescription,
                collectionId: collectionId
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    const params = await props.params
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.categoryId) {
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; categoryId: string }> }
) {
    const params = await props.params
    try {

        if (!params.categoryId) {
            return new NextResponse("categoryId is required", { status: 400 })
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                collection: true,
            }
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}