import AnimatedShapes from "@/components/animated-shapes"
import DecorativeElements from "@/components/decorative-elements"
import Footer from "@/components/home/layout/footer"
import Header from "@/components/home/layout/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Laptop, LayoutGrid, Server, ShieldCheck, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

const Page = () => {
  return (
    <div className="min-h-screen bg-[#050A18] text-white overflow-hidden">
      <DecorativeElements />
      <AnimatedShapes />
      <Header />
      <section className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FF3D00] rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#7000FF] rounded-full blur-[100px] opacity-20"></div>

          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30 mb-4 sm:mb-6">
            Launch Your Business Online
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text mb-4 sm:mb-6">
            Take your business online.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#A4B8D3] max-w-2xl mx-auto mb-6 sm:mb-8">
            ZERO | HUB helps businesses of all sizes establish and grow their online presence with our all-in-one
            platform. Get started in minutes, no technical skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,61,0,0.4)] text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto mt-2 sm:mt-0"
            >
              Book a Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <div className="flex -space-x-3 sm:-space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#FF3D00]">JD</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#FF00E5]">MK</span>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#050A18] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#7000FF]">TS</span>
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#A4B8D3]">
              <span className="text-[#00FFD1] font-bold">1,000+</span> businesses launched this month
            </p>
          </div>

          {/* Animated code snippet */}
          <div className="mt-10 sm:mt-16 relative max-w-2xl mx-auto overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur-lg opacity-50"></div>
            <div className="relative bg-[#0A1228]/80 rounded-lg overflow-hidden border border-[#1E293B] backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF]"></div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border-b border-[#1E293B]">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF3D00]"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD00]"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#00FFD1]"></div>
                <span className="text-xs text-[#A4B8D3] ml-2">webify-cli.js</span>
              </div>
              <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">1</span>
                  <span className="text-[#FF00E5]">import</span>
                  <span className="text-white">
                    {" "}
                    {"{"} createWebsite {"}"}{" "}
                  </span>
                  <span className="text-[#FF00E5]">from</span>
                  <span className="text-[#00FFD1]"> 'webify-pro'</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">2</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">3</span>
                  <span className="text-[#FF3D00]">const</span>
                  <span className="text-white"> myBusiness = </span>
                  <span className="text-[#FF00E5]">await</span>
                  <span className="text-white"> createWebsite({"{"}</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">4</span>
                  <span className="text-white"> name: </span>
                  <span className="text-[#00FFD1]">'My Awesome Business'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">5</span>
                  <span className="text-white"> template: </span>
                  <span className="text-[#00FFD1]">'e-commerce'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">6</span>
                  <span className="text-white"> domain: </span>
                  <span className="text-[#00FFD1]">'mybusiness.com'</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">7</span>
                  <span className="text-white">{"})"}</span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">8</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">9</span>
                  <span className="text-[#7000FF]">// Site deployed in 3.2 seconds!</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-[#A4B8D3] w-6 sm:w-8 flex-shrink-0">10</span>
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

      <section className="container mx-auto py-8 sm:py-12 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <p className="text-center text-[#A4B8D3] mb-6 sm:mb-8 text-sm sm:text-base">
          Trusted by innovative companies worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center opacity-70">
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
          <Image
            src="/placeholder-logo.svg"
            alt="Company Logo"
            width={120}
            height={40}
            className="grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 w-24 sm:w-28 md:w-32 h-auto"
            loading="lazy"
          />
        </div>
      </section>

      <section
        id="features"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 px-3 py-1 border-[#FF00E5]/30 mb-3 sm:mb-4">
            Features
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            Everything you need to succeed online
          </h2>
          <p className="text-sm sm:text-base text-[#A4B8D3]">
            Our platform provides all the tools and features you need to establish a strong online presence and grow
            your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FF3D00]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF3D00]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors text-lg sm:text-xl">
                  Custom Domains
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FF00E5]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <LayoutGrid className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF00E5]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF00E5] transition-colors text-lg sm:text-xl">
                  Drag & Drop Builder
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#7000FF]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#7000FF]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#7000FF] transition-colors text-lg sm:text-xl">
                  SSL Security
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#00FFD1]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Laptop className="h-5 w-5 sm:h-6 sm:w-6 text-[#00FFD1]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#00FFD1] transition-colors text-lg sm:text-xl">
                  Mobile Responsive
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FF3D00]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF3D00]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors text-lg sm:text-xl">
                  Fast Performance
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#FF00E5]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Server className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF00E5]" aria-hidden="true" />
                </div>
                <CardTitle className="text-white group-hover:text-[#FF00E5] transition-colors text-lg sm:text-xl">
                  Reliable Hosting
                </CardTitle>
                <CardDescription className="text-[#A4B8D3] text-sm">
                  99.9% uptime guarantee with our enterprise-grade hosting infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 px-3 py-1 border-[#00FFD1]/30 mb-3 sm:mb-4">
            How It Works
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#00FFD1] to-[#7000FF] text-transparent bg-clip-text">
            Launch your business online in 3 simple steps
          </h2>
          <p className="text-sm sm:text-base text-[#A4B8D3]">
            Our streamlined process makes it easy to get your business online quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 sm:p-8 backdrop-blur-sm h-full">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[#FF3D00] to-[#FF00E5] md:block hidden"></div>
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-white font-bold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(255,61,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#FF3D00] transition-colors">
                  Choose a template
                </h3>
                <p className="text-[#A4B8D3] text-sm sm:text-base text-center md:text-left">
                  Select from our library of professionally designed templates tailored for your industry.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 sm:p-8 backdrop-blur-sm h-full">
              <div className="absolute top-0 left-6 h-full w-px bg-gradient-to-b from-[#FF00E5] to-[#7000FF] md:block hidden"></div>
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-white font-bold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(255,0,229,0.5)] group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#FF00E5] transition-colors">
                  Customize your site
                </h3>
                <p className="text-[#A4B8D3] text-sm sm:text-base text-center md:text-left">
                  Add your content, customize colors, and make it your own with our easy-to-use editor.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 sm:p-8 backdrop-blur-sm h-full">
              <div className="relative z-10 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-white font-bold mb-3 sm:mb-4 shadow-[0_0_15px_rgba(112,0,255,0.5)] group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#7000FF] transition-colors">
                  Publish and grow
                </h3>
                <p className="text-[#A4B8D3] text-sm sm:text-base text-center md:text-left">
                  Launch your site and use our tools to grow your online presence and attract more customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge className="bg-[#FF3D00]/10 text-[#FF3D00] hover:bg-[#FF3D00]/20 px-3 py-1 border-[#FF3D00]/30 mb-3 sm:mb-4">
            Pricing
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
            Simple, transparent pricing
          </h2>
          <p className="text-sm sm:text-base text-[#A4B8D3]">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <CardTitle className="text-white group-hover:text-[#FF3D00] transition-colors text-lg sm:text-xl">
                  Starter
                </CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                    $19
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-3 sm:mt-4 text-sm">
                  Perfect for small businesses just getting started online.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3D00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>1 website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3D00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>5 pages per website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3D00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3D00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3D00] shrink-0 mt-0.5" aria-hidden="true" />
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
                <CardTitle className="text-white text-lg sm:text-xl">Professional</CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    $49
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-3 sm:mt-4 text-sm">
                  Ideal for growing businesses with more online needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>5 websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>E-commerce functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF00E5] shrink-0 mt-0.5" aria-hidden="true" />
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
                <CardTitle className="text-white group-hover:text-[#7000FF] transition-colors text-lg sm:text-xl">
                  Enterprise
                </CardTitle>
                <div className="mt-3 sm:mt-4">
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-transparent bg-clip-text">
                    $99
                  </span>
                  <span className="text-[#A4B8D3]">/month</span>
                </div>
                <CardDescription className="text-[#A4B8D3] mt-3 sm:mt-4 text-sm">
                  For established businesses with advanced requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>20 websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Unlimited pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Free SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Advanced e-commerce tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#7000FF] shrink-0 mt-0.5" aria-hidden="true" />
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

      <section
        id="testimonials"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge className="bg-[#7000FF]/10 text-[#7000FF] hover:bg-[#7000FF]/20 px-3 py-1 border-[#7000FF]/30 mb-3 sm:mb-4">
            Testimonials
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] text-transparent bg-clip-text">
            What our customers say
          </h2>
          <p className="text-sm sm:text-base text-[#A4B8D3]">
            Don't just take our word for it. Here's what businesses like yours have achieved with ZERO | HUB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-full blur-sm opacity-70"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A1228] border-2 border-[#FF3D00] flex items-center justify-center relative z-10">
                      <span className="text-base sm:text-lg font-bold text-[#FF3D00]">SJ</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FF3D00] transition-colors text-base sm:text-lg">
                      Sarah Johnson
                    </h4>
                    <p className="text-[#A4B8D3] text-xs sm:text-sm">Founder, Bloom Boutique</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-4xl sm:text-6xl text-[#FF3D00]/10 font-serif">"</div>
                <p className="text-[#E1E7EF] text-sm sm:text-base">
                  "ZERO | HUB transformed our business. We went from zero online presence to a beautiful e-commerce
                  store that's generating 60% of our revenue in just three months."
                </p>
                <div className="mt-3 sm:mt-4 flex">
                  <Sparkles className="text-[#FF3D00] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF3D00] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF3D00] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF3D00] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF3D00] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-full blur-sm opacity-70"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A1228] border-2 border-[#FF00E5] flex items-center justify-center relative z-10">
                      <span className="text-base sm:text-lg font-bold text-[#FF00E5]">MC</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FF00E5] transition-colors text-base sm:text-lg">
                      Michael Chen
                    </h4>
                    <p className="text-[#A4B8D3] text-xs sm:text-sm">CEO, TechSolutions Inc.</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-4xl sm:text-6xl text-[#FF00E5]/10 font-serif">"</div>
                <p className="text-[#E1E7EF] text-sm sm:text-base">
                  "The ease of use is incredible. We were able to launch our company website in days instead of weeks,
                  and the analytics tools have helped us optimize for better conversions."
                </p>
                <div className="mt-3 sm:mt-4 flex">
                  <Sparkles className="text-[#FF00E5] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF00E5] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF00E5] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF00E5] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#FF00E5] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm overflow-hidden relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7000FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-full blur-sm opacity-70"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A1228] border-2 border-[#7000FF] flex items-center justify-center relative z-10">
                      <span className="text-base sm:text-lg font-bold text-[#7000FF]">JM</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#7000FF] transition-colors text-base sm:text-lg">
                      Jessica Martinez
                    </h4>
                    <p className="text-[#A4B8D3] text-xs sm:text-sm">Owner, Healthy Eats Cafe</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 text-4xl sm:text-6xl text-[#7000FF]/10 font-serif">"</div>
                <p className="text-[#E1E7EF] text-sm sm:text-base">
                  "As a restaurant owner, I needed a simple way to showcase our menu and accept online orders. ZERO |
                  HUB delivered exactly what we needed, and our customers love it!"
                </p>
                <div className="mt-3 sm:mt-4 flex">
                  <Sparkles className="text-[#7000FF] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#7000FF] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#7000FF] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#7000FF] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <Sparkles className="text-[#7000FF] h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="container mx-auto py-12 sm:py-16 md:py-20 px-4 md:px-6 border-t border-[#1E293B] relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 px-3 py-1 border-[#00FFD1]/30 mb-3 sm:mb-4">
            FAQ
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] text-transparent bg-clip-text">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-[#A4B8D3]">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#FF3D00] transition-colors">
                Do I need technical skills to use ZERO | HUB?
              </h3>
              <p className="text-[#A4B8D3] text-sm sm:text-base">
                Not at all! Our platform is designed to be user-friendly for everyone, regardless of technical
                background. Our drag-and-drop builder makes it easy to create professional websites.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#FF00E5] transition-colors">
                Can I use my own domain name?
              </h3>
              <p className="text-[#A4B8D3] text-sm sm:text-base">
                Yes, you can connect your existing domain or purchase a new one through us. We also offer free
                subdomains if you're just getting started.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7000FF] to-[#00FFD1] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#7000FF] transition-colors">
                Is there a limit to how many products I can sell?
              </h3>
              <p className="text-[#A4B8D3] text-sm sm:text-base">
                The number of products depends on your plan. Our Professional and Enterprise plans offer unlimited
                products, while the Starter plan has a limit of 50 products.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFD1] to-[#FF3D00] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-4 sm:p-6 backdrop-blur-sm relative h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[#00FFD1] transition-colors">
                How does the 14-day free trial work?
              </h3>
              <p className="text-[#A4B8D3] text-sm sm:text-base">
                You can sign up and use all features of your chosen plan for 14 days without being charged. No credit
                card required to start. If you decide to continue, you'll be billed after the trial period.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00]/20 via-[#FF00E5]/20 to-[#7000FF]/20 blur-xl opacity-50"></div>
        <div className="container mx-auto text-center max-w-3xl relative">
          <div className="bg-[#0A1228]/80 border border-[#1E293B] rounded-lg p-6 sm:p-8 md:p-12 backdrop-blur-sm">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-25"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
              Ready to take your business online?
            </h2>
            <p className="text-[#E1E7EF] mb-6 sm:mb-8 text-sm sm:text-base">
              Join thousands of businesses that trust ZERO | HUB to build their online presence. Start your 14-day free
              trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.5)] text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto mt-2 sm:mt-0"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Page
