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

        const { name, price, categoryId, image, featuredImage, isArchived, isFeatured, subcategoryId, seoTitle, seoDescription, description, handle, collectionId, tags } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        if (!name) {
            return new NextResponse("tags is required", { status: 400 })
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


        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 400 })
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isArchived,
                seoTitle,
                collectionId,
                seoDescription,
                isFeatured,
                categoryId,
                subcategoryId,
                description,
                handle,
                storeId: params.storeId,
            }
        });

        await prismadb.image.createMany({
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

        for (let i = 0; i < tags.length; i++) {
            await prismadb.tags.createMany({
                data: [
                    {
                        tag: tags[i],
                        productId: product.id
                    },
                ]
            })
        }


        return NextResponse.json(product);
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

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const subcategoryId = searchParams.get('subcategoryId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
                subcategoryId
            },
            include: {
                images: true,
                category: true,
                subcategory: true,
                // tags:true,
            },
            orderBy: {
                name: 'desc'
            }
        });

        return NextResponse.json(products);

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}