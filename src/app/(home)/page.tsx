

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, Laptop, LayoutGrid, Server, ShieldCheck, Sparkles, Zap } from "lucide-react"
import Header from "@/components/header"


export default function LandingPage() {


  return (
    <div className="min-h-screen bg-[#050A18] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/30 via-[#FF00E5]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/30 via-[#7000FF]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>

      {/* Animated shapes */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#FF00E5]/20 animate-[spin_20s_linear_infinite] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-[#00FFD1]/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#FF3D00]/10 animate-[spin_40s_linear_infinite] pointer-events-none"></div>

      <Header />

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FF3D00] rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#7000FF] rounded-full blur-[100px] opacity-20"></div>

          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30 mb-6">
            Launch Your Business Online
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text mb-6">
            Take your business online.
          </h1>

          <p className="text-xl text-[#A4B8D3] max-w-2xl mx-auto mb-8">
            WebifyPro helps businesses of all sizes establish and grow their online presence with our all-in-one
            platform. Get started in minutes, no technical skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,61,0,0.4)] text-lg px-8 py-6 h-auto"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 text-lg px-8 py-6 h-auto"
            >
              Book a Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#FF3D00]">JD</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#FF00E5]">MK</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#7000FF]">TS</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#A4B8D3]">
              <span className="text-[#00FFD1] font-bold">1,000+</span> businesses launched this month
            </p>
          </div>

          {/* Animated code snippet */}
          <div className="mt-16 relative max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur-lg opacity-50"></div>
            <div className="relative bg-[#0A1228]/80 rounded-lg overflow-hidden border border-[#1E293B] backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF]"></div>
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1E293B]">
                <div className="w-3 h-3 rounded-full bg-[#FF3D00]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD00]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00FFD1]"></div>
                <span className="text-xs text-[#A4B8D3] ml-2">webify-cli.js</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">1</span>
                  <span className="text-[#FF00E5]">import</span>
                  <span className="text-white">
                    {" "}
                    {"{"} createWebsite {"}"}{" "}
                  </span>
                  <span className="text-[#FF00E5]">from</span>
                  <span className="text-[#00FFD1]"> 'webify-pro'</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">2</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">3</span>
                  <span className="text-[#FF3D00]">const</span>
                  <span className="text-white"> myBusiness = </span>
                  <span className="text-[#FF00E5]">await</span>
                  <span className="text-white"> createWebsite({"{"}</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">4</span>
                  <span className="text-white"> name: </span>
                  <span className="text-[#00FFD1]">'My Awesome Business'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">5</span>
                  <span className="text-white"> template: </span>
                  <span className="text-[#00FFD1]">'e-commerce'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">6</span>
                  <span className="text-white"> domain: </span>
                  <span className="text-[#00FFD1]">'mybusiness.com'</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">7</span>
                  <span className="text-white">{"})"}</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">8</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">9</span>
                  <span className="text-[#7000FF]">// Site deployed in 3.2 seconds!</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-8">10</span>
                  <span className="text-[#FF3D00]">console</span>
                  <span className="text-white">.log(</span>
                  <span className="text-[#00FFD1]">
                    `Your site is live at $
                    {`</span>
                  <span className="text-white">myBusiness.url</span>
                  <span className="text-[#00FFD1]">`}
                    `
                  </span>
                  <span className="text-white">)</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#00FFD1] rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FF00E5] rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="container mx-auto py-12 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <p className="text-center text-[#A4B8D3] mb-8">Trusted by innovative companies worldwide</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 px-3 py-1 border-[#FF00E5]/30 mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            Everything you need to succeed online
          </h2>
          <p className="text-[#A4B8D3]">
            Our platform provides all the tools and features you need to establish a strong online presence and grow
            your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#FF3D00]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-[#FF3D00]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors">
                  Custom Domains
                </CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  Connect your own domain or get a free subdomain to start building your online presence.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#FF00E5]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LayoutGrid className="h-6 w-6 text-[#FF00E5]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF00E5] transition-colors">
                  Drag & Drop Builder
                </CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  Create beautiful websites with our intuitive drag and drop website builder. No coding required.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7000FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#7000FF]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="h-6 w-6 text-[#7000FF]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#7000FF] transition-colors">SSL Security</CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  Every site comes with free SSL certificates to keep your visitors' data secure.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Laptop className="h-6 w-6 text-[#00FFD1]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#00FFD1] transition-colors">
                  Mobile Responsive
                </CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  All websites are automatically optimized for mobile devices for the best user experience.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#FF3D00]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-[#FF3D00]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors">
                  Fast Performance
                </CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  Optimized infrastructure ensures your website loads quickly for all visitors.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#FF00E5]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Server className="h-6 w-6 text-[#FF00E5]" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF00E5] transition-colors">
                  Reliable Hosting
                </CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                  99.9% uptime guarantee with our enterprise-grade hosting infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 px-3 py-1 border-[#00FFD1]/30 mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FFD1] to-[#7000FF] text-transparent bg-clip-text">
            Launch your business online in 3 simple steps
          </h2>
          <p className="text-[#A4B8D3]">
            Our streamlined process makes it easy to get your business online quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-8 backdrop-blur-sm h-full">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[#FF3D00] to-[#FF00E5] md:block hidden"></div>
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-white font-bold mb-4 shadow-[0_0_15px_rgba(255,61,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF3D00] transition-colors">
                  Choose a template
                </h3>
                <p className="text-[#A4B8D3] text-center md:text-left">
                  Select from our library of professionally designed templates tailored for your industry.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-8 backdrop-blur-sm h-full">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[#FF00E5] to-[#7000FF] md:block hidden"></div>
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-white font-bold mb-4 shadow-[0_0_15px_rgba(255,0,229,0.5)] group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF00E5] transition-colors">
                  Customize your site
                </h3>
                <p className="text-[#A4B8D3] text-center md:text-left">
                  Add your content, customize colors, and make it your own with our easy-to-use editor.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-8 backdrop-blur-sm h-full">
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-white font-bold mb-4 shadow-[0_0_15px_rgba(112,0,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#7000FF] transition-colors">
                  Publish and grow
                </h3>
                <p className="text-[#A4B8D3] text-center md:text-left">
                  Launch your site and use our tools to grow your online presence and attract more customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30 mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            Simple, transparent pricing
          </h2>
          <p className="text-[#A4B8D3]">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors">Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                    $19
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-4">
                  Perfect for small businesses just getting started online.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF3D00] shrink-0 mt-0.5" />
                    <span>1 website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF3D00] shrink-0 mt-0.5" />
                    <span>5 pages per website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF3D00] shrink-0 mt-0.5" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF3D00] shrink-0 mt-0.5" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF3D00] shrink-0 mt-0.5" />
                    <span>24/7 support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 group-hover:shadow-[0_0_15px_rgba(255,61,0,0.5)] transition-all duration-300">
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-75 transition duration-1000"></div>
            <Card className="bg-[#0A1228]/80 border-0 relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5]/20 via-[#7000FF]/10 to-transparent rounded-lg"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-30"></div>
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] border-0">
                Popular
              </Badge>
              <CardHeader className="relative">
                <CardTitle className="text-white">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    $49
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-4">
                  Ideal for growing businesses with more online needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>5 websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>E-commerce functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#FF00E5] shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button className="w-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] hover:opacity-90 shadow-[0_0_15px_rgba(255,0,229,0.5)]">
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7000FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle className="text-white group-hover:text-[#7000FF] transition-colors">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-transparent bg-clip-text">
                    $99
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-4">
                  For established businesses with advanced requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>20 websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>Advanced e-commerce tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#7000FF] shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] hover:opacity-90 group-hover:shadow-[0_0_15px_rgba(112,0,255,0.5)] transition-all duration-300">
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="container mx-auto py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#7000FF]/10 text-[#7000FF] hover:bg-[#7000FF]/20 px-3 py-1 border-[#7000FF]/30 mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-transparent bg-clip-text">
            What our customers say
          </h2>
          <p className="text-[#A4B8D3]">
            Don't just take our word for it. Here's what businesses like yours have achieved with WebifyPro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-full blur-sm opacity-70"></div>
                    <div className="w-12 h-12 rounded-full bg-[#0A1228] border-2 border-[#FF3D00] flex items-center justify-center relative z-10">
                      <span className="text-lg font-bold text-[#FF3D00]">SJ</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FF3D00] transition-colors">Sarah Johnson</h4>
                    <p className="text-[#A4B8D3] text-sm">Founder, Bloom Boutique</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-6xl text-[#FF3D00]/10 font-serif">"</div>
                <p className="text-[#E1E7EF]">
                  "WebifyPro transformed our business. We went from zero online presence to a beautiful e-commerce store
                  that's generating 60% of our revenue in just three months."
                </p>
                <div className="mt-4 flex">
                  <Sparkles className="text-[#FF3D00] h-5 w-5" />
                  <Sparkles className="text-[#FF3D00] h-5 w-5" />
                  <Sparkles className="text-[#FF3D00] h-5 w-5" />
                  <Sparkles className="text-[#FF3D00] h-5 w-5" />
                  <Sparkles className="text-[#FF3D00] h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-full blur-sm opacity-70"></div>
                    <div className="w-12 h-12 rounded-full bg-[#0A1228] border-2 border-[#FF00E5] flex items-center justify-center relative z-10">
                      <span className="text-lg font-bold text-[#FF00E5]">MC</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FF00E5] transition-colors">Michael Chen</h4>
                    <p className="text-[#A4B8D3] text-sm">CEO, TechSolutions Inc.</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-6xl text-[#FF00E5]/10 font-serif">"</div>
                <p className="text-[#E1E7EF]">
                  "The ease of use is incredible. We were able to launch our company website in days instead of weeks,
                  and the analytics tools have helped us optimize for better conversions."
                </p>
                <div className="mt-4 flex">
                  <Sparkles className="text-[#FF00E5] h-5 w-5" />
                  <Sparkles className="text-[#FF00E5] h-5 w-5" />
                  <Sparkles className="text-[#FF00E5] h-5 w-5" />
                  <Sparkles className="text-[#FF00E5] h-5 w-5" />
                  <Sparkles className="text-[#FF00E5] h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7000FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-full blur-sm opacity-70"></div>
                    <div className="w-12 h-12 rounded-full bg-[#0A1228] border-2 border-[#7000FF] flex items-center justify-center relative z-10">
                      <span className="text-lg font-bold text-[#7000FF]">JM</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#7000FF] transition-colors">
                      Jessica Martinez
                    </h4>
                    <p className="text-[#A4B8D3] text-sm">Owner, Healthy Eats Cafe</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-6xl text-[#7000FF]/10 font-serif">"</div>
                <p className="text-[#E1E7EF]">
                  "As a restaurant owner, I needed a simple way to showcase our menu and accept online orders. WebifyPro
                  delivered exactly what we needed, and our customers love it!"
                </p>
                <div className="mt-4 flex">
                  <Sparkles className="text-[#7000FF] h-5 w-5" />
                  <Sparkles className="text-[#7000FF] h-5 w-5" />
                  <Sparkles className="text-[#7000FF] h-5 w-5" />
                  <Sparkles className="text-[#7000FF] h-5 w-5" />
                  <Sparkles className="text-[#7000FF] h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 px-3 py-1 border-[#00FFD1]/30 mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] text-transparent bg-clip-text">
            Frequently asked questions
          </h2>
          <p className="text-[#A4B8D3]">Find answers to common questions about our platform and services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF3D00] transition-colors">
                Do I need technical skills to use WebifyPro?
              </h3>
              <p className="text-[#A4B8D3]">
                Not at all! Our platform is designed to be user-friendly for everyone, regardless of technical
                background. Our drag-and-drop builder makes it easy to create professional websites.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#FF00E5] transition-colors">
                Can I use my own domain name?
              </h3>
              <p className="text-[#A4B8D3]">
                Yes, you can connect your existing domain or purchase a new one through us. We also offer free
                subdomains if you're just getting started.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#7000FF] transition-colors">
                Is there a limit to how many products I can sell?
              </h3>
              <p className="text-[#A4B8D3]">
                The number of products depends on your plan. Our Professional and Enterprise plans offer unlimited
                products, while the Starter plan has a limit of 50 products.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FFD1] transition-colors">
                How does the 14-day free trial work?
              </h3>
              <p className="text-[#A4B8D3]">
                You can sign up and use all features of your chosen plan for 14 days without being charged. No credit
                card required to start. If you decide to continue, you'll be billed after the trial period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00]/20 via-[#FF00E5]/20 to-[#7000FF]/20 blur-xl opacity-50"></div>
        <div className="container mx-auto text-center max-w-3xl relative">
          <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-12 backdrop-blur-sm">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
              Ready to take your business online?
            </h2>
            <p className="text-[#E1E7EF] mb-8">
              Join thousands of businesses that trust WebifyPro to build their online presence. Start your 14-day free
              trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.5)] text-lg px-8 py-6 h-auto"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 text-lg px-8 py-6 h-auto"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050A18] border-t border-[#1E293B] py-12 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                  <Globe className="h-6 w-6 text-white relative z-10" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                  WebifyPro
                </span>
              </Link>
              <p className="text-[#A4B8D3] mb-4">The all-in-one platform to establish and grow your business online.</p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#FF3D00] hover:bg-[#0A1228]/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#FF00E5] hover:bg-[#0A1228]/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#7000FF] hover:bg-[#0A1228]/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#00FFD1] hover:bg-[#0A1228]/80 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#A4B8D3] text-sm">&copy; {new Date().getFullYear()} WebifyPro. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}