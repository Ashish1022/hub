import DecorativeElements from '@/components/decorative-elements'
import React from 'react'
import DashboardSidebar from './dashboard-sidebar'
import DashboardHeader from './dashboard-header'

interface DashboardNavProps {
  children: React.ReactNode
  searchPlaceholder?: string
}

const DashboardNav = ({ searchPlaceholder, children }: DashboardNavProps) => {
  return (
    <div className='min-h-screen bg-[#050a18] text-white'>
      <DecorativeElements />
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader searchPlaceholder={searchPlaceholder} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default DashboardNav