import React from 'react'

const DecorativeElements = () => {
    return (
        <>
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/10 via-[#FF00E5]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
            <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/10 via-[#7000FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
        </>
    )
}

export default DecorativeElements