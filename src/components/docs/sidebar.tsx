"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, FileText, Folder, Home, Layers, Settings, ShieldCheck, Zap } from "lucide-react"

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocsSidebar({ className, ...props }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xl font-semibold tracking-tight bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
            Documentation
          </h2>
          <p className="text-sm text-[#A4B8D3]">Learn how to use WebifyPro</p>
        </div>
        <div className="px-4 py-2">
          <Link
            href="/docs"
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#FF3D00]",
              pathname === "/docs" ? "text-[#FF3D00]" : "text-[#A4B8D3]",
            )}
          >
            <Home className="h-4 w-4" />
            Overview
          </Link>
        </div>
        <Accordion
          type="multiple"
          defaultValue={["getting-started", "features", "customization"]}
          className="space-y-2"
        >
          <AccordionItem value="getting-started" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#FF00E5] [&[data-state=open]]:text-[#FF00E5] px-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Getting Started</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/getting-started/introduction" label="Introduction" />
                <SidebarLink href="/docs/getting-started/installation" label="Installation" />
                <SidebarLink href="/docs/getting-started/quick-start" label="Quick Start" />
                <SidebarLink href="/docs/getting-started/templates" label="Templates" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="features" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#7000FF] [&[data-state=open]]:text-[#7000FF] px-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Features</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/features/website-builder" label="Website Builder" />
                <SidebarLink href="/docs/features/e-commerce" label="E-Commerce" />
                <SidebarLink href="/docs/features/analytics" label="Analytics" />
                <SidebarLink href="/docs/features/seo" label="SEO Tools" />
                <SidebarLink href="/docs/features/domains" label="Custom Domains" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="customization" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#00FFD1] [&[data-state=open]]:text-[#00FFD1] px-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Customization</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/customization/themes" label="Themes" />
                <SidebarLink href="/docs/customization/colors" label="Colors" />
                <SidebarLink href="/docs/customization/fonts" label="Fonts" />
                <SidebarLink href="/docs/customization/layouts" label="Layouts" />
                <SidebarLink href="/docs/customization/css" label="Custom CSS" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="api" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#FF3D00] [&[data-state=open]]:text-[#FF3D00] px-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>API Reference</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/api/authentication" label="Authentication" />
                <SidebarLink href="/docs/api/endpoints" label="Endpoints" />
                <SidebarLink href="/docs/api/webhooks" label="Webhooks" />
                <SidebarLink href="/docs/api/rate-limits" label="Rate Limits" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="security" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#FF00E5] [&[data-state=open]]:text-[#FF00E5] px-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Security</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/security/ssl" label="SSL Certificates" />
                <SidebarLink href="/docs/security/authentication" label="Authentication" />
                <SidebarLink href="/docs/security/data-protection" label="Data Protection" />
                <SidebarLink href="/docs/security/compliance" label="Compliance" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="resources" className="border-b-0">
            <AccordionTrigger className="py-2 text-[#A4B8D3] hover:text-[#7000FF] [&[data-state=open]]:text-[#7000FF] px-4">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span>Resources</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
              <div className="flex flex-col space-y-2">
                <SidebarLink href="/docs/resources/faq" label="FAQ" />
                <SidebarLink href="/docs/resources/tutorials" label="Tutorials" />
                <SidebarLink href="/docs/resources/examples" label="Examples" />
                <SidebarLink href="/docs/resources/community" label="Community" />
                <SidebarLink href="/docs/resources/support" label="Support" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  label: string
}

function SidebarLink({ href, label }: SidebarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center text-sm transition-colors hover:text-[#FF00E5]",
        isActive ? "font-medium text-[#FF00E5]" : "text-[#A4B8D3]",
      )}
    >
      {isActive && <ChevronRight className="mr-1 h-3 w-3 text-[#FF00E5]" />}
      {label}
    </Link>
  )
}

