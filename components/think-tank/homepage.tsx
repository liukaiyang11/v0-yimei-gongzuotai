"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, FileText } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface HomepageProps {
  onNavigateToInsights: (category?: string) => void
  onNavigateToDataCenter: () => void
  onArticleClick: (articleId: string) => void
}

const stockData = [
  { name: "华熙生物", value: 8.5 },
  { name: "爱美客", value: 6.2 },
  { name: "昊海生科", value: 4.8 },
  { name: "华东医药", value: -2.3 },
  { name: "贝泰妮", value: -3.1 },
]

const searchTrendData = [
  { date: "周一", value: 1200 },
  { date: "周二", value: 1800 },
  { date: "周三", value: 2400 },
  { date: "周四", value: 2100 },
  { date: "周五", value: 2800 },
  { date: "周六", value: 3200 },
  { date: "周日", value: 2900 },
]

const featuredArticle = {
  id: "featured-1",
  title: "2025医美行业白皮书：再生医学引领下一个十年",
  summary:
    "深度解析再生医学技术在医美领域的突破性应用，从干细胞疗法到生物材料创新，探讨行业未来发展的核心驱动力。本报告基于100+企业调研和50+专家访谈，为行业决策者提供前瞻性洞察。",
  author: "医美智库研究院",
  date: "2025-10-20",
  readTime: "15分钟",
  image: "/regenerative-medicine-whitepaper.jpg",
}

const deepInsights = [
  {
    id: "insight-1",
    title: "国产玻尿酸品牌突围战：技术创新vs营销驱动",
    summary: "分析华熙生物、爱美客等头部企业的竞争策略，探讨国产品牌如何在高端市场实现突破...",
    category: "市场分析",
    date: "2025-10-18",
    readTime: "12分钟",
    image: "/domestic-hyaluronic-acid-brands.jpg",
  },
  {
    id: "insight-2",
    title: "医美机构连锁化趋势：规模效应与服务质量的平衡",
    summary: "从新氧、美呗等平台数据出发，研究连锁医美机构的扩张模式和运营挑战...",
    category: "行业趋势",
    date: "2025-10-16",
    readTime: "10分钟",
    image: "/medical-beauty-chain-trend.jpg",
  },
]

const marketPulse = [
  {
    id: "pulse-1",
    type: "政策",
    content: "国家药监局发布《医疗美容器械临床试验指导原则》修订版",
    date: "2小时前",
  },
  {
    id: "pulse-2",
    type: "市场",
    content: "Q3医美市场规模达580亿元，同比增长18.5%",
    date: "5小时前",
  },
  {
    id: "pulse-3",
    type: "技术",
    content: "某头部企业推出AI辅助面部设计系统，准确率提升至95%",
    date: "8小时前",
  },
  {
    id: "pulse-4",
    type: "国际",
    content: "韩国医美巨头进军中国市场，投资10亿建研发中心",
    date: "1天前",
  },
]

const capitalDynamics = [
  {
    id: "capital-1",
    company: "再生医学科技",
    logo: "/company-logo-1.png",
    round: "B轮",
    amount: "5亿元",
    investors: "红杉中国、高瓴资本",
    date: "2025-10-19",
  },
  {
    id: "capital-2",
    company: "智能医美SaaS",
    logo: "/company-logo-2.png",
    round: "A+轮",
    amount: "2亿元",
    investors: "腾讯投资、IDG资本",
    date: "2025-10-17",
  },
  {
    id: "capital-3",
    company: "医美供应链平台",
    logo: "/company-logo-3.png",
    round: "战略投资",
    amount: "3亿元",
    investors: "阿里健康",
    date: "2025-10-15",
  },
]

const popularReports = [
  { id: "report-1", title: "2025中国医美行业发展趋势报告", isPro: true },
  { id: "report-2", title: "玻尿酸市场竞争格局分析", isPro: true },
  { id: "report-3", title: "医美机构数字化转型白皮书", isPro: true },
  { id: "report-4", title: "再生医学技术应用前景研究", isPro: true },
]

export function ThinkTankHomepage({ onNavigateToInsights, onNavigateToDataCenter, onArticleClick }: HomepageProps) {
  return (
    <div className="space-y-8">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-white/10 -mx-8 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">医美智库</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:text-blue-400">
              首页
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => onNavigateToInsights()}>
              深度观察
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={onNavigateToDataCenter}>
              数据中心
            </Button>
          </nav>
        </div>
      </div>

      {/* 首屏区域 - 封面文章 */}
      <Card
        className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all"
        onClick={() => onArticleClick(featuredArticle.id)}
      >
        <div className="flex gap-8 p-8">
          <div className="flex-1 space-y-4">
            <Badge className="bg-blue-500 text-white">本周封面</Badge>
            <h2 className="text-3xl font-bold text-white leading-tight">{featuredArticle.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{featuredArticle.summary}</p>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>{featuredArticle.author}</span>
              <span>·</span>
              <span>{featuredArticle.date}</span>
              <span>·</span>
              <span>预计阅读 {featuredArticle.readTime}</span>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              阅读全文
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="w-96 h-64 flex-shrink-0">
            <img
              src={featuredArticle.image || "/placeholder.svg?height=256&width=384"}
              alt={featuredArticle.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </Card>

      {/* 核心内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧主栏 (70%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 深度观察模块 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">深度观察</h2>
              <Button
                variant="ghost"
                className="text-blue-400 hover:text-blue-300"
                onClick={() => onNavigateToInsights()}
              >
                查看更多
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deepInsights.map((insight) => (
                <Card
                  key={insight.id}
                  className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all overflow-hidden group"
                  onClick={() => onArticleClick(insight.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={insight.image || "/placeholder.svg?height=192&width=384"}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-500 text-white">{insight.category}</Badge>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{insight.summary}</p>
                    <div className="flex items-center space-x-3 text-gray-500 text-xs">
                      <span>{insight.date}</span>
                      <span>·</span>
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 市场脉搏模块 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">市场脉搏</h2>
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="space-y-3">
                {marketPulse.map((pulse) => (
                  <div
                    key={pulse.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className={`flex-shrink-0 ${
                        pulse.type === "政策"
                          ? "border-red-500 text-red-400"
                          : pulse.type === "市场"
                            ? "border-blue-500 text-blue-400"
                            : pulse.type === "技术"
                              ? "border-green-500 text-green-400"
                              : "border-purple-500 text-purple-400"
                      }`}
                    >
                      {pulse.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-white text-sm">{pulse.content}</p>
                      <span className="text-gray-500 text-xs">{pulse.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 资本动态模块 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">资本动态</h2>
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">公司</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">轮次</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">金额</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">投资方</th>
                      <th className="text-left p-4 text-gray-400 text-sm font-medium">日期</th>
                    </tr>
                  </thead>
                  <tbody>
                    {capitalDynamics.map((item) => (
                      <tr key={item.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-white text-sm">{item.company}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {item.round}
                          </Badge>
                        </td>
                        <td className="p-4 text-white text-sm font-semibold">{item.amount}</td>
                        <td className="p-4 text-gray-400 text-sm">{item.investors}</td>
                        <td className="p-4 text-gray-500 text-sm">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* 右侧副栏 (30%) */}
        <div className="space-y-6">
          {/* 数据洞见模块 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">数据洞见</h2>

            {/* 股票涨跌幅图表 */}
            <Card className="bg-white/5 border-white/10 p-5 mb-4">
              <h3 className="text-white text-sm font-semibold mb-4">本周医美概念股涨跌幅 Top 5</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stockData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* 搜索趋势图表 */}
            <Card className="bg-white/5 border-white/10 p-5">
              <h3 className="text-white text-sm font-semibold mb-4">"再生材料" 关键词搜索指数</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={searchTrendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* 热门报告模块 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">热门报告</h2>
            <Card className="bg-white/5 border-white/10 p-5">
              <div className="space-y-3">
                {popularReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-2 flex-1">
                      <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white text-sm line-clamp-2">{report.title}</span>
                    </div>
                    {report.isPro && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2 border-blue-500 text-blue-400 text-xs bg-transparent"
                      >
                        下载
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
