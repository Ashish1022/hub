import React from 'react'
import DocsSidebar from '@/modules/docs/ui/docs-sidebar'

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            <DocsSidebar />
            <div className='p-4 flex flex-1'>
                {children}
            </div>
        </div>
    )
}

export default DocsLayout