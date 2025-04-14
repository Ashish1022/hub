import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ProductFormValues } from '@/lib/db/schemas/products'
import { format } from 'date-fns'
import { CalendarIcon, DollarSign, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface PricingTabProps {
    form: UseFormReturn<ProductFormValues>
}

const PricingTab = ({ form }: PricingTabProps) => {

    const bulkPricing = form.watch("bulkPricing") || []

    // Add a new bulk pricing tier
    const addBulkPricingTier = () => {
        const newTier = {
            minQuantity: bulkPricing.length > 0 ? bulkPricing[bulkPricing.length - 1].maxQuantity! + 1 : 2,
            maxQuantity: bulkPricing.length > 0 ? bulkPricing[bulkPricing.length - 1].maxQuantity! + 10 : 10,
            price: form.getValues("regularPrice") || 0,
            discountType: "percentage" as const,
        }
        form.setValue("bulkPricing", [...bulkPricing, newTier])
    }

    // Remove a bulk pricing tier
    const removeBulkPricingTier = (index: number) => {
        form.setValue(
            "bulkPricing",
            bulkPricing.filter((_, i) => i !== index),
        )
    }

    // Calculate profit and margin
    const regularPrice = form.watch("regularPrice") || 0
    const costPrice = form.watch("costPrice") || 0
    const profit = regularPrice - costPrice
    const margin = costPrice > 0 ? (profit / regularPrice) * 100 : 0

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Product Pricing</CardTitle>
                <CardDescription className="text-[#A4B8D3]">Set the pricing for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="regularPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Regular Price ($)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="salePrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sale Price ($)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="onSale"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="on-sale" />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Product is on sale</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {form.watch("onSale") && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <FormField
                                    control={form.control}
                                    name="saleStartDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Sale Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button variant="outline" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="saleEndDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Sale End Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant="outline" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]">
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="costPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost Price ($)</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                {...field}
                                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profitMargin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profit Margin (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
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

                        <div className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                            <h4 className="font-medium mb-2">Profit Calculation</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#A4B8D3]">Cost Price:</span>
                                    <span>${costPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A4B8D3]">Selling Price:</span>
                                    <span>${regularPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A4B8D3]">Profit:</span>
                                    <span>${profit.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A4B8D3]">Margin:</span>
                                    <span>{margin.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-[#1E293B]" />

                <div className="space-y-4">
                    <h3 className="font-medium">Tax Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="taxClass"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax Class</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                <SelectValue placeholder="Select tax class" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            <SelectItem value="standard">Standard Rate</SelectItem>
                                            <SelectItem value="reduced">Reduced Rate</SelectItem>
                                            <SelectItem value="zero">Zero Rate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="taxStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                <SelectValue placeholder="Select tax status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            <SelectItem value="taxable">Taxable</SelectItem>
                                            <SelectItem value="shipping">Shipping Only</SelectItem>
                                            <SelectItem value="none">None</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator className="bg-[#1E293B]" />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Bulk Pricing</h3>
                        <Button type="button" variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer" onClick={addBulkPricingTier}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Tier
                        </Button>
                    </div>
                    <p className="text-sm text-[#A4B8D3]">Set discounted prices for bulk purchases</p>

                    <div className="space-y-2">
                        {bulkPricing.length > 0 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-4 mb-2">
                                    <div>
                                        <FormLabel>Min Quantity</FormLabel>
                                    </div>
                                    <div>
                                        <FormLabel>Max Quantity</FormLabel>
                                    </div>
                                    <div>
                                        <FormLabel>Price</FormLabel>
                                    </div>
                                    <div></div>
                                </div>

                                {bulkPricing.map((tier, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                                        <Input
                                            type="number"
                                            value={tier.minQuantity}
                                            onChange={(e) => {
                                                const newTiers = [...bulkPricing]
                                                newTiers[index].minQuantity = Number.parseInt(e.target.value)
                                                form.setValue("bulkPricing", newTiers)
                                            }}
                                            min={1}
                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                        />
                                        <Input
                                            type="number"
                                            value={tier.maxQuantity || ""}
                                            onChange={(e) => {
                                                const newTiers = [...bulkPricing]
                                                newTiers[index].maxQuantity = e.target.value ? Number.parseInt(e.target.value) : undefined
                                                form.setValue("bulkPricing", newTiers)
                                            }}
                                            placeholder="No limit"
                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                        />
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                type="number"
                                                value={tier.price}
                                                onChange={(e) => {
                                                    const newTiers = [...bulkPricing]
                                                    newTiers[index].price = Number.parseFloat(e.target.value)
                                                    form.setValue("bulkPricing", newTiers)
                                                }}
                                                className="pl-8 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </div>
                                        <Button type="button" variant="ghost" className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent cursor-pointer" onClick={() => removeBulkPricingTier(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PricingTab