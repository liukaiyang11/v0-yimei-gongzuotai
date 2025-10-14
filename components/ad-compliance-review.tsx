"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Search, Plus, Upload, FileText, AlertCircle, Sparkles, X } from "lucide-react"
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
  const [content, setContent] = useState("")
  const [isReviewed, setIsReviewed] = useState(false)
  const [highlightedContent, setHighlightedContent] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleReview = () => {
    // 模拟审核逻辑
    const highlighted = content.replace(
      /(最好|绝对|第一|完美|永久|根治)/g,
      '<span class="bg-red-900/50 text-red-300 px-1 rounded">$1</span>',
    )
    setHighlightedContent(highlighted)
    setIsReviewed(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
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
      <div className="w-1/3 border-r border-slate-700 bg-slate-800 p-6 flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">输入广告文案</label>
            <Textarea
              placeholder="请输入需要审核的广告文案..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">上传图片/文档</label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-900/50"
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-300">点击或拖拽文件到此处上传</p>
              <p className="text-xs text-slate-500 mt-1">支持 JPG、PNG、PDF 格式</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300 truncate">{file.name}</span>
                      <span className="text-xs text-slate-500 flex-shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-slate-400 hover:text-red-400"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
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
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isReviewed ? (
            <div
              className="prose prose-sm prose-invert max-w-none text-slate-300"
              dangerouslySetInnerHTML={{ __html: highlightedContent || "暂无内容" }}
            />
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
        <h3 className="text-sm font-semibold text-slate-100 mb-4">修改建议</h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {isReviewed ? (
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <Card key={index} className="p-4 border-l-4 border-l-red-500 bg-slate-800 border-slate-700">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">{issue.keyword}</span>
                      <Badge
                        variant={issue.level === "high" ? "destructive" : "secondary"}
                        className={issue.level === "high" ? "bg-red-900 text-red-200" : "bg-slate-700 text-slate-300"}
                      >
                        {issue.level === "high" ? "高风险" : "中风险"}
                      </Badge>
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
