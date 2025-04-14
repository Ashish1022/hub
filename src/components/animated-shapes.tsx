import React from 'react'

const AnimatedShapes = () => {
    return (
        <>
            <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#7c3aed]/20 animate-[spin_20s_linear_infinite] pointer-events-none"></div>
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-[#0ea5e9]/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>
        </>
    )
}

export default AnimatedShapes