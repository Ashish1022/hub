"use client"

import type { UseFormReturn } from "react-hook-form";
import { CalendarIcon, Plus, Trash2, Upload } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import type { ProductFormValues } from "../../schema";
import { Separator } from "@/components/ui/separator";

interface AdvancedSectionProps {
  form: UseFormReturn<ProductFormValues>
}

export function AdvancedSection({ form }: AdvancedSectionProps) {
  const downloadable = form.watch("downloadable")
  const downloadFiles = form.watch("downloadFiles") || []
  const preOrderAvailable = form.watch("preOrderAvailable")
  const customizable = form.watch("customizable")
  const customizationOptions = form.watch("customizationOptions") || []

  const addDownloadFile = () => {
    form.setValue("downloadFiles", [...downloadFiles, { name: "", url: "", size: undefined }])
  }

  const removeDownloadFile = (index: number) => {
    form.setValue(
      "downloadFiles",
      downloadFiles.filter((_, i) => i !== index),
    )
  }

  const addCustomizationOption = () => {
    form.setValue("customizationOptions", [
      ...customizationOptions,
      {
        name: "",
        type: "text",
        required: false,
        options: [],
        price: undefined,
        priceType: "fixed",
      },
    ])
  }

  const removeCustomizationOption = (index: number) => {
    form.setValue(
      "customizationOptions",
      customizationOptions.filter((_, i) => i !== index),
    )
  }

  return (
    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription className="text-[#A4B8D3]">Additional product settings and options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Purchase Notes</h3>
          <FormField
            control={form.control}
            name="purchaseNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Note</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter a note that will be sent to customers after purchase"
                    className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                </FormControl>
                <FormDescription>This note will be sent to the customer after they purchase the product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-[#1E293B]" />

        <div className="space-y-4">
          <h3 className="font-medium">Reviews</h3>
          <FormField
            control={form.control}
            name="enableReviews"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <div className="space-y-1 leading-none">
                  <FormLabel>Enable customer reviews for this product</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-[#1E293B]" />

        <div className="space-y-4">
          <h3 className="font-medium">Downloadable Product</h3>

          <FormField
            control={form.control}
            name="downloadable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <div className="space-y-1 leading-none">
                  <FormLabel>This product has downloadable files</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {downloadable && (
            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Downloadable Files</h4>
                <Button type="button" variant="outline" size="sm" onClick={addDownloadFile} className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                  <Plus className="h-4 w-4 mr-2" />
                  Add File
                </Button>
              </div>

              {downloadFiles.length > 0 ? (
                <div className="space-y-4">
                  {downloadFiles.map((file, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center border p-3 rounded-md">
                      <Input
                        placeholder="File name"
                        value={file.name}
                        onChange={(e) => {
                          const updatedFiles = [...downloadFiles]
                          updatedFiles[index].name = e.target.value
                          form.setValue("downloadFiles", updatedFiles)
                        }}
                      />
                      <div className="flex gap-2 md:col-span-2">
                        <Input
                          placeholder="File URL"
                          value={file.url}
                          onChange={(e) => {
                            const updatedFiles = [...downloadFiles]
                            updatedFiles[index].url = e.target.value
                            form.setValue("downloadFiles", updatedFiles)
                          }}
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" size="icon" className="shrink-0">
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDownloadFile(index)}
                          className="h-8 w-8 mt-6 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border border-dashed border-[#1E293B] rounded-lg text-center">
                  <p className="text-sm text-[#A4B8D3]">No downloadable files added yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        <Separator className="bg-[#1E293B]" />

        <div className="space-y-4">
          <h3 className="font-medium">Pre-Order</h3>
          <FormField
            control={form.control}
            name="preOrderAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <div className="space-y-1 leading-none">
                  <FormLabel>This product is available for pre-order</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {preOrderAvailable && (
            <div className="space-y-4 pl-7">
              <FormField
                control={form.control}
                name="preOrderReleaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Pre-Order Release Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"/>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preOrderMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Order Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter a message to display for pre-orders"
                        className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <Separator className="bg-[#1E293B]" />

        <FormField
          control={form.control}
          name="customizable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Customizable Product</FormLabel>
                <FormDescription>This product can be customized by customers</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {customizable && (
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Customization Options</h4>
              <Button type="button" variant="outline" size="sm" onClick={addCustomizationOption}>
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>

            {customizationOptions.length > 0 ? (
              <div className="space-y-4">
                {customizationOptions.map((option, index) => (
                  <div key={index} className="border p-3 rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Option name"
                        value={option.name}
                        onChange={(e) => {
                          const updatedOptions = [...customizationOptions]
                          updatedOptions[index].name = e.target.value
                          form.setValue("customizationOptions", updatedOptions)
                        }}
                        className="max-w-xs"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCustomizationOption(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <FormLabel className="text-xs">Type</FormLabel>
                        <Select
                          value={option.type}
                          onValueChange={(value) => {
                            const updatedOptions = [...customizationOptions]
                            updatedOptions[index].type = value as any
                            form.setValue("customizationOptions", updatedOptions)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="checkbox">Checkbox</SelectItem>
                            <SelectItem value="radio">Radio Buttons</SelectItem>
                            <SelectItem value="file">File Upload</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={option.required}
                          onCheckedChange={(checked) => {
                            const updatedOptions = [...customizationOptions]
                            updatedOptions[index].required = checked
                            form.setValue("customizationOptions", updatedOptions)
                          }}
                          id={`required-${index}`}
                        />
                        <FormLabel htmlFor={`required-${index}`} className="text-sm">
                          Required
                        </FormLabel>
                      </div>
                    </div>

                    {(option.type === "select" || option.type === "radio") && (
                      <div>
                        <FormLabel className="text-xs">Options (comma separated)</FormLabel>
                        <Input
                          placeholder="Option 1, Option 2, Option 3"
                          value={(option.options || []).join(", ")}
                          onChange={(e) => {
                            const updatedOptions = [...customizationOptions]
                            updatedOptions[index].options = e.target.value.split(",").map((o) => o.trim())
                            form.setValue("customizationOptions", updatedOptions)
                          }}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FormLabel className="text-xs">Additional Price</FormLabel>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={option.price ?? ""}
                          onChange={(e) => {
                            const updatedOptions = [...customizationOptions]
                            updatedOptions[index].price = e.target.value ? Number.parseFloat(e.target.value) : undefined
                            form.setValue("customizationOptions", updatedOptions)
                          }}
                        />
                      </div>
                      <div>
                        <FormLabel className="text-xs">Price Type</FormLabel>
                        <Select
                          value={option.priceType}
                          onValueChange={(value) => {
                            const updatedOptions = [...customizationOptions]
                            updatedOptions[index].priceType = value as any
                            form.setValue("customizationOptions", updatedOptions)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                            <SelectItem value="percentage">Percentage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md">
                <p className="text-muted-foreground">No customization options added yet</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

