import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const AnalyticsTab = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">
                        Where your visitors are coming from
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] relative">
                        {/* Simulated pie chart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-[#FF3D00] opacity-80"
                                    style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)" }}
                                ></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-[#FF00E5] opacity-80"
                                    style={{ clipPath: "polygon(50% 50%, 50% 0, 0 0, 0 50%)" }}
                                ></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-[#7000FF] opacity-80"
                                    style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
                                ></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-[#00FFD1] opacity-80"
                                    style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)" }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-[#0A1228]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-0 inset-x-0 flex justify-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#FF3D00] rounded-full mr-2"></div>
                                <span className="text-xs">Direct (40%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#FF00E5] rounded-full mr-2"></div>
                                <span className="text-xs">Social (25%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#7000FF] rounded-full mr-2"></div>
                                <span className="text-xs">Organic (20%)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#00FFD1] rounded-full mr-2"></div>
                                <span className="text-xs">Referral (15%)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Visitor Demographics */}
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Visitor Demographics</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">Age and gender distribution</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] relative">
                        {/* Simulated bar chart */}
                        <div className="absolute inset-x-0 bottom-0 h-[250px] flex items-end justify-between px-2">
                            {[65, 85, 95, 75, 55, 45].map((height, i) => (
                                <div key={i} className="w-full mx-1 flex flex-col items-center">
                                    <div className="w-full flex flex-col items-center">
                                        <div
                                            className="w-full bg-[#FF00E5] rounded-t-sm opacity-80"
                                            style={{ height: `${height * 0.7}px` }}
                                        ></div>
                                        <div
                                            className="w-full bg-[#7000FF] rounded-t-sm opacity-80 mt-1"
                                            style={{ height: `${height * 0.5}px` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-[#A4B8D3] text-center mt-2">
                                        {["18-24", "25-34", "35-44", "45-54", "55-64", "65+"][i]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#FF00E5] rounded-full mr-2"></div>
                                <span className="text-xs">Female</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#7000FF] rounded-full mr-2"></div>
                                <span className="text-xs">Male</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AnalyticsTab