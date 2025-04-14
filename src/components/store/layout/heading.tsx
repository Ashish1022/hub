import React from 'react'

const Heading = ({ title, description }: { title: string; description: string }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                {title}
            </h1>
            <p className="text-[#A4B8D3]">{description}</p>
        </div>
    )
}

export default Heading