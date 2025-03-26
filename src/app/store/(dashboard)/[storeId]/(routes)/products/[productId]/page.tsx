"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CreditCard,
  DollarSign,
  Globe,
  HelpCircle,
  ImageIcon,
  LineChart,
  Menu,
  Package,
  Plus,
  Save,
  Settings,
  ShoppingBag,
  Tag,
  Trash2,
  Upload,
  Users,
} from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import Navbar from "@/app/store/(dashboard)/[storeId]/_components/navbar"

export default function AddProductPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { user } = useUser()
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  // Simulate image upload
  const handleImageUpload = () => {
    const newImage = `/placeholder.svg?height=200&width=200&text=Product+Image+${images.length + 1}`
    setImages([...images, newImage])
  }

  // Add a new tag
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="min-h-screen bg-[#050A18] text-white">
      {/* Decorative elements */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/10 via-[#FF00E5]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/10 via-[#7000FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-[#0A1228]/80 border-r border-[#1E293B] p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
              <Globe className="h-8 w-8 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
              ZERO | HUB
            </span>
          </div>
          <Navbar/>
          <div className="pt-4 border-t border-[#1E293B] mt-6">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Documentation</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-[#1E293B] bg-[#050A18]/80 backdrop-blur-sm flex items-center justify-between px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5 text-[#A4B8D3]" />
              </Button>
              <Link href="/dashboard/products" className="flex items-center text-[#A4B8D3] hover:text-white mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline-block">Back to Products</span>
              </Link>
              <h1 className="text-lg font-medium">Add New Product</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-[#A4B8D3]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF3D00]"></span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#0A1228] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#FF3D00] flex items-center justify-center">
                      <UserButton />
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium hidden md:inline-block">{`${user?.firstName} ${user?.lastName}`}</span>
              </div>
            </div>
          </header>

          {/* Add Product content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    Add New Product
                  </h1>
                  <p className="text-[#A4B8D3]">Create a new product in your inventory</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    Save as Draft
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Save className="h-4 w-4 mr-2" />
                    Publish Product
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-[#0A1228] border border-[#1E293B] mb-6">
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="images"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="pricing"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger
                    value="inventory"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipping"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Shipping
                  </TabsTrigger>
                  <TabsTrigger
                    value="seo"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    SEO
                  </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle>Product Information</CardTitle>
                          <CardDescription className="text-[#A4B8D3]">
                            Basic information about your product
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Product Name</Label>
                              <Input
                                id="name"
                                placeholder="Enter product name"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">Product Description</Label>
                              <Textarea
                                id="description"
                                placeholder="Enter product description"
                                className="min-h-[150px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="short-description">Short Description</Label>
                              <Textarea
                                id="short-description"
                                placeholder="Enter a short description for product listings"
                                className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                        <CardHeader>
                          <CardTitle>Product Details</CardTitle>
                          <CardDescription className="text-[#A4B8D3]">
                            Additional details and specifications
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                              <Input
                                id="sku"
                                placeholder="Enter SKU"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                              <Input
                                id="barcode"
                                placeholder="Enter barcode"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Product Tags</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {tags.map((tag, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF00E5]/10 text-[#FF00E5] text-sm"
                                >
                                  <span>{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#FF00E5]/20"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    addTag()
                                  }
                                }}
                              />
                              <Button type="button" onClick={addTag} className="bg-[#1E293B] hover:bg-[#1E293B]/80">
                                <Tag className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="material">Material</Label>
                            <Input
                              id="material"
                              placeholder="Enter material"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="width">Width (cm)</Label>
                              <Input
                                id="width"
                                type="number"
                                placeholder="Width"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="height">Height (cm)</Label>
                              <Input
                                id="height"
                                type="number"
                                placeholder="Height"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="depth">Depth (cm)</Label>
                              <Input
                                id="depth"
                                type="number"
                                placeholder="Depth"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                              id="weight"
                              type="number"
                              placeholder="Enter weight"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle>Organization</CardTitle>
                          <CardDescription className="text-[#A4B8D3]">
                            Categorize and organize your product
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="apparel">Apparel</SelectItem>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="accessories">Accessories</SelectItem>
                                <SelectItem value="home">Home & Kitchen</SelectItem>
                                <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subcategory">Subcategory</Label>
                            <Select>
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="tshirts">T-Shirts</SelectItem>
                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                <SelectItem value="jeans">Jeans</SelectItem>
                                <SelectItem value="dresses">Dresses</SelectItem>
                                <SelectItem value="jackets">Jackets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Select>
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="zero">ZERO</SelectItem>
                                <SelectItem value="nike">Nike</SelectItem>
                                <SelectItem value="adidas">Adidas</SelectItem>
                                <SelectItem value="puma">Puma</SelectItem>
                                <SelectItem value="reebok">Reebok</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="collections">Collections</Label>
                            <div className="space-y-2">
                              {["Summer Collection", "New Arrivals", "Best Sellers", "Limited Edition", "Sale"].map(
                                (collection, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <Checkbox id={`collection-${i}`} />
                                    <label
                                      htmlFor={`collection-${i}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {collection}
                                    </label>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Product Status</Label>
                            <Select defaultValue="active">
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                        <CardHeader>
                          <CardTitle>Featured Product</CardTitle>
                          <CardDescription className="text-[#A4B8D3]">
                            Highlight this product in your store
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Featured Product</h4>
                              <p className="text-sm text-[#A4B8D3]">Show this product on the homepage</p>
                            </div>
                            <Switch />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Images Tab */}
                <TabsContent value="images">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">Upload images for your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-6 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
                          <ImageIcon className="h-8 w-8 text-[#FF00E5]" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Drag and drop your images here</h3>
                        <p className="text-sm text-[#A4B8D3] mb-4">Supports JPG, PNG and GIF. Maximum file size 5MB.</p>
                        <Button
                          onClick={handleImageUpload}
                          className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Images
                        </Button>
                      </div>

                      {images.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-medium">Uploaded Images</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Product image ${index + 1}`}
                                  className="w-full h-40 object-cover rounded-lg border border-[#1E293B]"
                                />
                                <div className="absolute inset-0 bg-[#050A18]/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="bg-[#FF3D00] hover:bg-[#FF3D00]/90"
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                {index === 0 && (
                                  <div className="absolute top-2 left-2 bg-[#FF00E5] text-white text-xs px-2 py-1 rounded">
                                    Main
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-sm text-[#A4B8D3]">
                            Drag to reorder. The first image will be used as the product thumbnail.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Product Pricing</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">Set the pricing for your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="regular-price">Regular Price ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                              <Input
                                id="regular-price"
                                type="number"
                                placeholder="0.00"
                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="sale-price">Sale Price ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                              <Input
                                id="sale-price"
                                type="number"
                                placeholder="0.00"
                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="on-sale" />
                            <label
                              htmlFor="on-sale"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Product is on sale
                            </label>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cost-price">Cost Price ($)</Label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                              <Input
                                id="cost-price"
                                type="number"
                                placeholder="0.00"
                                className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="profit-margin">Profit Margin (%)</Label>
                            <Input
                              id="profit-margin"
                              type="number"
                              placeholder="0"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>

                          <div className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                            <h4 className="font-medium mb-2">Profit Calculation</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-[#A4B8D3]">Cost Price:</span>
                                <span>$0.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#A4B8D3]">Selling Price:</span>
                                <span>$0.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#A4B8D3]">Profit:</span>
                                <span>$0.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#A4B8D3]">Margin:</span>
                                <span>0%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">Tax Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tax-class">Tax Class</Label>
                            <Select defaultValue="standard">
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select tax class" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="standard">Standard Rate</SelectItem>
                                <SelectItem value="reduced">Reduced Rate</SelectItem>
                                <SelectItem value="zero">Zero Rate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tax-status">Tax Status</Label>
                            <Select defaultValue="taxable">
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select tax status" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="taxable">Taxable</SelectItem>
                                <SelectItem value="shipping">Shipping Only</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">Bulk Pricing</h3>
                        <p className="text-sm text-[#A4B8D3]">Set discounted prices for bulk purchases</p>

                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-4 mb-2">
                            <div>
                              <Label htmlFor="quantity-min">Min Quantity</Label>
                            </div>
                            <div>
                              <Label htmlFor="quantity-max">Max Quantity</Label>
                            </div>
                            <div>
                              <Label htmlFor="discount">Discount (%)</Label>
                            </div>
                          </div>

                          {[1, 2, 3].map((i) => (
                            <div key={i} className="grid grid-cols-3 gap-4">
                              <Input
                                id={`quantity-min-${i}`}
                                type="number"
                                placeholder="Min"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                              <Input
                                id={`quantity-max-${i}`}
                                type="number"
                                placeholder="Max"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                              <Input
                                id={`discount-${i}`}
                                type="number"
                                placeholder="0"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                              />
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Tier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Inventory Tab */}
                <TabsContent value="inventory">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Inventory Management</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">Manage your product inventory</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="track-inventory" defaultChecked />
                          <label
                            htmlFor="track-inventory"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Track inventory for this product
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="stock-quantity">Stock Quantity</Label>
                            <Input
                              id="stock-quantity"
                              type="number"
                              placeholder="0"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                            <Input
                              id="low-stock-threshold"
                              type="number"
                              placeholder="5"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Stock Status</Label>
                          <RadioGroup defaultValue="in-stock">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="in-stock" id="in-stock" />
                              <Label htmlFor="in-stock">In stock</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                              <Label htmlFor="out-of-stock">Out of stock</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="backorder" id="backorder" />
                              <Label htmlFor="backorder">On backorder</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="allow-backorders" />
                          <label
                            htmlFor="allow-backorders"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Allow backorders
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="sold-individually" />
                          <label
                            htmlFor="sold-individually"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Limit purchases to 1 item per order
                          </label>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">Inventory Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="warehouse">Warehouse</Label>
                            <Select>
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select warehouse" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="main">Main Warehouse</SelectItem>
                                <SelectItem value="east">East Coast Warehouse</SelectItem>
                                <SelectItem value="west">West Coast Warehouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bin-location">Bin Location</Label>
                            <Input
                              id="bin-location"
                              placeholder="e.g., A12-B34"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                    <CardHeader>
                      <CardTitle>Product Variations</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">
                        Add variations like size, color, etc.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="has-variations" />
                        <label
                          htmlFor="has-variations"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          This product has multiple variations
                        </label>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Attributes</Label>
                          <div className="space-y-2">
                            {["Size", "Color", "Material", "Style"].map((attr, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <Checkbox id={`attr-${i}`} />
                                <label
                                  htmlFor={`attr-${i}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {attr}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Custom Attribute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Shipping Tab */}
                <TabsContent value="shipping">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Shipping Information</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">
                        Configure shipping options for this product
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="physical-product" defaultChecked />
                          <label
                            htmlFor="physical-product"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            This is a physical product that requires shipping
                          </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                              id="weight"
                              type="number"
                              placeholder="0.00"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="length">Length (cm)</Label>
                            <Input
                              id="length"
                              type="number"
                              placeholder="0.00"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="width">Width (cm)</Label>
                            <Input
                              id="width"
                              type="number"
                              placeholder="0.00"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                              id="height"
                              type="number"
                              placeholder="0.00"
                              className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="shipping-class">Shipping Class</Label>
                            <Select>
                              <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                <SelectValue placeholder="Select shipping class" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="express">Express</SelectItem>
                                <SelectItem value="bulky">Bulky Items</SelectItem>
                                <SelectItem value="fragile">Fragile</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">Shipping Restrictions</h3>

                        <div className="space-y-2">
                          <Label>Countries Not Allowed for Shipping</Label>
                          <Select>
                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                              <SelectValue placeholder="Select countries" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                              <SelectItem value="none">No Restrictions</SelectItem>
                              <SelectItem value="custom">Custom Selection</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="free-shipping" />
                          <label
                            htmlFor="free-shipping"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            This product qualifies for free shipping
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Search Engine Optimization</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">
                        Optimize your product for search engines
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="meta-title">Meta Title</Label>
                          <Input
                            id="meta-title"
                            placeholder="Enter meta title"
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <p className="text-xs text-[#A4B8D3]">
                            The title that appears in search engine results (Recommended: 50-60 characters)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="meta-description">Meta Description</Label>
                          <Textarea
                            id="meta-description"
                            placeholder="Enter meta description"
                            className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <p className="text-xs text-[#A4B8D3]">
                            The description that appears in search engine results (Recommended: 150-160 characters)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="meta-keywords">Meta Keywords</Label>
                          <Input
                            id="meta-keywords"
                            placeholder="Enter keywords separated by commas"
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <p className="text-xs text-[#A4B8D3]">
                            Keywords related to your product (separated by commas)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="canonical-url">Canonical URL</Label>
                          <Input
                            id="canonical-url"
                            placeholder="https://"
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <p className="text-xs text-[#A4B8D3]">
                            The preferred URL for this product if duplicate content exists
                          </p>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">Social Media Preview</h3>

                        <div className="space-y-2">
                          <Label htmlFor="og-title">Open Graph Title</Label>
                          <Input
                            id="og-title"
                            placeholder="Enter title for social media"
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="og-description">Open Graph Description</Label>
                          <Textarea
                            id="og-description"
                            placeholder="Enter description for social media"
                            className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Open Graph Image</Label>
                          <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-4 text-center">
                            <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Button>
                            <p className="text-xs text-[#A4B8D3] mt-2">Recommended size: 1200 x 630 pixels</p>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#1E293B]" />

                      <div className="space-y-4">
                        <h3 className="font-medium">URL Settings</h3>

                        <div className="space-y-2">
                          <Label htmlFor="slug">Product Slug</Label>
                          <Input
                            id="slug"
                            placeholder="product-url-slug"
                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                          />
                          <p className="text-xs text-[#A4B8D3]">
                            The last part of the URL. Leave empty to generate from product name.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end mt-6 space-x-4">
                <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                  Save as Draft
                </Button>
                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                  <Save className="h-4 w-4 mr-2" />
                  Publish Product
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

