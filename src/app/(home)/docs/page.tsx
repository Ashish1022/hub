import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, FileText, Lightbulb, Rocket } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30">
            Documentation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            ZERO | HUB Documentation
          </h1>
          <p className="text-lg sm:text-xl text-[#A4B8D3]">
            Learn how to use ZERO | HUB to build and grow your online presence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
          {/* Getting Started Card */}
          <CategoryCard
            icon={<Rocket className="h-6 w-6 text-[#FF3D00]" />}
            title="Getting Started"
            description="Everything you need to know to get up and running with ZERO | HUB quickly."
            links={[
              { href: "/docs/getting-started/introduction", label: "Introduction" },
              { href: "/docs/getting-started/installation", label: "Installation" },
              { href: "/docs/getting-started/quick-start", label: "Quick Start Guide" },
            ]}
            buttonText="Read Getting Started"
            buttonHref="/docs/getting-started"
            gradientFrom="#FF3D00"
            gradientTo="#FF00E5"
          />

          {/* Guides Card */}
          <CategoryCard
            icon={<BookOpen className="h-6 w-6 text-[#FF00E5]" />}
            title="Guides"
            description="Step-by-step guides to help you make the most of ZERO | HUB's features."
            links={[
              { href: "/docs/guides/website-builder", label: "Using the Website Builder" },
              { href: "/docs/guides/e-commerce", label: "Setting Up E-Commerce" },
              { href: "/docs/guides/seo", label: "SEO Optimization" },
            ]}
            buttonText="Browse Guides"
            buttonHref="/docs/guides"
            gradientFrom="#FF00E5"
            gradientTo="#7000FF"
          />

          {/* API Reference Card */}
          <CategoryCard
            icon={<Code className="h-6 w-6 text-[#7000FF]" />}
            title="API Reference"
            description="Comprehensive API documentation for developers looking to integrate with ZERO | HUB."
            links={[
              { href: "/docs/api/authentication", label: "Authentication" },
              { href: "/docs/api/endpoints", label: "Endpoints" },
              { href: "/docs/api/webhooks", label: "Webhooks" },
            ]}
            buttonText="Explore API"
            buttonHref="/docs/api"
            gradientFrom="#7000FF"
            gradientTo="#00FFD1"
          />

          {/* Resources Card */}
          <CategoryCard
            icon={<Lightbulb className="h-6 w-6 text-[#00FFD1]" />}
            title="Resources"
            description="Additional resources to help you get the most out of ZERO | HUB."
            links={[
              { href: "/docs/resources/faq", label: "FAQ" },
              { href: "/docs/resources/tutorials", label: "Tutorials" },
              { href: "/docs/resources/community", label: "Community" },
            ]}
            buttonText="View Resources"
            buttonHref="/docs/resources"
            gradientFrom="#00FFD1"
            gradientTo="#FF3D00"
          />
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
            Latest Updates
          </h2>

          <div className="space-y-4">
            {/* Update Cards */}
            <UpdateCard
              title="New E-Commerce Features"
              description="We've added new e-commerce features including product variants, bulk import, and advanced inventory management."
              href="/docs/updates/e-commerce-features"
              badge="New"
              badgeColor="#FF3D00"
              gradientFrom="#FF3D00"
              gradientTo="#FF00E5"
            />

            <UpdateCard
              title="API v2.0 Released"
              description="Our API v2.0 is now available with improved performance, new endpoints, and enhanced security features."
              href="/docs/updates/api-v2"
              badge="Update"
              badgeColor="#FF00E5"
              gradientFrom="#FF00E5"
              gradientTo="#7000FF"
            />

            <UpdateCard
              title="Analytics Dashboard Update"
              description="We've completely redesigned our analytics dashboard with new visualizations and real-time data insights."
              href="/docs/updates/analytics-dashboard"
              badge="Improved"
              badgeColor="#7000FF"
              gradientFrom="#7000FF"
              gradientTo="#00FFD1"
            />
          </div>
        </div>

        <div className="mt-12 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
          <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm">
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

// Reusable components for better performance and maintainability
interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  description: string
  links: { href: string; label: string }[]
  buttonText: string
  buttonHref: string
  gradientFrom: string
  gradientTo: string
}

function CategoryCard({
  icon,
  title,
  description,
  links,
  buttonText,
  buttonHref,
  gradientFrom,
  gradientTo,
}: CategoryCardProps) {
  return (
    <div className="group relative will-change-transform">
      <div
        className="absolute -inset-0.5 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
        style={{ backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
      ></div>
      <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm h-full">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${gradientFrom}10` }}
        >
          {icon}
        </div>
        <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-[#A4B8D3] mb-4">{description}</p>
        <ul className="space-y-2 mb-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-[#A4B8D3] transition-colors duration-200 flex items-center hover:text-[#FF00E5]"
              >
                <ArrowRight className="h-3 w-3 mr-2" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="w-full transition-all duration-200 hover:bg-[#FF00E5]/10"
          style={{
            borderColor: `${gradientFrom}30`,
            color: gradientFrom,
          }}
          asChild
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}

interface UpdateCardProps {
  title: string
  description: string
  href: string
  badge: string
  badgeColor: string
  gradientFrom: string
  gradientTo: string
}

function UpdateCard({ title, description, href, badge, badgeColor, gradientFrom, gradientTo }: UpdateCardProps) {
  return (
    <div className="group relative will-change-transform">
      <div
        className="absolute -inset-0.5 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-300 group-hover:duration-200"
        style={{ backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})` }}
      ></div>
      <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" style={{ color: badgeColor }} />
            <h3 className="font-medium text-white hover:text-[#FF00E5] transition-colors duration-200">{title}</h3>
          </div>
          <Badge
            className="transition-colors duration-200"
            style={{
              backgroundColor: `${badgeColor}10`,
              color: badgeColor,
              borderColor: `${badgeColor}30`,
            }}
          >
            {badge}
          </Badge>
        </div>
        <p className="text-sm text-[#A4B8D3]">{description}</p>
        <div className="mt-2">
          <Link
            href={href}
            className="text-xs hover:underline transition-colors duration-200"
            style={{ color: badgeColor }}
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  )
}
