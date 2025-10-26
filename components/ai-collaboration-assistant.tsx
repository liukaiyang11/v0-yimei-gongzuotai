"use client"

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
  Check,
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

const mockASRTranscript = [
  { timestamp: "00:00:23", speaker: "客户-张女士", text: "你好，我想咨询一下抗衰老的项目" },
  {
    timestamp: "00:00:34",
    speaker: "咨询师-李顾问",
    text: "您好张女士！很高兴为您服务。请问您主要关注面部哪个部位的抗衰老呢？",
  },
  {
    timestamp: "00:00:55",
    speaker: "客户-张女士",
    text: "主要是法令纹比较明显，还有一些细纹。我今年28岁，感觉皮肤状态下降得比较快",
  },
  {
    timestamp: "00:01:16",
    speaker: "咨询师-李顾问",
    text: "理解您的担忧。28岁开始抗衰是很好的时机。针对法令纹，我们有几种方案：热玛吉、超声刀、水光针等。您之前有了解过这些项目吗？",
  },
  {
    timestamp: "00:01:37",
    speaker: "客户-张女士",
    text: "听说过热玛吉和超声刀，但是不太了解具体效果。我比较担心恢复期的问题，因为工作比较忙",
  },
  {
    timestamp: "00:01:58",
    speaker: "咨询师-李顾问",
    text: "完全理解。热玛吉和超声刀都是无创项目，基本没有恢复期，做完就可以正常工作生活。热玛吉主要通过射频能量刺激胶原蛋白再生，效果可以维持1-2年",
  },
  { timestamp: "00:02:19", speaker: "客户-张女士", text: "听起来不错。那会不会很疼？我比较怕疼" },
  {
    timestamp: "00:02:30",
    speaker: "咨询师-李顾问",
    text: "热玛吉治疗过程中会有一定的热感，但我们会根据您的耐受度调整能量。大部分客户都能接受，如果特别敏感也可以敷麻药",
  },
  { timestamp: "00:02:51", speaker: "客户-张女士", text: "那价格大概是多少呢？我预算在5000左右" },
  {
    timestamp: "00:03:13",
    speaker: "咨询师-李顾问",
    text: "热玛吉全脸的价格一般在8000-15000之间。如果预算在5000左右，我建议您可以考虑水光针+肉毒素的组合方案，效果也很好",
  },
  { timestamp: "00:03:34", speaker: "客户-张女士", text: "水光针和肉毒素有什么区别？会不会有副作用？" },
  {
    timestamp: "00:03:55",
    speaker: "咨询师-李顾问",
    text: "水光针主要是补水保湿，改善肤质；肉毒素是放松肌肉，减少动态纹。两者结合效果更好。副作用方面，只要选择正规产品和专业医生操作，是非常安全的",
  },
  {
    timestamp: "00:04:17",
    speaker: "客户-张女士",
    text: "好的，我再考虑一下。对了，我皮肤比较敏感，经常会泛红，这种情况能做吗？",
  },
  {
    timestamp: "00:04:38",
    speaker: "咨询师-李顾问",
    text: "敏感肌是可以做的，但需要先做皮肤测试。我们会根据您的皮肤状况调整方案。另外，建议您先做好基础的皮肤屏障修复",
  },
  { timestamp: "00:05:00", speaker: "客户-张女士", text: "明白了。那我想先预约一个面诊，详细了解一下" },
  {
    timestamp: "00:05:11",
    speaker: "咨询师-李顾问",
    text: "好的！我这边帮您安排本周五下午3点的面诊，届时我们的专业医生会为您做详细的皮肤检测和方案设计",
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
  const [showAddFromRecommendation, setShowAddFromRecommendation] = useState(false)
  const [showPlanReport, setShowPlanReport] = useState(false)
  const [selectedRecommendations, setSelectedRecommendations] = useState<number[]>([])
  const [selectedPhase, setSelectedPhase] = useState("第一阶段")

  const [leftWidth, setLeftWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = e.clientX - containerRect.left - 80 // 80 is sidebar width

      // Constrain width between 280px and 600px
      if (newWidth >= 280 && newWidth <= 600) {
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
    }
    setPlanItems([...planItems, newItem])
  }

  const addSelectedToPlan = () => {
    const newItems = mockProducts
      .filter((product) => selectedRecommendations.includes(product.id))
      .map((product) => ({
        id: Date.now() + product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        frequency: "每日1次",
        notes: "",
        phase: selectedPhase,
      }))

    setPlanItems([...planItems, ...newItems])
    setSelectedRecommendations([])
    setShowAddFromRecommendation(false)
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

  const toggleRecommendation = (id: number) => {
    setSelectedRecommendations((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const openAddModal = (phase: string) => {
    setSelectedPhase(phase)
    setShowAddFromRecommendation(true)
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
        {/* 左侧栏 - 客户信息中心 (可调整大小) */}
        <div
          style={{ width: leftWidth }}
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
          className="w-1 bg-slate-700/50 hover:bg-blue-500/50 cursor-col-resize flex items-center justify-center group transition-colors"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-slate-400" />
          </div>
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
                          客户张女士，28岁，主要关注面部抗衰老问题，特别是法令纹的改善。她表示皮肤较为敏感，需要特别注意产品和项目的温和性。
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-2">核心需求分析</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          客户希望选择温和且有效的治疗方案，预算控制在5000元以内。倾向于无创或微创项目，特别强调不希望有明显的恢复期，因为工作较忙。对疼痛比较敏感，需要在咨询时详细说明麻醉方案和舒适度保障措施。
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
                <div className="flex-1 bg-slate-900/30">
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
                <div className="w-96 border-l border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
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

            {/* Tab 3: 医生定制方案 */}
            <TabsContent value="plan" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
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
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                              1
                            </div>
                            第一阶段：家居皮肤调理
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                            onClick={() => openAddModal("第一阶段")}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            添加项目
                          </Button>
                        </div>

                        {planItems.filter((item) => item.phase === "第一阶段").length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-4">暂无项目，点击上方按钮添加</p>
                        ) : (
                          <div className="space-y-3">
                            {planItems
                              .filter((item) => item.phase === "第一阶段")
                              .map((item) => (
                                <div key={item.id} className="bg-slate-800/50 rounded-lg p-3 space-y-2">
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
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div>
                                      <label className="text-slate-400">频次</label>
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
                                  <Textarea
                                    placeholder="操作备注和注意事项..."
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
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white flex items-center">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-2">
                              2
                            </div>
                            第二阶段：院线光电治疗
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                            onClick={() => openAddModal("第二阶段")}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            添加项目
                          </Button>
                        </div>

                        {planItems.filter((item) => item.phase === "第二阶段").length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-4">暂无项目，点击上方按钮添加</p>
                        ) : (
                          <div className="space-y-3">
                            {planItems
                              .filter((item) => item.phase === "第二阶段")
                              .map((item) => (
                                <div key={item.id} className="bg-slate-800/50 rounded-lg p-3 space-y-2">
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
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div>
                                      <label className="text-slate-400">频次</label>
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
                                  <Textarea
                                    placeholder="操作备注和注意事项..."
                                    className="text-xs bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[60px]"
                                    defaultValue={item.notes}
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mr-2">
                              3
                            </div>
                            第三阶段：巩固维护
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500/50 text-green-300 hover:bg-green-500/20 bg-transparent"
                            onClick={() => openAddModal("第三阶段")}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            添加项目
                          </Button>
                        </div>

                        {planItems.filter((item) => item.phase === "第三阶段").length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-4">暂无项目，点击上方按钮添加</p>
                        ) : (
                          <div className="space-y-3">
                            {planItems
                              .filter((item) => item.phase === "第三阶段")
                              .map((item) => (
                                <div key={item.id} className="bg-slate-800/50 rounded-lg p-3 space-y-2">
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
                                  <div className="grid grid-cols-4 gap-2 text-xs">
                                    <div>
                                      <label className="text-slate-400">频次</label>
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
                                  <Textarea
                                    placeholder="操作备注和注意事项..."
                                    className="text-xs bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 min-h-[60px]"
                                    defaultValue={item.notes}
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* 费用预算汇总 */}
                  <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">预计总费用</p>
                        <p className="text-3xl font-bold text-white">¥{calculateTotal().toLocaleString()}</p>
                      </div>
                      <DollarSign className="w-12 h-12 text-blue-400 opacity-50" />
                    </div>
                  </Card>

                  {/* 操作按钮组 */}
                  <div className="flex items-center space-x-3">
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                      <Save className="w-4 h-4 mr-2" />
                      保存方案
                    </Button>
                    <Button className="flex-1 bg-green-500 hover:bg-green-600" onClick={() => setShowPlanReport(true)}>
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
        <DialogContent className="max-w-4xl max-h-[80vh] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
                完整聊天记录 (ASR转写)
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
            <div className="space-y-1">
              {mockASRTranscript.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 py-3 px-4 hover:bg-slate-800/30 rounded transition-colors font-mono text-sm"
                >
                  <span className="text-blue-400 font-semibold w-20 flex-shrink-0">{entry.timestamp}</span>
                  <span
                    className={`font-semibold w-32 flex-shrink-0 ${
                      entry.speaker.startsWith("客户") ? "text-pink-300" : "text-green-300"
                    }`}
                  >
                    {entry.speaker}
                  </span>
                  <p className="text-slate-200 leading-relaxed flex-1">{entry.text}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddFromRecommendation} onOpenChange={setShowAddFromRecommendation}>
        <DialogContent className="max-w-3xl max-h-[80vh] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-400" />
                从智能推荐中选择产品
                <Badge className="ml-3 bg-blue-500/20 text-blue-300 border-blue-500/30">{selectedPhase}</Badge>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddFromRecommendation(false)}
                className="hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[50vh] pr-4">
            <div className="space-y-3">
              {mockProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`bg-slate-800/50 border-slate-700 p-4 cursor-pointer transition-all hover:bg-slate-800/70 ${
                    selectedRecommendations.includes(product.id) ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => toggleRecommendation(product.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded border-2 border-slate-600 flex-shrink-0">
                      {selectedRecommendations.includes(product.id) && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <p className="text-lg font-bold text-blue-400 mt-1">{product.price}</p>
                      <p className="text-xs text-slate-400 mt-1">{product.reason}</p>
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">{product.recommendLevel}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              onClick={() => setShowAddFromRecommendation(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              取消
            </Button>
            <Button
              onClick={addSelectedToPlan}
              disabled={selectedRecommendations.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
            >
              添加到{selectedPhase} {selectedRecommendations.length > 0 && `(${selectedRecommendations.length})`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPlanReport} onOpenChange={setShowPlanReport}>
        <DialogContent className="max-w-5xl max-h-[85vh] bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                定制化治疗方案报告
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlanReport(false)}
                className="hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-6">
              {/* 1. 审成日期 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 mb-1">方案生成日期</h3>
                    <p className="text-lg font-semibold text-white">{new Date().toLocaleDateString("zh-CN")}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-400 opacity-50" />
                </div>
              </Card>

              {/* 2. 主旨医生 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 text-blue-400" />
                  主旨医生
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    王
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">王美丽 主任医师</p>
                    <p className="text-sm text-slate-400">皮肤美容科 · 15年临床经验</p>
                    <p className="text-xs text-slate-500 mt-1">擅长：抗衰老治疗、敏感肌修复、光电美容</p>
                  </div>
                </div>
              </Card>

              {/* 3. 客户情况诊断与诉求分析 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                  客户情况诊断与诉求分析
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-blue-300 mb-2">基本信息</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      客户张女士，28岁，干性敏感肌肤。主要诉求为改善法令纹和细纹，延缓面部衰老。客户皮肤较为敏感，经常出现泛红现象，需要特别注意产品和项目的温和性。
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-green-300 mb-2">皮肤诊断</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      经专业皮肤检测，客户面部法令纹明显，鼻翼两侧及眼周有细纹。皮肤屏障功能较弱，角质层薄，易受外界刺激。胶原蛋白流失速度较快，需要及时进行抗衰老干预。
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-purple-300 mb-2">核心诉求</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>改善法令纹，提升面部轮廓</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>修复皮肤屏障，改善敏感状态</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>预算控制在5000元左右</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>无恢复期，不影响正常工作</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* 4. 定制化治疗方案详情 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-400" />
                  定制化治疗方案详情
                </h3>
                <div className="space-y-4">
                  {planItems.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">暂无方案项目</p>
                  ) : (
                    planItems.map((item, index) => (
                      <div key={item.id} className="bg-slate-900/50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                              <p className="text-xs text-slate-400 mt-1">{item.phase}</p>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-blue-400">{item.price}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-400">使用频次：</span>
                            <span className="text-slate-300">{item.frequency}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">数量：</span>
                            <span className="text-slate-300">{item.quantity}</span>
                          </div>
                        </div>
                        {item.notes && (
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <p className="text-xs text-slate-400">备注：{item.notes}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* 5. 方案执行与注意事项 */}
              <Card className="bg-slate-800/50 border-slate-700 p-5">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-400" />
                  方案执行与注意事项
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-orange-300 mb-2">执行时间安排</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>第一阶段（1-2周）：家居基础护理，修复皮肤屏障</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>第二阶段（3-4周）：院线光电治疗，深层抗衰</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <span>第三阶段（5-8周）：巩固维护，定期复查</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-red-300 mb-2">重要注意事项</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>治疗期间避免使用刺激性护肤品，选择温和保湿产品</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>做好防晒工作，建议使用SPF50+的物理防晒</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>保持规律作息，避免熬夜，多喝水促进代谢</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>如出现不适反应，及时联系医生调整方案</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* 6. 费用预算与方案确认 */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                  费用预算与方案确认
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-400">方案总费用</span>
                      <span className="text-3xl font-bold text-white">¥{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-300">
                        <span>产品/项目费用</span>
                        <span>¥{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>会员优惠</span>
                        <span className="text-green-400">-¥0</span>
                      </div>
                      <div className="pt-2 border-t border-slate-700 flex justify-between font-semibold">
                        <span className="text-white">实付金额</span>
                        <span className="text-blue-400 text-lg">¥{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-xs font-semibold text-blue-300 mb-3">方案确认</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>□ 我已充分了解本治疗方案的内容和预期效果</p>
                      <p>□ 我已知晓治疗过程中的注意事项和可能的风险</p>
                      <p>□ 我同意按照医生建议执行本治疗方案</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 mb-1">客户签名：</p>
                        <div className="h-12 border border-slate-700 rounded bg-slate-800/30"></div>
                      </div>
                      <div>
                        <p className="text-slate-400 mb-1">日期：</p>
                        <div className="h-12 border border-slate-700 rounded bg-slate-800/30 flex items-center px-3 text-slate-300">
                          {new Date().toLocaleDateString("zh-CN")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              导出PDF
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Save className="w-4 h-4 mr-2" />
              保存报告
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
