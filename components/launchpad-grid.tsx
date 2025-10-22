"use client"

import type React from "react"

import { useState } from "react"
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
  Palette,
  Folder,
  BookOpen,
  Stethoscope,
  Target,
  DollarSign,
  Headphones,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Users,
  UserSearch,
} from "lucide-react"

interface LaunchpadGridProps {
  searchQuery: string
  onAppClick?: (appId: string) => void
}

const apps = [
  {
    id: "collaborative-service",
    name: "智能协同服务工作台",
    description: "群聊协同·AI辅助",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500",
    action: "进入",
    size: "regular",
  },
  {
    id: "ad-compliance",
    name: "医美广告法审核",
    description: "智能合规审核",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500",
    action: "审核",
    size: "regular",
  },
  {
    id: "sales-assistant",
    name: "AI销售助理",
    description: "销售智能助手",
    icon: DollarSign,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    action: "使用",
    size: "regular",
  },
  {
    id: "customer-acquisition",
    name: "精准获客系统",
    description: "视频评论获客",
    icon: UserSearch,
    gradient: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500",
    action: "启动",
    size: "regular",
  },
  {
    id: "enterprise-kb",
    name: "企业知识库",
    description: "专业知识管理",
    icon: BookOpen,
    gradient: "from-cyan-400 to-cyan-500",
    bgColor: "bg-cyan-400",
    action: "进入",
    size: "regular",
  },
  {
    id: "doctor-assistant",
    name: "医生专业助手",
    description: "AI医疗助手",
    icon: Stethoscope,
    gradient: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-400",
    action: "启动",
    size: "regular",
  },
  {
    id: "content-workshop",
    name: "内容创意工坊",
    description: "创意内容生成",
    icon: Palette,
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
    action: "创作",
    size: "regular",
  },
  {
    id: "ai-meeting",
    name: "AI会议秘书",
    description: "智能会议记录",
    icon: MessageSquare,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    action: "开始",
    size: "regular",
  },
  {
    id: "decision-cockpit",
    name: "决策驾驶舱",
    description: "数据分析决策",
    icon: BarChart3,
    gradient: "from-red-500 to-red-600",
    bgColor: "bg-red-500",
    action: "查看",
    size: "regular",
  },
  {
    id: "marketing-system",
    name: "精准营销系统",
    description: "智能营销管理",
    icon: Target,
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
    action: "启动",
    size: "regular",
  },
  {
    id: "smart-service",
    name: "智能客服",
    description: "24小时在线服务",
    icon: Headphones,
    gradient: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500",
    action: "接入",
    size: "regular",
  },
  {
    id: "ai-ppt",
    name: "AI PPT",
    description: "AI一键生成PPT",
    icon: FileText,
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
    action: "创建",
    size: "regular",
  },
  {
    id: "pdf-tools",
    name: "PDF工具箱",
    description: "在线转换编辑",
    icon: FileImage,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    action: "进入",
    size: "regular",
  },
  {
    id: "ai-drawing",
    name: "AI绘图",
    description: "智能绘图创作",
    icon: Brain,
    gradient: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-600",
    action: "创作",
    size: "regular",
  },
  {
    id: "smart-image",
    name: "智能图像处理",
    description: "本地运行安全高效",
    icon: ImageIcon,
    gradient: "from-green-400 to-green-500",
    bgColor: "bg-green-400",
    action: "处理",
    size: "regular",
  },
  {
    id: "ai-writing",
    name: "AI写作",
    description: "启发创意灵感",
    icon: PenTool,
    gradient: "from-blue-400 to-blue-500",
    bgColor: "bg-blue-400",
    action: "写作",
    size: "regular",
  },
  {
    id: "doc-process",
    name: "文档处理",
    description: "高效文档管理",
    icon: FolderOpen,
    gradient: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-500",
    action: "打开",
    size: "regular",
  },
  {
    id: "file-tools",
    name: "文件夹",
    description: "",
    icon: Folder,
    gradient: "from-orange-600 to-red-600",
    bgColor: "bg-orange-600",
    action: "",
    size: "regular",
    isFolder: true,
    folderApps: [
      { icon: Video, color: "bg-red-500" },
      { icon: Music, color: "bg-green-500" },
      { icon: Palette, color: "bg-purple-500" },
      { icon: FileText, color: "bg-blue-500" },
    ],
  },
  {
    id: "xiaomi-tools",
    name: "文件夹",
    description: "",
    icon: Folder,
    gradient: "from-amber-600 to-orange-600",
    bgColor: "bg-amber-600",
    action: "",
    size: "regular",
    isFolder: true,
    folderApps: [
      { icon: Brain, color: "bg-orange-500" },
      { icon: Video, color: "bg-red-500" },
      { icon: Music, color: "bg-yellow-500" },
      { icon: Sparkles, color: "bg-blue-500" },
    ],
  },
  {
    id: "ai-mindmap",
    name: "AI思维导图",
    description: "快速生成导图",
    icon: Brain,
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500",
    action: "创建",
    size: "regular",
  },
  {
    id: "video-tools",
    name: "视频工具",
    description: "视频编辑处理",
    icon: Video,
    gradient: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-500",
    action: "编辑",
    size: "regular",
  },
  {
    id: "audio-tools",
    name: "音频工具",
    description: "音频编辑处理",
    icon: Music,
    gradient: "from-gray-700 to-gray-800",
    bgColor: "bg-gray-700",
    action: "编辑",
    size: "regular",
  },
]

export function LaunchpadGrid({ searchQuery, onAppClick }: LaunchpadGridProps) {
  const [draggedApp, setDraggedApp] = useState<string | null>(null)
  const [dragOverApp, setDragOverApp] = useState<string | null>(null)

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    setDraggedApp(appId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, appId: string) => {
    e.preventDefault()
    setDragOverApp(appId)
  }

  const handleDragLeave = () => {
    setDragOverApp(null)
  }

  const handleDrop = (e: React.DragEvent, targetAppId: string) => {
    e.preventDefault()
    setDragOverApp(null)
    setDraggedApp(null)

    if (draggedApp && draggedApp !== targetAppId) {
      console.log(`Combining ${draggedApp} with ${targetAppId}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-6 gap-8 auto-rows-fr">
        {filteredApps.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            isDragged={draggedApp === app.id}
            isDragOver={dragOverApp === app.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => onAppClick?.(app.id)}
          />
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70">未找到匹配的应用</p>
        </div>
      )}
    </div>
  )
}

interface AppIconProps {
  app: (typeof apps)[0]
  isDragged: boolean
  isDragOver: boolean
  onDragStart: (e: React.DragEvent, appId: string) => void
  onDragOver: (e: React.DragEvent, appId: string) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent, appId: string) => void
  onClick?: () => void
}

function AppIcon({ app, isDragged, isDragOver, onDragStart, onDragOver, onDragLeave, onDrop, onClick }: AppIconProps) {
  const Icon = app.icon

  return (
    <div
      className={`
        group cursor-pointer transition-all duration-300 transform
        ${isDragged ? "scale-90 opacity-40" : "hover:scale-110"}
        ${isDragOver ? "scale-105 ring-2 ring-white/50" : ""}
      `}
      draggable
      onDragStart={(e) => onDragStart(e, app.id)}
      onDragOver={(e) => onDragOver(e, app.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, app.id)}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {app.isFolder ? (
            <>
              <div
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-3xl`}
              >
                <Icon className="w-10 h-10 text-white/90" />
              </div>
              <div className="absolute top-2 right-2 grid grid-cols-2 gap-1.5">
                {app.folderApps?.slice(0, 4).map((folderApp, index) => {
                  const FolderIcon = folderApp.icon
                  return (
                    <div
                      key={index}
                      className={`w-5 h-5 rounded-md ${folderApp.color} flex items-center justify-center shadow-md`}
                    >
                      <FolderIcon className="w-3 h-3 text-white" />
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:brightness-110`}
            >
              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          )}
        </div>

        <div className="text-center space-y-1">
          <h3 className="font-medium text-white text-sm leading-tight drop-shadow-md">{app.name}</h3>
          {app.description && (
            <p className="text-xs text-white/70 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {app.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
