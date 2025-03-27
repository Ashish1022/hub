"use client"

import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import { Globe } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#050A18] text-white flex flex-col">
      {/* Decorative elements */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/30 via-[#FF00E5]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/30 via-[#7000FF]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>

      {/* Animated shapes */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#FF00E5]/20 animate-[spin_20s_linear_infinite] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-[#00FFD1]/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

      {/* Header */}
      <header className="container mx-auto py-4 px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
              <Globe className="h-8 w-8 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
              ZERO | HUB
            </span>
          </Link>
        </div>
      </header>

      {/* Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-75"></div>
            <div className="relative bg-[#0A1228]/90 rounded-lg p-8 shadow-xl backdrop-blur-sm">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                  Create an Account
                </h1>
                <p className="text-[#A4B8D3] mt-2">Join ZERO | HUB and start building your online presence</p>
              </div>

              {/* Clerk SignUp component with custom appearance */}
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "!w-full",
                    card: "!bg-transparent !shadow-none !w-full !p-0 !m-0",
                    header: "!hidden",
                    footer: "!hidden",
                    formButtonPrimary:
                      "!w-full !bg-gradient-to-r !from-[#FF3D00] !to-[#FF00E5] !hover:opacity-90 !text-white !border-0 !shadow-[0_0_15px_rgba(255,61,0,0.4)] !py-3 !rounded-md",
                    formFieldInput:
                      "!bg-[#050A18] !border-[#1E293B] !focus:border-[#FF00E5] !focus:ring-[#FF00E5] !text-white !placeholder:text-[#A4B8D3] !rounded-md p-2 w-full",
                    formFieldLabel: "!text-white",
                    formFieldErrorText: "!text-[#FF3D00]",
                    footerActionLink: "!text-[#FF00E5] !hover:text-[#FF00E5] !hover:underline",
                    identityPreviewEditButton: "!text-[#FF00E5]",
                    formFieldAction: "!text-[#FF00E5]",
                    otpCodeFieldInput: "!bg-[#050A18] !border-[#1E293B] !text-white",
                    dividerLine: "!bg-[#1E293B]",
                    dividerText: "!text-[#A4B8D3] !bg-[#0A1228]",
                    socialButtonsBlockButton: "!border-[#1E293B] !text-white !hover:bg-[#1E293B]/50 !flex !justify-center",
                    socialButtonsBlockButtonText: "!text-white",
                    formHeaderTitle: "!text-white !text-xl",
                    formHeaderSubtitle: "!text-[#A4B8D3]",
                    alertText: "!text-[#A4B8D3]",
                    profileSectionTitle: "!text-white",
                    profileSectionTitleText: "!text-white",
                    userButtonPopoverActionButton: "!text-[#A4B8D3] !hover:text-white !hover:bg-[#1E293B]",
                    userButtonPopoverActionButtonIcon: "!text-[#A4B8D3]",
                    userButtonPopoverFooter: "!border-t !border-[#1E293B]",
                  },
                }}
                redirectUrl="/store"
              />

              <div className="mt-6 text-center text-sm">
                <p className="text-[#A4B8D3]">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[#FF00E5] hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

