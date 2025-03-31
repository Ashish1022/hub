import prismadb from '../lib/db/prismadb';

async function main() {
  // Create Brands first to avoid foreign key constraint violation
  const brand1 = await prismadb.brand.create({
    data: {
      name: 'Brand A',
      description: 'Description of Brand A',
      slug: 'brand-a',
      logoUrl: 'https://example.com/logoA.png',
      websiteUrl: 'https://brand-a.com',
      storeId: "cm8x8qp6n0000lne0d89jk5u6"
    },
  });

  // Create Products and link them to Brands by using the correct Brand ID
  await prismadb.product.create({
    data: {
      name: 'Product 1',
      description: 'Description of Product 1',
      shortDescription: 'Short Description of Product 1',
      sku: 'sku123',
      barcode: 'barcode123',
      material: 'Material 1',
      width: 10.0,
      height: 20.0,
      depth: 5.0,
      weight: 1.5,
      tags: JSON.stringify(['tag1', 'tag2']),
      category: 'Category A',
      subcategory: 'Subcategory A',
      brand: brand1.id, // Reference the ID of Brand A
      collections: JSON.stringify(['collection1']),
      status: 'active',
      publishDate: new Date(),
      isFeatured: false,
      isRecommended: false,
      isNew: true,
      isBestseller: false,
      regularPrice: 100.0,
      salePrice: 80.0,
      costPrice: 50.0,
      profitMargin: 30.0,
      onSale: true,
      saleStartDate: new Date(),
      saleEndDate: new Date(),
      taxClass: 'standard',
      taxStatus: 'taxable',
      bulkPricing: JSON.stringify([{ quantity: 10, price: 90.0 }]),
      trackInventory: true,
      stockQuantity: 100,
      lowStockThreshold: 5,
      stockStatus: 'in-stock',
      allowBackorders: false,
      backorderLimit: 0,
      soldIndividually: false,
      warehouse: 'Warehouse 1',
      binLocation: 'Bin A',
      minPurchaseQuantity: 1,
      maxPurchaseQuantity: 5,
      hasVariants: false,
      variantOptions: JSON.stringify([]),
      variantDisplay: 'dropdown',
      isPhysical: true,
      shippingWeight: 1.5,
      shippingLength: 10.0,
      shippingWidth: 5.0,
      shippingHeight: 20.0,
      shippingClass: 'Standard',
      shippingRestrictions: JSON.stringify([]),
      freeShipping: false,
      shippingMarkup: 10.0,
      requiresShippingAddress: true,
      relatedProducts: JSON.stringify(['product2']),
      upsellProducts: JSON.stringify(['product3']),
      crossSellProducts: JSON.stringify(['product4']),
      metaTitle: 'Product 1 Meta Title',
      metaDescription: 'Product 1 Meta Description',
      metaKeywords: 'product, example, brand A',
      canonicalUrl: 'https://example.com/product1',
      ogTitle: 'Product 1 OG Title',
      ogDescription: 'Product 1 OG Description',
      ogImage: 'https://example.com/product1-og.jpg',
      slug: 'product-1',
      purchaseNote: 'Product 1 Purchase Note',
      enableReviews: true,
      downloadable: false,
      downloadFiles: JSON.stringify([]),
      preOrderAvailable: false,
      preOrderReleaseDate: new Date(),
      preOrderMessage: 'Pre-order Product 1',
      customizable: false,
      customizationOptions: JSON.stringify([]),
      storeId: 'cm8x8qp6n0000lne0d89jk5u6',
    },
  });

  console.log('Brands and Products seeded!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismadb.$disconnect();
  });
