"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Search,
  TrendingUp,
  DollarSign,
  Package,
  Clock,
  Lightbulb,
  ChevronRight,
  Star,
  MessageSquare,
  FileText,
  Stethoscope,
  Plus,
  Save,
  Download,
  Tag,
  Eye,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AICollaborationAssistantProps {
  onBack: () => void
}

const mockProducts = [
  {
    id: 1,
    name: "海蓝之谜精华面霜",
    price: "¥2,680",
    image: "/luxury-cream.jpg",
    recommendLevel: "首要推荐",
    profit: "高利润",
    profitRate: "45%",
    stock: 85,
    stockLevel: "充足",
    expiryDays: 180,
    reason: "客户偏好高端护肤，此产品匹配度极高",
    salesPoints: ["深海精萃，修复肌肤屏障", "适合干性敏感肌", "明星产品，复购率高"],
    faqs: [
      { q: "这款产品适合什么肤质？", a: "特别适合干性和敏感性肌肤，能够深层滋养修复。" },
      { q: "多久能看到效果？", a: "一般使用2-4周即可看到明显改善。" },
    ],
    combos: [
      { name: "海蓝之谜眼霜", price: "¥1,580" },
      { name: "海蓝之谜精华液", price: "¥3,200" },
    ],
  },
  {
    id: 2,
    name: "雅诗兰黛小棕瓶精华",
    price: "¥1,280",
    image: "/serum-bottle.jpg",
    recommendLevel: "强烈推荐",
    profit: "中利润",
    profitRate: "35%",
    stock: 45,
    stockLevel: "适中",
    expiryDays: 90,
    reason: "库存适中，需加快周转",
    salesPoints: ["修复肌肤，抗初老", "适合25-35岁年龄段", "口碑产品，信任度高"],
    faqs: [
      { q: "可以和其他产品一起使用吗？", a: "可以，建议在爽肤水后、面霜前使用。" },
      { q: "孕妇可以使用吗？", a: "建议孕期咨询医生后使用。" },
    ],
    combos: [
      { name: "雅诗兰黛眼霜", price: "¥680" },
      { name: "雅诗兰黛面霜", price: "¥980" },
    ],
  },
  {
    id: 3,
    name: "SK-II神仙水",
    price: "¥1,690",
    image: "/toner-bottle.jpg",
    recommendLevel: "推荐",
    profit: "高利润",
    profitRate: "42%",
    stock: 15,
    stockLevel: "偏低",
    expiryDays: 60,
    reason: "库存偏低且临期，建议优先推荐",
    salesPoints: ["Pitera精华，改善肤质", "适合多种肤质", "日本进口，品质保证"],
    faqs: [
      { q: "神仙水的主要功效是什么？", a: "主要改善肤质，提亮肤色，平衡水油。" },
      { q: "敏感肌可以用吗？", a: "建议先在耳后测试，无过敏反应后使用。" },
    ],
    combos: [
      { name: "SK-II面膜", price: "¥1,280" },
      { name: "SK-II精华乳", price: "¥1,480" },
    ],
  },
]

const mockChatHistory = [
  { role: "customer", name: "张女士", time: "14:23", message: "你好，我想咨询一下抗衰老的项目" },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:24",
    message: "您好张女士！很高兴为您服务。请问您主要关注面部哪个部位的抗衰老呢？",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:25",
    message: "主要是法令纹比较明显，还有一些细纹。我今年28岁，感觉皮肤状态下降得比较快",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:26",
    message:
      "理解您的担忧。28岁开始抗衰是很好的时机。针对法令纹，我们有几种方案：热玛吉、超声刀、水光针等。您之前有了解过这些项目吗？",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:27",
    message: "听说过热玛吉和超声刀，但是不太了解具体效果。我比较担心恢复期的问题，因为工作比较忙",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:28",
    message:
      "完全理解。热玛吉和超声刀都是无创项目，基本没有恢复期，做完就可以正常工作生活。热玛吉主要通过射频能量刺激胶原蛋白再生，效果可以维持1-2年",
  },
  { role: "customer", name: "张女士", time: "14:29", message: "听起来不错。那会不会很疼？我比较怕疼" },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:30",
    message:
      "热玛吉治疗过程中会有一定的热感，但我们会根据您的耐受度调整能量。大部分客户都能接受，如果特别敏感也可以敷麻药",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:31",
    message: "那价格大概是多少呢？我预算在5000左右",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:33",
    message:
      "热玛吉全脸的价格一般在8000-15000之间。如果预算在5000元左右，我建议您可以考虑水光针+肉毒素的组合方案，效果也很好",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:34",
    message: "水光针和肉毒素有什么区别？会不会有副作用？",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:35",
    message:
      "水光针主要是补水保湿，改善肤质；肉毒素是放松肌肉，减少动态纹。两者结合效果更好。副作用方面，只要选择正规产品和专业医生操作，是非常安全的",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:37",
    message: "好的，我再考虑一下。对了，我皮肤比较敏感，经常会泛红，这种情况能做吗？",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:38",
    message:
      "敏感肌是可以做的，但需要先做皮肤测试。我们会根据您的皮肤状况调整方案。另外，建议您先做好基础的皮肤屏障修复",
  },
  {
    role: "customer",
    name: "张女士",
    time: "14:40",
    message: "明白了。那我想先预约一个面诊，详细了解一下",
  },
  {
    role: "consultant",
    name: "李顾问",
    time: "14:41",
    message: "好的！我这边帮您安排本周五下午3点的面诊，届时我们的专业医生会为您做详细的皮肤检测和方案设计",
  },
]

export function AICollaborationAssistant({ onBack }: AICollaborationAssistantProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [sortBy, setSortBy] = useState("profit")
  const [planItems, setPlanItems] = useState<any[]>([])
  const [planStatus, setPlanStatus] = useState("待沟通")

  const [expandedConcerns, setExpandedConcerns] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState(false)
  const [expandedHabits, setExpandedHabits] = useState(false)

  const [showChatHistory, setShowChatHistory] = useState(false)
  const [showSavePlanDialog, setShowSavePlanDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)

  const [leftWidth, setLeftWidth] = useState(320) // 初始宽度 320px (w-80)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = e.clientX - containerRect.left - 80 // 减去左侧sidebar的80px

      // 限制最小和最大宽度
      if (newWidth >= 240 && newWidth <= 600) {
        setLeftWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortBy === "profit") {
      return Number.parseFloat(b.profitRate) - Number.parseFloat(a.profitRate)
    }
    return 0
  })

  const addToPlan = (product: any) => {
    const newItem = {
      id: Date.now(),
      name: product.name,
      price: product.price,
      quantity: 1,
      frequency: "每日1次",
      notes: "",
      phase: "第一阶段",
      reasoning:
        "根据客户28岁年龄段和敏感肌特点，此产品能够温和修复皮肤屏障，改善法令纹问题。客户偏好高端护肤品，此产品匹配度高。",
      customerNeed: "改善法令纹、敏感肌修复",
      expectedEffect: "2-4周内改善肤质，减淡细纹",
      precautions: "敏感肌需先做皮肤测试，建议从小剂量开始使用",
    }
    setPlanItems([...planItems, newItem])
  }

  const removeFromPlan = (id: number) => {
    setPlanItems(planItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return planItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace(/[¥,]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  const handleSavePlan = () => {
    setShowSavePlanDialog(true)
    // 模拟保存操作
    setTimeout(() => {
      setShowSavePlanDialog(false)
    }, 2000)
  }

  const handleGenerateReport = () => {
    setShowReportDialog(true)
  }

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50">
      {/* 顶部导航栏 */}
      <div className="h-16 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center px-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="ml-4 flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-blue-400" />
          <h1 className="text-lg font-semibold text-white">AI协作助理</h1>
        </div>
      </div>

      <div ref={containerRef} className="flex h-[calc(100vh-4rem)]">
        {/* 左侧栏 - 客户信息中心 (可调整宽度) */}
        <div
          style={{ width: `${leftWidth}px` }}
          className="border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm flex-shrink-0"
        >
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="搜索客户..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* 客户基本画像 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">张女士</h3>
                      <p className="text-sm text-slate-400">28岁</p>
                    </div>
                    <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">干性敏感肌</Badge>
                  </div>
                </div>
              </Card>

              {/* 关键数据统计 */}
              <div className="space-y-3">
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">历史消费总额</span>
                    <span className="text-lg font-semibold text-white">¥28,650</span>
                  </div>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">购买频率</span>
                    <span className="text-lg font-semibold text-white">2.3次/月</span>
                  </div>
                </Card>
              </div>

              {/* 品类偏好分析 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h4 className="text-sm font-semibold text-white mb-3">品类偏好</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">面霜</span>
                      <span className="text-slate-300">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">精华</span>
                      <span className="text-slate-300">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">眼霜</span>
                      <span className="text-slate-300">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* 近期购买/服务记录 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h4 className="text-sm font-semibold text-white mb-3">近期购买记录</h4>
                <div className="space-y-2">
                  {["海蓝之谜面霜", "雅诗兰黛精华", "SK-II神仙水"].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>

        <div
          className="w-1 bg-slate-700/50 hover:bg-blue-500/50 cursor-col-resize flex items-center justify-center group transition-colors relative"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-y-0 -left-1 -right-1" />
          <GripVertical className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
        </div>

        {/* 右侧主区域 - 核心功能工作台 (Tab切换) */}
        <div className="flex-1 bg-slate-900/30 overflow-hidden">
          <Tabs defaultValue="consultation" className="h-full flex flex-col">
            <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-6 flex-shrink-0">
              <TabsList className="bg-transparent h-14">
                <TabsTrigger
                  value="consultation"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  咨询沟通纪要
                </TabsTrigger>
                <TabsTrigger
                  value="recommendation"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <Star className="w-4 h-4 mr-2" />
                  智能推荐
                </TabsTrigger>
                <TabsTrigger
                  value="plan"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  医生定制方案
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: 咨询沟通纪要 */}
            <TabsContent value="consultation" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* AI核心诉求标签 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-blue-400" />
                      AI核心诉求标签
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["#抗衰老", "#改善法令纹", "#皮肤屏障修复", "#预算5000内", "#无创项目", "#快速见效"].map(
                        (tag, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                            {tag}
                          </Badge>
                        ),
                      )}
                    </div>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                      AI聊天摘要
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-blue-300 mb-2">客户基本情况</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          客户张女士，28岁，主要关注面部抗衰老问题，特别是法令纹的改善。她表示皮肤较为敏感，经常出现泛红现象，需要特别注意产品和项目的温和性。
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-2">核心需求分析</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          客户希望选择温和且有效的治疗方案，预算控制在5000元以内。倾向于无创或微创项目，特别强调不希望有明显的恢复期，因为工作较忙。对疼痛比较敏感，需要在治疗过程中特别关注舒适度。
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-purple-300 mb-2">项目兴趣点</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          客户对光电类项目（热玛吉、超声刀）表现出浓厚兴趣，但因预算限制更倾向于水光针+肉毒素的组合方案。对项目的安全性和副作用较为关注，需要详细的专业解答来建立信任。
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-orange-300 mb-2">跟进建议</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          建议先安排面诊，进行详细的皮肤检测。针对敏感肌特点，优先推荐温和的基础护理方案，建立皮肤屏障后再考虑进阶治疗。可以准备水光针+肉毒素的详细方案和案例，同时准备敏感肌专用的术后护理产品推荐。
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 客户疑虑点 - Expandable */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">客户疑虑点</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setExpandedConcerns(!expandedConcerns)}
                        >
                          {expandedConcerns ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                      <ul className="space-y-3">
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>恢复期太长</span>
                          </div>
                          {expandedConcerns && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              客户对恢复期非常敏感，工作繁忙无法请假。建议重点推荐无创项目，强调"即做即走"的优势。接受度：
                              <span className="text-green-400 font-semibold">高</span>（如果能保证无恢复期）
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>害怕疼痛</span>
                          </div>
                          {expandedConcerns && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              疼痛敏感度较高，需要在咨询时详细说明麻醉方案和舒适度保障措施。接受度：
                              <span className="text-yellow-400 font-semibold">中等</span>（需要充分沟通）
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>担心副作用</span>
                          </div>
                          {expandedConcerns && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              敏感肌背景导致对副作用格外关注。需要提供详细的安全性数据和成功案例。接受度：
                              <span className="text-yellow-400 font-semibold">中等</span>（需要建立信任）
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>价格是否合理</span>
                          </div>
                          {expandedConcerns && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              预算5000元，对价格较为敏感。建议提供性价比高的组合方案和分期付款选项。接受度：
                              <span className="text-green-400 font-semibold">高</span>（在预算范围内）
                            </div>
                          )}
                        </li>
                      </ul>
                    </Card>

                    {/* 提及产品/项目 - Expandable */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">提及产品/项目</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setExpandedProducts(!expandedProducts)}
                        >
                          {expandedProducts ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                      <ul className="space-y-3">
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>热玛吉</span>
                          </div>
                          {expandedProducts && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              客户对热玛吉表现出较高兴趣，但价格超出预算。意向度：
                              <span className="text-yellow-400 font-semibold">中等</span>
                              ，建议作为升级方案保留，或推荐局部治疗降低价格。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>超声刀</span>
                          </div>
                          {expandedProducts && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              了解程度较浅，主要是听说过。意向度：
                              <span className="text-yellow-400 font-semibold">低-中等</span>
                              ，需要详细介绍与热玛吉的区别和优势。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>水光针</span>
                          </div>
                          {expandedProducts && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              顾问推荐后表现出兴趣，符合预算范围。意向度：
                              <span className="text-green-400 font-semibold">高</span>
                              ，建议作为主推方案，强调补水保湿和改善肤质的效果。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>肉毒素</span>
                          </div>
                          {expandedProducts && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              <span className="text-blue-300 font-semibold">AI分析：</span>
                              与水光针组合推荐，客户接受度良好。意向度：
                              <span className="text-green-400 font-semibold">高</span>
                              ，需要重点说明安全性和针对动态纹的显著效果。
                            </div>
                          )}
                        </li>
                      </ul>
                    </Card>

                    {/* 相关生活习惯 - Expandable */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">相关生活习惯</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setExpandedHabits(!expandedHabits)}
                        >
                          {expandedHabits ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                      <ul className="space-y-3">
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>经常熬夜</span>
                          </div>
                          {expandedHabits && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              熬夜会加速皮肤衰老，影响胶原蛋白生成。建议在方案中加入抗氧化和修复类产品，同时提醒客户改善作息习惯以提升治疗效果。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>工作压力大</span>
                          </div>
                          {expandedHabits && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              压力会导致皮质醇升高，影响皮肤状态。可以推荐舒缓类护理项目，如芳疗按摩、舒缓面膜等，帮助客户放松身心。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>饮食不规律</span>
                          </div>
                          {expandedHabits && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              不规律饮食影响营养吸收和皮肤代谢。建议配合口服美容产品（胶原蛋白、维生素C等）来改善皮肤状态。
                            </div>
                          )}
                        </li>
                        <li className="space-y-2">
                          <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>缺乏运动</span>
                          </div>
                          {expandedHabits && (
                            <div className="ml-6 p-3 bg-slate-900/50 rounded text-xs text-slate-400 leading-relaxed">
                              运动不足导致血液循环不佳，影响皮肤新陈代谢。可以推荐促进循环的护理项目，如淋巴排毒、面部提拉按摩等。
                            </div>
                          )}
                        </li>
                      </ul>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowChatHistory(true)}>
                      <Eye className="w-4 h-4 mr-2" />
                      查看完整聊天记录
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 2: 智能推荐 (保持原有设计) */}
            <TabsContent value="recommendation" className="flex-1 m-0 overflow-hidden">
              <div className="flex h-full">
                {/* 产品推荐列表 */}
                <div className="flex-1 bg-slate-900/30 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      {/* 排序按钮 */}
                      <div className="flex items-center space-x-3">
                        <Button
                          variant={sortBy === "profit" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy("profit")}
                          className={
                            sortBy === "profit"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "border-slate-700 text-slate-300 hover:bg-slate-800"
                          }
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          按利润最高
                        </Button>
                        <Button
                          variant={sortBy === "match" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy("match")}
                          className={
                            sortBy === "match"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "border-slate-700 text-slate-300 hover:bg-slate-800"
                          }
                        >
                          <Star className="w-4 h-4 mr-2" />
                          按匹配度
                        </Button>
                      </div>

                      {/* 产品卡片列表 */}
                      <div className="space-y-4">
                        {sortedProducts.map((product) => (
                          <Card
                            key={product.id}
                            className={`bg-slate-800/50 border-slate-700 p-5 cursor-pointer transition-all hover:bg-slate-800/70 ${
                              selectedProduct.id === product.id ? "ring-2 ring-blue-500" : ""
                            }`}
                            onClick={() => setSelectedProduct(product)}
                          >
                            <div className="flex space-x-4">
                              {/* 产品图片 */}
                              <div className="w-32 h-32 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* 产品信息 */}
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-semibold text-white text-lg">{product.name}</h3>
                                    <p className="text-2xl font-bold text-blue-400 mt-1">{product.price}</p>
                                  </div>
                                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                                    {product.recommendLevel}
                                  </Badge>
                                </div>

                                {/* 数据指标 */}
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-slate-300">{product.profit}</span>
                                    <span className="text-xs text-green-400 font-semibold">{product.profitRate}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Package className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-slate-300">库存: {product.stock}</span>
                                    <div className="w-16">
                                      <Progress
                                        value={product.stock}
                                        className={`h-1.5 ${
                                          product.stock > 60
                                            ? "[&>div]:bg-green-500"
                                            : product.stock > 30
                                              ? "[&>div]:bg-yellow-500"
                                              : "[&>div]:bg-red-500"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock
                                      className={`w-4 h-4 ${product.expiryDays < 90 ? "text-red-400" : "text-slate-400"}`}
                                    />
                                    <span
                                      className={`text-sm ${product.expiryDays < 90 ? "text-red-400" : "text-slate-300"}`}
                                    >
                                      {product.expiryDays}天
                                    </span>
                                  </div>
                                </div>

                                {/* 推荐理由 */}
                                <p className="text-sm text-slate-400 italic">{product.reason}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                {/* 产品详情侧边栏 */}
                <div className="w-96 border-l border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      {/* 产品大图 */}
                      <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-800/50">
                        <img
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 产品名称和价格 */}
                      <div>
                        <h2 className="text-xl font-bold text-white">{selectedProduct.name}</h2>
                        <p className="text-3xl font-bold text-blue-400 mt-2">{selectedProduct.price}</p>
                      </div>

                      {/* 添加到方案按钮 */}
                      <Button
                        onClick={() => addToPlan(selectedProduct)}
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        添加到定制方案
                      </Button>

                      {/* 标签页 */}
                      <Tabs defaultValue="sales" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                          <TabsTrigger value="sales" className="data-[state=active]:bg-blue-500">
                            销售话术
                          </TabsTrigger>
                          <TabsTrigger value="faq" className="data-[state=active]:bg-blue-500">
                            常见问答
                          </TabsTrigger>
                          <TabsTrigger value="combo" className="data-[state=active]:bg-blue-500">
                            推荐搭配
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="sales" className="space-y-3 mt-4">
                          {selectedProduct.salesPoints.map((point, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="faq" className="space-y-4 mt-4">
                          {selectedProduct.faqs.map((faq, index) => (
                            <Card key={index} className="bg-slate-800/50 border-slate-700 p-4">
                              <p className="text-sm font-semibold text-white mb-2">{faq.q}</p>
                              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                            </Card>
                          ))}
                        </TabsContent>

                        <TabsContent value="combo" className="space-y-3 mt-4">
                          {selectedProduct.combos.map((combo, index) => (
                            <Card
                              key={index}
                              className="bg-slate-800/50 border-slate-700 p-4 hover:bg-slate-800/70 cursor-pointer transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-white">{combo.name}</p>
                                  <p className="text-lg font-bold text-blue-400 mt-1">{combo.price}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                              </div>
                            </Card>
                          ))}
                        </TabsContent>
                      </Tabs>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plan" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* 客户需求概览 */}
                  <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-blue-400" />
                      客户核心需求
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">主要诉求：</span>
                        <span className="text-white ml-2">改善法令纹、抗衰老</span>
                      </div>
                      <div>
                        <span className="text-slate-400">皮肤类型：</span>
                        <span className="text-white ml-2">干性敏感肌</span>
                      </div>
                      <div>
                        <span className="text-slate-400">预算范围：</span>
                        <span className="text-white ml-2">¥5,000以内</span>
                      </div>
                      <div>
                        <span className="text-slate-400">特殊要求：</span>
                        <span className="text-white ml-2">无恢复期、温和</span>
                      </div>
                    </div>
                  </Card>

                  {/* 方案构建区 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                        治疗方案构建
                      </h3>
                    </div>

                    {/* 方案时间轴/阶段视图 */}
                    <div className="space-y-4">
                      {/* 第一阶段 */}
                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                            1
                          </div>
                          第一阶段：基础皮肤调理（1-2周）
                        </h4>

                        {planItems.filter((item) => item.phase === "第一阶段").length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-4">暂无项目，请从智能推荐中添加</p>
                        ) : (
                          <div className="space-y-3">
                            {planItems
                              .filter((item) => item.phase === "第一阶段")
                              .map((item) => (
                                <div key={item.id} className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-white">{item.name}</span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => removeFromPlan(item.id)}
                                      className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>

                                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                                    <p className="text-xs text-blue-300 font-semibold mb-1">AI推荐理由</p>
                                    <p className="text-xs text-slate-300 leading-relaxed">{item.reasoning}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-slate-900/50 rounded p-2">
                                      <p className="text-slate-400 mb-1">针对需求</p>
                                      <p className="text-slate-200">{item.customerNeed}</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                      <p className="text-slate-400 mb-1">预期效果</p>
                                      <p className="text-slate-200">{item.expectedEffect}</p>
                                    </div>
                                  </div>

                                  {/* 使用详情 */}
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div>
                                      <label className="text-slate-400">使用频次</label>
                                      <Input
                                        defaultValue={item.frequency}
                                        className="h-7 text-xs bg-slate-900/50 border-slate-700 text-white mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-slate-400">单价</label>
                                      <Input
                                        defaultValue={item.price}
                                        className="h-7 text-xs bg-slate-900/50 border-slate-700 text-white mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-slate-400">数量</label>
                                      <Input
                                        type="number"
                                        defaultValue={item.quantity}
                                        className="h-7 text-xs bg-slate-900/50 border-slate-700 text-white mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-slate-400">小计</label>
                                      <div className="h-7 flex items-center text-blue-400 font-semibold mt-1">
                                        {item.price}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-xs text-slate-400 mb-1 block">注意事项</label>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                                      <p className="text-xs text-yellow-200">{item.precautions}</p>
                                    </div>
                                  </div>

                                  {/* 操作备注 */}
                                  <Textarea
                                    placeholder="添加操作备注和个性化建议..."
                                    className="text-xs bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[60px]"
                                    defaultValue={item.notes}
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      {/* 第二阶段 */}
                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-2">
                            2
                          </div>
                          第二阶段：深度治疗（3-4周）
                        </h4>
                        <p className="text-sm text-slate-400 text-center py-4">
                          暂无项目。建议添加水光针、肉毒素等进阶治疗项目
                        </p>
                      </div>

                      {/* 第三阶段 */}
                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mr-2">
                            3
                          </div>
                          第三阶段：维护巩固（长期）
                        </h4>
                        <p className="text-sm text-slate-400 text-center py-4">暂无项目。建议添加日常护理和维护项目</p>
                      </div>
                    </div>
                  </Card>

                  {/* 费用预算汇总 */}
                  <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">当前方案总费用</p>
                        <p className="text-3xl font-bold text-white">¥{calculateTotal().toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          预算剩余: ¥{(5000 - calculateTotal()).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <DollarSign className="w-12 h-12 text-blue-400 opacity-50 mb-2" />
                        <Badge
                          className={
                            calculateTotal() <= 5000
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                          }
                        >
                          {calculateTotal() <= 5000 ? "预算内" : "超出预算"}
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <div className="flex items-center space-x-3">
                    <Button onClick={handleSavePlan} className="flex-1 bg-blue-500 hover:bg-blue-600">
                      <Save className="w-4 h-4 mr-2" />
                      保存方案
                    </Button>
                    <Button
                      onClick={handleGenerateReport}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      disabled={planItems.length === 0}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      生成方案报告
                    </Button>
                    <Select value={planStatus} onValueChange={setPlanStatus}>
                      <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="待沟通">待沟通</SelectItem>
                        <SelectItem value="已确认">已确认</SelectItem>
                        <SelectItem value="进行中">进行中</SelectItem>
                        <SelectItem value="已完成">已完成</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showChatHistory} onOpenChange={setShowChatHistory}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
                完整聊天记录
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatHistory(false)}
                className="hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {mockChatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === "customer" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[70%] ${
                      message.role === "customer"
                        ? "bg-slate-800/50 border border-slate-700"
                        : "bg-blue-500/20 border border-blue-500/30"
                    } rounded-lg p-4`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`text-xs font-semibold ${
                          message.role === "customer" ? "text-pink-300" : "text-blue-300"
                        }`}
                      >
                        {message.name}
                      </span>
                      <span className="text-xs text-slate-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showSavePlanDialog} onOpenChange={setShowSavePlanDialog}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
              方案保存成功
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-300">治疗方案已成功保存到客户档案中。您可以随时查看和修改方案内容。</p>
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">保存时间：</span>
                <span className="text-white">{new Date().toLocaleString("zh-CN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">方案状态：</span>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{planStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">项目数量：</span>
                <span className="text-white">{planItems.length}项</span>
              </div>
            </div>
            <Button onClick={() => setShowSavePlanDialog(false)} className="w-full bg-blue-500 hover:bg-blue-600">
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-400" />
                治疗方案报告
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReportDialog(false)}
                className="hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[65vh] pr-4">
            <div className="space-y-6">
              {/* 报告头部 */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-2">个性化医美治疗方案</h2>
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div>
                    <span className="text-slate-400">客户姓名：</span>
                    <span className="text-white ml-2">张女士</span>
                  </div>
                  <div>
                    <span className="text-slate-400">年龄：</span>
                    <span className="text-white ml-2">28岁</span>
                  </div>
                  <div>
                    <span className="text-slate-400">皮肤类型：</span>
                    <span className="text-white ml-2">干性敏感肌</span>
                  </div>
                  <div>
                    <span className="text-slate-400">生成日期：</span>
                    <span className="text-white ml-2">{new Date().toLocaleDateString("zh-CN")}</span>
                  </div>
                </div>
              </div>

              {/* 客户需求分析 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-lg font-semibold text-white mb-3">客户需求分析</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-blue-300 font-semibold">核心诉求：</span>
                    <span className="text-slate-300 ml-2">改善法令纹、面部抗衰老</span>
                  </div>
                  <div>
                    <span className="text-blue-300 font-semibold">预算范围：</span>
                    <span className="text-slate-300 ml-2">¥5,000以内</span>
                  </div>
                  <div>
                    <span className="text-blue-300 font-semibold">特殊要求：</span>
                    <span className="text-slate-300 ml-2">无恢复期、温和治疗、对疼痛敏感</span>
                  </div>
                </div>
              </Card>

              {/* 治疗方案详情 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-lg font-semibold text-white mb-4">治疗方案详情</h3>
                <div className="space-y-4">
                  {planItems.map((item, index) => (
                    <div key={item.id} className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                          {index + 1}. {item.name}
                        </h4>
                        <span className="text-blue-400 font-semibold">{item.price}</span>
                      </div>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="text-slate-400">推荐理由：</span>
                          <p className="text-slate-300 mt-1">{item.reasoning}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-slate-400">针对需求：</span>
                            <p className="text-slate-300">{item.customerNeed}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">预期效果：</span>
                            <p className="text-slate-300">{item.expectedEffect}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-400">使用方法：</span>
                          <p className="text-slate-300">{item.frequency}</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                          <span className="text-yellow-300 text-xs font-semibold">注意事项：</span>
                          <p className="text-yellow-200 text-xs mt-1">{item.precautions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 费用汇总 */}
              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30 p-5">
                <h3 className="text-lg font-semibold text-white mb-3">费用汇总</h3>
                <div className="space-y-2 text-sm">
                  {planItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-slate-300">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>总计</span>
                      <span className="text-green-400">¥{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 专业建议 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-lg font-semibold text-white mb-3">专业建议</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>建议先进行皮肤测试，确保产品适合您的敏感肌肤</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>治疗期间注意防晒，避免紫外线对皮肤造成额外伤害</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>保持良好作息和饮食习惯，有助于提升治疗效果</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>定期复诊，根据皮肤状况调整治疗方案</span>
                  </li>
                </ul>
              </Card>
            </div>
          </ScrollArea>
          <div className="flex space-x-3 pt-4 border-t border-slate-700">
            <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
              <Download className="w-4 h-4 mr-2" />
              下载PDF报告
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              发送给客户
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
