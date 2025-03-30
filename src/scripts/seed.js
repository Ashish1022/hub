"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        var productsData, _i, productsData_1, productData, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Seeding database...");
                    productsData = [
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
                    _i = 0, productsData_1 = productsData;
                    _a.label = 1;
                case 1:
                    if (!(_i < productsData_1.length)) return [3 /*break*/, 4];
                    productData = productsData_1[_i];
                    return [4 /*yield*/, prismadb_1.default.product.create({
                            data: __assign(__assign({ storeId: "ff917475-f4ce-4a82-8e25-5cd2ce2f8f6f" }, productData), { tags: {
                                    create: [{ name: "p1" }], // Fix: Dummy productId or use later reference
                                }, seo_keywords: {
                                    create: [{}],
                                }, product_image: {
                                    create: [
                                        { url: "https://placekitten.com/200/200", type: "main" },
                                    ],
                                }, product_variants: {
                                    create: [
                                        {
                                            name: "Default Variant",
                                            sku: "SKU-".concat(Math.random().toString(36).substring(7)),
                                            barcode: "BAR-".concat(Math.random().toString(36).substring(7)),
                                            basePrice: productData.regular_price,
                                            stockQuantity: 100,
                                            reservedStock: 0,
                                            allowBackorder: false,
                                            lowStockThreshold: 5,
                                        },
                                    ],
                                } }),
                        })];
                case 2:
                    product = _a.sent();
                    console.log("Created product: ".concat(product.name));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Seeding complete!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) { return console.error(e); })
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
