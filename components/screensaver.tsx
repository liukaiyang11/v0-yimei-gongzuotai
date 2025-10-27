"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ScreensaverProps {
  onExit: () => void
}

export function Screensaver({ onExit }: ScreensaverProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Click anywhere to exit screensaver
  const handleClick = (e: React.MouseEvent) => {
    // Don't exit if clicking on interactive elements
    if ((e.target as HTMLElement).closest("input, button, [role='menuitem']")) {
      return
    }
    onExit()
  }

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    const weekday = weekdays[date.getDay()]

    // Simplified lunar calendar representation (just for display)
    const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"]
    const lunarMonth = lunarMonths[date.getMonth()]
    const lunarDay = `初${String(day).padStart(2, "0")}`

    return `${year}年${month}月${day}日  ${lunarMonth}${lunarDay}  ${weekday}`
  }

  const quotes = [
    {
      text: "惟将终夜常开眼，报答平生未展眉。",
      source: "《遣悲怀三首·其三》",
      author: "元稹",
    },
    {
      text: "人生若只如初见，何事秋风悲画扇。",
      source: "《木兰花·拟古决绝词柬友》",
      author: "纳兰性德",
    },
    {
      text: "山重水复疑无路，柳暗花明又一村。",
      source: "《游山西村》",
      author: "陆游",
    },
    {
      text: "长风破浪会有时，直挂云帆济沧海。",
      source: "《行路难·其一》",
      author: "李白",
    },
  ]

  const [currentQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
      style={{
        backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=serene+mountain+landscape+with+clouds)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Top Search Bar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md z-10">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <Search className="w-5 h-5" />
          </div>
          <Input
            placeholder="输入搜索内容"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border-0 rounded-xl text-gray-800 placeholder:text-gray-500 shadow-lg"
          />
        </div>
      </div>

      {/* Top Right Menu */}
      <div className="absolute top-8 right-8 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-700 rounded-lg shadow-lg"
            >
              <span className="text-sm">菜单</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md">
            <DropdownMenuItem>随机壁纸</DropdownMenuItem>
            <DropdownMenuItem>下载壁纸</DropdownMenuItem>
            <DropdownMenuItem>编辑常访栏</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Clock */}
      <div className="relative z-10 text-center space-y-4">
        <div className="text-[120px] font-light text-white drop-shadow-2xl tracking-wider leading-none">
          {formatTime(currentTime)}
        </div>
        <div className="text-2xl text-white/90 drop-shadow-lg font-light tracking-wide">{formatDate(currentTime)}</div>
      </div>

      {/* Bottom Quote */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-center space-y-2 max-w-2xl">
        <div className="flex items-center justify-center gap-3">
          <div className="text-white/60 text-2xl">"</div>
          <p className="text-xl text-white/90 drop-shadow-lg font-light">{currentQuote.text}</p>
          <div className="text-white/60 text-2xl">"</div>
        </div>
        <div className="text-sm text-white/70 drop-shadow-md">
          {currentQuote.source} · {currentQuote.author}
        </div>
      </div>

      {/* Bottom Left Settings */}
      <div className="absolute bottom-8 left-8 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
