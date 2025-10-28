"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  FileText,
  FileImage,
  Brain,
  ImageIcon,
  PenTool,
  FolderOpen,
  Video,
  Music,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react"

interface AppGridProps {
  searchQuery: string
}

const apps = [
  {
    id: "wetab-ai",
    name: "WeTab AI",
    description: "智能效率助手",
    icon: Sparkles,
    color: "bg-blue-600",
    category: "AI工具",
    action: "Start",
    featured: true,
  },
  {
    id: "ai-ppt",
    name: "AI PPT",
    description: "AI一键生成PPT",
    icon: FileText,
    color: "bg-orange-500",
    category: "AI工具",
    action: "Start Now",
    featured: true,
  },
  {
    id: "pdf-tools",
    name: "PDF工具箱",
    description: "在线转换、编辑好用的工具",
    icon: FileImage,
    color: "bg-blue-500",
    category: "文档工具",
    action: "进入",
    featured: true,
  },
  {
    id: "ai-drawing",
    name: "AI绘图",
    description: "智能绘图 精准创作",
    icon: Brain,
    color: "bg-purple-600",
    category: "AI工具",
    action: "开始创作",
    featured: true,
  },
  {
    id: "smart-image",
    name: "智能图像处理",
    description: "本地运行，简单、安全、高效",
    icon: ImageIcon,
    color: "bg-green-400",
    category: "图像工具",
    action: "一键处理",
    featured: true,
  },
  {
    id: "ai-writing",
    name: "AI写作",
    description: "启发创意的写作灵感助手",
    icon: PenTool,
    color: "bg-blue-400",
    category: "AI工具",
    action: "开始写作",
  },
  {
    id: "doc-process",
    name: "文档处理",
    description: "高效文档管理",
    icon: FolderOpen,
    color: "bg-cyan-500",
    category: "文档工具",
    action: "打开",
  },
  {
    id: "file-tools",
    name: "文件夹",
    description: "文件管理工具集",
    icon: FolderOpen,
    color: "bg-orange-600",
    category: "工具集",
    action: "打开",
  },
  {
    id: "xiaomi-tools",
    name: "文件夹",
    description: "小米工具集",
    icon: FolderOpen,
    color: "bg-amber-600",
    category: "工具集",
    action: "打开",
  },
  {
    id: "ai-mindmap",
    name: "AI思维导图",
    description: "简单好用，快速生成导图",
    icon: Brain,
    color: "bg-pink-500",
    category: "AI工具",
    action: "创建导图",
  },
  {
    id: "video-tools",
    name: "视频工具",
    description: "视频编辑处理",
    icon: Video,
    color: "bg-yellow-500",
    category: "媒体工具",
    action: "开始编辑",
  },
  {
    id: "audio-tools",
    name: "音频工具",
    description: "音频处理工具",
    icon: Music,
    color: "bg-gray-800",
    category: "媒体工具",
    action: "开始处理",
  },
]

export function AppGrid({ searchQuery }: AppGridProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const featuredApps = filteredApps.filter((app) => app.featured)
  const regularApps = filteredApps.filter((app) => !app.featured)

  return (
    <div className="space-y-8">
      {/* 精选应用 */}
      {featuredApps.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">精选应用</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} isHovered={hoveredApp === app.id} onHover={setHoveredApp} />
            ))}
          </div>
        </div>
      )}

      {/* 常规应用 */}
      {regularApps.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">所有应用</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularApps.map((app) => (
              <AppCard key={app.id} app={app} isHovered={hoveredApp === app.id} onHover={setHoveredApp} />
            ))}
          </div>
        </div>
      )}

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">未找到匹配的应用</p>
        </div>
      )}
    </div>
  )
}

interface AppCardProps {
  app: (typeof apps)[0]
  isHovered: boolean
  onHover: (id: string | null) => void
}

function AppCard({ app, isHovered, onHover }: AppCardProps) {
  const Icon = app.icon

  return (
    <Card
      className="app-icon relative overflow-hidden border-border bg-card hover:bg-accent/50 cursor-pointer group"
      onMouseEnter={() => onHover(app.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="p-6 space-y-4">
        {/* 图标和标题 */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {app.featured && (
            <Badge variant="secondary" className="text-xs">
              精选
            </Badge>
          )}
        </div>

        {/* 应用信息 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{app.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{app.description}</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {app.category}
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary-foreground hover:bg-primary"
          >
            {app.action}
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* 悬停效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  )
}
