"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Sparkles,
  FileText,
  ImageIcon,
  Upload,
  Palette,
  Phone,
  MapPin,
  Download,
  Trash2,
  Eye,
  Search,
  Grid3x3,
  List,
  Copy,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ContentCreativeWorkshopProps {
  onBack: () => void
}

export function ContentCreativeWorkshop({ onBack }: ContentCreativeWorkshopProps) {
  const [activeTab, setActiveTab] = useState<"home" | "creation" | "brand" | "materials">("home")

  return (
    <div className="fixed inset-0 left-20 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-slate-400 hover:text-white hover:bg-slate-700 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">医美创意工坊</h1>
              <p className="text-xs text-slate-400">AIGC内容营销平台</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              onClick={() => setActiveTab("home")}
              className={`rounded-full ${activeTab === "home" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
            >
              首页
            </Button>
            <Button
              variant={activeTab === "creation" ? "default" : "ghost"}
              onClick={() => setActiveTab("creation")}
              className={`rounded-full ${activeTab === "creation" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
            >
              创作中心
            </Button>
            <Button
              variant={activeTab === "brand" ? "default" : "ghost"}
              onClick={() => setActiveTab("brand")}
              className={`rounded-full ${activeTab === "brand" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
            >
              品牌中心
            </Button>
            <Button
              variant={activeTab === "materials" ? "default" : "ghost"}
              onClick={() => setActiveTab("materials")}
              className={`rounded-full ${activeTab === "materials" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
            >
              素材库
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "home" && <HomeDashboard />}
        {activeTab === "creation" && <CreationCenter />}
        {activeTab === "brand" && <BrandCenter />}
        {activeTab === "materials" && <MaterialsLibrary />}
      </div>
    </div>
  )
}

// Module 1: Homepage Dashboard
function HomeDashboard() {
  const recentProjects = [
    { id: 1, title: "幼态脸打造海报", thumbnail: "/youthful-face-poster.jpg", time: "2小时前" },
    { id: 2, title: "水光针推广文案", thumbnail: "/hydrafacial-promotion.jpg", time: "5小时前" },
    { id: 3, title: "双十一活动海报", thumbnail: "/double-eleven-event-poster.jpg", time: "1天前" },
    { id: 4, title: "玻尿酸产品介绍", thumbnail: "/hyaluronic-acid-product.jpg", time: "2天前" },
    { id: 5, title: "医美知识科普", thumbnail: "/medical-beauty-education.jpg", time: "3天前" },
  ]

  const inspirationItems = [
    "如何打造高级感医美海报？",
    "小红书爆款标题公式大揭秘",
    "2025年医美营销趋势分析",
    "朋友圈文案撰写技巧",
  ]

  return (
    <ScrollArea className="h-full">
      <div className="p-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold text-white mb-4">您好，欢迎回来！</h2>
          <p className="text-xl text-slate-300 mb-8">今天想创作点什么？</p>

          {/* Quick Entry Buttons */}
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="group relative bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl p-8 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">创作小红书图文</h3>
                <p className="text-slate-300">AI智能生成爆款笔记</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">创建活动海报</h3>
                <p className="text-slate-300">专业设计一键生成</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Creations */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">我最近的创作</h3>
          <div className="grid grid-cols-4 gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-slate-800/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="aspect-video bg-slate-700 relative overflow-hidden">
                  <img
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">{project.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{project.time}</span>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      继续编辑
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data & Inspiration */}
        <div className="grid grid-cols-3 gap-6">
          {/* Data Dashboard */}
          <div className="col-span-2 bg-slate-800/50 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">数据看板</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">本周已创作内容</p>
                <p className="text-3xl font-bold text-white">
                  5<span className="text-lg text-slate-400 ml-1">篇</span>
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">累计获赞（预估）</p>
                <p className="text-3xl font-bold text-white">
                  1.2<span className="text-lg text-slate-400 ml-1">k</span>
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">内容转化率</p>
                <p className="text-3xl font-bold text-white">
                  8.5<span className="text-lg text-slate-400 ml-1">%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Inspiration Library */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">灵感库</h3>
            <div className="space-y-3">
              {inspirationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

// Module 2: Creation Center
function CreationCenter() {
  const [step, setStep] = useState<"select" | "create">("select")
  const [selectedScene, setSelectedScene] = useState<"xiaohongshu" | "wechat" | "offline" | null>(null)

  if (step === "select") {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl font-bold text-white text-center mb-12">选择创作场景</h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Xiaohongshu Scene */}
            <div
              onClick={() => {
                setSelectedScene("xiaohongshu")
                setStep("create")
              }}
              className="group bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">小红书图文笔记</h3>
                <p className="text-slate-300 text-center">生成爆款标题和精美配图，快速打造高质量笔记内容</p>
              </div>
            </div>

            {/* WeChat Scene */}
            <div
              onClick={() => {
                setSelectedScene("wechat")
                setStep("create")
              }}
              className="group bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">微信朋友圈营销</h3>
                <p className="text-slate-300 text-center">创作吸睛朋友圈文案和配图，提升品牌曝光和转化</p>
              </div>
            </div>

            {/* Offline Scene */}
            <div
              onClick={() => {
                setSelectedScene("offline")
                setStep("create")
              }}
              className="group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Palette className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">线下活动物料</h3>
                <p className="text-slate-300 text-center">设计海报、易拉宝、宣传单等线下营销物料</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <CreationWorkspace scene={selectedScene!} onBack={() => setStep("select")} />
}

// Creation Workspace (Three-column layout)
function CreationWorkspace({ scene, onBack }: { scene: "xiaohongshu" | "wechat" | "offline"; onBack: () => void }) {
  const [generatedPosters, setGeneratedPosters] = useState<number[]>([])
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null)
  const [projectName, setProjectName] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [style, setStyle] = useState("自然风")

  const handleGenerate = () => {
    setGeneratedPosters([1, 2, 3, 4])
    setSelectedPoster(1)
  }

  const titles = [
    "🔥 医美小白必看！这些项目让你变美不踩坑",
    "✨ 30岁+女性抗衰指南｜这样做年轻10岁",
    "💡 医美项目避雷｜花最少的钱，做最有效的项目",
    "🌟 医美新手入门｜从零开始的变美之路",
  ]

  const content = `大家好呀～今天来分享一下我的医美心得💕

作为一个医美老司机，经常有姐妹问我：
"第一次做医美，应该选什么项目？"
"怎么避免踩坑？"
"哪些项目性价比高？"

今天就来给大家详细讲讲！👇

【新手友好项目推荐】
1️⃣ 水光针 - 补水保湿，皮肤立刻水嫩
2️⃣ 光子嫩肤 - 改善肤色，提亮肤质
3️⃣ 热玛吉 - 紧致提升，抗衰首选

【避雷指南】
⚠️ 一定要选正规医院
⚠️ 不要贪便宜
⚠️ 术前充分沟通

姐妹们有什么想了解的可以评论区告诉我～

#医美分享 #变美日记 #医美避雷 #新手入门`

  return (
    <div className="h-full flex">
      {/* Left: Smart Input Area */}
      <div className="w-80 bg-slate-800/50 border-r border-white/10 p-6">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            <Button variant="ghost" onClick={onBack} className="w-full justify-start text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回场景选择
            </Button>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">项目名称</label>
              <Input
                placeholder="例如：水光针推广"
                className="bg-slate-700/50 border-slate-600 text-white"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">核心卖点</label>
              <Textarea
                placeholder="例如：深层补水、提亮肤色、改善细纹"
                className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">关键词标签</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {["医美", "水光针", "补水", "提亮", "抗衰"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="添加关键词"
                className="bg-slate-700/50 border-slate-600 text-white"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">风格选择</label>
              <select
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option>自然风</option>
                <option>高级感</option>
                <option>科技感</option>
                <option>温馨风</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">上传案例图片</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">点击或拖拽上传图片</p>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              一键智能生成
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Middle: Poster Preview & Editing Area */}
      <div className="flex-1 bg-slate-900/50 p-6">
        <ScrollArea className="h-full">
          {generatedPosters.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">点击"一键智能生成"开始创作</p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">AI生成方案</h3>
              <div className="grid grid-cols-2 gap-4">
                {generatedPosters.map((id) => (
                  <div
                    key={id}
                    onClick={() => setSelectedPoster(id)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedPoster === id ? "ring-4 ring-blue-500 scale-105" : "hover:scale-102"
                    }`}
                  >
                    <img
                      src={`/medical-beauty-poster-design-.jpg?height=600&width=450&query=medical beauty poster design ${id}`}
                      alt={`方案 ${id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedPoster === id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        已选中
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right: AI Copywriting Area */}
      <div className="w-96 bg-slate-800/50 border-l border-white/10 p-6">
        <ScrollArea className="h-full">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">AI文案生成</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    标题
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    正文
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-lg p-3 group hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-white flex-1">{title}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">完整正文</h3>
                <Button size="sm" variant="ghost" className="text-xs">
                  <Copy className="w-3 h-3 mr-1" />
                  复制
                </Button>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{content}</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-yellow-500 mb-1">合规提示</p>
                  <p className="text-xs text-slate-300">
                    检测到可能违规词语：<span className="text-yellow-400 underline">医美老司机</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

// Module 3: Brand Center
function BrandCenter() {
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [secondaryColor1, setSecondaryColor1] = useState("#A855F7")
  const [secondaryColor2, setSecondaryColor2] = useState("#EC4899")
  const [selectedFont, setSelectedFont] = useState("思源黑体 (Source Han Sans)")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  return (
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <h2 className="text-2xl font-bold text-white">品牌设置</h2>

        {/* Logo Upload */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">品牌标识 (Logo)</h3>
          <div className="flex items-start gap-6">
            <div className="border-2 border-dashed border-slate-600 rounded-lg w-48 h-48 flex items-center justify-center hover:border-slate-500 transition-colors cursor-pointer">
              <div className="text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">上传Logo</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300 mb-2">要求：</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• 格式：PNG（支持透明背景）</li>
                <li>• 尺寸：500x500px 或更高</li>
                <li>• 大小：不超过 2MB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Colors */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">品牌色彩 (Color Palette)</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">主色</label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">辅助色 1</label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                  style={{ backgroundColor: secondaryColor1 }}
                ></div>
                <Input
                  value={secondaryColor1}
                  onChange={(e) => setSecondaryColor1(e.target.value)}
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">辅助色 2</label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                  style={{ backgroundColor: secondaryColor2 }}
                ></div>
                <Input
                  value={secondaryColor2}
                  onChange={(e) => setSecondaryColor2(e.target.value)}
                  className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Font */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">品牌字体 (Font)</h3>
          <select
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white"
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
          >
            <option>思源黑体 (Source Han Sans)</option>
            <option>思源宋体 (Source Han Serif)</option>
            <option>阿里巴巴普惠体</option>
            <option>站酷高端黑</option>
          </select>
        </div>

        {/* Contact Information */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">预设联系信息</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                机构地址
              </label>
              <Input
                placeholder="例如：北京市朝阳区xxx路xxx号"
                className="bg-slate-700/50 border-slate-600 text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                联系电话
              </label>
              <Input
                placeholder="例如：400-xxx-xxxx"
                className="bg-slate-700/50 border-slate-600 text-white"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">微信二维码</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg w-32 h-32 flex items-center justify-center hover:border-slate-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">上传二维码</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 p-4 -mx-8">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3">
            保存设置
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

// Module 4: Materials Library
function MaterialsLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "全部素材" },
    { id: "doctors", name: "医生团队" },
    { id: "facilities", name: "环境设施" },
    { id: "equipment", name: "设备仪器" },
    { id: "cases", name: "术前术后案例" },
    { id: "general", name: "通用素材" },
  ]

  const materials = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `素材_${i + 1}.jpg`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
    thumbnail: `/placeholder.svg?height=300&width=400&query=medical beauty material ${i + 1}`,
  }))

  return (
    <div className="h-full flex">
      {/* Left: Category Tree */}
      <div className="w-64 bg-slate-800/50 border-r border-white/10 p-4">
        <h3 className="text-sm font-semibold text-white mb-4">分类筛选</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Materials Display */}
      <div className="flex-1 flex flex-col">
        {/* Operation Bar */}
        <div className="bg-slate-800/50 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              上传素材
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索素材..."
                className="pl-10 bg-slate-700/50 border-slate-600 text-white w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-slate-700" : ""}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-slate-700" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Materials Grid */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className={viewMode === "grid" ? "grid grid-cols-4 gap-4" : "space-y-2"}>
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="group relative bg-slate-800/50 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="aspect-[4/3] bg-slate-700 relative overflow-hidden">
                        <img
                          src={material.thumbnail || "/placeholder.svg"}
                          alt={material.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-white truncate">{material.name}</p>
                        <p className="text-xs text-slate-400">{material.category}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-4 p-3">
                      <div className="w-16 h-16 bg-slate-700 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={material.thumbnail || "/placeholder.svg"}
                          alt={material.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{material.name}</p>
                        <p className="text-xs text-slate-400">{material.category}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
