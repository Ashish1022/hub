"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ExternalLink, Search } from "lucide-react"

export default function TemplatesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-[#A4B8D3]">
          <Link href="/docs" className="hover:text-[#FF3D00] transition-colors">
            Docs
          </Link>
          <span>/</span>
          <Link href="/docs/getting-started" className="hover:text-[#FF3D00] transition-colors">
            Getting Started
          </Link>
          <span>/</span>
          <span className="text-[#FF3D00]">Templates</span>
        </div>

        <div className="space-y-2">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 px-3 py-1 border-[#00FFD1]/30">
            Getting Started
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] text-transparent bg-clip-text">
            Website Templates
          </h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-[#A4B8D3]">
          ZERO | HUB offers a wide range of professionally designed templates to help you get started quickly. Our
            templates are fully customizable and optimized for different industries and business needs.
          </p>

          <div className="mt-6 mb-8 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                <input
                  type="search"
                  placeholder="Search templates..."
                  className="w-full rounded-md border border-[#1E293B] bg-[#050A18] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#A4B8D3] focus:outline-none focus:ring-1 focus:ring-[#00FFD1]"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 border-[#00FFD1]/30">All</Badge>
                <Badge className="bg-[#0A1228] text-[#A4B8D3] hover:bg-[#1E293B] border-[#1E293B]">E-Commerce</Badge>
                <Badge className="bg-[#0A1228] text-[#A4B8D3] hover:bg-[#1E293B] border-[#1E293B]">Portfolio</Badge>
                <Badge className="bg-[#0A1228] text-[#A4B8D3] hover:bg-[#1E293B] border-[#1E293B]">Business</Badge>
                <Badge className="bg-[#0A1228] text-[#A4B8D3] hover:bg-[#1E293B] border-[#1E293B]">Blog</Badge>
                <Badge className="bg-[#0A1228] text-[#A4B8D3] hover:bg-[#1E293B] border-[#1E293B]">Landing Page</Badge>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Featured Templates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-8">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#00FFD1]/20 to-[#FF3D00]/20 flex items-center justify-center">
                  <span className="text-sm text-[#A4B8D3]">Template Preview</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">E-Commerce Pro</h3>
                    <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 border-[#00FFD1]/30">
                      Popular
                    </Badge>
                  </div>
                  <p className="text-sm text-[#A4B8D3] mb-4">
                    A comprehensive e-commerce template with product listings, cart, and checkout functionality.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A4B8D3]">E-Commerce</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(0,255,209,0.3)]"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#00FFD1]/20 to-[#FF3D00]/20 flex items-center justify-center">
                  <span className="text-sm text-[#A4B8D3]">Template Preview</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">Portfolio Showcase</h3>
                    <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 border-[#FF3D00]/30">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-[#A4B8D3] mb-4">
                    A sleek portfolio template perfect for designers, photographers, and creative professionals.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A4B8D3]">Portfolio</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(0,255,209,0.3)]"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#00FFD1]/20 to-[#FF3D00]/20 flex items-center justify-center">
                  <span className="text-sm text-[#A4B8D3]">Template Preview</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">Business Services</h3>
                  </div>
                  <p className="text-sm text-[#A4B8D3] mb-4">
                    A professional template for service-based businesses with service listings and testimonials.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A4B8D3]">Business</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(0,255,209,0.3)]"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-[#00FFD1]/20 to-[#FF3D00]/20 flex items-center justify-center">
                  <span className="text-sm text-[#A4B8D3]">Template Preview</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">Blog Standard</h3>
                  </div>
                  <p className="text-sm text-[#A4B8D3] mb-4">
                    A clean and modern blog template with multiple layouts for posts and categories.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A4B8D3]">Blog</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(0,255,209,0.3)]"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-[#0A1228] border border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white mb-8">
            View All Templates
          </Button>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Customizing Templates</h2>
          <p className="text-[#A4B8D3]">
            All ZERO | HUB templates are fully customizable. After selecting a template, you can:
          </p>

          <ul className="space-y-2 text-[#A4B8D3] mt-4">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Change colors, fonts, and layouts to match your brand</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Add, remove, or rearrange sections and pages</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Replace placeholder content with your own text and images</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Add custom functionality through our app marketplace</span>
            </li>
          </ul>

          <div className="mt-8 p-4 border border-[#1E293B] rounded-lg bg-[#0A1228]/50">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#00FFD1]" />
              Template Support
            </h3>
            <p className="text-[#A4B8D3] text-sm">
              Need help customizing a template? Check out our{" "}
              <Link href="/docs/resources/tutorials" className="text-[#00FFD1] hover:underline">
                template customization tutorials
              </Link>{" "}
              or contact our{" "}
              <Link href="/support" className="text-[#00FFD1] hover:underline">
                support team
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#1E293B] mt-8">
          <Button variant="outline" className="border-[#A4B8D3]/30 text-[#A4B8D3] hover:bg-[#A4B8D3]/10" asChild>
            <Link href="/docs/getting-started/quick-start" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Quick Start
            </Link>
          </Button>
          <Button variant="outline" className="border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10" asChild>
            <Link href="/docs/features/website-builder" className="flex items-center gap-2">
              Next: Website Builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

