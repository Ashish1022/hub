import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    props: { params: Promise<{ storeId: string }> }
) {
    try {
        const params = await props.params;

        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const body = await req.json();

        const {
            name,
            description,
            slug,
            isActive,
            imageUrl,
            displayOrder,
            showInMenu,
            isFeatured,
            metaTitle,
            metaDescription,
            metaKeywords,
        } = body;

        const category = await prismadb.category.create({
            data: {
                name: name,
                description: description,
                slug: slug,
                isActive: isActive,
                imageUrl: imageUrl,
                displayOrder: displayOrder,
                showInMenu: showInMenu,
                isFeatured: isFeatured,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                metaKeywords: metaKeywords,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 })
    }
}