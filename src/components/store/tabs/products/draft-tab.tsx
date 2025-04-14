import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Package } from 'lucide-react'
import React from 'react'

const DraftTab = () => {
    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="text-center py-6">
                    <Package className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Draft Products</h3>
                    <p className="text-[#A4B8D3] mb-4">You have 24 products in draft status.</p>
                    <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                        View Draft Products
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default DraftTab