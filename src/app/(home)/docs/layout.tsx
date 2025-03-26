import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DocsSidebar } from "@/components/docs/sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#050A18] text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1E293B] sticky top-0 z-40 bg-[#050A18]/80 backdrop-blur-md">
        <div className="container flex h-16 items-center px-4 sm:px-6 justify-between">
          {/* Mobile Sidebar Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden text-[#FF00E5] hover:text-[#FF00E5] hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-[#0A1228] border-r border-[#1E293B] p-0">
              <DocsSidebar className="p-6" />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
              <div className="h-8 w-8 rounded-full bg-[#0A1228] flex items-center justify-center relative z-10">
                <span className="text-sm font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">W</span>
              </div>
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">ZERO | HUB</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#A4B8D3]" />
            <input
              type="search"
              placeholder="Search documentation..."
              className="h-9 w-full rounded-md border border-[#1E293B] bg-[#0A1228] py-2 pl-8 pr-4 text-sm text-white placeholder:text-[#A4B8D3] focus:outline-none focus:ring-1 focus:ring-[#FF00E5]"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm hover:text-[#FF3D00] transition-colors">Home</Link>
            <Link href="#" className="text-sm hover:text-[#FF00E5] transition-colors">API</Link>
            <Link href="#" className="text-sm hover:text-[#7000FF] transition-colors">Community</Link>
            <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-md">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 lg:w-72 xl:w-80 border-r border-[#1E293B] overflow-y-auto bg-[#050A18] px-4 py-6 scrollbar-thin scrollbar-thumb-[#FF00E5] scrollbar-track-[#0A1228]">
          <DocsSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex justify-center items-start py-6 px-4 sm:px-6 md:ml-64 lg:ml-72 xl:ml-80">
          <div className="w-full max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
