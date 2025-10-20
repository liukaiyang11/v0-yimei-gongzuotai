"use client"

import { useState } from "react"
import { ArrowLeft, Search, TrendingUp, DollarSign, Package, Clock, Lightbulb, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AISalesAssistantProps {
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

export function AISalesAssistant({ onBack }: AISalesAssistantProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [sortBy, setSortBy] = useState("profit")

  const sortedProducts = [...mockProducts].sort((a, b) => {
    if (sortBy === "profit") {
      return Number.parseFloat(b.profitRate) - Number.parseFloat(a.profitRate)
    }
    return 0
  })

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50">
      {/* 顶部导航栏 */}
      <div className="h-16 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center px-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="ml-4 flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-blue-400" />
          <h1 className="text-lg font-semibold text-white">AI销售助理 - 智能产品推荐系统</h1>
        </div>
      </div>

      {/* 三栏布局 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 左侧栏 - 客户洞察 */}
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

              {/* 客户信息卡片 */}
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

              {/* KPI指标 */}
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

              {/* 品类偏好 */}
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

              {/* 近期购买记录 */}
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

              {/* AI智能分析 */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white mb-2">AI智能分析</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      该客户偏好高端护肤品牌，对产品品质要求高。建议推荐海蓝之谜系列产品，并可搭配眼霜和精华液进行组合销售，预计成交率提升40%。
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* 中间主栏 - 智能产品推荐 */}
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
                            <span className={`text-sm ${product.expiryDays < 90 ? "text-red-400" : "text-slate-300"}`}>
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

        {/* 右侧栏 - 销售辅助 */}
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
    </div>
  )
}
