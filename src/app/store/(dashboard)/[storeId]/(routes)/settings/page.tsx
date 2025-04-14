"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, Save, ShieldCheck, Wallet, CreditCard } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import DashboardNav from "@/components/store/layout/dashboard-nav"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const { user } = useUser()

  return (
    <DashboardNav searchPlaceholder="Search settings...">
      <div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
              Settings
            </h1>
            <p className="text-[#A4B8D3]">Manage your account settings and preferences</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-[#0A1228] border border-[#1E293B] mb-6">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Update your personal information and profile settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          defaultValue={`${user?.firstName} ${user?.lastName}`}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          defaultValue={user?.emailAddresses[0]?.emailAddress}
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone number"
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Enter your company name"
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          placeholder="Enter your role"
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-[#1E293B] pt-4">
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Language</h4>
                        <p className="text-sm text-[#A4B8D3]">Select your preferred language</p>
                      </div>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-[180px] bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Time Zone</h4>
                        <p className="text-sm text-[#A4B8D3]">Set your local time zone</p>
                      </div>
                      <Select defaultValue="utc">
                        <SelectTrigger className="w-[180px] bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                          <SelectItem value="utc">UTC (GMT)</SelectItem>
                          <SelectItem value="est">Eastern Time (ET)</SelectItem>
                          <SelectItem value="cst">Central Time (CT)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Currency</h4>
                        <p className="text-sm text-[#A4B8D3]">Set your preferred currency</p>
                      </div>
                      <Select defaultValue="usd">
                        <SelectTrigger className="w-[180px] bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                          <SelectItem value="cad">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-[#1E293B] pt-4">
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Permanently delete your account and all of your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border border-[#FF3D00]/30 rounded-lg bg-[#FF3D00]/5">
                    <h4 className="font-medium text-[#FF3D00]">Delete Account</h4>
                    <p className="text-sm text-[#A4B8D3] mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" className="bg-[#FF3D00] hover:bg-[#FF3D00]/90">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Manage your billing details and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Current Plan</h4>
                        <p className="text-sm text-[#A4B8D3]">You are currently on the Pro plan</p>
                      </div>
                      <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 border-[#FF00E5]/30">
                        Pro Plan
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Billing Cycle</h4>
                        <p className="text-sm text-[#A4B8D3]">You are billed monthly</p>
                      </div>
                      <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        Change Plan
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Next Payment</h4>
                        <p className="text-sm text-[#A4B8D3]">Your next payment of $49.99 is due on August 12, 2023</p>
                      </div>
                      <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        View Invoices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Manage your payment methods and billing preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-[#1E293B] rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-[#FF00E5]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Visa ending in 4242</h4>
                          <p className="text-sm text-[#A4B8D3]">Expires 12/24</p>
                        </div>
                      </div>
                      <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 border-[#00FFD1]/30">
                        Default
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-[#A4B8D3] uppercase">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { title: "Order Updates", description: "Receive updates about your orders" },
                        { title: "Product Updates", description: "Be notified about new products and updates" },
                        { title: "Promotional Emails", description: "Receive promotional offers and discounts" },
                        { title: "Newsletter", description: "Receive our weekly newsletter" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 border-b border-[#1E293B] last:border-0"
                        >
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-[#A4B8D3]">{item.description}</p>
                          </div>
                          <Switch defaultChecked={i < 2} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-[#A4B8D3] uppercase">Push Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { title: "Order Status", description: "Receive updates when your order status changes" },
                        { title: "New Messages", description: "Be notified when you receive new messages" },
                        { title: "Account Activity", description: "Be notified about your account activity" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 border-b border-[#1E293B] last:border-0"
                        >
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm text-[#A4B8D3]">{item.description}</p>
                          </div>
                          <Switch defaultChecked={i < 2} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-[#1E293B] pt-4">
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">
                    Manage your account security and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-[#A4B8D3]">
                          Update your password regularly to keep your account secure
                        </p>
                      </div>
                      <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-[#A4B8D3]">Add an extra layer of security to your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Login History</h4>
                        <p className="text-sm text-[#A4B8D3]">View your recent login activity</p>
                      </div>
                      <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        View History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">Manage your API keys and access tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-[#1E293B] rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-[#7000FF]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Production API Key</h4>
                          <p className="text-sm text-[#A4B8D3]">Created on July 15, 2023</p>
                        </div>
                      </div>
                      <Badge className="bg-[#00FFD1]/10 text-[#00FFD1] hover:bg-[#00FFD1]/20 border-[#00FFD1]/30">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#050A18] rounded-md mb-4">
                      <code className="text-sm font-mono text-[#A4B8D3]">
                        sk_live_51Hb*****************************
                      </code>
                      <Button variant="ghost" size="sm" className="h-8 text-[#A4B8D3]">
                        Copy
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                      >
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Create New API Key
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardNav>
  )
}

