"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Lightbulb,
  ChevronRight,
  Star,
  MessageSquare,
  FileText,
  Stethoscope,
  Plus,
  Save,
  Tag,
  Eye,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  Check,
  Upload,
  Mic,
  Droplet,
  Users,
  Activity,
  Zap,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface AICollaborationAssistantProps {
  onBack: () => void
}

// Updated mockProducts to mockProjects with treatment project data
const mockProjects = [
  {
    id: 1,
    name: "水光针",
    category: "面部护理",
    price: "¥1,800-3,500",
    avgPrice: 2650,
    image: "/hydrafacial-treatment.png",
    recommendLevel: "首要推荐",
    profit: "高利润",
    profitRate: "48%",
    duration: "30-45分钟",
    recovery: "无恢复期",
    suitable: ["干性肌肤", "暗沉肌肤", "25-45岁"],
    effects: ["深层补水", "提亮肤色", "改善细纹"],
    reason: "客户皮肤干燥缺水，水光针能快速改善肤质",
    description: "通过微针将透明质酸等营养成分注入真皮层，深层补水保湿，改善肤质。",
    sessions: "建议3-5次，间隔2-4周",
  },
  {
    id: 2,
    name: "玻尿酸填充",
    category: "抗衰塑形",
    price: "¥3,500-8,000",
    avgPrice: 5750,
    image: "/hyaluronic-acid-filler-treatment.jpg",
    recommendLevel: "强烈推荐",
    profit: "高利润",
    profitRate: "52%",
    duration: "45-60分钟",
    recovery: "1-3天轻微肿胀",
    suitable: ["法令纹", "泪沟", "30-50岁"],
    effects: ["填充凹陷", "改善法令纹", "面部年轻化"],
    reason: "客户法令纹明显，玻尿酸填充效果立竿见影",
    description: "使用玻尿酸填充剂注入面部凹陷部位，改善法令纹、泪沟等衰老迹象。",
    sessions: "单次治疗，效果维持8-12个月",
  },
  {
    id: 3,
    name: "黄金超光子M22",
    category: "光电美容",
    price: "¥2,800-5,500",
    avgPrice: 4150,
    image: "/ipl-photofacial-treatment.jpg",
    recommendLevel: "推荐",
    profit: "中高利润",
    profitRate: "45%",
    duration: "30-40分钟",
    recovery: "无恢复期",
    suitable: ["色斑", "红血丝", "25-55岁"],
    effects: ["祛斑美白", "改善红血丝", "收缩毛孔"],
    reason: "全面改善肤质，适合多种皮肤问题",
    description: "采用强脉冲光技术，针对色素、血管等多种皮肤问题进行综合治疗。",
    sessions: "建议4-6次，间隔3-4周",
  },
  {
    id: 4,
    name: "热玛吉",
    category: "抗衰紧致",
    price: "¥8,000-25,000",
    avgPrice: 16500,
    image: "/thermage-skin-tightening.jpg",
    recommendLevel: "高端推荐",
    profit: "超高利润",
    profitRate: "55%",
    duration: "60-90分钟",
    recovery: "无恢复期",
    suitable: ["松弛下垂", "深层抗衰", "30-60岁"],
    effects: ["紧致提升", "刺激胶原再生", "长效抗衰"],
    reason: "深层抗衰首选，效果持久显著",
    description: "利用射频能量深入真皮层，刺激胶原蛋白再生，实现紧致提升效果。",
    sessions: "单次治疗，效果维持1-2年",
  },
  {
    id: 5,
    name: "超声刀",
    category: "抗衰紧致",
    price: "¥12,000-28,000",
    avgPrice: 20000,
    image: "/hifu-ultrasound-lifting.jpg",
    recommendLevel: "高端推荐",
    profit: "超高利润",
    profitRate: "58%",
    duration: "60-90分钟",
    recovery: "无恢复期",
    suitable: ["面部松弛", "轮廓下垂", "35-65岁"],
    effects: ["深层提拉", "轮廓重塑", "抗衰老"],
    reason: "筋膜层提升，效果更深层持久",
    description: "聚焦超声波作用于筋膜层，实现深层提拉紧致，重塑面部轮廓。",
    sessions: "单次治疗，效果维持2-3年",
  },
  {
    id: 6,
    name: "肉毒素除皱",
    category: "抗衰除皱",
    price: "¥2,000-6,000",
    avgPrice: 4000,
    image: "/botox-wrinkle-treatment.jpg",
    recommendLevel: "强烈推荐",
    profit: "高利润",
    profitRate: "50%",
    duration: "15-30分钟",
    recovery: "无恢复期",
    suitable: ["动态纹", "表情纹", "25-55岁"],
    effects: ["去除抬头纹", "改善鱼尾纹", "瘦脸"],
    reason: "快速改善动态纹，效果自然",
    description: "通过注射肉毒素放松肌肉，减少动态纹的产生，达到除皱效果。",
    sessions: "单次治疗，效果维持4-6个月",
  },
  {
    id: 7,
    name: "瘦腿针",
    category: "身体塑形",
    price: "¥3,500-8,000",
    avgPrice: 5750,
    image: "/leg-slimming-injection.jpg",
    recommendLevel: "推荐",
    profit: "高利润",
    profitRate: "47%",
    duration: "30-45分钟",
    recovery: "无恢复期",
    suitable: ["小腿肌肉发达", "20-45岁"],
    effects: ["瘦小腿", "改善肌肉型腿", "腿部线条优化"],
    reason: "针对肌肉型小腿，效果显著",
    description: "通过注射肉毒素使小腿肌肉适度萎缩，达到瘦腿效果。",
    sessions: "单次治疗，效果维持6-12个月",
  },
  {
    id: 8,
    name: "瘦肩针",
    category: "身体塑形",
    price: "¥4,000-9,000",
    avgPrice: 6500,
    image: "/shoulder-slimming-injection.jpg",
    recommendLevel: "推荐",
    profit: "高利润",
    profitRate: "48%",
    duration: "20-30分钟",
    recovery: "无恢复期",
    suitable: ["斜方肌发达", "20-45岁"],
    effects: ["瘦肩颈", "改善溜肩", "优化肩颈线条"],
    reason: "改善斜方肌肥大，塑造天鹅颈",
    description: "通过注射肉毒素放松斜方肌，改善肩颈线条，打造优雅天鹅颈。",
    sessions: "单次治疗，效果维持6-10个月",
  },
  {
    id: 9,
    name: "皮秒激光",
    category: "光电美容",
    price: "¥3,500-8,000",
    avgPrice: 5750,
    image: "/picosecond-laser-treatment.jpg",
    recommendLevel: "强烈推荐",
    profit: "高利润",
    profitRate: "49%",
    duration: "30-45分钟",
    recovery: "3-5天结痂脱落",
    suitable: ["色斑", "痘印", "25-50岁"],
    effects: ["祛斑", "去痘印", "提亮肤色"],
    reason: "强效祛斑，对顽固色素效果好",
    description: "利用皮秒级脉冲激光击碎色素颗粒，有效去除各类色斑和痘印。",
    sessions: "建议3-5次，间隔4-6周",
  },
  {
    id: 10,
    name: "线雕提升",
    category: "抗衰塑形",
    price: "¥8,000-20,000",
    avgPrice: 14000,
    image: "/thread-lift-face.jpg",
    recommendLevel: "高端推荐",
    profit: "超高利润",
    profitRate: "54%",
    duration: "60-90分钟",
    recovery: "3-7天轻微肿胀",
    suitable: ["面部松弛", "轮廓下垂", "30-55岁"],
    effects: ["即时提拉", "刺激胶原", "轮廓重塑"],
    reason: "物理提拉+生物刺激，双重抗衰",
    description: "使用可吸收蛋白线植入皮下，物理提拉的同时刺激胶原蛋白再生。",
    sessions: "单次治疗，效果维持1-2年",
  },
]

const mockASRTranscript = [
  { timestamp: "00:00:23", speaker: "客户-张女士", text: "你好,我想咨询一下抗衰老的项目" },
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
  const [selectedProject, setSelectedProject] = useState(mockProjects[0])
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

  const [selectedAge, setSelectedAge] = useState("")
  const [selectedSkinType, setSelectedSkinType] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [uploadedScreenshots, setUploadedScreenshots] = useState<string[]>([])
  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null)
  const [customInput, setCustomInput] = useState("")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = e.clientX - containerRect.left - 80

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

  const sortedProjects = [...mockProjects].sort((a, b) => {
    if (sortBy === "profit") {
      return Number.parseFloat(b.profitRate) - Number.parseFloat(a.profitRate)
    }
    if (sortBy === "match") {
      return b.recommendLevel.localeCompare(a.recommendLevel)
    }
    return 0
  })

  const addToPlan = (project: any) => {
    const newItem = {
      id: Date.now(),
      name: project.name,
      price: project.price,
      quantity: 1,
      frequency: project.sessions || "单次",
      notes: "",
      phase: "第一阶段",
    }
    setPlanItems([...planItems, newItem])
  }

  const addSelectedToPlan = () => {
    const newItems = mockProjects
      .filter((project) => selectedRecommendations.includes(project.id))
      .map((project) => ({
        id: Date.now() + project.id,
        name: project.name,
        price: project.price,
        quantity: 1,
        frequency: project.sessions || "单次",
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
      const priceStr = item.price.replace(/[¥,]/g, "")
      const priceMatch = priceStr.match(/\d+/)
      const price = priceMatch ? Number.parseFloat(priceMatch[0]) : 0
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
          <h1 className="text-lg font-semibold text-white">患者信息流转平台</h1>
        </div>
      </div>

      <div ref={containerRef} className="flex h-[calc(100vh-4rem)]">
        <div
          style={{ width: leftWidth }}
          className="border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm flex-shrink-0"
        >
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white mb-4">客户信息录入</h2>

              {/* Part 1: 点选区域 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">基本信息</h3>
                <div className="space-y-4">
                  {/* 年龄选择 */}
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">年龄</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["18-25", "26-35", "36-45", "46+"].map((age) => (
                        <Button
                          key={age}
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedAge === age
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                          onClick={() => setSelectedAge(age)}
                        >
                          {age}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 性别选择 */}
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">性别</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["女", "男", "其他"].map((gender) => (
                        <Button
                          key={gender}
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedGender === gender
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                          onClick={() => setSelectedGender(gender)}
                        >
                          <Users className="w-3 h-3 mr-1" />
                          {gender}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* 肤质选择 */}
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">肤质</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["干性", "油性", "混合性", "敏感性"].map((skinType) => (
                        <Button
                          key={skinType}
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedSkinType === skinType
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800"
                          }`}
                          onClick={() => setSelectedSkinType(skinType)}
                        >
                          <Droplet className="w-3 h-3 mr-1" />
                          {skinType}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Part 2: 上传部分 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">资料上传</h3>
                <div className="space-y-4">
                  {/* 截图上传 */}
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">微信聊天截图</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer bg-slate-900/30">
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="w-8 h-8 text-slate-400" />
                        <p className="text-xs text-slate-400 text-center">点击或拖拽上传截图</p>
                        <p className="text-xs text-slate-500">支持 PNG, JPG 格式</p>
                      </div>
                    </div>
                    {uploadedScreenshots.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedScreenshots.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-slate-900/50 rounded px-3 py-2 text-xs"
                          >
                            <span className="text-slate-300">{file}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 text-red-400 hover:text-red-300"
                              onClick={() => setUploadedScreenshots(uploadedScreenshots.filter((_, i) => i !== index))}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 录音上传 */}
                  <div>
                    <label className="text-xs text-slate-400 mb-2 block">咨询录音</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer bg-slate-900/30">
                      <div className="flex flex-col items-center space-y-2">
                        <Mic className="w-8 h-8 text-slate-400" />
                        <p className="text-xs text-slate-400 text-center">点击上传录音文件</p>
                        <p className="text-xs text-slate-500">支持 MP3, WAV, M4A 格式</p>
                      </div>
                    </div>
                    {uploadedAudio && (
                      <div className="mt-2 flex items-center justify-between bg-slate-900/50 rounded px-3 py-2 text-xs">
                        <span className="text-slate-300">{uploadedAudio}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-5 w-5 text-red-400 hover:text-red-300"
                          onClick={() => setUploadedAudio(null)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Part 3: 自定义输入部分 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">补充信息</h3>
                <Textarea
                  placeholder="请输入客户的其他相关信息，如特殊需求、过往病史、用药情况等..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="min-h-[120px] bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </Card>

              {/* 提交按钮 */}
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Save className="w-4 h-4 mr-2" />
                保存客户信息
              </Button>
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

        <div className="flex-1 bg-slate-900/30 overflow-hidden">
          <Tabs defaultValue="medical-record" className="h-full flex flex-col">
            <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-6 flex-shrink-0">
              <TabsList className="bg-transparent h-14">
                <TabsTrigger
                  value="medical-record"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  快速病历
                </TabsTrigger>
                <TabsTrigger
                  value="consultation"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  咨询沟通纪要
                </TabsTrigger>
                <TabsTrigger
                  value="general-plan"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  辅助通用方案
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
                  <Stethoscope className="w-4 h-4 mr-2" />
                  医生定制方案
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: 快速病历 - Complete implementation with AI-generated medical record */}
            <TabsContent value="medical-record" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* AI生成提示 */}
                  <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 p-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">AI智能分析已完成</p>
                        <p className="text-xs text-slate-400 mt-1">
                          基于客户信息、聊天截图和录音转写，AI已生成完整病历分析
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* 1. 基本信息 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      基本信息
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">姓名</p>
                        <p className="text-sm font-semibold text-white">张女士</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">年龄</p>
                        <p className="text-sm font-semibold text-white">28岁</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">性别</p>
                        <p className="text-sm font-semibold text-white">女</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400 mb-1">肤质</p>
                        <p className="text-sm font-semibold text-white">干性敏感肌</p>
                      </div>
                    </div>
                  </Card>

                  {/* 2. 皮肤状况分析 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-green-400" />
                      皮肤状况分析
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-2">主要问题</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>法令纹明显，深度约2-3mm，影响面部年轻感</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>眼周及鼻翼两侧有细纹，表情纹较为明显</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>皮肤屏障功能较弱，经常出现泛红现象</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>角质层薄，对外界刺激敏感度高</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-blue-300 mb-2">皮肤检测数据</h4>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-slate-400 mb-1">水分值</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={35} className="h-2 flex-1 [&>div]:bg-yellow-500" />
                              <span className="text-yellow-400 font-semibold">35%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-slate-400 mb-1">油分值</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={25} className="h-2 flex-1 [&>div]:bg-blue-500" />
                              <span className="text-blue-400 font-semibold">25%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-slate-400 mb-1">弹性值</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={60} className="h-2 flex-1 [&>div]:bg-green-500" />
                              <span className="text-green-400 font-semibold">60%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-slate-400 mb-1">敏感度</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={75} className="h-2 flex-1 [&>div]:bg-red-500" />
                              <span className="text-red-400 font-semibold">75%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 3. 客户诉求与意向 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-400" />
                      客户诉求与意向
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-purple-300 mb-2">核心诉求</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-purple-400 font-semibold">1</span>
                            </div>
                            <span>改善法令纹，提升面部轮廓年轻感</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-purple-400 font-semibold">2</span>
                            </div>
                            <span>修复皮肤屏障，改善敏感泛红状态</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-purple-400 font-semibold">3</span>
                            </div>
                            <span>预算控制在5000元左右，性价比优先</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-purple-400 font-semibold">4</span>
                            </div>
                            <span>无恢复期项目，不影响正常工作生活</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-orange-300 mb-2">特殊要求</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>对疼痛较为敏感，需要温和的治疗方式</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>工作繁忙，希望治疗时间灵活可调整</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>对副作用较为关注，需要详细的安全性说明</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* 4. 医美认知水平 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                      医美认知水平
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-semibold text-yellow-300">整体认知水平</h4>
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">中等偏上</Badge>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          客户对医美项目有一定了解，听说过热玛吉、超声刀等主流项目，但对具体原理和效果认知较浅。对医美持开放态度，愿意尝试，但需要专业指导建立信任。
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-2">项目了解度</p>
                          <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-3 h-3 text-slate-600" />
                          </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-2">接受程度</p>
                          <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} className="w-3 h-3 fill-green-400 text-green-400" />
                            ))}
                            <Star className="w-3 h-3 text-slate-600" />
                          </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-2">决策速度</p>
                          <div className="flex items-center justify-center space-x-1">
                            {[1, 2, 3].map((i) => (
                              <Star key={i} className="w-3 h-3 fill-blue-400 text-blue-400" />
                            ))}
                            <Star className="w-3 h-3 text-slate-600" />
                            <Star className="w-3 h-3 text-slate-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 5. 意向项目分析 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-blue-400" />
                      意向项目分析
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "水光针",
                          interest: "高",
                          color: "green",
                          reason: "符合预算，补水保湿效果明显，无恢复期",
                        },
                        {
                          name: "肉毒素",
                          interest: "高",
                          color: "green",
                          reason: "改善动态纹效果好，与水光针组合性价比高",
                        },
                        {
                          name: "热玛吉",
                          interest: "中",
                          color: "yellow",
                          reason: "效果吸引但价格超预算，可作为升级方案",
                        },
                        {
                          name: "超声刀",
                          interest: "低",
                          color: "red",
                          reason: "了解较少，需要详细介绍建立认知",
                        },
                      ].map((project, index) => (
                        <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-white">{project.name}</h4>
                            <Badge
                              className={`${
                                project.color === "green"
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : project.color === "yellow"
                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                    : "bg-red-500/20 text-red-300 border-red-500/30"
                              }`}
                            >
                              意向度: {project.interest}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-400">{project.reason}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* 6. 综合评估 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-400" />
                      综合评估
                    </h3>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        客户张女士为典型的初级抗衰需求客户，28岁年龄段开始关注面部衰老问题，主要集中在法令纹改善。皮肤状况为干性敏感肌，需要特别注意产品和项目的温和性。预算约5000元，属于中等消费水平，对性价比较为关注。医美认知水平中等偏上，对主流项目有一定了解但需要专业指导。建议采用温和渐进的治疗方案，先进行基础的皮肤屏障修复，再考虑进阶的抗衰项目。重点推荐水光针+肉毒素组合方案，符合预算且效果显著。
                      </p>
                    </div>
                  </Card>

                  {/* 7. AI建议 */}
                  <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-blue-400" />
                      AI智能建议
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-blue-300 mb-2">推荐方案</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          建议采用"水光针+肉毒素"组合方案，总价约4000-5000元，符合客户预算。先进行水光针治疗改善皮肤基础状态，2周后进行肉毒素注射改善法令纹。整个疗程无恢复期，不影响工作。
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-2">沟通要点</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>强调项目的安全性和温和性，打消客户对副作用的顾虑</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>提供详细的疼痛管理方案，如敷麻药、冰敷等</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>展示成功案例和before/after对比图，建立信任</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>说明敏感肌的特殊护理方案，体现专业性</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-purple-300 mb-2">升级方案</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          如客户预算可以提升，可推荐热玛吉局部治疗（法令纹区域），价格约8000-10000元，效果更持久。或者推荐分期付款方案，降低一次性支付压力。
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 2: 咨询沟通纪要 */}
            <TabsContent value="consultation" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* ... existing code ... */}
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

            {/* Tab 3: 辅助通用方案 - Complete implementation */}
            <TabsContent value="general-plan" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* AI生成提示 */}
                  <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-4">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">AI辅助方案已生成</p>
                        <p className="text-xs text-slate-400 mt-1">基于快速病历、咨询纪要及美沃斯医院行业标准数据库</p>
                      </div>
                    </div>
                  </Card>

                  {/* 1. 方案概述 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-400" />
                      方案概述
                    </h3>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        针对28岁干性敏感肌客户的法令纹改善需求，结合行业标准治疗方案，推荐采用"基础修复+注射抗衰"的分阶段治疗模式。整体方案周期约8-12周，预算控制在5000-6000元，无恢复期，适合工作繁忙人群。
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-1">治疗周期</p>
                          <p className="text-lg font-bold text-blue-400">8-12周</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-1">预算范围</p>
                          <p className="text-lg font-bold text-green-400">¥5000-6000</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-400 mb-1">恢复期</p>
                          <p className="text-lg font-bold text-purple-400">无</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 2. 基于病历的分析 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-green-400" />
                      基于病历的分析
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-2">皮肤状况评估</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>皮肤屏障功能较弱（水分值35%），需要优先修复</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>法令纹深度2-3mm，属于中度衰老，适合注射类项目</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>敏感度75%，需要选择温和项目，避免刺激</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-blue-300 mb-2">客户需求匹配</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>预算5000元 → 推荐水光针+肉毒素组合（符合预算）</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>无恢复期要求 → 注射类项目无恢复期，当天可工作</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>怕疼 → 可敷麻药，注射过程疼痛感轻微</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* 3. 行业标准方案 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400" />
                      行业标准方案（美沃斯数据库）
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-yellow-300 mb-3">
                          标准方案：法令纹改善（28-35岁年龄段）
                        </h4>
                        <div className="space-y-3">
                          <div className="border-l-2 border-blue-500 pl-4">
                            <p className="text-xs text-slate-400 mb-1">首选方案</p>
                            <p className="text-sm font-semibold text-white">玻尿酸填充 + 肉毒素除皱</p>
                            <p className="text-xs text-slate-400 mt-1">
                              行业成功率：92% | 客户满意度：4.7/5.0 | 平均价格：¥5000-8000
                            </p>
                          </div>
                          <div className="border-l-2 border-green-500 pl-4">
                            <p className="text-xs text-slate-400 mb-1">替代方案（预算友好）</p>
                            <p className="text-sm font-semibold text-white">水光针 + 肉毒素除皱</p>
                            <p className="text-xs text-slate-400 mt-1">
                              行业成功率：85% | 客户满意度：4.5/5.0 | 平均价格：¥3500-5000
                            </p>
                          </div>
                          <div className="border-l-2 border-purple-500 pl-4">
                            <p className="text-xs text-slate-400 mb-1">高端方案</p>
                            <p className="text-sm font-semibold text-white">热玛吉 / 超声刀</p>
                            <p className="text-xs text-slate-400 mt-1">
                              行业成功率：95% | 客户满意度：4.8/5.0 | 平均价格：¥12000-25000
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-orange-300 mb-2">行业数据支持</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          根据美沃斯医院2024年度数据统计，28-35岁年龄段客户中，78%选择注射类抗衰项目作为首次治疗方案。其中水光针+肉毒素组合因性价比高、效果显著，成为该年龄段最受欢迎的方案，客户复购率达65%。
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* 4. 分阶段建议 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      分阶段建议
                    </h3>
                    <div className="space-y-4">
                      {/* 第一阶段 */}
                      <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-500/5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-semibold">
                            1
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">第一阶段：基础修复（1-2周）</h4>
                            <p className="text-xs text-slate-400">目标：修复皮肤屏障，改善敏感状态</p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">推荐项目：水光针（1次）</p>
                            <p className="text-xs text-slate-400">深层补水保湿，改善皮肤干燥状态，为后续治疗打好基础</p>
                            <p className="text-xs text-blue-400 mt-2">预算：¥1800-2500</p>
                          </div>
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">配套护理：医用修复面膜</p>
                            <p className="text-xs text-slate-400">每周2-3次，加速皮肤屏障修复</p>
                            <p className="text-xs text-blue-400 mt-2">预算：¥300-500</p>
                          </div>
                        </div>
                      </div>

                      {/* 第二阶段 */}
                      <div className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center font-semibold">
                            2
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">第二阶段：抗衰治疗（3-4周）</h4>
                            <p className="text-xs text-slate-400">目标：改善法令纹，提升面部轮廓</p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">推荐项目：肉毒素除皱（1次）</p>
                            <p className="text-xs text-slate-400">针对法令纹区域注射，放松肌肉，减少动态纹的产生</p>
                            <p className="text-xs text-purple-400 mt-2">预算：¥2000-3000</p>
                          </div>
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">可选升级：玻尿酸填充</p>
                            <p className="text-xs text-slate-400">如预算允许，可加做玻尿酸填充，效果更显著</p>
                            <p className="text-xs text-purple-400 mt-2">额外预算：¥3500-5000</p>
                          </div>
                        </div>
                      </div>

                      {/* 第三阶段 */}
                      <div className="border border-green-500/30 rounded-lg p-4 bg-green-500/5">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-semibold">
                            3
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">第三阶段：巩固维护（5-12周）</h4>
                            <p className="text-xs text-slate-400">目标：巩固效果，长期维护</p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">推荐项目：水光针补充（1-2次）</p>
                            <p className="text-xs text-slate-400">每月1次，保持皮肤水润状态，延长治疗效果</p>
                            <p className="text-xs text-green-400 mt-2">预算：¥1800-2500/次</p>
                          </div>
                          <div className="bg-slate-900/50 rounded p-3">
                            <p className="text-sm font-semibold text-white mb-1">日常护理：医用护肤品</p>
                            <p className="text-xs text-slate-400">持续使用温和保湿产品，维护皮肤屏障</p>
                            <p className="text-xs text-green-400 mt-2">月度预算：¥500-800</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 5. 预期效果 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                      预期效果
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-green-300 mb-3">短期效果（1-4周）</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>皮肤水分值提升至60%以上，干燥状态明显改善</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>敏感泛红现象减少，皮肤屏障功能增强</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>肤色提亮，整体肤质改善</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-blue-300 mb-3">中期效果（4-8周）</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>法令纹深度减少50-70%，面部轮廓提升</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>动态纹明显减少，表情更自然年轻</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>皮肤弹性提升，整体年轻感增强</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-purple-300 mb-3">长期效果（8-12周及以后）</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>法令纹改善效果稳定，维持4-6个月</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>皮肤状态持续改善，抗衰老能力增强</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>建立良好的皮肤管理习惯，延缓衰老进程</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* 6. 注意事项 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-400" />
                      注意事项
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-orange-300 mb-2">治疗前准备</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>治疗前3天停用刺激性护肤品（如酸类、维A类）</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>治疗当天不化妆，保持面部清洁</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span>如有过敏史或正在服药，需提前告知医生</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-red-300 mb-2">治疗后护理</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>治疗后24小时内避免沾水，不要化妆</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>一周内避免剧烈运动、桑拿、高温环境</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>做好防晒工作，使用SPF50+的物理防晒</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>保持规律作息，多喝水，促进代谢</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-xs font-semibold text-yellow-300 mb-2">特殊提醒（敏感肌）</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>治疗前需进行皮肤测试，确保无过敏反应</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>使用温和的医用护肤品，避免刺激</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>如出现异常反应（红肿、刺痛），立即联系医生</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 4: 智能推荐 - Updated to show treatment projects instead of products */}
            <TabsContent value="recommendation" className="flex-1 m-0 overflow-hidden">
              <div className="flex h-full">
                {/* 项目推荐列表 */}
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

                      {/* 项目卡片列表 */}
                      <div className="space-y-4">
                        {sortedProjects.map((project) => (
                          <Card
                            key={project.id}
                            className={`bg-slate-800/50 border-slate-700 p-5 cursor-pointer transition-all hover:bg-slate-800/70 ${
                              selectedProject.id === project.id ? "ring-2 ring-blue-500" : ""
                            }`}
                            onClick={() => setSelectedProject(project)}
                          >
                            <div className="flex space-x-4">
                              {/* 项目图片 */}
                              <div className="w-32 h-32 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                                <img
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* 项目信息 */}
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <h3 className="font-semibold text-white text-lg">{project.name}</h3>
                                      <Badge className="bg-slate-700/50 text-slate-300 border-slate-600">
                                        {project.category}
                                      </Badge>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-400 mt-1">{project.price}</p>
                                  </div>
                                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                                    {project.recommendLevel}
                                  </Badge>
                                </div>

                                {/* 数据指标 */}
                                <div className="flex items-center space-x-4 flex-wrap gap-2">
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-slate-300">{project.profit}</span>
                                    <span className="text-xs text-green-400 font-semibold">{project.profitRate}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-slate-300">{project.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Activity className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-slate-300">{project.recovery}</span>
                                  </div>
                                </div>

                                {/* 推荐理由 */}
                                <p className="text-sm text-slate-400 italic">{project.reason}</p>

                                {/* 适用人群标签 */}
                                <div className="flex flex-wrap gap-2">
                                  {project.suitable.map((tag, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                {/* 项目详情侧边栏 */}
                <div className="w-96 border-l border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      {/* 项目大图 */}
                      <div className="w-full h-64 rounded-lg overflow-hidden bg-slate-800/50">
                        <img
                          src={selectedProject.image || "/placeholder.svg"}
                          alt={selectedProject.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 项目名称和价格 */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h2 className="text-xl font-bold text-white">{selectedProject.name}</h2>
                          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600">
                            {selectedProject.category}
                          </Badge>
                        </div>
                        <p className="text-3xl font-bold text-blue-400">{selectedProject.price}</p>
                      </div>

                      {/* 项目详情 */}
                      <Card className="bg-slate-800/50 border-slate-700 p-4">
                        <h3 className="text-sm font-semibold text-white mb-3">项目详情</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start space-x-2">
                            <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-slate-400 text-xs">治疗时长</p>
                              <p className="text-white">{selectedProject.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Activity className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-slate-400 text-xs">恢复期</p>
                              <p className="text-white">{selectedProject.recovery}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Calendar className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-slate-400 text-xs">疗程建议</p>
                              <p className="text-white">{selectedProject.sessions}</p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* 项目描述 */}
                      <Card className="bg-slate-800/50 border-slate-700 p-4">
                        <h3 className="text-sm font-semibold text-white mb-3">项目介绍</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>
                      </Card>

                      {/* 主要效果 */}
                      <Card className="bg-slate-800/50 border-slate-700 p-4">
                        <h3 className="text-sm font-semibold text-white mb-3">主要效果</h3>
                        <div className="space-y-2">
                          {selectedProject.effects.map((effect, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-slate-300">{effect}</p>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* 适用人群 */}
                      <Card className="bg-slate-800/50 border-slate-700 p-4">
                        <h3 className="text-sm font-semibold text-white mb-3">适用人群</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.suitable.map((tag, index) => (
                            <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      {/* 推荐理由 */}
                      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-4">
                        <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                          AI推荐理由
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.reason}</p>
                      </Card>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            {/* Tab 5: 医生定制方案 */}
            <TabsContent value="plan" className="flex-1 m-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* ... existing code ... */}
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

                      {/* 第三阶段 */}
                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mr-2">
                              3
                            </div>
                            第三阶段：巩固保养
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

                  {/* 方案总计 */}
                  <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">方案总计</h3>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">预估总价</p>
                        <p className="text-3xl font-bold text-blue-400">¥{calculateTotal().toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-3">
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                      <Save className="w-4 h-4 mr-2" />
                      保存方案
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                      onClick={() => setShowPlanReport(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      生成方案书
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 聊天记录弹窗 */}
      {showChatHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
          <Card className="w-[800px] max-h-[80vh] bg-slate-900 border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">完整咨询记录</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatHistory(false)}
                className="hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="h-[600px] p-6">
              <div className="space-y-4">
                {mockASRTranscript.map((msg, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-500">{msg.timestamp}</span>
                      <Badge
                        className={
                          msg.speaker.includes("客户")
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-green-500/20 text-green-300 border-green-500/30"
                        }
                      >
                        {msg.speaker}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300 pl-16">{msg.text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      )}

      {/* 从推荐添加弹窗 */}
      {showAddFromRecommendation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center">
          <Card className="w-[900px] max-h-[80vh] bg-slate-900 border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">选择项目添加到{selectedPhase}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowAddFromRecommendation(false)
                  setSelectedRecommendations([])
                }}
                className="hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-3">
                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRecommendations.includes(project.id)
                        ? "bg-blue-500/10 border-blue-500"
                        : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                    }`}
                    onClick={() => toggleRecommendation(project.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-white">{project.name}</h4>
                          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold text-blue-400 mb-2">{project.price}</p>
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                          <span>{project.duration}</span>
                          <span>•</span>
                          <span>{project.recovery}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {selectedRecommendations.includes(project.id) && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-slate-700 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddFromRecommendation(false)
                  setSelectedRecommendations([])
                }}
                className="border-slate-700"
              >
                取消
              </Button>
              <Button
                onClick={addSelectedToPlan}
                disabled={selectedRecommendations.length === 0}
                className="bg-blue-500 hover:bg-blue-600"
              >
                添加{selectedRecommendations.length > 0 && `（${selectedRecommendations.length}）`}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
