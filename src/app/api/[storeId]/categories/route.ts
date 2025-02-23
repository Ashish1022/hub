import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    props: { params: Promise<{ storeId: string; }> }
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

        const category = await prismadb.category.create({
            data: {
                name: name,
                handle: handle,
                seoTitle: seoTitle,
                seoDescription: seoDescription,
                collectionId: collectionId,
                storeId: params.storeId,
            }
        });

        return NextResponse.json(category);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; }> }
) {
    const params = await props.params
    try {

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(categories);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}