import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, FileText, Lightbulb, Rocket } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            WebifyPro Documentation
          </h1>
          <p className="text-xl text-[#A4B8D3]">Learn how to use WebifyPro to build and grow your online presence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-[#FF3D00]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="h-6 w-6 text-[#FF3D00]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF3D00] transition-colors">
                Getting Started
              </h2>
              <p className="text-[#A4B8D3] mb-4">
                Everything you need to know to get up and running with WebifyPro quickly.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link
                    href="/docs/getting-started/introduction"
                    className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/getting-started/installation"
                    className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Installation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/getting-started/quick-start"
                    className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Quick Start Guide
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="border-[#FF3D00]/30 text-[#FF3D00] hover:bg-[#FF3D00]/10 w-full">
                Read Getting Started
              </Button>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-[#FF00E5]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-[#FF00E5]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF00E5] transition-colors">Guides</h2>
              <p className="text-[#A4B8D3] mb-4">
                Step-by-step guides to help you make the most of WebifyPro's features.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link
                    href="/docs/guides/website-builder"
                    className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Using the Website Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/guides/e-commerce"
                    className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Setting Up E-Commerce
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/guides/seo"
                    className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    SEO Optimization
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 w-full">
                Browse Guides
              </Button>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-[#7000FF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-[#7000FF]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-[#7000FF] transition-colors">
                API Reference
              </h2>
              <p className="text-[#A4B8D3] mb-4">
                Comprehensive API documentation for developers looking to integrate with WebifyPro.
              </p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link
                    href="/docs/api/authentication"
                    className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/api/endpoints"
                    className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Endpoints
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/api/webhooks"
                    className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Webhooks
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="border-[#7000FF]/30 text-[#7000FF] hover:bg-[#7000FF]/10 w-full">
                Explore API
              </Button>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="w-12 h-12 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="h-6 w-6 text-[#00FFD1]" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FFD1] transition-colors">
                Resources
              </h2>
              <p className="text-[#A4B8D3] mb-4">Additional resources to help you get the most out of WebifyPro.</p>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link
                    href="/docs/resources/faq"
                    className="text-[#A4B8D3] hover:text-[#00FFD1] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/resources/tutorials"
                    className="text-[#A4B8D3] hover:text-[#00FFD1] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/resources/community"
                    className="text-[#A4B8D3] hover:text-[#00FFD1] transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Community
                  </Link>
                </li>
              </ul>
              <Button variant="outline" className="border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1]/10 w-full">
                View Resources
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
            Latest Updates
          </h2>

          <div className="space-y-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#FF3D00]" />
                    <h3 className="font-medium text-white group-hover:text-[#FF3D00] transition-colors">
                      New E-Commerce Features
                    </h3>
                  </div>
                  <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 border-[#FF3D00]/30">
                    New
                  </Badge>
                </div>
                <p className="text-sm text-[#A4B8D3]">
                  We've added new e-commerce features including product variants, bulk import, and advanced inventory
                  management.
                </p>
                <div className="mt-2">
                  <Link href="/docs/updates/e-commerce-features" className="text-xs text-[#FF3D00] hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#FF00E5]" />
                    <h3 className="font-medium text-white group-hover:text-[#FF00E5] transition-colors">
                      API v2.0 Released
                    </h3>
                  </div>
                  <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 border-[#FF00E5]/30">
                    Update
                  </Badge>
                </div>
                <p className="text-sm text-[#A4B8D3]">
                  Our API v2.0 is now available with improved performance, new endpoints, and enhanced security
                  features.
                </p>
                <div className="mt-2">
                  <Link href="/docs/updates/api-v2" className="text-xs text-[#FF00E5] hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#7000FF]" />
                    <h3 className="font-medium text-white group-hover:text-[#7000FF] transition-colors">
                      Analytics Dashboard Update
                    </h3>
                  </div>
                  <Badge className="bg-[#7000FF]/10 text-[#7000FF] hover:bg-[#7000FF]/20 border-[#7000FF]/30">
                    Improved
                  </Badge>
                </div>
                <p className="text-sm text-[#A4B8D3]">
                  We've completely redesigned our analytics dashboard with new visualizations and real-time data
                  insights.
                </p>
                <div className="mt-2">
                  <Link href="/docs/updates/analytics-dashboard" className="text-xs text-[#7000FF] hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
          <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                  Need help?
                </h2>
                <p className="text-[#A4B8D3]">Can't find what you're looking for? Our support team is here to help.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.3)]">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10">
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

