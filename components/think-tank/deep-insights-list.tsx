"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock } from "lucide-react"

interface DeepInsightsListProps {
  selectedCategory: string
  onArticleClick: (articleId: string) => void
  onBack: () => void
}

const categories = [
  { id: "all", label: "全部", count: 48 },
  { id: "hot-news", label: "热点资讯", count: 15 },
  { id: "regulations", label: "监管法规", count: 12 },
  { id: "brands", label: "医美品牌", count: 10 },
  { id: "conferences", label: "学术会议", count: 11 },
]

const articles = [
  {
    id: "article-1",
    title: "国家药监局发布医美器械新规：三类器械审批流程优化",
    summary:
      "新规将三类医疗器械的审批时间从180天缩短至120天，同时加强了上市后监管要求。这一变化将显著影响医美器械企业的产品上市策略...",
    category: "regulations",
    tags: ["政策解读", "医疗器械", "审批流程"],
    author: "监管研究组",
    date: "2025-10-20",
    readTime: "8分钟",
    image: "/nmpa-new-regulations.jpg",
    featured: true,
  },
  {
    id: "article-2",
    title: "华熙生物Q3财报解读：玻尿酸业务增长放缓，多元化战略成效初显",
    summary:
      "华熙生物第三季度营收同比增长12%，低于市场预期。但其在护肤品和功能性食品领域的布局开始贡献显著收入，占比达到35%...",
    category: "brands",
    tags: ["财报分析", "华熙生物", "多元化"],
    author: "企业研究组",
    date: "2025-10-19",
    readTime: "12分钟",
    image: "/hisun-q3-report.jpg",
    featured: false,
  },
  {
    id: "article-3",
    title: "2025中国医美大会：再生医学成为最热议题",
    summary:
      "在刚刚结束的中国医美大会上，超过60%的主题演讲涉及再生医学技术。干细胞疗法、外泌体应用、组织工程等前沿技术引发行业广泛关注...",
    category: "conferences",
    tags: ["学术会议", "再生医学", "行业趋势"],
    author: "会议报道组",
    date: "2025-10-18",
    readTime: "10分钟",
    image: "/china-medical-beauty-conference.jpg",
    featured: false,
  },
  {
    id: "article-4",
    title: "轻医美市场规模突破千亿：水光针、热玛吉成增长主力",
    summary:
      "2025年轻医美市场规模预计达到1200亿元，其中水光针和热玛吉项目占比超过40%。消费者年轻化趋势明显，25-35岁群体成为主力...",
    category: "hot-news",
    tags: ["市场分析", "轻医美", "消费趋势"],
    author: "市场研究组",
    date: "2025-10-17",
    readTime: "9分钟",
    image: "/light-medical-beauty-market.jpg",
    featured: false,
  },
  {
    id: "article-5",
    title: "爱美客新品发布：第四代玻尿酸持久性提升50%",
    summary:
      "爱美客推出的第四代玻尿酸产品采用专利交联技术，临床试验显示持久性较上一代提升50%，同时降低了不良反应发生率...",
    category: "brands",
    tags: ["新品速递", "爱美客", "技术创新"],
    author: "产品研究组",
    date: "2025-10-16",
    readTime: "7分钟",
    image: "/aimike-new-product.jpg",
    featured: false,
  },
  {
    id: "article-6",
    title: "医美广告合规新要求：禁止使用特定词汇",
    summary:
      "市场监管总局发布医美广告合规指南，明确禁止使用夸大效果的词汇，如'速效'、'永久'等，要求所有广告必须标注风险提示。违规企业将面临最高50万元罚款...",
    category: "regulations",
    tags: ["广告合规", "监管政策", "风险提示"],
    author: "合规研究组",
    date: "2025-10-15",
    readTime: "6分钟",
    image: "/medical-beauty-ad-compliance.jpg",
    featured: false,
  },
]

export function DeepInsightsList({ selectedCategory, onArticleClick, onBack }: DeepInsightsListProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTag = !selectedTag || article.tags.includes(selectedTag)
    return matchesCategory && matchesSearch && matchesTag
  })

  const featuredArticles = filteredArticles.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)))

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">深度洞察</h1>
        <p className="text-gray-400 mt-1">专业视角,深度解读医美行业</p>
      </div>

      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="搜索文章标题、内容或标签..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
        />
      </div>

      {/* 分类筛选 */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={
              activeCategory === category.id
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }
            onClick={() => {
              setActiveCategory(category.id)
              setSelectedTag(null)
            }}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2 bg-white/20">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* 标签筛选 */}
      {selectedTag && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">当前筛选:</span>
          <Badge className="bg-blue-500 text-white">
            #{selectedTag}
            <button onClick={() => setSelectedTag(null)} className="ml-2 hover:text-gray-200">
              ×
            </button>
          </Badge>
        </div>
      )}

      {/* 头条文章 */}
      {featuredArticles.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">头条推荐</h2>
          {featuredArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all mb-4"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="flex gap-6 p-6">
                <div className="w-80 h-48 flex-shrink-0">
                  <img
                    src={article.image || "/placeholder.svg?height=192&width=320"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-500 text-white">头条</Badge>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {categories.find((c) => c.id === article.category)?.label}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{article.summary}</p>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <span>{article.author}</span>
                    <span>·</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/20 text-gray-300 hover:bg-white/10 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedTag(tag)
                        }}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 文章列表 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {activeCategory === "all" ? "全部文章" : categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <span className="text-gray-400 text-sm">共 {regularArticles.length} 篇文章</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <Card
              key={article.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer transition-all overflow-hidden group"
              onClick={() => onArticleClick(article.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg?height=192&width=384"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-blue-500/90 text-white">
                  {categories.find((c) => c.id === article.category)?.label}
                </Badge>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{article.summary}</p>
                <div className="flex items-center space-x-2 flex-wrap">
                  {article.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-white/20 text-gray-400 text-xs hover:bg-white/10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTag(tag)
                      }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-gray-500 text-xs pt-2 border-t border-white/10">
                  <span>{article.author}</span>
                  <div className="flex items-center space-x-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {regularArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">未找到匹配的文章</p>
          </div>
        )}

        {regularArticles.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              加载更多
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
