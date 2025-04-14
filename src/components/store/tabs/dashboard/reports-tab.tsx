import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download } from 'lucide-react'
import React from 'react'

const ReportsTab = () => {
    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription className="text-[#A4B8D3]">
                    Download detailed reports for your store
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        {
                            name: "Sales Report",
                            description: "Detailed breakdown of all sales",
                            date: "Last updated: Jul 21, 2023",
                        },
                        {
                            name: "Inventory Report",
                            description: "Current stock levels and product performance",
                            date: "Last updated: Jul 20, 2023",
                        },
                        {
                            name: "Customer Analytics",
                            description: "Customer demographics and behavior",
                            date: "Last updated: Jul 19, 2023",
                        },
                        {
                            name: "Marketing Performance",
                            description: "Campaign effectiveness and ROI",
                            date: "Last updated: Jul 18, 2023",
                        },
                    ].map((report, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-4 border border-[#1E293B] rounded-lg"
                        >
                            <div>
                                <div className="font-medium">{report.name}</div>
                                <div className="text-sm text-[#A4B8D3]">{report.description}</div>
                                <div className="text-xs text-[#A4B8D3] mt-1">{report.date}</div>
                            </div>
                            <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ReportsTab