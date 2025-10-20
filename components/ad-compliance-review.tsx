"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Search, Plus, Upload, FileText, AlertCircle, Sparkles, X, Download, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdComplianceReviewProps {
  onBack: () => void
}

interface SensitiveIssue {
  id: string
  keyword: string
  level: "high" | "medium" | "low"
  reason: string
  suggestion: string
  position?: { page?: number; line?: number; x?: number; y?: number }
}

export function AdComplianceReview({ onBack }: AdComplianceReviewProps) {
  const [activeTab, setActiveTab] = useState("content-review")

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* 顶部导航栏 */}
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-6 gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-slate-100">医美广告法审核</h1>
      </div>

      {/* 标签页切换 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 px-6">
          <TabsList className="bg-transparent border-0 h-12">
            <TabsTrigger
              value="content-review"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 text-slate-400 rounded-none px-6"
            >
              广告内容审核
            </TabsTrigger>
            <TabsTrigger
              value="keyword-management"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 text-slate-400 rounded-none px-6"
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
  const [selectedPlatform, setSelectedPlatform] = useState("douyin")
  const [contentType, setContentType] = useState<"text" | "image" | "document">("text")
  const [content, setContent] = useState("")
  const [isReviewed, setIsReviewed] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null)
  const reviewResultRef = useRef<HTMLDivElement>(null)

  const platforms = [
    { id: "douyin", name: "抖音", icon: "🎵" },
    { id: "wechat-channels", name: "视频号", icon: "💬" },
    { id: "kuaishou", name: "快手", icon: "⚡" },
    { id: "xiaohongshu", name: "小红书", icon: "📕" },
    { id: "xianyu", name: "闲鱼", icon: "🐟" },
    { id: "taobao", name: "淘宝", icon: "🛒" },
    { id: "pinduoduo", name: "拼多多", icon: "🍊" },
    { id: "jd", name: "京东", icon: "🐶" },
  ]

  const issues: SensitiveIssue[] = [
    {
      id: "issue-1",
      keyword: "最好",
      level: "high",
      reason: "使用了绝对化用语",
      suggestion: "建议修改为'优质的'或'先进的'",
      position: { page: 1, line: 3 },
    },
    {
      id: "issue-2",
      keyword: "永久",
      level: "high",
      reason: "夸大效果承诺",
      suggestion: "建议修改为'长效的'或'持久的'",
      position: { page: 2, line: 5 },
    },
    {
      id: "issue-3",
      keyword: "根治",
      level: "medium",
      reason: "医疗效果保证性用语",
      suggestion: "建议修改为'改善'或'缓解'",
      position: { page: 3, line: 2 },
    },
  ]

  const handleReview = () => {
    setIsReviewed(true)
  }

  const handleIssueClick = (issueId: string) => {
    setSelectedIssueId(issueId)
    const element = document.getElementById(issueId)
    if (element && reviewResultRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
      element.classList.add("animate-pulse")
      setTimeout(() => {
        element.classList.remove("animate-pulse")
      }, 2000)
    }
  }

  const handleKeywordClick = (issueId: string) => {
    setSelectedIssueId(issueId)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFiles([file])

      if (file.type.startsWith("image/")) {
        setContentType("image")
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else if (file.type === "application/pdf" || file.name.endsWith(".docx")) {
        setContentType("document")
        setPreviewUrl("")
      }
    }
  }

  const handleRemoveFile = () => {
    setUploadedFiles([])
    setPreviewUrl("")
    setContentType("text")
    setIsReviewed(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFiles([file])

      if (file.type.startsWith("image/")) {
        setContentType("image")
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else if (file.type === "application/pdf" || file.name.endsWith(".docx")) {
        setContentType("document")
        setPreviewUrl("")
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleExport = () => {
    if (contentType === "text") {
      const modifiedText = content.replace(/(最好|永久|根治)/g, (match) => {
        const replacements: Record<string, string> = {
          最好: "优质的",
          绝对: "非常",
          第一: "领先的",
          完美: "理想的",
          永久: "长效的",
          根治: "改善",
        }
        return replacements[match] || match
      })

      const blob = new Blob([modifiedText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "修改后的广告文案.txt"
      a.click()
      URL.revokeObjectURL(url)
    } else if (contentType === "image" || contentType === "document") {
      alert("正在导出修改后的文件...")
    }
  }

  return (
    <div className="flex h-full">
      {/* 左栏：输入区 */}
      <div className="w-1/3 border-r border-slate-700 bg-slate-800 p-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">选择投放平台</label>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {platforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id} className="text-slate-100">
                  <span className="mr-2">{platform.icon}</span>
                  {platform.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">输入广告内容或上传文件</label>

            {uploadedFiles.length === 0 ? (
              <>
                <Textarea
                  placeholder="请输入需要审核的广告文案，或点击下方上传图片/文档..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                    setContentType("text")
                  }}
                  className="min-h-[200px] resize-none bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 mb-3"
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-900/50"
                >
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-300">或点击/拖拽上传图片或文档</p>
                  <p className="text-xs text-slate-500 mt-1">支持 JPG、PNG、PDF、DOCX 格式</p>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded px-4 py-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {contentType === "image" ? (
                      <ImageIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate font-medium">{uploadedFiles[0].name}</p>
                      <p className="text-xs text-slate-500">{(uploadedFiles[0].size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-400"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {contentType === "image" && previewUrl && (
                  <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                    <img src={previewUrl || "/placeholder.svg"} alt="预览" className="w-full h-auto" />
                    {issues.map((issue, index) => (
                      <div
                        key={issue.id}
                        id={issue.id}
                        onClick={() => handleKeywordClick(issue.id)}
                        className={`absolute cursor-pointer transition-all ${
                          selectedIssueId === issue.id
                            ? "border-4 border-red-500 bg-red-500/40 ring-4 ring-red-400"
                            : "border-2 border-red-500 bg-red-500/20 hover:bg-red-500/30"
                        }`}
                        style={{
                          top: `${20 + index * 15}%`,
                          left: `${20 + index * 10}%`,
                          width: "120px",
                          height: "120px",
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {issue.keyword}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Button onClick={handleReview} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          开始审核
        </Button>
      </div>

      {/* 中栏：审核结果区 */}
      <div className="w-1/3 border-r border-slate-700 bg-slate-800 p-6">
        <h3 className="text-sm font-semibold text-slate-100 mb-4">审核结果</h3>
        <ScrollArea className="h-[calc(100vh-200px)]" ref={reviewResultRef}>
          {isReviewed ? (
            <>
              {contentType === "text" && (
                <div className="prose prose-sm prose-invert max-w-none text-slate-300 leading-relaxed">
                  {content.split(/(最好|永久|根治)/).map((part, index) => {
                    const issue = issues.find((i) => i.keyword === part)
                    if (issue) {
                      return (
                        <span
                          key={index}
                          id={issue.id}
                          onClick={() => handleKeywordClick(issue.id)}
                          className={`cursor-pointer px-1 rounded transition-all ${
                            selectedIssueId === issue.id
                              ? "bg-red-600 text-white ring-2 ring-red-400"
                              : "bg-red-900/50 text-red-300 hover:bg-red-800"
                          }`}
                        >
                          {part}
                        </span>
                      )
                    }
                    return <span key={index}>{part}</span>
                  })}
                </div>
              )}

              {contentType === "image" && previewUrl && (
                <div className="space-y-4">
                  <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                    <img src={previewUrl || "/placeholder.svg"} alt="审核结果" className="w-full h-auto" />
                    {issues.map((issue, index) => (
                      <div
                        key={issue.id}
                        id={issue.id}
                        onClick={() => handleKeywordClick(issue.id)}
                        className={`absolute cursor-pointer transition-all ${
                          selectedIssueId === issue.id
                            ? "border-4 border-red-500 bg-red-500/40 ring-4 ring-red-400"
                            : "border-2 border-red-500 bg-red-500/20 hover:bg-red-500/30"
                        }`}
                        style={{
                          top: `${20 + index * 15}%`,
                          left: `${20 + index * 10}%`,
                          width: "120px",
                          height: "120px",
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {issue.keyword}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-300">
                      检测到图片中包含敏感文字或图案，已用红框标注。点击红框查看详情。
                    </p>
                  </div>
                </div>
              )}

              {contentType === "document" && (
                <div className="space-y-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-200">{uploadedFiles[0]?.name}</p>
                        <p className="text-xs text-slate-500">文档审核结果 - 共3页</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-xs text-slate-500 font-semibold mb-2">第1页</div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          医美咨询师快速打消顾客怕受骗心理的5大招
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          因为资美丽、贪便宜、贪权威、贪专家而来到了你的医院，也因为怕而不和你签单，她怕上当、怕失败、怕后悔，很多顾客无非是害怕手术不成功，担心价格比的医院贵。对专医院不放心，担心方一做不好了怎么办？
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          如何打消顾客害怕的心理：你的形象要给顾客以安全感我们一直真实的一个理念就是，用90%的时间去获取顾客的信任，10%的时间来谈项目，其中咨询师的形象就是
                          <span
                            id="issue-1"
                            onClick={() => handleKeywordClick("issue-1")}
                            className={`cursor-pointer px-1 rounded transition-all ${
                              selectedIssueId === "issue-1"
                                ? "bg-red-600 text-white ring-2 ring-red-400"
                                : "bg-red-900/50 text-red-300 hover:bg-red-800"
                            }`}
                          >
                            最好
                          </span>
                          的信任点。
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-slate-500 font-semibold mb-2">第2页</div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          专业度有多深顾客信任就有多高咨询师真正需要的不是销售技巧多么，而是你的专业水平有多高。专业与不专业，你一开口，从外散发出对专业的自信度，就会赢得顾客的信赖，包装到位就是不一样！
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          坦诚告诉顾客可能存在的风险介绍完项目的优点之后，不要去隐瞒项目的风险，光其是女顾客，第六感觉非常强，看你顺眼就信你，所以咨询师千万要注意自己的补充，在形象、人格还是马虎，包装到位就是不一样！当你介绍完项目的优点之后，要坦诚地告诉顾客这个项目可能存在的风险，并提出解决的方案，而不是一味推销错价项目。让顾客感受到你心为她着想，而不是只想赚钱。这个项目的效果可以
                          <span
                            id="issue-2"
                            onClick={() => handleKeywordClick("issue-2")}
                            className={`cursor-pointer px-1 rounded transition-all ${
                              selectedIssueId === "issue-2"
                                ? "bg-red-600 text-white ring-2 ring-red-400"
                                : "bg-red-900/50 text-red-300 hover:bg-red-800"
                            }`}
                          >
                            永久
                          </span>
                          保持，让您的肌肤重返年轻态。
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-slate-500 font-semibold mb-2">第3页</div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          建立长期信任关系只关注一次性交易，而是要建立长期的信任关系。通过优质的服务和真诚的态度，让顾客成为你的忠实粉丝。当你介绍完项目的优点之后，不要去隐瞒项目的风险，并提出此方案，让顾客感受到你心为她着想。我们的治疗方案可以
                          <span
                            id="issue-3"
                            onClick={() => handleKeywordClick("issue-3")}
                            className={`cursor-pointer px-1 rounded transition-all ${
                              selectedIssueId === "issue-3"
                                ? "bg-red-600 text-white ring-2 ring-red-400"
                                : "bg-red-900/50 text-red-300 hover:bg-red-800"
                            }`}
                          >
                            根治
                          </span>
                          您的皮肤问题，让您重获自信。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">提交内容后将在此显示审核结果</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* 右栏：修改建议区 */}
      <div className="flex-1 bg-slate-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-100">修改建议</h3>
          {isReviewed && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              一键导出
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isReviewed ? (
            <div className="space-y-3">
              {issues.map((issue) => (
                <Card
                  key={issue.id}
                  onClick={() => handleIssueClick(issue.id)}
                  className={`p-4 border-l-4 cursor-pointer transition-all ${
                    selectedIssueId === issue.id
                      ? "border-l-red-600 bg-slate-700 border-slate-600 ring-2 ring-red-500"
                      : "border-l-red-500 bg-slate-800 border-slate-700 hover:bg-slate-750"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{issue.keyword}</span>
                      <Badge
                        variant={issue.level === "high" ? "destructive" : "secondary"}
                        className={issue.level === "high" ? "bg-red-900 text-red-200" : "bg-slate-700 text-slate-300"}
                      >
                        {issue.level === "high" ? "高风险" : "中风险"}
                      </Badge>
                      {issue.position && (
                        <span className="text-xs text-slate-500">
                          {issue.position.page && `第${issue.position.page}页`}
                          {issue.position.line && ` 第${issue.position.line}行`}
                        </span>
                      )}
                    </div>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{issue.reason}</p>
                  <div className="bg-blue-900/30 border border-blue-800 rounded p-3 mb-3">
                    <p className="text-sm text-blue-300">{issue.suggestion}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    一键替换
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
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
  const [isNewLibraryDialogOpen, setIsNewLibraryDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isNewKeywordDialogOpen, setIsNewKeywordDialogOpen] = useState(false)
  const [newLibraryName, setNewLibraryName] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [newKeywordLevel, setNewKeywordLevel] = useState("high")
  const [newKeywordSuggestion, setNewKeywordSuggestion] = useState("")
  const importFileRef = useRef<HTMLInputElement>(null)

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

  const handleCreateLibrary = () => {
    if (newLibraryName.trim()) {
      console.log("[v0] 创建新词库:", newLibraryName)
      setIsNewLibraryDialogOpen(false)
      setNewLibraryName("")
    }
  }

  const handleImportLibrary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("[v0] 导入词库文件:", file.name)
      setIsImportDialogOpen(false)
    }
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim() && newKeywordSuggestion.trim()) {
      console.log("[v0] 新增词条:", { word: newKeyword, level: newKeywordLevel, suggestion: newKeywordSuggestion })
      setIsNewKeywordDialogOpen(false)
      setNewKeyword("")
      setNewKeywordSuggestion("")
      setNewKeywordLevel("high")
    }
  }

  return (
    <div className="flex h-full">
      {/* 左侧词库列表 */}
      <div className="w-64 border-r border-slate-700 bg-slate-800 p-4">
        <div className="space-y-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            onClick={() => setIsNewLibraryDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            新建词库
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            onClick={() => setIsImportDialogOpen(true)}
          >
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
                  selectedLibrary === lib.id
                    ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                    : "hover:bg-slate-700 text-slate-300"
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
      <div className="flex-1 bg-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索词条..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsNewKeywordDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新增词条
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)]">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="text-slate-300">敏感词</TableHead>
                <TableHead className="text-slate-300">风险等级</TableHead>
                <TableHead className="text-slate-300">修改建议</TableHead>
                <TableHead className="text-right text-slate-300">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywords.map((keyword, index) => (
                <TableRow key={index} className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="font-medium text-slate-200">{keyword.word}</TableCell>
                  <TableCell>
                    <Badge
                      variant={keyword.level === "high" ? "destructive" : "secondary"}
                      className={keyword.level === "high" ? "bg-red-900 text-red-200" : "bg-slate-700 text-slate-300"}
                    >
                      {keyword.level === "high" ? "高风险" : "中风险"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">{keyword.suggestion}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2 text-slate-300 hover:text-slate-100">
                      编辑
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <Dialog open={isNewLibraryDialogOpen} onOpenChange={setIsNewLibraryDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100">新建词库</DialogTitle>
            <DialogDescription className="text-slate-400">创建一个新的敏感词库</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="library-name" className="text-slate-300">
                词库名称
              </Label>
              <Input
                id="library-name"
                placeholder="请输入词库名称"
                value={newLibraryName}
                onChange={(e) => setNewLibraryName(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewLibraryDialogOpen(false)}
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              取消
            </Button>
            <Button onClick={handleCreateLibrary} className="bg-blue-600 hover:bg-blue-700 text-white">
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100">导入词库</DialogTitle>
            <DialogDescription className="text-slate-400">从文件导入敏感词库（支持 CSV、Excel 格式）</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <input
              ref={importFileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleImportLibrary}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              onClick={() => importFileRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              选择文件
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsImportDialogOpen(false)}
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewKeywordDialogOpen} onOpenChange={setIsNewKeywordDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-slate-100">新增词条</DialogTitle>
            <DialogDescription className="text-slate-400">添加新的敏感词条</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-slate-300">
                敏感词
              </Label>
              <Input
                id="keyword"
                placeholder="请输入敏感词"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level" className="text-slate-300">
                风险等级
              </Label>
              <Select value={newKeywordLevel} onValueChange={setNewKeywordLevel}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="high" className="text-slate-100">
                    高风险
                  </SelectItem>
                  <SelectItem value="medium" className="text-slate-100">
                    中风险
                  </SelectItem>
                  <SelectItem value="low" className="text-slate-100">
                    低风险
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="suggestion" className="text-slate-300">
                修改建议
              </Label>
              <Input
                id="suggestion"
                placeholder="请输入修改建议"
                value={newKeywordSuggestion}
                onChange={(e) => setNewKeywordSuggestion(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewKeywordDialogOpen(false)}
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              取消
            </Button>
            <Button onClick={handleAddKeyword} className="bg-blue-600 hover:bg-blue-700 text-white">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
