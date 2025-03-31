"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prismadb_1 = require("../lib/db/prismadb");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var brand1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prismadb_1.default.brand.create({
                        data: {
                            name: 'Brand A',
                            description: 'Description of Brand A',
                            slug: 'brand-a',
                            logoUrl: 'https://example.com/logoA.png',
                            websiteUrl: 'https://brand-a.com',
                            storeId: "cm8x8qp6n0000lne0d89jk5u6"
                        },
                    })];
                case 1:
                    brand1 = _a.sent();
                    // Create Products and link them to Brands by using the correct Brand ID
                    return [4 /*yield*/, prismadb_1.default.product.create({
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
                        })];
                case 2:
                    // Create Products and link them to Brands by using the correct Brand ID
                    _a.sent();
                    console.log('Brands and Products seeded!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismadb_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
