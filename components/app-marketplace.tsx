"use client"

import type React from "react"

import { useState } from "react"
import { Search, X, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as LucideIcons from "lucide-react"

interface AppMarketplaceProps {
  onClose: () => void
  onAddApp: (appId: string) => void
  addedApps: string[]
}

// 应用数据类型
interface App {
  id: string
  name: string
  description: string
  icon: keyof typeof LucideIcons
  category: string
  subcategory?: string
}

// 所有应用数据
const allApps: App[] = [
  {
    id: "collaborative-service",
    name: "智能协同服务工作台",
    description: "群聊协同·AI辅助",
    icon: "Users",
    category: "featured",
  },
  {
    id: "ad-compliance",
    name: "医美广告法审核",
    description: "智能合规审核",
    icon: "ShieldCheck",
    category: "featured",
  },
  {
    id: "customer-acquisition",
    name: "精准获客系统",
    description: "视频评论获客",
    icon: "UserSearch",
    category: "featured",
  },
  {
    id: "sales-assistant",
    name: "AI协作助理",
    description: "AI协作智能助手",
    icon: "DollarSign",
    category: "featured",
  },
  {
    id: "doctor-assistant",
    name: "医生专业助手",
    description: "AI医疗助手",
    icon: "Stethoscope",
    category: "featured",
  },
  { id: "marketing-system", name: "精准营销系统", description: "智能营销管理", icon: "Target", category: "featured" },
  {
    id: "xinyang-featured",
    name: "新氧医美",
    description: "医美消费平台",
    icon: "Sparkles",
    category: "featured",
  },
  {
    id: "gengmei-featured",
    name: "更美",
    description: "医美社区平台",
    icon: "Heart",
    category: "featured",
  },
  {
    id: "yuemei-featured",
    name: "悦美",
    description: "医美服务平台",
    icon: "Smile",
    category: "featured",
  },
  {
    id: "meibei-featured",
    name: "美呗医美",
    description: "医美消费社区",
    icon: "Star",
    category: "featured",
  },
  {
    id: "meibei-course-featured",
    name: "美呗课",
    description: "医美在线学习",
    icon: "GraduationCap",
    category: "featured",
  },
  {
    id: "zhihui-circle-featured",
    name: "智慧医美圈",
    description: "医美知识社区",
    icon: "Users",
    category: "featured",
  },
  {
    id: "haozhixue-featured",
    name: "好智学",
    description: "医美培训平台",
    icon: "BookOpen",
    category: "featured",
  },
  {
    id: "perfect-training-featured",
    name: "完美培训",
    description: "医美专业培训",
    icon: "Award",
    category: "featured",
  },
  {
    id: "capa-featured",
    name: "中国整形美容协会",
    description: "行业权威组织",
    icon: "Shield",
    category: "featured",
  },

  {
    id: "ai-ppt",
    name: "AI PPT",
    description: "AI一键生成PPT",
    icon: "FileText",
    category: "office",
    subcategory: "document",
  },
  {
    id: "ppt-outline",
    name: "PPT大纲助手",
    description: "快速生成PPT大纲",
    icon: "List",
    category: "office",
    subcategory: "document",
  },
  {
    id: "doc-reader",
    name: "文档阅读器",
    description: "高效阅读文档",
    icon: "BookOpen",
    category: "office",
    subcategory: "document",
  },
  {
    id: "pdf-tools",
    name: "PDF工具箱",
    description: "在线转换编辑",
    icon: "FileImage",
    category: "office",
    subcategory: "document",
  },
  {
    id: "ai-writing",
    name: "AI写作",
    description: "启发创意灵感",
    icon: "PenTool",
    category: "office",
    subcategory: "document",
  },
  {
    id: "doc-process",
    name: "文档处理",
    description: "高效文档管理",
    icon: "FolderOpen",
    category: "office",
    subcategory: "document",
  },
  {
    id: "text-optimize",
    name: "文本优化",
    description: "智能优化文本",
    icon: "Sparkles",
    category: "office",
    subcategory: "document",
  },
  {
    id: "text-translate",
    name: "文本翻译",
    description: "多语言翻译",
    icon: "Languages",
    category: "office",
    subcategory: "document",
  },
  {
    id: "text-convert",
    name: "文本转换",
    description: "格式转换工具",
    icon: "RefreshCw",
    category: "office",
    subcategory: "document",
  },
  {
    id: "paper-generator",
    name: "论文生成器",
    description: "AI辅助写论文",
    icon: "GraduationCap",
    category: "office",
    subcategory: "document",
  },
  {
    id: "wechat-writer",
    name: "公众号写作助手",
    description: "公众号内容创作",
    icon: "MessageCircle",
    category: "office",
    subcategory: "document",
  },
  {
    id: "collaborative-service-office",
    name: "智能协同服务工作台",
    description: "团队协作平台",
    icon: "Users",
    category: "office",
    subcategory: "collaboration",
  },
  {
    id: "ai-meeting",
    name: "AI会议秘书",
    description: "智能会议记录",
    icon: "MessageSquare",
    category: "office",
    subcategory: "collaboration",
  },
  {
    id: "content-workshop",
    name: "内容创意工坊",
    description: "创意内容生成",
    icon: "Palette",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "ai-drawing",
    name: "AI绘图",
    description: "智能绘图创作",
    icon: "Brush",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "ai-mindmap",
    name: "AI思维导图",
    description: "快速生成导图",
    icon: "Brain",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "smart-image",
    name: "智能图像处理",
    description: "本地运行安全高效",
    icon: "ImageIcon",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "video-tools",
    name: "视频工具",
    description: "视频编辑处理",
    icon: "Video",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "audio-tools",
    name: "音频工具",
    description: "音频编辑处理",
    icon: "Music",
    category: "office",
    subcategory: "presentation",
  },
  {
    id: "mock-interview",
    name: "模拟面试官",
    description: "AI模拟面试",
    icon: "UserCheck",
    category: "office",
    subcategory: "other",
  },
  {
    id: "resume-filter",
    name: "简历筛选",
    description: "智能筛选简历",
    icon: "FileCheck",
    category: "office",
    subcategory: "other",
  },
  {
    id: "weekly-report",
    name: "周报助手",
    description: "快速生成周报",
    icon: "Calendar",
    category: "office",
    subcategory: "other",
  },
  {
    id: "leader-speech",
    name: "领导致辞生成器",
    description: "生成领导讲话稿",
    icon: "Mic",
    category: "office",
    subcategory: "other",
  },
  {
    id: "host-script",
    name: "主持稿生成器",
    description: "生成主持稿",
    icon: "Radio",
    category: "office",
    subcategory: "other",
  },
  {
    id: "financial-analysis",
    name: "财务报表分析",
    description: "智能分析财务数据",
    icon: "TrendingUp",
    category: "office",
    subcategory: "other",
  },
  {
    id: "enterprise-kb",
    name: "企业知识库",
    description: "专业知识管理",
    icon: "Database",
    category: "office",
    subcategory: "other",
  },
  {
    id: "doctor-assistant-office",
    name: "医生专业助手",
    description: "AI医疗助手",
    icon: "Stethoscope",
    category: "office",
    subcategory: "other",
  },
  {
    id: "party-building",
    name: "智慧党建助手",
    description: "党建工作助手",
    icon: "Flag",
    category: "office",
    subcategory: "other",
  },
  { id: "folder", name: "文件夹", description: "文件管理", icon: "Folder", category: "office", subcategory: "other" },
  {
    id: "blessing-generator",
    name: "祝福语生成器",
    description: "生成祝福语",
    icon: "Heart",
    category: "office",
    subcategory: "other",
  },

  // 营销工具
  {
    id: "competitor-analysis",
    name: "竞对分析报告",
    description: "竞争对手分析",
    icon: "BarChart3",
    category: "marketing",
  },
  { id: "decision-cockpit", name: "决策驾驶舱", description: "数据分析决策", icon: "Gauge", category: "marketing" },
  {
    id: "sales-assistant-marketing",
    name: "AI协作助理",
    description: "AI协作智能助手",
    icon: "DollarSign",
    category: "marketing",
  },
  {
    id: "customer-acquisition-marketing",
    name: "精准获客系统",
    description: "视频评论获客",
    icon: "UserSearch",
    category: "marketing",
  },
  {
    id: "marketing-system-marketing",
    name: "精准营销系统",
    description: "智能营销管理",
    icon: "Target",
    category: "marketing",
  },
  { id: "smart-service", name: "智能客服", description: "24小时在线服务", icon: "Headphones", category: "marketing" },
  { id: "brand-planning", name: "品牌策划专家", description: "品牌策划方案", icon: "Award", category: "marketing" },
  {
    id: "product-promotion",
    name: "产品推广文案",
    description: "营销文案生成",
    icon: "Megaphone",
    category: "marketing",
  },
  {
    id: "ad-compliance-marketing",
    name: "医美广告法审核",
    description: "智能合规审核",
    icon: "ShieldCheck",
    category: "marketing",
  },

  // 医美生态 - 消费 & 社区平台
  {
    id: "xinyang",
    name: "新氧医美",
    description: "医美消费平台",
    icon: "Sparkles",
    category: "medical",
    subcategory: "consumer",
  },
  {
    id: "gengmei",
    name: "更美",
    description: "医美社区平台",
    icon: "Heart",
    category: "medical",
    subcategory: "consumer",
  },
  {
    id: "yuemei",
    name: "悦美",
    description: "医美服务平台",
    icon: "Smile",
    category: "medical",
    subcategory: "consumer",
  },
  {
    id: "meibei",
    name: "美呗医美",
    description: "医美消费社区",
    icon: "Star",
    category: "medical",
    subcategory: "consumer",
  },

  // 医美生态 - 学习 & 培训平台
  {
    id: "meibei-course",
    name: "美呗课",
    description: "医美在线学习",
    icon: "GraduationCap",
    category: "medical",
    subcategory: "learning",
  },
  {
    id: "zhihui-circle",
    name: "智慧医美圈",
    description: "医美知识社区",
    icon: "Users",
    category: "medical",
    subcategory: "learning",
  },
  {
    id: "haozhixue",
    name: "好智学",
    description: "医美培训平台",
    icon: "BookOpen",
    category: "medical",
    subcategory: "learning",
  },
  {
    id: "perfect-training",
    name: "完美培训",
    description: "医美专业培训",
    icon: "Award",
    category: "medical",
    subcategory: "learning",
  },

  // 医美生态 - 医美管理系统 (SaaS)
  {
    id: "lingjian",
    name: "领健",
    description: "医美管理系统",
    icon: "Building2",
    category: "medical",
    subcategory: "saas",
  },
  {
    id: "hongmai",
    name: "宏脉软件",
    description: "医美SaaS平台",
    icon: "Network",
    category: "medical",
    subcategory: "saas",
  },
  {
    id: "meiwen",
    name: "美问科技",
    description: "医美智能管理",
    icon: "Cpu",
    category: "medical",
    subcategory: "saas",
  },
  {
    id: "meikela",
    name: "美克拉",
    description: "医美运营系统",
    icon: "Settings",
    category: "medical",
    subcategory: "saas",
  },
  {
    id: "meixiutong",
    name: "美秀通",
    description: "医美管理软件",
    icon: "Smartphone",
    category: "medical",
    subcategory: "saas",
  },
  {
    id: "boka",
    name: "博卡软件",
    description: "医美信息化系统",
    icon: "Monitor",
    category: "medical",
    subcategory: "saas",
  },

  // 医美生态 - 行业协会
  {
    id: "capa",
    name: "中国整形美容协会",
    description: "行业权威组织",
    icon: "Shield",
    category: "medical",
    subcategory: "association",
  },
]

export function AppMarketplace({ onClose, onAddApp, addedApps }: AppMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"featured" | "office" | "marketing" | "medical">("featured")
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  // 过滤应用
  const filteredApps = allApps.filter((app) => {
    // 搜索过滤
    if (searchQuery) {
      return (
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 分类过滤
    if (activeTab === "medical" || activeTab === "office") {
      return app.category === activeTab && (!activeSubcategory || app.subcategory === activeSubcategory)
    }

    return app.category === activeTab
  })

  const officeSubcategories = [
    { id: "document", name: "文档处理" },
    { id: "presentation", name: "演示工具" },
    { id: "collaboration", name: "协作工具" },
    { id: "other", name: "其他工具" },
  ]

  // 医美生态的二级分类
  const medicalSubcategories = [
    { id: "consumer", name: "消费 & 社区平台" },
    { id: "learning", name: "学习 & 培训平台" },
    { id: "saas", name: "医美管理系统 (SaaS)" },
    { id: "association", name: "行业协会" },
  ]

  const showLeftSidebar = activeTab === "office" || activeTab === "medical"
  const showSubcategories = activeTab === "office" || activeTab === "medical"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景模糊层 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      {/* 悬浮窗口 */}
      <div className="relative w-[80vw] h-[85vh] bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col animate-in fade-in zoom-in duration-300">
        {/* 顶部搜索栏 */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="搜索应用或小组件"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-slate-700/50 border-slate-600 rounded-full text-white placeholder:text-slate-400"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-4 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* 主分类导航 */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
          <Button
            variant={activeTab === "featured" ? "default" : "ghost"}
            onClick={() => {
              setActiveTab("featured")
              setActiveSubcategory(null)
            }}
            className={`rounded-full ${activeTab === "featured" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
          >
            精选
          </Button>
          <Button
            variant={activeTab === "office" ? "default" : "ghost"}
            onClick={() => {
              setActiveTab("office")
              setActiveSubcategory("document")
            }}
            className={`rounded-full ${activeTab === "office" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
          >
            办公通用
          </Button>
          <Button
            variant={activeTab === "marketing" ? "default" : "ghost"}
            onClick={() => {
              setActiveTab("marketing")
              setActiveSubcategory(null)
            }}
            className={`rounded-full ${activeTab === "marketing" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
          >
            营销工具
          </Button>
          <Button
            variant={activeTab === "medical" ? "default" : "ghost"}
            onClick={() => {
              setActiveTab("medical")
              setActiveSubcategory("consumer")
            }}
            className={`rounded-full ${activeTab === "medical" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
          >
            医美生态
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* 左侧导航 - 仅在办公通用和医美生态时显示 */}
          {showLeftSidebar && (
            <div className="w-64 border-r border-white/10 bg-slate-900/30">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-1">
                  {activeTab === "office" &&
                    officeSubcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => setActiveSubcategory(subcategory.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          activeSubcategory === subcategory.id
                            ? "bg-slate-700 text-white"
                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}

                  {activeTab === "medical" &&
                    medicalSubcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => setActiveSubcategory(subcategory.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          activeSubcategory === subcategory.id
                            ? "bg-slate-700 text-white"
                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* 右侧应用卡片网格 */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  {filteredApps.map((app) => {
                    const IconComponent = LucideIcons[app.icon] as React.ComponentType<{ className?: string }>
                    const isAdded = addedApps.includes(app.id)

                    return (
                      <div
                        key={app.id}
                        className="group relative bg-slate-700/30 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/5"
                      >
                        <div className="flex flex-col items-center text-center space-y-4">
                          {/* 应用图标 */}
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>

                          {/* 应用名称 */}
                          <h3 className="font-semibold text-white text-sm leading-tight">{app.name}</h3>

                          {/* 功能描述 */}
                          <p className="text-xs text-slate-400 line-clamp-2">{app.description}</p>

                          {/* 添加按钮 */}
                          <Button
                            size="sm"
                            onClick={() => onAddApp(app.id)}
                            disabled={isAdded}
                            className={`w-full rounded-full transition-all duration-300 ${
                              isAdded
                                ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                已添加
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-1" />
                                添加
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredApps.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full py-20">
                    <p className="text-slate-400 text-lg">未找到匹配的应用</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
