import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import MainSection from './main-section'

const DocsSidebar = () => {
    return (
        <Sidebar className='pt-16 z-40 border-none'>
            <SidebarContent className='bg-background'>
                <MainSection/>
                <Separator/>
            </SidebarContent>
        </Sidebar>
    )
}

export default DocsSidebar