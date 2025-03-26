import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#A4B8D3]">
          <Link href="/docs" className="hover:text-[#FF3D00] transition-colors">
            Docs
          </Link>
          <span>/</span>
          <Link href="/docs/getting-started" className="hover:text-[#FF3D00] transition-colors">
            Getting Started
          </Link>
          <span>/</span>
          <span className="text-[#FF3D00]">Introduction</span>
        </div>

        <div className="space-y-2">
          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30">
            Getting Started
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
            Introduction to ZERO | HUB
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-base sm:text-lg">
          <p className="text-[#A4B8D3]">
          ZERO | HUB is an all-in-one platform designed to help businesses establish and grow their online presence.
          </p>

          <h2 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 text-white">Key Features</h2>
          <ul className="space-y-2 text-[#A4B8D3]">
            {["Drag & Drop Website Builder", "E-Commerce Functionality", "Custom Domains", "Mobile Responsive", "SEO Tools"].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-xs text-white">{index + 1}</span>
                </div>
                <span>
                  <strong className="text-white">{feature}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 border border-[#1E293B] rounded-lg bg-[#0A1228]/50">
          <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-[#FF3D00]" />
            Additional Resources
          </h3>
          <p className="text-[#A4B8D3] text-sm">
            Check out our <Link href="/blog" className="text-[#FF3D00] hover:underline">blog</Link> or join our <Link href="/community" className="text-[#FF3D00] hover:underline">community forum</Link>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#1E293B] mt-8 gap-4">
          <Button variant="outline" className="w-full sm:w-auto border-[#A4B8D3]/30 text-[#A4B8D3] hover:bg-[#A4B8D3]/10" asChild>
            <Link href="/docs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Docs
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10" asChild>
            <Link href="/docs/getting-started/installation" className="flex items-center gap-2">
              Next: Installation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
