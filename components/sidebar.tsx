"use client"

import { Home, BookOpen, Database, TrendingUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "启动台", label: "启动台", icon: Home },
  { id: "知识库", label: "知识库", icon: BookOpen },
  { id: "行业知识库", label: "行业知识库", icon: Database },
  { id: "医美智库", label: "医美智库", icon: TrendingUp },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-gray-800/80 backdrop-blur-sm border-r border-gray-700/50 z-20">
      {/* Logo区域 */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">医</span>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="p-2 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="group relative">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200",
                  activeSection === item.id && "bg-white/20 text-white",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="w-5 h-5" />
              </Button>

              {/* 工具提示 */}
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30">
                {item.label}
              </div>
            </div>
          )
        })}
      </nav>

      {/* 底部设置 */}
      <div className="absolute bottom-4 left-2 right-2">
        <div className="group relative">
          <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-300 hover:text-white hover:bg-white/10">
            <Settings className="w-5 h-5" />
          </Button>

          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30">
            设置
          </div>
        </div>
      </div>
    </div>
  )
}
