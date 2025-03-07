import React from 'react'

const Heading = ({ title, description }: { title: string; description: string }) => {
    return (
        <div>
            <h2 className='md:text-2xl text-xl font-bold tracking-tight'>{title}</h2>
            <p className='md:text-sm text-xs text-muted-foreground'>{description}</p>
        </div>
    )
}

export default Heading