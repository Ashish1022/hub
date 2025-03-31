"use client"

import type { UseFormReturn } from "react-hook-form";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import type { ProductFormValues } from "../../schema";
import { useMockData } from "@/hooks/use-mock-data";

interface RelatedProductsSectionProps {
  form: UseFormReturn<ProductFormValues>
}

export function RelatedProductsSection({ form }: RelatedProductsSectionProps) {
  const { products } = useMockData()

  const relatedProducts = form.watch("relatedProducts") || []
  const upsellProducts = form.watch("upsellProducts") || []
  const crossSellProducts = form.watch("crossSellProducts") || []

  // Add a related product
  const addRelatedProduct = (productId: string) => {
    if (!relatedProducts.includes(productId)) {
      form.setValue("relatedProducts", [...relatedProducts, productId])
    }
  }

  // Remove a related product
  const removeRelatedProduct = (productId: string) => {
    form.setValue(
      "relatedProducts",
      relatedProducts.filter((id) => id !== productId),
    )
  }

  // Add an upsell product
  const addUpsellProduct = (productId: string) => {
    if (!upsellProducts.includes(productId)) {
      form.setValue("upsellProducts", [...upsellProducts, productId])
    }
  }

  // Remove an upsell product
  const removeUpsellProduct = (productId: string) => {
    form.setValue(
      "upsellProducts",
      upsellProducts.filter((id) => id !== productId),
    )
  }

  // Add a cross-sell product
  const addCrossSellProduct = (productId: string) => {
    if (!crossSellProducts.includes(productId)) {
      form.setValue("crossSellProducts", [...crossSellProducts, productId])
    }
  }

  // Remove a cross-sell product
  const removeCrossSellProduct = (productId: string) => {
    form.setValue(
      "crossSellProducts",
      crossSellProducts.filter((id) => id !== productId),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Products</CardTitle>
        <CardDescription>Link this product to other products in your store</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="relatedProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Products</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-8" list="related-products-list" />
                      <datalist id="related-products-list">
                        {products
                          .filter((p) => !relatedProducts.includes(p.id))
                          .map((product) => (
                            <option key={product.id} value={product.name} />
                          ))}
                      </datalist>
                    </div>
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const input = document.querySelector('input[list="related-products-list"]') as HTMLInputElement
                      if (input.value) {
                        const product = products.find((p) => p.name === input.value)
                        if (product) {
                          addRelatedProduct(product.id)
                          input.value = ""
                        }
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {relatedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId)
                    return product ? (
                      <div
                        key={productId}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        <span>{product.name}</span>
                        <button
                          type="button"
                          onClick={() => removeRelatedProduct(productId)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
                <FormDescription>
                  Products that are related to this product and will be shown on the product page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="upsellProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upsell Products</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-8" list="upsell-products-list" />
                      <datalist id="upsell-products-list">
                        {products
                          .filter((p) => !upsellProducts.includes(p.id))
                          .map((product) => (
                            <option key={product.id} value={product.name} />
                          ))}
                      </datalist>
                    </div>
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const input = document.querySelector('input[list="upsell-products-list"]') as HTMLInputElement
                      if (input.value) {
                        const product = products.find((p) => p.name === input.value)
                        if (product) {
                          addUpsellProduct(product.id)
                          input.value = ""
                        }
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {upsellProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId)
                    return product ? (
                      <div
                        key={productId}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        <span>{product.name}</span>
                        <button
                          type="button"
                          onClick={() => removeUpsellProduct(productId)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
                <FormDescription>Products that you recommend instead of the currently viewed product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="crossSellProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cross-Sell Products</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-8" list="cross-sell-products-list" />
                      <datalist id="cross-sell-products-list">
                        {products
                          .filter((p) => !crossSellProducts.includes(p.id))
                          .map((product) => (
                            <option key={product.id} value={product.name} />
                          ))}
                      </datalist>
                    </div>
                  </FormControl>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const input = document.querySelector('input[list="cross-sell-products-list"]') as HTMLInputElement
                      if (input.value) {
                        const product = products.find((p) => p.name === input.value)
                        if (product) {
                          addCrossSellProduct(product.id)
                          input.value = ""
                        }
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {crossSellProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId)
                    return product ? (
                      <div
                        key={productId}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        <span>{product.name}</span>
                        <button
                          type="button"
                          onClick={() => removeCrossSellProduct(productId)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
                <FormDescription>Products that are promoted in the cart based on the current product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

