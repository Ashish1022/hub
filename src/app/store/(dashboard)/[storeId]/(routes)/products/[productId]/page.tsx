import prismadb from "@/lib/db/prismadb";
import { DashboardNav } from "../../../_components/navbar"
import ProductForm from "./_components/product-form"

export default async function AddProductPage(props: { params: Promise<{ productId: string; storeId: string }> }) {

  const params = await props.params;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true,
      attributes: true,
      variants: true,
      customFields: true,
      reviews: true,
      orderItems: true,
      categoryRelations: true,
      collectionRelations: true,
      brandRelation: true,
    }
  });

  const images = await prismadb.image.findMany({
    where: {
      productId: product?.id,
    }
  });

  return (
    <div className="min-h-screen bg-[#050A18] text-white">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/10 via-[#FF00E5]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/10 via-[#7000FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNav>
            <ProductForm initialData={product} images={images} />
          </DashboardNav>
        </div>
      </div>
    </div>
  )
}

