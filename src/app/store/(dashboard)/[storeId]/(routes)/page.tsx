"use client"

import DecorativeElements from '@/components/decorative-elements'
import DashboardNav from '@/components/store/layout/dashboard-nav'
import StoreCard from '@/components/store/store-card'
import AnalyticsTab from '@/components/store/tabs/dashboard/analytics-tab'
import NotificationsTab from '@/components/store/tabs/dashboard/notifications-tab'
import OverviewTab from '@/components/store/tabs/dashboard/overview-tab'
import ReportsTab from '@/components/store/tabs/dashboard/reports-tab'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUp, Calendar, DollarSign, Download } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {

  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "analytics", "reports", "notifications"];

  return (
    <div className="min-h-screen bg-[#050A18] text-white">
      <DecorativeElements />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNav>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                      Store Dashboard
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last 30 days
                    </Button>
                    <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StoreCard title={'Total Revenue'} value={'$24,780'} ChangeIcon={ArrowUp} change={'12% from last month'} bgColor={'bg-[#FF3D00]/10'} iconColor={'text-[#FF3D00]'} icon={DollarSign} />
                  <StoreCard title={'Total Revenue'} value={'$24,780'} ChangeIcon={ArrowUp} change={'12% from last month'} bgColor={'bg-[#FF3D00]/10'} iconColor={'text-[#FF3D00]'} icon={DollarSign} />
                  <StoreCard title={'Total Revenue'} value={'$24,780'} ChangeIcon={ArrowUp} change={'12% from last month'} bgColor={'bg-[#FF3D00]/10'} iconColor={'text-[#FF3D00]'} icon={DollarSign} />
                  <StoreCard title={'Total Revenue'} value={'$24,780'} ChangeIcon={ArrowUp} change={'12% from last month'} bgColor={'bg-[#FF3D00]/10'} iconColor={'text-[#FF3D00]'} icon={DollarSign} />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                  <TabsList className="bg-[#0A1228] border border-[#1E293B]">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <OverviewTab />
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-4">
                    <AnalyticsTab />
                  </TabsContent>
                  <TabsContent value="reports" className="mt-4">
                    <ReportsTab />
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-4">
                    <NotificationsTab />
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </DashboardNav>
        </div>
      </div>
    </div>
  )
}

export default page