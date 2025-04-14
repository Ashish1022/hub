"use client"

import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, DollarSign } from "lucide-react";
import { useMockData } from "@/constants";
import { ProductFormValues } from "@/lib/db/schemas/products";

interface ShippingTabProps {
    form: UseFormReturn<ProductFormValues>
}

const ShippingTab = ({ form }: ShippingTabProps) => {

    const { shippingClasses } = useMockData()
    const isPhysical = form.watch("isPhysical")

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Configure shipping options for this product</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isPhysical"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} id="physical-product" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>This is a physical product that requires shipping</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {isPhysical && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="shippingWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                          value={field.value ?? ""}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                          value={field.value ?? ""}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                          value={field.value ?? ""}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="shippingHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                          value={field.value ?? ""}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingClass"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Shipping Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                            <SelectValue placeholder="Select shipping class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                          {shippingClasses.map((shippingClass) => (
                            <SelectItem key={shippingClass.id} value={shippingClass.id}>
                              {shippingClass.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Shipping classes are used by certain shipping methods to group similar products
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {!isPhysical && (
            <Alert className="bg-[#FF00E5]/10 border-[#FF00E5]/30 text-[#FF00E5]">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This product is marked as non-physical (digital or service) and does not require shipping.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Separator className="bg-[#1E293B]" />

        <div className="space-y-4">
          <h3 className="font-medium">Shipping Restrictions</h3>

          <FormField
            control={form.control}
            name="shippingRestrictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Countries Not Allowed for Shipping</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={Array.isArray(field.value) ? field.value.join(", ") : field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                      <SelectValue placeholder="Select countries" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                    <SelectItem value="none">No Restrictions</SelectItem>
                    <SelectItem value="custom">Custom Selection</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="freeShipping"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} id="free-shipping" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>This product qualifies for free shipping</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiresShippingAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} id="requires-shipping-address" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Require shipping address at checkout</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingMarkup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Shipping Fee ($)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                      value={field.value ?? ""}
                      className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-[#A4B8D3]">Additional percentage to add to standard shipping rates</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card >
    )
}

export default ShippingTab