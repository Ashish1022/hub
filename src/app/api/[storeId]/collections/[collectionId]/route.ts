import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string; collectionId: string }> }
) {
    const params = await props.params;
    try {

        const { userId } = await auth();

        const body = await req.json();

        const { label, seoTitle, seoDescription, handle } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!seoTitle) {
            return new NextResponse("SeoTitle is required", { status: 400 });
        }

        if (!seoDescription) {
            return new NextResponse("SeoDescription is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const collection = await prismadb.collection.updateMany({
            where: {
                id: params.collectionId
            },
            data: {
                label,
                seoTitle,
                handle,
                seoDescription
            }
        })

        return NextResponse.json(collection);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string; collectionId: string }> }
) {
    const params = await props.params;
    try {

        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const collection = await prismadb.collection.deleteMany({
            where: {
                id: params.collectionId
            }
        })

        return NextResponse.json(collection);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; collectionId: string }> }
) {
    const params = await props.params;
    try {

        if (!params.collectionId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const collection = await prismadb.collection.findUnique({
            where: {
                id: params.collectionId
            },
        })

        return NextResponse.json(collection);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}