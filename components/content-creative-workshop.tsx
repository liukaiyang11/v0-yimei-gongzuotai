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
  Calendar,
  Tag,
  Clock,
  Check,
  Plus,
  X,
  Type,
  ImageIcon as ImageIconSolid,
  Move,
  ZoomIn,
  ZoomOut,
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
  if (scene === "wechat") {
    return <WeChatMomentsCreation onBack={onBack} />
  } else if (scene === "offline") {
    return <OfflineEventMaterials onBack={onBack} />
  } else {
    return <XiaohongshuCreation onBack={onBack} />
  }
}

function WeChatMomentsCreation({ onBack }: { onBack: () => void }) {
  const [selectedType, setSelectedType] = useState<"event" | "newProject" | "holiday" | "greeting">("event")
  const [generatedPosters, setGeneratedPosters] = useState<number[]>([])
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null)
  const [copywritingVersion, setCopywritingVersion] = useState<"formal" | "personal">("formal")
  const [highlights, setHighlights] = useState<string[]>(["1v1设计", "现场折扣"])
  const [newHighlight, setNewHighlight] = useState("")

  const handleGenerate = () => {
    setGeneratedPosters([1, 2, 3, 4])
    setSelectedPoster(1)
  }

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()])
      setNewHighlight("")
    }
  }

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const formalCopywriting = `🎉【重磅活动】幼态脸打造专场来啦！

亲爱的朋友们，我们诊所本月将举办"幼态脸打造"专场活动，特邀资深医美专家现场坐诊！

📅 活动时间：2025年1月15日 14:00-18:00
📍 活动地点：XX医美诊所（朝阳区xxx路xxx号）

✨ 活动亮点：
• 1v1专属设计方案
• 现场享受特别折扣
• 专家面对面咨询
• 精美伴手礼赠送

💝 限时优惠：前20名预约享8折优惠！

扫描海报二维码即可预约，名额有限，先到先得！

#医美活动 #幼态脸 #变美计划 #专家坐诊`

  const personalCopywriting = `姐妹们！重磅消息来啦！🎊

我们诊所要办"幼态脸打造"专场活动啦～这次请来的专家真的超厉害，我自己之前就是找他做的，效果绝了！💕

📅 时间：1月15日下午2点-6点
📍 地点：XX医美诊所（朝阳区那边）

这次活动真的太划算了：
✅ 一对一设计方案（平时要排队的！）
✅ 现场有折扣（具体多少到时候问）
✅ 可以直接跟专家面聊
✅ 还有小礼物拿～

前20个预约的姐妹有8折！！我已经帮闺蜜约上了😎

想去的赶紧扫海报上的码，手慢无！

有问题随时问我～

#变美 #医美 #幼态脸 #姐妹们冲`

  return (
    <div className="h-full flex">
      {/* Left Column: Template Selection & Content Input */}
      <div className="w-80 bg-slate-800/50 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Button variant="ghost" onClick={onBack} className="w-full justify-start text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回场景选择
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Template Type Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">选择模板类型</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType("event")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedType === "event"
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">活动海报</span>
                  {selectedType === "event" && <Check className="w-4 h-4 ml-auto text-green-400" />}
                </button>
                <button
                  onClick={() => setSelectedType("newProject")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedType === "newProject"
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">项目上新</span>
                  {selectedType === "newProject" && <Check className="w-4 h-4 ml-auto text-green-400" />}
                </button>
                <button
                  onClick={() => setSelectedType("holiday")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedType === "holiday"
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Tag className="w-5 h-5" />
                  <span className="font-medium">节日祝福</span>
                  {selectedType === "holiday" && <Check className="w-4 h-4 ml-auto text-green-400" />}
                </button>
                <button
                  onClick={() => setSelectedType("greeting")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedType === "greeting"
                      ? "bg-green-500/20 border border-green-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">早晚安图</span>
                  {selectedType === "greeting" && <Check className="w-4 h-4 ml-auto text-green-400" />}
                </button>
              </div>
            </div>

            {/* Dynamic Form Area */}
            {selectedType === "event" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    活动主题 <span className="text-red-400">*</span>
                  </label>
                  <Input placeholder="例如：幼态脸打造专场" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">主讲人（选填）</label>
                  <Input placeholder="例如：李医生" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">时间</label>
                  <Input type="datetime-local" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">地点</label>
                  <Input placeholder="例如：XX医美诊所" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">核心亮点</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {highlights.map((highlight, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-500/20 text-green-300 border border-green-500/30 pr-1"
                      >
                        {highlight}
                        <button
                          onClick={() => removeHighlight(index)}
                          className="ml-1 hover:bg-green-500/30 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addHighlight()}
                      placeholder="添加亮点标签"
                      className="bg-slate-700/50 border-slate-600 text-white flex-1"
                    />
                    <Button onClick={addHighlight} size="icon" className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">上传主图</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">点击或拖拽上传图片</p>
                    <p className="text-xs text-slate-500 mt-1">支持 JPG、PNG，建议尺寸 1080x1080</p>
                  </div>
                </div>
              </div>
            )}

            {selectedType === "newProject" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    项目名称 <span className="text-red-400">*</span>
                  </label>
                  <Input placeholder="例如：超声刀紧致提升" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">项目卖点</label>
                  <Textarea
                    placeholder="例如：无创紧致、即刻见效、持久抗衰"
                    className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">优惠信息</label>
                  <Input placeholder="例如：首次体验8折" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>
              </div>
            )}

            {selectedType === "holiday" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">节日类型</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                    <option>春节</option>
                    <option>情人节</option>
                    <option>妇女节</option>
                    <option>母亲节</option>
                    <option>中秋节</option>
                    <option>圣诞节</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">祝福语</label>
                  <Textarea
                    placeholder="自定义祝福语，留空则使用AI生成"
                    className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {selectedType === "greeting" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">问候类型</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                    <option>早安</option>
                    <option>晚安</option>
                    <option>午安</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">风格</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                    <option>温馨治愈</option>
                    <option>励志正能量</option>
                    <option>简约文艺</option>
                    <option>可爱俏皮</option>
                  </select>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              智能生成海报与文案
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Middle Column: Poster Preview & Selection */}
      <div className="flex-1 bg-slate-900/50 p-6">
        <ScrollArea className="h-full">
          {generatedPosters.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg mb-2">等待生成海报</p>
                <p className="text-slate-500 text-sm">填写左侧表单后点击"智能生成"</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Preview */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">主预览</h3>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 border-2 border-green-500/50">
                  <img
                    src={`/wechat-moments-poster-event-${selectedPoster}.jpg?height=800&width=600&query=wechat moments medical beauty event poster ${selectedPoster}`}
                    alt="主预览海报"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Alternative Options */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">备选方案</h3>
                <div className="grid grid-cols-3 gap-4">
                  {generatedPosters.map((id) => (
                    <div
                      key={id}
                      onClick={() => setSelectedPoster(id)}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedPoster === id
                          ? "ring-2 ring-green-500 scale-105"
                          : "hover:scale-102 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={`/wechat-moments-poster-event-${id}.jpg?height=400&width=300&query=wechat moments medical beauty event poster ${id}`}
                        alt={`方案 ${id}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedPoster === id && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          当前
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Column: Copywriting & Export */}
      <div className="w-96 bg-slate-800/50 border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">配套朋友圈文案</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => setCopywritingVersion("formal")}
              className={`flex-1 ${
                copywritingVersion === "formal"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-slate-700/50 hover:bg-slate-700 text-slate-300"
              }`}
            >
              正式版
            </Button>
            <Button
              onClick={() => setCopywritingVersion("personal")}
              className={`flex-1 ${
                copywritingVersion === "personal"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-slate-700/50 hover:bg-slate-700 text-slate-300"
              }`}
            >
              顾问个人版
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {/* Copywriting Content */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">
                  {copywritingVersion === "formal" ? "正式版文案" : "顾问个人版文案"}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-green-400 hover:text-green-300 hover:bg-green-500/10"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  一键复制文案
                </Button>
              </div>
              <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {copywritingVersion === "formal" ? formalCopywriting : personalCopywriting}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-blue-400 mb-1">文案建议</p>
                  <p className="text-xs text-slate-400">
                    正式版适合机构官方账号发布，顾问个人版更适合个人朋友圈，语气更亲切自然。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Bottom Action Buttons */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
            <Download className="w-4 h-4 mr-2" />
            下载海报
          </Button>
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  )
}

function OfflineEventMaterials({ onBack }: { onBack: () => void }) {
  const [materialType, setMaterialType] = useState<"poster" | "rollup" | "flyer">("poster")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedElement, setSelectedElement] = useState<"text" | "image" | null>(null)

  const templates = {
    poster: [
      { id: 1, name: "专家坐诊风", thumbnail: "/poster-template-1.jpg" },
      { id: 2, name: "科技感", thumbnail: "/poster-template-2.jpg" },
      { id: 3, name: "温馨促销风", thumbnail: "/poster-template-3.jpg" },
      { id: 4, name: "高端奢华", thumbnail: "/poster-template-4.jpg" },
    ],
    rollup: [
      { id: 1, name: "简约商务", thumbnail: "/rollup-template-1.jpg" },
      { id: 2, name: "活力时尚", thumbnail: "/rollup-template-2.jpg" },
      { id: 3, name: "专业医疗", thumbnail: "/rollup-template-3.jpg" },
      { id: 4, name: "优雅高级", thumbnail: "/rollup-template-4.jpg" },
    ],
    flyer: [
      { id: 1, name: "双面宣传", thumbnail: "/flyer-template-1.jpg" },
      { id: 2, name: "优惠券式", thumbnail: "/flyer-template-2.jpg" },
      { id: 3, name: "项目介绍", thumbnail: "/flyer-template-3.jpg" },
      { id: 4, name: "活动邀请", thumbnail: "/flyer-template-4.jpg" },
    ],
  }

  const currentTemplates = templates[materialType]

  const materialSizes = {
    poster: "60x90cm",
    rollup: "80x200cm",
    flyer: "A4 (21x29.7cm)",
  }

  return (
    <div className="h-full flex">
      {/* Left Column: Material Type & Template Library */}
      <div className="w-80 bg-slate-800/50 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Button variant="ghost" onClick={onBack} className="w-full justify-start text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回场景选择
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Material Type Selector */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">选择物料类型</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setMaterialType("poster")
                    setSelectedTemplate(null)
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                    materialType === "poster"
                      ? "bg-blue-500/20 border-2 border-blue-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <FileText className="w-8 h-8" />
                  <span className="text-xs font-medium">海报</span>
                </button>
                <button
                  onClick={() => {
                    setMaterialType("rollup")
                    setSelectedTemplate(null)
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                    materialType === "rollup"
                      ? "bg-blue-500/20 border-2 border-blue-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs font-medium">易拉宝</span>
                </button>
                <button
                  onClick={() => {
                    setMaterialType("flyer")
                    setSelectedTemplate(null)
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                    materialType === "flyer"
                      ? "bg-blue-500/20 border-2 border-blue-500/50 text-white"
                      : "bg-slate-700/30 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50"
                  }`}
                >
                  <FileText className="w-8 h-8" />
                  <span className="text-xs font-medium">宣传单</span>
                </button>
              </div>
            </div>

            {/* Template Library */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">模板库</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentTemplates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-blue-500 scale-105"
                        : "hover:scale-102 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`/${materialType}-template-${template.id}.jpg?height=400&width=300&query=${materialType} template ${template.name}`}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-xs font-medium text-white">{template.name}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Middle Column: Canvas & Real-time Editing */}
      <div className="flex-1 bg-slate-900/50 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">设计画布</h3>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-slate-400">100%</span>
            <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {selectedTemplate === null ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Palette className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg mb-2">选择模板开始设计</p>
                <p className="text-slate-500 text-sm">从左侧模板库中选择一个模板</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-full p-8">
              <div
                className={`relative bg-white rounded-lg shadow-2xl ${
                  materialType === "rollup"
                    ? "aspect-[2/5]"
                    : materialType === "flyer"
                      ? "aspect-[1/1.414]"
                      : "aspect-[2/3]"
                } ${materialType === "rollup" ? "h-[600px]" : "h-[500px]"}`}
              >
                <img
                  src={`/${materialType}-template-${selectedTemplate}.jpg?height=800&width=600&query=${materialType} design template editable`}
                  alt="设计画布"
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Editable Elements Overlay */}
                <div className="absolute inset-0">
                  {/* Example editable text element */}
                  <div
                    onClick={() => setSelectedElement("text")}
                    className={`absolute top-[10%] left-[10%] right-[10%] p-4 cursor-move ${
                      selectedElement === "text" ? "ring-2 ring-blue-500" : "hover:ring-2 hover:ring-blue-300"
                    }`}
                  >
                    <h2 className="text-2xl font-bold text-center">双击编辑标题</h2>
                  </div>
                  {/* Example editable image element */}
                  <div
                    onClick={() => setSelectedElement("image")}
                    className={`absolute top-[30%] left-[20%] right-[20%] aspect-video bg-slate-200 rounded cursor-move ${
                      selectedElement === "image" ? "ring-2 ring-blue-500" : "hover:ring-2 hover:ring-blue-300"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIconSolid className="w-12 h-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Column: Element Properties & Export */}
      <div className="w-96 bg-slate-800/50 border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">图层与属性</h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Global Settings */}
            {selectedElement === null && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">整体尺寸</label>
                  <Input
                    value={materialSizes[materialType]}
                    readOnly
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">背景颜色</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-600 cursor-pointer"></div>
                    <Input defaultValue="#FFFFFF" className="flex-1 bg-slate-700/50 border-slate-600 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Text Element Properties */}
            {selectedElement === "text" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">文本属性</span>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">文本内容</label>
                  <Textarea
                    defaultValue="双击编辑标题"
                    className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">字体</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                    <option>思源黑体</option>
                    <option>思源宋体</option>
                    <option>阿里巴巴普惠体</option>
                    <option>站酷高端黑</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">字号</label>
                    <Input type="number" defaultValue="24" className="bg-slate-700/50 border-slate-600 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">颜色</label>
                    <Input type="color" defaultValue="#000000" className="bg-slate-700/50 border-slate-600 h-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">样式</label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      <strong>B</strong>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      <em>I</em>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      <u>U</u>
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">对齐方式</label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      左对齐
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      居中
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-slate-700/50 border-slate-600">
                      右对齐
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Image Element Properties */}
            {selectedElement === "image" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIconSolid className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">图片属性</span>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">替换图片</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">点击上传新图片</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">裁剪</label>
                  <Button className="w-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600">
                    <Move className="w-4 h-4 mr-2" />
                    裁剪图片
                  </Button>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">滤镜</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                    <option>无</option>
                    <option>黑白</option>
                    <option>复古</option>
                    <option>鲜艳</option>
                    <option>柔和</option>
                  </select>
                </div>
              </div>
            )}

            {/* Core Content Form */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white">核心内容填写</h4>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">主标题</label>
                <Input placeholder="例如：幼态脸打造专场" className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">副标题</label>
                <Input placeholder="例如：专家坐诊 限时优惠" className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">活动时间</label>
                <Input type="datetime-local" className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">地址</label>
                <Input placeholder="例如：朝阳区xxx路xxx号" className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">二维码图片</label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg w-24 h-24 flex items-center justify-center hover:border-slate-500 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Export Module */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <h4 className="text-sm font-semibold text-white">导出为打印文件</h4>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">文件格式</label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
              <option>PDF印刷格式</option>
              <option>JPG高清图</option>
              <option>PNG透明背景</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">分辨率</label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
              <option>300 DPI (印刷标准)</option>
              <option>150 DPI (普通打印)</option>
              <option>72 DPI (屏幕显示)</option>
            </select>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3">
            <Download className="w-4 h-4 mr-2" />
            生成并下载
          </Button>
        </div>
      </div>
    </div>
  )
}

function XiaohongshuCreation({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">小红书图文笔记创作</p>
        <p className="text-slate-500 text-sm mt-2">功能开发中...</p>
        <Button onClick={onBack} className="mt-6">
          返回
        </Button>
      </div>
    </div>
  )
}

// Module 3: Brand Center
function BrandCenter() {
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
                <div className="w-16 h-16 rounded-lg bg-blue-500 border-2 border-white/20 cursor-pointer"></div>
                <Input value="#3B82F6" readOnly className="flex-1 bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">辅助色 1</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-purple-500 border-2 border-white/20 cursor-pointer"></div>
                <Input value="#A855F7" readOnly className="flex-1 bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">辅助色 2</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-pink-500 border-2 border-white/20 cursor-pointer"></div>
                <Input value="#EC4899" readOnly className="flex-1 bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Font */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">品牌字体 (Font)</h3>
          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white">
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
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
                <Phone className="w-4 h-4" />
                联系电话
              </label>
              <Input placeholder="例如：400-xxx-xxxx" className="bg-slate-700/50 border-slate-600 text-white" />
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
              <Input placeholder="搜索素材..." className="pl-10 bg-slate-700/50 border-slate-600 text-white w-64" />
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
