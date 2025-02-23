import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string; productId: string }> }
) {
    const params = await props.params
    try {

        const { userId } = await auth();
        const body = await req.json();
        const { name, price, categoryId, image, featuredImage, isArchived, isFeatured, subcategoryId, seoTitle, seoDescription, description, handle, collectionId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 })
        }


        if (!handle) {
            return new NextResponse("handle is required", { status: 400 })
        }

        if (!description) {
            return new NextResponse("description is required", { status: 400 })
        }

        if (!seoTitle) {
            return new NextResponse("seoTitle is required", { status: 400 })
        }

        if (!seoDescription) {
            return new NextResponse("seoDescription is required", { status: 400 })
        }

        if (!image || !image.length) {
            return new NextResponse("image is required", { status: 400 })
        }

        if (!featuredImage || !featuredImage.length) {
            return new NextResponse("featuredImage is required", { status: 400 })
        }

        if (!price) {
            return new NextResponse("price is required", { status: 400 })
        }

        if (!categoryId) {
            return new NextResponse("categoryId is required", { status: 400 })
        }

        if (!subcategoryId) {
            return new NextResponse("categoryId is required", { status: 400 })
        }

        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 })
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

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                isFeatured,
                isArchived,
                subcategoryId,
                seoTitle,
                handle,
                description,
                seoDescription,
                collectionId,
            },
        });

        await prismadb.image.updateMany({
            data: [
                {
                    url: featuredImage,
                    type: "featured",
                    productId: product.id
                },
                {
                    url: image,
                    type: "gallery",
                    productId: product.id
                }
            ]
        })


        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string; productId: string }> }
) {
    const params = await props.params
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 })
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    props: { params: Promise<{ storeId: string; productId: string }> }
) {
    const params = await props.params
    try {

        if (!params.productId) {
            return new NextResponse("productId is required", { status: 400 })
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                subcategory: true,
                // tags: true
            }
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 });
    }
}