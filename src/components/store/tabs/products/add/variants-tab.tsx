"use client"

import type { UseFormReturn } from "react-hook-form";
import { Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductFormValues } from "@/lib/db/schemas/products";
import { useState } from "react";

interface VariantsTabProps {
    form: UseFormReturn<ProductFormValues>
}

const VariantsTab = ({ form }: VariantsTabProps) => {
    const [newAttributeName, setNewAttributeName] = useState("")
    const [newAttributeValue, setNewAttributeValue] = useState("")
  
    const hasVariants = form.watch("hasVariants")
    const variantOptions = form.watch("variantOptions") || []
    const variants = form.watch("variants") || []
  
    const addAttribute = () => {
      if (newAttributeName) {
        form.setValue("variantOptions", [
          ...variantOptions,
          {
            name: newAttributeName,
            values: [],
            visible: true,
            variation: true,
          },
        ])
        setNewAttributeName("")
      }
    }
  
    const removeAttribute = (index: number) => {
      form.setValue(
        "variantOptions",
        variantOptions.filter((_, i) => i !== index),
      )
    }
  
    const addAttributeValue = (attributeIndex: number) => {
      if (newAttributeValue) {
        const updatedOptions = [...variantOptions]
        updatedOptions[attributeIndex].values = [...updatedOptions[attributeIndex].values, newAttributeValue]
        form.setValue("variantOptions", updatedOptions)
        setNewAttributeValue("")
      }
    }
  
    const removeAttributeValue = (attributeIndex: number, valueIndex: number) => {
      const updatedOptions = [...variantOptions]
      updatedOptions[attributeIndex].values = updatedOptions[attributeIndex].values.filter((_, i) => i !== valueIndex)
      form.setValue("variantOptions", updatedOptions)
    }
  
    const generateVariants = () => {
      if (variantOptions.length === 0) return
  
      const attributesWithValues = variantOptions.filter((attr) => attr.values.length > 0)
  
      if (attributesWithValues.length === 0) return
  
      const generateCombinations = (
        attributes: typeof variantOptions,
        current: Record<string, string> = {},
        index = 0,
      ): Record<string, string>[] => {
        if (index === attributes.length) {
          return [current]
        }
  
        const attribute = attributes[index]
        const combinations: Record<string, string>[] = []
  
        for (const value of attribute.values) {
          const newCombination = { ...current, [attribute.name]: value }
          combinations.push(...generateCombinations(attributes, newCombination, index + 1))
        }
  
        return combinations
      }
  
      const combinations = generateCombinations(attributesWithValues)
  
      const newVariants = combinations.map((options) => ({
        options,
        sku: "",
        barcode: "",
        price: form.getValues("regularPrice"),
        stockQuantity: form.getValues("stockQuantity") || 0,
        allowBackorders: false,
        isEnabled: true,
      }))
  
      form.setValue("variants", newVariants)
    }
  
    const removeVariant = (index: number) => {
      form.setValue(
        "variants",
        variants.filter((_, i) => i !== index),
      )
    }

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Product Variations</CardTitle>
          <CardDescription className="text-[#A4B8D3]">Add variations like size, color, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="hasVariants"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} id="has-variations" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>This product has multiple variants</FormLabel>
                  <FormDescription className="text-sm text-[#A4B8D3]">
                    Enable this to create variations like different sizes, colors, etc.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
  
          {hasVariants && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Attributes</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="New attribute name"
                      value={newAttributeName}
                      onChange={(e) => setNewAttributeName(e.target.value)}
                      className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer"
                      onClick={addAttribute}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
  
                {variantOptions.length > 0 ? (
                  <div className="space-y-4">
                    {variantOptions.map((attribute, attrIndex) => (
                      <div key={attrIndex} className="border border-dashed rounded-md p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{attribute.name}</h4>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeAttribute(attrIndex)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
  
                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            placeholder="Add value"
                            value={newAttributeValue}
                            onChange={(e) => setNewAttributeValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addAttributeValue(attrIndex)
                              }
                            }}
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <Button type="button" variant="outline" size="sm" onClick={() => addAttributeValue(attrIndex)} className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer">
                            Add
                          </Button>
                        </div>
  
                        <div className="flex flex-wrap gap-2">
                          {attribute.values.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                            >
                              <span>{value}</span>
                              <button
                                type="button"
                                onClick={() => removeAttributeValue(attrIndex, valueIndex)}
                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
  
                        <div className="flex items-center space-x-4 mt-2">
                          <FormItem className="flex items-center space-x-2">
                            <Checkbox
                              id={`visible-${attrIndex}`}
                              checked={attribute.visible}
                              onCheckedChange={(checked) => {
                                const updatedOptions = [...variantOptions]
                                updatedOptions[attrIndex].visible = !!checked
                                form.setValue("variantOptions", updatedOptions)
                              }}
                            />
                            <FormLabel htmlFor={`visible-${attrIndex}`} className="text-sm">
                              Visible on product page
                            </FormLabel>
                          </FormItem>
  
                          <FormItem className="flex items-center space-x-2">
                            <Checkbox
                              id={`variation-${attrIndex}`}
                              checked={attribute.variation}
                              onCheckedChange={(checked) => {
                                const updatedOptions = [...variantOptions]
                                updatedOptions[attrIndex].variation = !!checked
                                form.setValue("variantOptions", updatedOptions)
                              }}
                            />
                            <FormLabel htmlFor={`variation-${attrIndex}`} className="text-sm">
                              Used for variations
                            </FormLabel>
                          </FormItem>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No attributes added yet</p>
                  </div>
                )}
              </div>
  
              <FormField
                control={form.control}
                name="variantDisplay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Display Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                          <SelectValue placeholder="Select display style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                        <SelectItem value="dropdown">Dropdown</SelectItem>
                        <SelectItem value="buttons">Buttons</SelectItem>
                        <SelectItem value="swatches">Color Swatches</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How variants will be displayed on the product page</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <Separator />
  
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Variants</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer"
                    onClick={generateVariants}
                    disabled={variantOptions.length === 0}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Variants
                  </Button>
                </div>
  
                {variants.length > 0 ? (
                  <div className="border border-dashed rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {variantOptions
                            .filter((attr) => attr.variation)
                            .map((attr, i) => (
                              <TableHead key={i}>{attr.name}</TableHead>
                            ))}
                          <TableHead>Price</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Enabled</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variants.map((variant, index) => (
                          <TableRow key={index}>
                            {variantOptions
                              .filter((attr) => attr.variation)
                              .map((attr, i) => (
                                <TableCell key={i}>{variant.options[attr.name]}</TableCell>
                              ))}
                            <TableCell>
                              <Input
                                type="number"
                                value={variant.price || ""}
                                onChange={(e) => {
                                  const updatedVariants = [...variants]
                                  updatedVariants[index].price = e.target.value
                                    ? Number.parseFloat(e.target.value)
                                    : undefined
                                  form.setValue("variants", updatedVariants)
                                }}
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5] w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={variant.sku || ""}
                                onChange={(e) => {
                                  const updatedVariants = [...variants]
                                  updatedVariants[index].sku = e.target.value
                                  form.setValue("variants", updatedVariants)
                                }}
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5] w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={variant.stockQuantity}
                                onChange={(e) => {
                                  const updatedVariants = [...variants]
                                  updatedVariants[index].stockQuantity = Number.parseInt(e.target.value)
                                  form.setValue("variants", updatedVariants)
                                }}
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5] w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={variant.isEnabled}
                                onCheckedChange={(checked) => {
                                  const updatedVariants = [...variants]
                                  updatedVariants[index].isEnabled = !!checked
                                  form.setValue("variants", updatedVariants)
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Button type="button" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer" size="sm" onClick={() => removeVariant(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No variants generated yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
}

export default VariantsTab