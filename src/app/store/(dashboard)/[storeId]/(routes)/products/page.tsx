import prismadb from "@/lib/db/prismadb";
import { DashboardNav } from "../../_components/navbar"
import ProductClient from "./_components/product-client"
import { ProductColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";

export default async function ProductsPage(props: { params: Promise<{ storeId: string }> }) {

  const params = await props.params;
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      images: true,
      variants: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => {
    const totalStock = item.variants.reduce((total, variant) => total + variant.stockQuantity, 0);

    return {
      id: item.id,
      name: item.name,
      image: item.images.length > 0 ? item.images[0].url : "",
      category: item.category ?? "Uncategorized",
      status: item.status ? "Archived" : totalStock > 0 ? "In Stock" : "Out of Stock",
      inventory: totalStock,
      regularPrice: Number(item.regularPrice),
    };
  });

  return (
    <DashboardNav searchPlaceholder="Search products...">
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <ProductClient data={formattedProducts} />
        </div>
      </main>
    </DashboardNav>
  )
}

