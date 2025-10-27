"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Bookmark, Share2, Sun, Moon, Type, FileText, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DeepInsightsDetailProps {
  articleId: string
  onBack: () => void
}

const articleData = {
  id: "article-1",
  title: "国家药监局发布医美器械新规：三类器械审批流程优化",
  summary:
    "新规将三类医疗器械的审批时间从180天缩短至120天，同时加强了上市后监管要求。这一变化将显著影响医美器械企业的产品上市策略和市场竞争格局。",
  category: "监管法规",
  tags: ["政策解读", "医疗器械", "审批流程"],
  author: {
    name: "监管研究组",
    avatar: "/author-avatar.jpg",
    bio: "专注医美行业政策研究与合规分析",
  },
  date: "2025-10-20",
  readTime: "8分钟",
  image: "/nmpa-new-regulations.jpg",
  content: `
## 政策背景

2025年10月15日，国家药品监督管理局（NMPA）正式发布《医疗美容器械审评审批改革实施方案》，这是继2023年医美行业整顿以来，监管部门在制度层面的又一重大举措。

新规的核心目标是在保障安全性的前提下，提升审批效率，鼓励创新产品上市，同时加强全生命周期监管。

## 核心变化解读

### 1. 审批时限大幅缩短

三类医疗器械的审批时间从原来的180个工作日缩短至120个工作日，降幅达33%。这一变化将显著加快创新产品的上市速度。

对于企业而言，这意味着：
- 产品上市周期缩短2-3个月
- 研发投入的回报周期提前
- 市场竞争窗口期缩小

### 2. 临床试验要求优化

新规引入了"真实世界数据"作为临床评价的补充证据，允许企业在满足特定条件下，使用真实世界数据替代部分传统临床试验。

这一变化对于以下产品尤为重要：
- 已有同类产品上市的改良型产品
- 技术成熟度高的产品
- 风险等级相对较低的产品

### 3. 上市后监管加强

虽然审批流程优化，但新规同时加强了上市后监管要求：
- 建立产品全生命周期追溯系统
- 强制要求不良事件报告
- 定期提交产品质量分析报告

## 行业影响分析

### 对头部企业的影响

华熙生物、爱美客等头部企业将从新规中获益最多。这些企业拥有完善的研发体系和临床试验能力，能够快速适应新的审批要求。

预计头部企业的新品上市速度将提升30-40%，进一步巩固市场地位。

### 对中小企业的挑战

中小企业虽然也能享受审批提速的红利，但在上市后监管方面面临更大压力。建立完善的质量管理体系和不良事件监测系统需要大量投入。

### 对外资企业的机遇

新规对国产和进口产品一视同仁，外资企业的创新产品将更快进入中国市场。预计未来2-3年，将有一批国际领先的医美器械产品获批上市。

## 企业应对策略

### 1. 加快研发布局

企业应抓住审批提速的窗口期，加快创新产品的研发和临床试验进度。

### 2. 完善质量管理体系

提前建立符合新规要求的质量管理体系和不良事件监测系统，避免上市后因监管问题导致产品下架。

### 3. 关注真实世界数据

积极探索真实世界数据的收集和应用，降低临床试验成本，加快产品上市速度。

## 结语

此次新规的发布，标志着中国医美器械监管进入新阶段。在保障安全的前提下，监管部门正在积极推动行业创新和发展。

对于企业而言，这既是机遇也是挑战。只有那些能够快速适应新规要求，同时保持产品质量和安全性的企业，才能在未来的市场竞争中占据优势。
  `,
  relatedArticles: [
    {
      id: "related-1",
      title: "医美器械临床试验指南更新：真实世界数据应用详解",
      category: "政策解读",
      readTime: "6分钟",
    },
    {
      id: "related-2",
      title: "华熙生物、爱美客如何应对新监管政策",
      category: "企业分析",
      readTime: "10分钟",
    },
    {
      id: "related-3",
      title: "2025医美器械市场格局预测",
      category: "市场分析",
      readTime: "12分钟",
    },
  ],
}

export function DeepInsightsDetail({ articleId, onBack }: DeepInsightsDetailProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [showSummary, setShowSummary] = useState(false)
  const [readProgress, setReadProgress] = useState(0)

  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-slate-900" : "bg-white"} transition-colors duration-300`}>
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readProgress} className="h-1 rounded-none" />
      </div>

      {/* 顶部工具栏 */}
      <div
        className={`sticky top-0 z-40 ${isDarkMode ? "bg-slate-900/80" : "bg-white/80"} backdrop-blur-sm border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={isDarkMode ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-blue-600"}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-2">
            {/* 摘要速览 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSummary(!showSummary)}
              className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}
            >
              <FileText className="w-4 h-4 mr-1" />
              摘要
            </Button>

            {/* 字号调整 */}
            <div className="flex items-center space-x-1 border-l border-r px-2 border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("small")}
                className={`${fontSize === "small" ? "bg-white/20" : ""} ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                <Type className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("medium")}
                className={`${fontSize === "medium" ? "bg-white/20" : ""} ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                <Type className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("large")}
                className={`${fontSize === "large" ? "bg-white/20" : ""} ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                <Type className="w-5 h-5" />
              </Button>
            </div>

            {/* 夜间模式 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* 收藏 */}
            <Button
              variant="ghost"
              size="sm"
              className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}
            >
              <Bookmark className="w-4 h-4" />
            </Button>

            {/* 分享 */}
            <Button
              variant="ghost"
              size="sm"
              className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* 文章头部 */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500 text-white">{articleData.category}</Badge>
            {articleData.tags.map((tag) => (
              <Badge key={tag} variant="outline" className={isDarkMode ? "border-white/20 text-gray-400" : ""}>
                #{tag}
              </Badge>
            ))}
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} leading-tight`}>
            {articleData.title}
          </h1>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">监</span>
              </div>
              <div>
                <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {articleData.author.name}
                </p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{articleData.author.bio}</p>
              </div>
            </div>
          </div>

          <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{articleData.date}</span>
            </div>
            <span>·</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>预计阅读 {articleData.readTime}</span>
            </div>
          </div>
        </header>

        {/* 摘要速览 */}
        {showSummary && (
          <Card
            className={`mb-8 p-6 ${isDarkMode ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200"}`}
          >
            <h3 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>核心要点</h3>
            <ul className={`space-y-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>三类医疗器械审批时间从180天缩短至120天，降幅达33%</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>引入真实世界数据作为临床评价补充证据</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>加强上市后监管，建立全生命周期追溯系统</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>头部企业将获益最多，中小企业面临监管压力</span>
              </li>
              <li className="flex items-start space-x-2">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                <span>外资企业创新产品将更快进入中国市场</span>
              </li>
            </ul>
          </Card>
        )}

        {/* 文章主图 */}
        <div className="mb-12 rounded-xl overflow-hidden">
          <img
            src={articleData.image || "/placeholder.svg?height=400&width=800"}
            alt={articleData.title}
            className="w-full h-auto"
          />
        </div>

        {/* 正文内容 */}
        <div
          className={`prose prose-lg max-w-none ${isDarkMode ? "prose-invert" : ""} ${fontSizeClasses[fontSize]}`}
          style={{
            lineHeight: "1.8",
          }}
        >
          <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            {articleData.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className={`text-2xl font-bold mt-12 mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className={`text-xl font-semibold mt-8 mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                )
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {paragraph.replace("- ", "")}
                  </li>
                )
              }
              if (paragraph.trim() === "") {
                return <br key={index} />
              }
              return (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>

        {/* 作者简介 */}
        <Card className={`mt-12 p-6 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-xl">监</span>
            </div>
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {articleData.author.name}
              </h3>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{articleData.author.bio}</p>
            </div>
          </div>
        </Card>

        {/* 相关文章推荐 */}
        <div className="mt-12">
          <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>相关阅读</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articleData.relatedArticles.map((related) => (
              <Card
                key={related.id}
                className={`${isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50"} cursor-pointer transition-all`}
              >
                <div className="p-5 space-y-3">
                  <Badge className="bg-blue-500 text-white">{related.category}</Badge>
                  <h4
                    className={`font-semibold ${isDarkMode ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-blue-600"} transition-colors`}
                  >
                    {related.title}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    预计阅读 {related.readTime}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
