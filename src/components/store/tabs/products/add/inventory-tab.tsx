import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useMockData } from '@/constants'
import { ProductFormValues } from '@/lib/db/schemas/products'
import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface InventoryTabProps {
    form: UseFormReturn<ProductFormValues>
}

const InventoryTab = ({ form }: InventoryTabProps) => {

    const { warehouses } = useMockData()
    const preOrderAvailable = form.watch("preOrderAvailable")

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
          <CardDescription className="text-[#A4B8D3]">Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="trackInventory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="track-inventory" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Track inventory for this product</FormLabel>
                  </div>
                </FormItem>
              )}
            />
  
            {form.watch("trackInventory") && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : 0)}
                            value={field.value}
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="lowStockThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Stock Threshold</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : 5)}
                            value={field.value}
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </FormControl>
                        <FormDescription>Get notified when stock falls below this level</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
  
                <FormField
                  control={form.control}
                  name="stockStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Stock Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="in-stock" />
                            </FormControl>
                            <FormLabel className="font-normal">In stock</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="out-of-stock" />
                            </FormControl>
                            <FormLabel className="font-normal">Out of stock</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="backorder" />
                            </FormControl>
                            <FormLabel className="font-normal">On backorder</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="allowBackorders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="allow-backorders" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Allow backorders</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
  
                {form.watch("allowBackorders") && (
                  <FormField
                    control={form.control}
                    name="backorderLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backorder Limit</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="No limit"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                            value={field.value ?? ""}
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum number of units that can be backordered (leave empty for no limit)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
  
          </div>
  
          <FormField
            control={form.control}
            name="soldIndividually"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} id="sold-individually" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Limit purchases to 1 item per order</FormLabel>
                </div>
              </FormItem>
            )}
          />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minPurchaseQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Purchase Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : 1)}
                      value={field.value}
                      className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="maxPurchaseQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Purchase Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Leave empty for no limit"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                      value={field.value ?? ""}
                      className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
  
          <Separator className="bg-[#1E293B]" />
  
          <div className="space-y-4">
            <h3 className="font-medium">Inventory Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="warehouse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                          <SelectValue placeholder="Select warehouse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                        {warehouses.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="binLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bin Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., A12-B34" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                    </FormControl>
                    <FormDescription>Physical location in the warehouse</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {preOrderAvailable && (
            <>
              <Separator className="bg-[#1E293B]" />
              <div className="space-y-4">
                <h3 className="font-medium">Pre-Order Settings</h3>
                <Alert className="bg-[#FF00E5]/10 border-[#FF00E5]/30 text-[#FF00E5]">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Pre-order is enabled. Customers can order this product before it's in stock.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preOrderReleaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release Date</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="datetime-local"
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="preOrderMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pre-Order Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="This item is available for pre-order and will ship on the release date."
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
}

export default InventoryTab