"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Copy, ExternalLink, CheckCircle } from "lucide-react"

export default function InstallationPage() {
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
          <span className="text-[#FF3D00]">Installation</span>
        </div>

        <div className="space-y-2">
          <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 px-3 py-1 border-[#FF00E5]/30">
            Getting Started
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            Installation Guide
          </h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-[#A4B8D3]">
            This guide will walk you through the process of installing and setting up ZERO | HUB for your business.
            Follow these steps to get started quickly.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">System Requirements</h2>
          <p className="text-[#A4B8D3]">Before you begin, make sure your system meets the following requirements:</p>

          <ul className="space-y-2 text-[#A4B8D3] mt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
              <span>A modern web browser (Chrome, Firefox, Safari, or Edge)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
              <span>Stable internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
              <span>Valid email address for account creation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
              <span>Payment method for paid plans (credit card or PayPal)</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Installation Steps</h2>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] flex items-center justify-center mr-2">
                    <span className="text-xs text-white">1</span>
                  </div>
                  <span className="text-white">Create an Account</span>
                </h3>
                <p className="text-[#A4B8D3] mb-4">
                  Visit the ZERO | HUB website and click on the "Get Started" or "Sign Up" button. Fill out the
                  registration form with your email address, password, and other required information.
                </p>
                <div className="mt-4 relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
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
                        <code>{`# Create a new ZERO | HUB account
curl -X POST https://api.zerohub.com/v1/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your.email@example.com",
    "password": "your-secure-password",
    "firstName": "Your",
    "lastName": "Name",
    "companyName": "Your Business",
    "plan": "professional"
  }'`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] flex items-center justify-center mr-2">
                    <span className="text-xs text-white">2</span>
                  </div>
                  <span className="text-white">Choose a Plan</span>
                </h3>
                <p className="text-[#A4B8D3] mb-4">
                  Select a plan that best fits your business needs. We offer Starter, Professional, and Enterprise plans
                  with different features and pricing options. You can start with a 14-day free trial to explore all
                  features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
                    <h4 className="font-bold text-[#FF3D00]">Starter</h4>
                    <p className="text-sm text-[#A4B8D3]">Perfect for small businesses</p>
                    <p className="text-lg font-bold mt-2">
                      $19<span className="text-sm font-normal text-[#A4B8D3]">/month</span>
                    </p>
                  </div>
                  <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4 relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-30"></div>
                    <div className="relative">
                      <h4 className="font-bold text-[#FF00E5]">Professional</h4>
                      <p className="text-sm text-[#A4B8D3]">For growing businesses</p>
                      <p className="text-lg font-bold mt-2">
                        $49<span className="text-sm font-normal text-[#A4B8D3]">/month</span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#0A1228]/50 border border-[#1E293B] rounded-lg p-4">
                    <h4 className="font-bold text-[#7000FF]">Enterprise</h4>
                    <p className="text-sm text-[#A4B8D3]">For large organizations</p>
                    <p className="text-lg font-bold mt-2">
                      $99<span className="text-sm font-normal text-[#A4B8D3]">/month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] flex items-center justify-center mr-2">
                    <span className="text-xs text-white">3</span>
                  </div>
                  <span className="text-white">Set Up Your Domain</span>
                </h3>
                <p className="text-[#A4B8D3] mb-4">
                  Choose a domain for your website. You can either use a free subdomain (yourbusiness.zerohub.com) or
                  connect your own custom domain if you already have one.
                </p>
                <div className="mt-4 relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25"></div>
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
                        <code>{`# Connect a custom domain
curl -X POST https://api.zerohub.com/v1/domains \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "yourbusiness.com",
    "siteId": "your-site-id"
  }'`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25"></div>
              <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] flex items-center justify-center mr-2">
                    <span className="text-xs text-white">4</span>
                  </div>
                  <span className="text-white">Start Building Your Website</span>
                </h3>
                <p className="text-[#A4B8D3] mb-4">
                  Once your account is set up, you can start building your website using our drag-and-drop builder.
                  Choose a template that matches your business type and customize it to your liking.
                </p>
                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.3)] mt-2">
                  Explore Templates
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">Next Steps</h2>
          <p className="text-[#A4B8D3]">
            Now that you've installed ZERO | HUB, you're ready to start building your website. Check out our Quick Start
            Guide to learn how to use the platform effectively.
          </p>

          <div className="mt-8 p-4 border border-[#1E293B] rounded-lg bg-[#0A1228]/50">
            <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#FF00E5]" />
              Need Help?
            </h3>
            <p className="text-[#A4B8D3] text-sm">
              If you encounter any issues during installation, please contact our{" "}
              <Link href="/support" className="text-[#FF00E5] hover:underline">
                support team
              </Link>{" "}
              or check our{" "}
              <Link href="/docs/resources/faq" className="text-[#FF00E5] hover:underline">
                FAQ section
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#1E293B] mt-8">
          <Button variant="outline" className="border-[#A4B8D3]/30 text-[#A4B8D3] hover:bg-[#A4B8D3]/10" asChild>
            <Link href="/docs/getting-started/introduction" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Introduction
            </Link>
          </Button>
          <Button variant="outline" className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10" asChild>
            <Link href="/docs/getting-started/quick-start" className="flex items-center gap-2">
              Next: Quick Start
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

