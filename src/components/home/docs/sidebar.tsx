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

  // Determine which accordion items should be open based on the current path
  const getDefaultOpenItems = () => {
    const segments = pathname?.split("/") || []
    const openItems = []

    if (segments.includes("getting-started")) openItems.push("getting-started")
    if (segments.includes("features")) openItems.push("features")
    if (segments.includes("customization")) openItems.push("customization")
    if (segments.includes("api")) openItems.push("api")
    if (segments.includes("security")) openItems.push("security")
    if (segments.includes("resources")) openItems.push("resources")

    // If no specific section is matched, open these by default
    return openItems.length ? openItems : ["getting-started", "features", "customization"]
  }

  return (
    <div className={cn("pb-12 h-full overflow-y-auto", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 text-xl font-semibold tracking-tight bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
            Documentation
          </h2>
          <p className="text-sm text-[#A4B8D3]">Learn how to use ZERO | HUB</p>
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
        <Accordion type="multiple" defaultValue={getDefaultOpenItems()} className="space-y-2">
          <SidebarSection
            id="getting-started"
            icon={<Zap className="h-4 w-4" />}
            title="Getting Started"
            hoverColor="#FF00E5"
            links={[
              { href: "/docs/introduction", label: "Introduction" },
              { href: "/docs/installation", label: "Installation" },
              { href: "/docs/quick-start", label: "Quick Start" },
              { href: "/docs/templates", label: "Templates" },
            ]}
          />

          <SidebarSection
            id="features"
            icon={<Layers className="h-4 w-4" />}
            title="Features"
            hoverColor="#7000FF"
            links={[
              { href: "/docs/features/website-builder", label: "Website Builder" },
              { href: "/docs/features/e-commerce", label: "E-Commerce" },
              { href: "/docs/features/analytics", label: "Analytics" },
              { href: "/docs/features/seo", label: "SEO Tools" },
              { href: "/docs/features/domains", label: "Custom Domains" },
            ]}
          />

          <SidebarSection
            id="customization"
            icon={<Settings className="h-4 w-4" />}
            title="Customization"
            hoverColor="#00FFD1"
            links={[
              { href: "/docs/customization/themes", label: "Themes" },
              { href: "/docs/customization/colors", label: "Colors" },
              { href: "/docs/customization/fonts", label: "Fonts" },
              { href: "/docs/customization/layouts", label: "Layouts" },
              { href: "/docs/customization/css", label: "Custom CSS" },
            ]}
          />

          <SidebarSection
            id="api"
            icon={<FileText className="h-4 w-4" />}
            title="API Reference"
            hoverColor="#FF3D00"
            links={[
              { href: "/docs/api/authentication", label: "Authentication" },
              { href: "/docs/api/endpoints", label: "Endpoints" },
              { href: "/docs/api/webhooks", label: "Webhooks" },
              { href: "/docs/api/rate-limits", label: "Rate Limits" },
            ]}
          />

          <SidebarSection
            id="security"
            icon={<ShieldCheck className="h-4 w-4" />}
            title="Security"
            hoverColor="#FF00E5"
            links={[
              { href: "/docs/security/ssl", label: "SSL Certificates" },
              { href: "/docs/security/authentication", label: "Authentication" },
              { href: "/docs/security/data-protection", label: "Data Protection" },
              { href: "/docs/security/compliance", label: "Compliance" },
            ]}
          />

          <SidebarSection
            id="resources"
            icon={<Folder className="h-4 w-4" />}
            title="Resources"
            hoverColor="#7000FF"
            links={[
              { href: "/docs/resources/faq", label: "FAQ" },
              { href: "/docs/resources/tutorials", label: "Tutorials" },
              { href: "/docs/resources/examples", label: "Examples" },
              { href: "/docs/resources/community", label: "Community" },
              { href: "/docs/resources/support", label: "Support" },
            ]}
          />
        </Accordion>
      </div>
    </div>
  )
}

interface SidebarSectionProps {
  id: string
  icon: React.ReactNode
  title: string
  hoverColor: string
  links: { href: string; label: string }[]
}

function SidebarSection({ id, icon, title, hoverColor, links }: SidebarSectionProps) {
  const pathname = usePathname()

  return (
    <AccordionItem value={id} className="border-b-0">
      <AccordionTrigger
        className="py-2 text-[#A4B8D3] hover:no-underline px-4 group cursor-pointer"
        style={{
          color: pathname?.includes(id) ? hoverColor : undefined,
        }}
      >
        <div className="flex items-center gap-2 group-hover:text-[#FF00E5]">
          {icon}
          <span>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-12 pr-4 pb-3 pt-0">
        <div className="flex flex-col space-y-2">
          {links.map((link, index) => (
            <SidebarLink key={index} href={link.href} label={link.label} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
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
