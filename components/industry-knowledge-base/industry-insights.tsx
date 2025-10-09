"use client"

import { Calendar, Tag, ExternalLink, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Insight {
  id: string
  title: string
  summary: string
  source: string
  publishDate: string
  category: string
  tags: string[]
  image: string
  readTime: string
}

const mockInsights: Insight[] = [
  {
    id: "1",
    title: "2025年医美行业发展趋势报告",
    summary:
      "根据最新市场调研数据,医美行业呈现年轻化、科技化、个性化三大趋势。轻医美项目增长迅速,AI技术在术前设计和效果预测中的应用日益广泛...",
    source: "医美行业协会",
    publishDate: "2025-09-20",
    category: "行业趋势",
    tags: ["市场分析", "发展趋势", "数据报告"],
    image: "/medical-beauty-industry-trend-2025.jpg",
    readTime: "8分钟",
  },
  {
    id: "2",
    title: "新型玻尿酸材料获批上市,持久性提升30%",
    summary:
      "某知名医美品牌研发的新一代玻尿酸产品通过国家药监局审批,采用创新交联技术,在保持安全性的同时显著提升了持久性和塑形效果...",
    source: "医美科技前沿",
    publishDate: "2025-09-18",
    category: "产品创新",
    tags: ["玻尿酸", "新品上市", "技术创新"],
    image: "/new-hyaluronic-acid-product.jpg",
    readTime: "5分钟",
  },
  {
    id: "3",
    title: "医美机构合规经营指南更新",
    summary:
      "国家卫健委发布最新版医美机构管理规范,对从业资质、设备管理、广告宣传等方面提出更严格要求。行业专家解读新规对机构运营的影响...",
    source: "医美监管动态",
    publishDate: "2025-09-15",
    category: "政策法规",
    tags: ["合规经营", "政策解读", "行业规范"],
    image: "/medical-beauty-compliance-guide.jpg",
    readTime: "10分钟",
  },
  {
    id: "4",
    title: "AI辅助诊断在皮肤管理中的应用案例",
    summary:
      "多家头部医美机构引入AI皮肤检测系统,通过深度学习算法分析皮肤状况,为客户提供个性化治疗方案。实际应用效果显著提升客户满意度...",
    source: "智慧医美",
    publishDate: "2025-09-12",
    category: "技术应用",
    tags: ["AI技术", "皮肤管理", "案例分享"],
    image: "/ai-skin-diagnosis-medical-beauty.jpg",
    readTime: "6分钟",
  },
]

interface IndustryInsightsProps {
  searchQuery: string
}

export function IndustryInsights({ searchQuery }: IndustryInsightsProps) {
  const filteredInsights = mockInsights.filter(
    (insight) =>
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* 筛选栏 */}
      <div className="flex items-center gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-40 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <SelectValue placeholder="分类筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="trend">行业趋势</SelectItem>
            <SelectItem value="product">产品创新</SelectItem>
            <SelectItem value="policy">政策法规</SelectItem>
            <SelectItem value="tech">技术应用</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="latest">
          <SelectTrigger className="w-40 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <SelectValue placeholder="时间排序" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">最新发布</SelectItem>
            <SelectItem value="popular">最受欢迎</SelectItem>
            <SelectItem value="recommended">推荐阅读</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 资讯列表 */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <Card
            key={insight.id}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="flex gap-5 p-5">
              {/* 左侧图片 */}
              <div className="flex-shrink-0">
                <img
                  src={insight.image || "/placeholder.svg"}
                  alt={insight.title}
                  className="w-64 h-40 object-cover rounded-lg"
                />
              </div>

              {/* 右侧内容 */}
              <div className="flex-1 flex flex-col">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-blue-500/90 text-white">{insight.category}</Badge>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{insight.publishDate}</span>
                      <span className="mx-2">·</span>
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl mb-2 hover:text-blue-400 cursor-pointer transition-colors">
                    {insight.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">来源: {insight.source}</CardDescription>
                </CardHeader>

                <CardContent className="p-0 flex-1">
                  <p className="text-gray-300 text-sm line-clamp-2 mb-3">{insight.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {insight.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white/5 border-white/20 text-gray-300">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-3 flex items-center gap-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    阅读全文
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Bookmark className="w-4 h-4 mr-1" />
                    收藏
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    分享
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
