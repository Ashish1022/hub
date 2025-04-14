"use client"

import { useState } from "react"

// Mock data for dropdowns and selections
export function useMockData() {
    const [categories] = useState([
        { id: "cat1", name: "Apparel" },
        { id: "cat2", name: "Electronics" },
        { id: "cat3", name: "Home & Kitchen" },
        { id: "cat4", name: "Beauty & Personal Care" },
        { id: "cat5", name: "Accessories" },
    ])

    const [subcategories] = useState([
        { id: "subcat1", name: "T-Shirts", categoryId: "cat1" },
        { id: "subcat2", name: "Hoodies", categoryId: "cat1" },
        { id: "subcat3", name: "Jeans", categoryId: "cat1" },
        { id: "subcat4", name: "Smartphones", categoryId: "cat2" },
        { id: "subcat5", name: "Laptops", categoryId: "cat2" },
        { id: "subcat6", name: "Furniture", categoryId: "cat3" },
        { id: "subcat7", name: "Kitchen Appliances", categoryId: "cat3" },
        { id: "subcat8", name: "Skincare", categoryId: "cat4" },
        { id: "subcat9", name: "Makeup", categoryId: "cat4" },
        { id: "subcat10", name: "Jewelry", categoryId: "cat5" },
        { id: "subcat11", name: "Bags", categoryId: "cat5" },
    ])

    const [brands] = useState([
        { id: "brand1", name: "ZERO" },
        { id: "brand2", name: "Nike" },
        { id: "brand3", name: "Adidas" },
        { id: "brand4", name: "Apple" },
        { id: "brand5", name: "Samsung" },
        { id: "brand6", name: "IKEA" },
        { id: "brand7", name: "Dyson" },
        { id: "brand8", name: "L'Oréal" },
        { id: "brand9", name: "Sephora" },
        { id: "brand10", name: "Tiffany & Co." },
    ])

    const [collections] = useState([
        { id: "col1", name: "Summer Collection" },
        { id: "col2", name: "New Arrivals" },
        { id: "col3", name: "Best Sellers" },
        { id: "col4", name: "Limited Edition" },
        { id: "col5", name: "Sale" },
        { id: "col6", name: "Winter Collection" },
        { id: "col7", name: "Holiday Special" },
        { id: "col8", name: "Eco-Friendly" },
        { id: "col9", name: "Premium Selection" },
        { id: "col10", name: "Clearance" },
    ])

    const [warehouses] = useState([
        { id: "wh1", name: "Main Warehouse" },
        { id: "wh2", name: "East Coast Warehouse" },
        { id: "wh3", name: "West Coast Warehouse" },
        { id: "wh4", name: "Central Distribution Center" },
        { id: "wh5", name: "International Warehouse" },
    ])

    const [shippingClasses] = useState([
        { id: "sc1", name: "Standard" },
        { id: "sc2", name: "Express" },
        { id: "sc3", name: "Bulky Items" },
        { id: "sc4", name: "Fragile" },
        { id: "sc5", name: "Hazardous Materials" },
        { id: "sc6", name: "Refrigerated" },
    ])

    const [products] = useState([
        { id: "prod1", name: "Basic T-Shirt", category: "cat1", subcategory: "subcat1", brand: "brand2" },
        { id: "prod2", name: "Slim Fit Jeans", category: "cat1", subcategory: "subcat3", brand: "brand3" },
        { id: "prod3", name: "iPhone 14 Pro", category: "cat2", subcategory: "subcat4", brand: "brand4" },
        { id: "prod4", name: "MacBook Air", category: "cat2", subcategory: "subcat5", brand: "brand4" },
        { id: "prod5", name: "Coffee Table", category: "cat3", subcategory: "subcat6", brand: "brand6" },
        { id: "prod6", name: "Air Purifier", category: "cat3", subcategory: "subcat7", brand: "brand7" },
        { id: "prod7", name: "Face Serum", category: "cat4", subcategory: "subcat8", brand: "brand8" },
        { id: "prod8", name: "Lipstick Set", category: "cat4", subcategory: "subcat9", brand: "brand9" },
        { id: "prod9", name: "Silver Necklace", category: "cat5", subcategory: "subcat10", brand: "brand10" },
        { id: "prod10", name: "Leather Tote", category: "cat5", subcategory: "subcat11", brand: "brand2" },
    ])

    return {
        categories,
        subcategories,
        brands,
        collections,
        warehouses,
        shippingClasses,
        products,
    }
}

export const plans = [
    {
        id: "starter",
        name: "Starter",
        description: "Perfect for small businesses just getting started",
        price: "$29/month",
        features: ["Up to 100 products", "2 staff accounts", "Basic analytics", "24/7 support"],
        color: "#FF3D00",
    },
    {
        id: "professional",
        name: "Professional",
        description: "Ideal for growing businesses with more advanced needs",
        price: "$79/month",
        features: [
            "Up to 1,000 products",
            "5 staff accounts",
            "Advanced analytics",
            "24/7 priority support",
            "Custom domain",
        ],
        popular: true,
        color: "#FF00E5",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Complete solution for established businesses",
        price: "$199/month",
        features: [
            "Unlimited products",
            "Unlimited staff accounts",
            "Advanced analytics",
            "24/7 priority support",
            "API access",
        ],
        color: "#7000FF",
    },
]