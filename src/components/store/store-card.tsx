import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface StoreCardProps {
  title: string;
  value: string;
  ChangeIcon: React.ElementType;
  change: string;
  bgColor: string;
  iconColor: string;
  icon: React.ElementType;
}

const StoreCard = ({ title, value, ChangeIcon, change, iconColor, bgColor, icon: Icon }: StoreCardProps) => {
  return (
    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-[#A4B8D3]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center text-xs text-[#00FFD1]">
              <ChangeIcon className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StoreCard