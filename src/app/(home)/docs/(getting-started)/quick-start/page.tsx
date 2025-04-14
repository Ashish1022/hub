"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Copy, ExternalLink, Lightbulb } from "lucide-react"

export default function QuickStartPage() {
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
          <span className="text-[#FF3D00]">Quick Start</span>
        </div>

        <div className="space-y-2">
          <Badge className="bg-[#7000FF]/10 text-[#7000FF] hover:bg-[#7000FF]/20 px-3 py-1 border-[#7000FF]/30">
            Getting Started
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-transparent bg-clip-text">
            Quick Start Guide
          </h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-[#A4B8D3]">
            This quick start guide will help you get up and running with ZERO | HUB in just a few minutes. Follow these
            steps to create your first website and start growing your online presence.
          </p>

          <div className="mt-6 mb-8 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7000FF]/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-[#7000FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Pro Tip</h3>
                  <p className="text-[#A4B8D3] text-sm">
                    Before you begin, gather all the content you'll need for your website, including your logo, brand
                    colors, images, and text. Having these assets ready will make the website creation process much
                    faster.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Step 1: Choose a Template</h2>
          <p className="text-[#A4B8D3]">
            After logging into your ZERO | HUB account, you'll be prompted to choose a template for your website. We
            offer a variety of industry-specific templates to help you get started quickly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-6">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-[#7000FF]/20 to-[#00FFD1]/20"></div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-white">E-Commerce</h4>
                  <p className="text-xs text-[#A4B8D3]">For online stores</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-[#7000FF]/20 to-[#00FFD1]/20"></div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-white">Portfolio</h4>
                  <p className="text-xs text-[#A4B8D3]">For creatives</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-[#7000FF]/20 to-[#00FFD1]/20"></div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-white">Business</h4>
                  <p className="text-xs text-[#A4B8D3]">For service providers</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Step 2: Customize Your Website</h2>
          <p className="text-[#A4B8D3]">
            Once you've selected a template, you can customize it to match your brand. Our drag-and-drop editor makes it
            easy to:
          </p>

          <ul className="space-y-2 text-[#A4B8D3] mt-4">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Add your logo and brand colors</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Update text and images</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Add, remove, or rearrange sections</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Customize fonts and styles</span>
            </li>
          </ul>

          <div className="mt-6 mb-6 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF3D00]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD00]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#00FFD1]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[#A4B8D3] hover:text-white transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-[#A4B8D3]">
                  <code>{`# Update site branding via API
curl -X PATCH https://api.zerohub.com/v1/sites/your-site-id \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "branding": {
      "logo": "https://yourbusiness.com/logo.png",
      "colors": {
        "primary": "#FF3D00",
        "secondary": "#7000FF",
        "accent": "#00FFD1"
      },
      "fonts": {
        "heading": "Montserrat",
        "body": "Open Sans"
      }
    }
  }'`}</code>
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Step 3: Add Pages and Content</h2>
          <p className="text-[#A4B8D3]">
            Create additional pages for your website based on your business needs. Common pages include:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
            <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
              <h4 className="font-medium text-white">Home Page</h4>
              <p className="text-sm text-[#A4B8D3]">Your website's main landing page</p>
            </div>
            <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
              <h4 className="font-medium text-white">About Us</h4>
              <p className="text-sm text-[#A4B8D3]">Information about your business</p>
            </div>
            <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
              <h4 className="font-medium text-white">Products/Services</h4>
              <p className="text-sm text-[#A4B8D3]">What you offer to customers</p>
            </div>
            <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
              <h4 className="font-medium text-white">Contact</h4>
              <p className="text-sm text-[#A4B8D3]">How customers can reach you</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Step 4: Configure Settings</h2>
          <p className="text-[#A4B8D3]">Before publishing your website, configure important settings such as:</p>

          <ul className="space-y-2 text-[#A4B8D3] mt-4">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>SEO settings (title, description, keywords)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Social media integration</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Analytics tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mt-1 flex-shrink-0">
                <span className="text-xs text-white">•</span>
              </div>
              <span>Contact forms and email notifications</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Step 5: Publish Your Website</h2>
          <p className="text-[#A4B8D3]">
            Once you're satisfied with your website, click the "Publish" button to make it live. Your website will be
            accessible via your chosen domain name.
          </p>

          <div className="mt-4 mb-6">
            <Button className="bg-gradient-to-r from-[#7000FF] to-[#00FFD1] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(112,0,255,0.3)]">
              Publish Website
            </Button>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Next Steps</h2>
          <p className="text-[#A4B8D3]">
            After publishing your website, consider these next steps to maximize your online presence:
          </p>

          <ul className="space-y-2 text-[#A4B8D3] mt-4">
            <li>
              <Link href="/docs/features/seo" className="text-[#7000FF] hover:underline flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                Optimize your website for search engines
              </Link>
            </li>
            <li>
              <Link href="/docs/features/analytics" className="text-[#7000FF] hover:underline flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                Set up analytics to track visitor behavior
              </Link>
            </li>
            <li>
              <Link href="/docs/features/e-commerce" className="text-[#7000FF] hover:underline flex items-center">
                <ArrowRight className="h-3 w-3 mr-2" />
                Configure e-commerce features if you're selling products
              </Link>
            </li>
          </ul>

          <div className="mt-8 p-4 border border-[#1E293B] rounded-lg bg-[#0A1228]/50">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#7000FF]" />
              Resources
            </h3>
            <p className="text-[#A4B8D3] text-sm">
              Check out our{" "}
              <Link href="/docs/resources/tutorials" className="text-[#7000FF] hover:underline">
                video tutorials
              </Link>{" "}
              for step-by-step guidance on using ZERO | HUB's features.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#1E293B] mt-8">
          <Button variant="outline" className="border-[#A4B8D3]/30 text-[#A4B8D3] hover:bg-[#A4B8D3]/10" asChild>
            <Link href="/docs/getting-started/installation" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Installation
            </Link>
          </Button>
          <Button variant="outline" className="border-[#7000FF]/30 text-[#7000FF] hover:bg-[#7000FF]/10" asChild>
            <Link href="/docs/getting-started/templates" className="flex items-center gap-2">
              Next: Templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

