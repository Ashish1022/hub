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

        const collection = await prismadb.collection.create({
            data: {
                label: label,
                seoTitle: seoTitle,
                seoDescription: seoDescription,
                handle: handle,
                storeId: params.storeId
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
    props: { params: Promise<{ storeId: string; }> }
) {
    const params = await props.params
    try {

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const collections = await prismadb.collection.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(collections);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}