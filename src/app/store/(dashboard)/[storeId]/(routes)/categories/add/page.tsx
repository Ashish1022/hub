"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ImageIcon, Save, Upload } from "lucide-react"
import { DashboardNav } from "../../../_components/navbar"

export default function AddCategoryPage() {
  const [image, setImage] = useState<string | null>(null)

  // Simulate image upload
  const handleImageUpload = () => {
    setImage("/placeholder.svg?height=200&width=200&text=Category+Image")
  }

  return (
    <DashboardNav>
      <div className="p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard/categories" className="flex items-center text-[#A4B8D3] hover:text-white">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Categories</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                Add New Category
              </h1>
              <p className="text-[#A4B8D3]">Create a new product category</p>
            </div>
          </div>

          <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription className="text-[#A4B8D3]">Basic information about the category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter category name"
                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Category Slug</Label>
                  <Input
                    id="slug"
                    placeholder="Enter category slug"
                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                  <p className="text-xs text-[#A4B8D3]">
                    The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter category description"
                    className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>Category Image</CardTitle>
              <CardDescription className="text-[#A4B8D3]">Upload an image for this category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!image ? (
                <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-[#FF00E5]" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Drag and drop your image here</h3>
                  <p className="text-sm text-[#A4B8D3] mb-4">Supports JPG, PNG and GIF. Maximum file size 2MB.</p>
                  <Button
                    onClick={handleImageUpload}
                    className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative mx-auto w-40 h-40">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Category thumbnail"
                      className="w-full h-full object-cover rounded-lg border border-[#1E293B]"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 bg-[#FF3D00] hover:bg-[#FF3D00]/90"
                      onClick={() => setImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription className="text-[#A4B8D3]">Configure how this category appears</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select>
                    <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                      <SelectValue placeholder="None (top level category)" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                      <SelectItem value="none">None (top level category)</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-[#A4B8D3]">
                    Categories can have a hierarchy. You might have a parent category of "Apparel" and children
                    categories of "T-shirts" and "Hoodies".
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display-order">Display Order</Label>
                  <Input
                    id="display-order"
                    type="number"
                    placeholder="0"
                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                  <p className="text-xs text-[#A4B8D3]">
                    Categories are typically displayed in alphabetical order. You can choose a custom display order by
                    entering a number here.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show in Menu</h4>
                    <p className="text-sm text-[#A4B8D3]">Display this category in the navigation menu</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Featured Category</h4>
                    <p className="text-sm text-[#A4B8D3]">Highlight this category on the homepage</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription className="text-[#A4B8D3]">Optimize this category for search engines</CardDescription>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Enter meta description"
                    className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    placeholder="Enter keywords separated by commas"
                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
              Save as Draft
            </Button>
            <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
              <Save className="h-4 w-4 mr-2" />
              Create Category
            </Button>
          </div>
        </div>
      </div>
    </DashboardNav>
  )
}

