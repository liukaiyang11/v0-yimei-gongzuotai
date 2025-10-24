"use client"

import { useState } from "react"
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

export function AICollaborationAssistant({ onBack }: AICollaborationAssistantProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [sortBy, setSortBy] = useState("profit")
  const [planItems, setPlanItems] = useState<any[]>([])
  const [planStatus, setPlanStatus] = useState("待沟通")

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

  const removeFromPlan = (id: number) => {
    setPlanItems(planItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return planItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace(/[¥,]/g, ""))
      return total + price * item.quantity
    }, 0)
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

      {/* 两栏布局 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 左侧栏 - 客户信息中心 (固定) */}
        <div className="w-80 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
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

        {/* 右侧主区域 - 核心功能工作台 (Tab切换) */}
        <div className="flex-1 bg-slate-900/30">
          <Tabs defaultValue="consultation" className="h-full flex flex-col">
            <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-6">
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
            <TabsContent value="consultation" className="flex-1 m-0">
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

                  {/* AI聊天摘要 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                      AI聊天摘要
                    </h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-slate-300 leading-relaxed">
                      客户张女士，28岁，主要关注面部抗衰老问题，特别是法令纹的改善。她表示皮肤较为敏感，希望选择温和且有效的治疗方案。预算控制在5000元以内，倾向于无创或微创项目，希望能在短期内看到明显效果。客户对光电类项目表现出浓厚兴趣，但担心恢复期和疼痛问题。
                    </div>
                  </Card>

                  {/* 关键信息列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 客户疑虑点 */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <h4 className="text-sm font-semibold text-white mb-3">客户疑虑点</h4>
                      <ul className="space-y-2">
                        {["恢复期太长", "害怕疼痛", "担心副作用", "价格是否合理"].map((concern, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* 提及产品/项目 */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <h4 className="text-sm font-semibold text-white mb-3">提及产品/项目</h4>
                      <ul className="space-y-2">
                        {["热玛吉", "超声刀", "水光针", "肉毒素"].map((product, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>{product}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    {/* 相关生活习惯 */}
                    <Card className="bg-slate-800/50 border-slate-700 p-5">
                      <h4 className="text-sm font-semibold text-white mb-3">相关生活习惯</h4>
                      <ul className="space-y-2">
                        {["经常熬夜", "工作压力大", "饮食不规律", "缺乏运动"].map((habit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                            <ChevronRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>{habit}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>

                  {/* 查看完整聊天记录按钮 */}
                  <div className="flex justify-center">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Eye className="w-4 h-4 mr-2" />
                      查看完整聊天记录
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Tab 2: 智能推荐 (保持原有设计) */}
            <TabsContent value="recommendation" className="flex-1 m-0">
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

            {/* Tab 3: 医生定制方案 */}
            <TabsContent value="plan" className="flex-1 m-0">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* 方案构建区 */}
                  <Card className="bg-slate-800/50 border-slate-700 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                        治疗方案构建
                      </h3>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        <Plus className="w-4 h-4 mr-2" />
                        从推荐中添加
                      </Button>
                    </div>

                    {/* 方案时间轴/阶段视图 */}
                    <div className="space-y-4">
                      {/* 第一阶段 */}
                      <div className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                            1
                          </div>
                          第一阶段：家居皮肤调理
                        </h4>

                        {planItems.filter((item) => item.phase === "第一阶段").length === 0 ? (
                          <p className="text-sm text-slate-400 text-center py-4">暂无项目，请从智能推荐中添加</p>
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
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center mr-2">
                            2
                          </div>
                          第二阶段：院线光电治疗
                        </h4>
                        <p className="text-sm text-slate-400 text-center py-4">暂无项目，请从智能推荐中添加</p>
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
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">
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
    </div>
  )
}
