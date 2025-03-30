import prismadb from "../lib/db/prismadb";

async function main() {
  console.log("Seeding database...");


  // List of sample products
  const productsData = [
    {
      name: "Anime Sticker Pack",
      description: "High-quality anime stickers with popular characters.",
      shortDescription: "Premium anime stickers.",
      barcode: "123456789",
      category: "Stickers",
      subcategory: "Anime",
      brand: "Otaku Brand",
      collection: "Spring 2025",
      featured: true,
      archived: false,
      regular_price: 299,
      cost_price: 150,
      sale_price: 250,
      profit_margin: 100,
      tax_class: "GST",
      tax_status: "Taxable",
      bulk_pricing: "None",
      sale: true,
      seo_title: "Anime Sticker Pack",
      seo_description: "Best anime stickers for your collection.",
      canonical_url: "https://mystore.com/anime-sticker-pack",
      product_url_slug: "anime-pack",
      open_graph_title: "Anime Sticker Pack",
      open_graph_description: "The best anime sticker collection for fans.",
    },
    {
      name: "One Piece Sticker Set",
      description: "A collection of One Piece stickers featuring Luffy & crew.",
      shortDescription: "One Piece-themed stickers.",
      barcode: "987654321",
      category: "Stickers",
      subcategory: "Anime",
      brand: "Otaku Brand",
      collection: "Summer 2025",
      featured: true,
      archived: false,
      regular_price: 349,
      cost_price: 175,
      sale_price: 299,
      profit_margin: 124,
      tax_class: "GST",
      tax_status: "Taxable",
      bulk_pricing: "None",
      sale: true,
      seo_title: "One Piece Sticker Set",
      seo_description: "One Piece stickers for fans.",
      canonical_url: "https://mystore.com/one-piece-sticker-set",
      product_url_slug: "one-piece-set",
      open_graph_title: "One Piece Sticker Set",
      open_graph_description: "Limited edition One Piece sticker set.",
    },
  ];

  // Seed Products
  for (const productData of productsData) {
    const product = await prismadb.product.create({
      data: {
        storeId: "ff917475-f4ce-4a82-8e25-5cd2ce2f8f6f",
        ...productData,
        tags: {
          create: [{ name: "p1" }], // Fix: Dummy productId or use later reference
        },
        seo_keywords: {
          create: [{}],
        },
        product_image: {
          create: [
            { url: "https://placekitten.com/200/200", type: "main" },
          ],
        },
        product_variants: {
          create: [
            {
              name: "Default Variant",
              sku: `SKU-${Math.random().toString(36).substring(7)}`,
              barcode: `BAR-${Math.random().toString(36).substring(7)}`,
              basePrice: productData.regular_price,
              stockQuantity: 100,
              reservedStock: 0,
              allowBackorder: false,
              lowStockThreshold: 5,
            },
          ],
        },
      },
    });

    console.log(`Created product: ${product.name}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismadb.$disconnect();
  });
