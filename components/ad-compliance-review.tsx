"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus, Upload, FileText, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AdComplianceReviewProps {
  onBack: () => void
}

export function AdComplianceReview({ onBack }: AdComplianceReviewProps) {
  const [activeTab, setActiveTab] = useState("content-review")

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* 顶部导航栏 */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-900">医美广告法审核</h1>
      </div>

      {/* 标签页切换 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-6">
          <TabsList className="bg-transparent border-0 h-12">
            <TabsTrigger
              value="content-review"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              广告内容审核
            </TabsTrigger>
            <TabsTrigger
              value="keyword-management"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              敏感词库维护
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 广告内容审核 */}
        <TabsContent value="content-review" className="flex-1 m-0">
          <ContentReview />
        </TabsContent>

        {/* 敏感词库维护 */}
        <TabsContent value="keyword-management" className="flex-1 m-0">
          <KeywordManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 广告内容审核组件
function ContentReview() {
  const [content, setContent] = useState("")
  const [isReviewed, setIsReviewed] = useState(false)
  const [highlightedContent, setHighlightedContent] = useState("")

  const handleReview = () => {
    // 模拟审核逻辑
    const highlighted = content.replace(
      /(最好|绝对|第一|完美|永久|根治)/g,
      '<span class="bg-red-200 text-red-900 px-1 rounded">$1</span>',
    )
    setHighlightedContent(highlighted)
    setIsReviewed(true)
  }

  const issues = [
    {
      keyword: "最好",
      level: "high",
      reason: "使用了绝对化用语",
      suggestion: "建议修改为'优质的'或'先进的'",
    },
    {
      keyword: "永久",
      level: "high",
      reason: "夸大效果承诺",
      suggestion: "建议修改为'长效的'或'持久的'",
    },
    {
      keyword: "根治",
      level: "medium",
      reason: "医疗效果保证性用语",
      suggestion: "建议修改为'改善'或'缓解'",
    },
  ]

  return (
    <div className="flex h-full">
      {/* 左栏：输入区 */}
      <div className="w-1/3 border-r border-slate-200 bg-white p-6 flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">输入广告文案</label>
            <Textarea
              placeholder="请输入需要审核的广告文案..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">上传图片/文档</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">点击或拖拽文件到此处上传</p>
              <p className="text-xs text-slate-400 mt-1">支持 JPG、PNG、PDF 格式</p>
            </div>
          </div>
        </div>

        <Button onClick={handleReview} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
          <Sparkles className="w-4 h-4 mr-2" />
          开始审核
        </Button>
      </div>

      {/* 中栏：审核结果区 */}
      <div className="w-1/3 border-r border-slate-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">审核结果</h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isReviewed ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: highlightedContent || "暂无内容" }}
            />
          ) : (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">提交内容后将在此显示审核结果</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* 右栏：修改建议区 */}
      <div className="flex-1 bg-slate-50 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">修改建议</h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isReviewed ? (
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <Card key={index} className="p-4 border-l-4 border-l-red-500">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{issue.keyword}</span>
                      <Badge variant={issue.level === "high" ? "destructive" : "secondary"}>
                        {issue.level === "high" ? "高风险" : "中风险"}
                      </Badge>
                    </div>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{issue.reason}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                    <p className="text-sm text-blue-900">{issue.suggestion}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    一键替换
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">审核后将在此显示修改建议</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

// 敏感词库维护组件
function KeywordManagement() {
  const [selectedLibrary, setSelectedLibrary] = useState("medical-terms")
  const [searchQuery, setSearchQuery] = useState("")

  const libraries = [
    { id: "medical-terms", name: "医疗术语违禁词", count: 156 },
    { id: "effect-claims", name: "功效描述慎用词", count: 89 },
    { id: "absolute-words", name: "绝对化用语", count: 45 },
    { id: "comparison-words", name: "比较级用语", count: 67 },
  ]

  const keywords = [
    { word: "最好", level: "high", suggestion: "优质的、先进的" },
    { word: "第一", level: "high", suggestion: "领先的、前沿的" },
    { word: "永久", level: "high", suggestion: "长效的、持久的" },
    { word: "根治", level: "medium", suggestion: "改善、缓解" },
    { word: "完美", level: "medium", suggestion: "理想的、满意的" },
  ]

  return (
    <div className="flex h-full">
      {/* 左侧词库列表 */}
      <div className="w-64 border-r border-slate-200 bg-white p-4">
        <div className="space-y-2 mb-4">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            新建词库
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Upload className="w-4 h-4 mr-2" />
            导入词库
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="space-y-1">
            {libraries.map((lib) => (
              <button
                key={lib.id}
                onClick={() => setSelectedLibrary(lib.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedLibrary === lib.id ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-medium text-sm">{lib.name}</div>
                <div className="text-xs text-slate-500">{lib.count} 个词条</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 右侧词条表格 */}
      <div className="flex-1 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索词条..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新增词条
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>敏感词</TableHead>
                <TableHead>风险等级</TableHead>
                <TableHead>修改建议</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{keyword.word}</TableCell>
                  <TableCell>
                    <Badge variant={keyword.level === "high" ? "destructive" : "secondary"}>
                      {keyword.level === "high" ? "高风险" : "中风险"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{keyword.suggestion}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      编辑
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
