"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Menu,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Send,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Undo,
  Redo,
  Smile,
  MoreVertical,
  FileText,
  Download,
  Maximize2,
  Network,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface BookReaderProps {
  bookTitle: string
  onBack: () => void
}

export function BookReader({ bookTitle, onBack }: BookReaderProps) {
  const [zoom, setZoom] = useState(100)
  const [activeTab, setActiveTab] = useState("chat")
  const [aiQuestion, setAiQuestion] = useState("")
  const [deepThinking, setDeepThinking] = useState(false)
  const [leftWidth, setLeftWidth] = useState(60)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [rewriteTab, setRewriteTab] = useState("settings")
  const [rewriteMethod, setRewriteMethod] = useState("summary")
  const [rewriteSources, setRewriteSources] = useState<string[]>(["document"])
  const [rewriteDescription, setRewriteDescription] = useState("")
  const [targetAudience, setTargetAudience] = useState("customer")
  const [writingStyle, setWritingStyle] = useState("wechat")
  const [mindmapTab, setMindmapTab] = useState("generate")
  const [mindmapView, setMindmapView] = useState("map")
  const [mindmapRequirement, setMindmapRequirement] = useState("")
  const [mindmapLanguage, setMindmapLanguage] = useState("chinese")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      if (newLeftWidth >= 30 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="fixed left-20 top-0 right-0 bottom-0 bg-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-14 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-slate-700"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-700">
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-white font-medium text-sm">{bookTitle}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-slate-700"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm min-w-[60px] text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-slate-700"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-700">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* 左侧文档内容 */}
        <div style={{ width: `${leftWidth}%` }} className="flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 bg-white">
            <div className="max-w-4xl mx-auto p-12" style={{ fontSize: `${zoom}%` }}>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">医美咨询师快速打消顾客怕受骗心理的5大招2页</h1>

              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  原文链接:{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    https://mp.weixin.qq.com/s/4FXhgT9QnwsDKf1uLgPyvw
                  </a>
                </p>
              </div>

              <p className="text-gray-700 mb-6">医美咨询师快速打消顾客害怕的心理的5大招</p>

              <div className="space-y-6 text-gray-800 leading-relaxed">
                <p>
                  顾客因为资美丽、贪便宜、贪权威、贪专家而来到了你的医院，也因为怕而不和你签单，她怕上当、怕失败、怕疼痛、怕后悔,很多顾客无非是害怕手术不成功,担心价格比的医院贵。对专家和医院不放心,担心方一做不好了怎么办?
                </p>

                <p className="font-medium">如何打消顾客害怕的心理:</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">1. 你的形象要给顾客以安全感</p>
                    <p>
                      以前我们一直真实的一个理念就是,用90%的时间去获取顾客的信任,
                      10%的时间来谈项目,其中咨询师的形象就是第一位重要的信任点。
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">2. 专业度有多深顾客信任就有多高</p>
                    <p>
                      咨询师真正需要的不是销售技巧多么多,而是你的专业水平有多高。专业与不专业,你一开口,从你向外散发出对专业的自信度,就会赢得顾客的信赖,包装到位就是不一样!
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">3. 坦诚告诉顾客可能存在的风险</p>
                    <p>
                      当你介绍完项目的优点之后,不要去隐瞒项目的风险,光其是女顾客,第六感意非常强,看你顺眼就会不信你,所以咨询师千万要注意自己的补充,在形象、人格还是马虎,包装到位就是不一样!告诉她是否值得信任你,所以咨询师千万要注意自己的补充。
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">4. 给出合理的方案建议</p>
                    <p>
                      根据顾客的实际情况和需求,给出最适合她的方案,而不是一味推销高价项目。让顾客感受到你是真心为她着想,而不是只想赚钱。
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">5. 建立长期信任关系</p>
                    <p>
                      不要只关注一次性交易,而是要建立长期的信任关系。通过优质的服务和真诚的态度,让顾客成为你的忠实客户和口碑传播者。
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">6. 提供完善的售后服务</p>
                    <p>
                      让顾客知道,无论何时遇到问题,你都会在她身边提供支持和帮助。完善的售后服务是建立信任的重要环节。
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">总结</h3>
                  <p>
                    打消顾客的顾虑需要从多个方面入手,包括个人形象、专业能力、诚信态度、合理方案等。只有真正站在顾客的角度思考问题,才能赢得顾客的信任和认可。
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div
          className="w-1 bg-slate-700 hover:bg-blue-500 cursor-col-resize transition-colors relative group flex-shrink-0"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20" />
        </div>

        {/* 右侧AI功能面板 */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col overflow-hidden bg-slate-800/50 backdrop-blur-sm"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-transparent border-b border-slate-700 rounded-none h-12 px-4 flex-shrink-0">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-slate-700 text-gray-300 data-[state=active]:text-white"
              >
                对话
              </TabsTrigger>
              <TabsTrigger
                value="mindmap"
                className="data-[state=active]:bg-slate-700 text-gray-300 data-[state=active]:text-white"
              >
                思维导图
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-slate-700 text-gray-300 data-[state=active]:text-white"
              >
                笔记
              </TabsTrigger>
              <TabsTrigger
                value="rewrite"
                className="data-[state=active]:bg-slate-700 text-gray-300 data-[state=active]:text-white"
              >
                改写
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  {/* 全文概述 */}
                  <div className="space-y-3">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      全文概述
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>已深度思考</span>
                      <span>原文共计3200字，读完预计5分钟。</span>
                      <a href="#" className="text-blue-400 hover:underline">
                        AI在5s内完成阅读并生成总结
                      </a>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-gray-300 text-sm leading-relaxed">
                      <p>
                        本文主要讲述医美咨询师如何快速打消顾客的受骗心理，建立信任关系。文章指出顾客因为追求美丽、便宜、权威而来，但又因为害怕上当、失败、疼痛而犹豫不决。
                      </p>
                      <p>
                        文章提出了5大核心策略：1. 通过专业形象建立安全感；2. 展示专业度赢得信任；3.
                        坦诚告知风险体现诚信；4. 提供合理方案而非盲目推销；5. 建立长期关系而非一次性交易。
                      </p>
                      <p>
                        这些策略的核心思想是：用90%的时间获取信任，10%的时间谈项目。咨询师需要从形象、专业、诚信、方案等多个维度入手，真正站在顾客角度思考问题，才能赢得顾客的信任和认可。
                      </p>
                    </div>
                  </div>

                  {/* 您可以提问我这些 */}
                  <div className="space-y-3">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      您可以提问我这些
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        帮我总结文档中的核心要点，包括不限于关键策略、实施方法、注意事项等。
                        <span className="ml-auto text-blue-400">→</span>
                      </button>
                      <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        为什么说用90%的时间获取信任比谈项目更重要？
                        <span className="ml-auto text-blue-400">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* 底部输入框 */}
              <div className="p-4 border-t border-slate-700 flex-shrink-0">
                <div className="relative">
                  <Textarea
                    placeholder="请输入您的问题，点击发送按钮进行对话"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-12 resize-none"
                    rows={3}
                  />
                  <Button size="icon" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <FileText className="w-4 h-4 mr-1" />
                    包网通用
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">深度思考R1</span>
                    <Switch checked={deepThinking} onCheckedChange={setDeepThinking} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mindmap" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <div className="border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center px-4">
                  <button
                    className={`px-4 py-3 text-sm ${mindmapTab === "generate" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    onClick={() => setMindmapTab("generate")}
                  >
                    生成思维导图
                  </button>
                  <button
                    className={`px-4 py-3 text-sm ${mindmapTab === "history" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    onClick={() => setMindmapTab("history")}
                  >
                    导图生成记录
                  </button>
                </div>
              </div>

              {mindmapTab === "generate" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">生成结果</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={mindmapView === "outline" ? "default" : "ghost"}
                            onClick={() => setMindmapView("outline")}
                            className={mindmapView === "outline" ? "bg-blue-600" : "text-gray-300"}
                          >
                            大纲
                          </Button>
                          <Button
                            size="sm"
                            variant={mindmapView === "map" ? "default" : "ghost"}
                            onClick={() => setMindmapView("map")}
                            className={mindmapView === "map" ? "bg-blue-600" : "text-gray-300"}
                          >
                            导图
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-300">
                            <Download className="w-4 h-4 mr-1" />
                            下载
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-300">
                            <Maximize2 className="w-4 h-4 mr-1" />
                            全屏
                          </Button>
                        </div>
                      </div>

                      {/* 思维导图展示 */}
                      <div className="bg-slate-700/30 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <Network className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                          <p className="text-gray-400">点击"立即生成"按钮</p>
                          <p className="text-gray-500 text-sm mt-2">AI将自动分析文档内容并生成思维导图</p>
                        </div>
                      </div>

                      {/* 生成要求 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">
                          生成要求<span className="text-red-400">（必填）</span>
                        </h3>
                        <Textarea
                          placeholder="请输入生成思维导图的需求。例如，分析文档的核心要点、关键信息、核心术语，用300字来总结全文的主要内容，要求逻辑严谨和逻辑构清晰。"
                          value={mindmapRequirement}
                          onChange={(e) => setMindmapRequirement(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[100px]"
                        />
                      </div>

                      {/* 输出语言 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">输出语言：</h3>
                        <div className="flex items-center gap-4">
                          <button
                            className={`px-4 py-2 rounded-lg ${mindmapLanguage === "chinese" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                            onClick={() => setMindmapLanguage("chinese")}
                          >
                            中文
                          </button>
                          <button
                            className={`px-4 py-2 rounded-lg ${mindmapLanguage === "english" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                            onClick={() => setMindmapLanguage("english")}
                          >
                            英文
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-slate-700 flex-shrink-0">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      立即生成
                    </Button>
                  </div>
                </div>
              )}

              {mindmapTab === "history" && (
                <div className="flex-1 p-4">
                  <div className="text-gray-400 text-center py-8">暂无生成记录</div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="flex-1 flex flex-col mt-0 overflow-hidden">
              {/* 富文本编辑器工具栏 */}
              <div className="border-b border-slate-700 p-2 space-y-2 flex-shrink-0">
                {/* 第一行工具栏 */}
                <div className="flex items-center gap-1 flex-wrap">
                  <Select defaultValue="normal">
                    <SelectTrigger className="w-20 h-8 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">正文</SelectItem>
                      <SelectItem value="h1">标题1</SelectItem>
                      <SelectItem value="h2">标题2</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="w-px h-6 bg-slate-600 mx-1" />
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-slate-600 mx-1" />
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 text-xs">
                    默认字号
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 text-xs">
                    默认字体
                  </Button>
                </div>

                {/* 第二行工具栏 */}
                <div className="flex items-center gap-1 flex-wrap">
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 text-xs">
                    默认行高
                  </Button>
                  <div className="w-px h-6 bg-slate-600 mx-1" />
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-slate-600 mx-1" />
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 笔记内容区域 */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <Input
                    placeholder="请输入标题"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 text-lg font-medium"
                  />
                  <Textarea
                    placeholder="请输入内容..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[400px] resize-none"
                  />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="rewrite" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <div className="border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center px-4">
                  <button
                    className={`px-4 py-3 text-sm ${rewriteTab === "settings" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    onClick={() => setRewriteTab("settings")}
                  >
                    改写设置
                  </button>
                  <button
                    className={`px-4 py-3 text-sm ${rewriteTab === "result" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    onClick={() => setRewriteTab("result")}
                  >
                    改写结果
                  </button>
                </div>
              </div>

              {rewriteTab === "settings" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6">
                      {/* 改写方式 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">
                          改写方式<span className="text-red-400">（必填）</span>
                        </h3>
                        <RadioGroup value={rewriteMethod} onValueChange={setRewriteMethod}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="summary" id="summary" />
                            <Label htmlFor="summary" className="text-gray-300">
                              全文总结
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="polish" id="polish" />
                            <Label htmlFor="polish" className="text-gray-300">
                              逐段润色
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* 信息来源 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">信息来源</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="document"
                              checked={rewriteSources.includes("document")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setRewriteSources([...rewriteSources, "document"])
                                } else {
                                  setRewriteSources(rewriteSources.filter((s) => s !== "document"))
                                }
                              }}
                            />
                            <Label htmlFor="document" className="text-gray-300">
                              当前文档内容
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="chat"
                              checked={rewriteSources.includes("chat")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setRewriteSources([...rewriteSources, "chat"])
                                } else {
                                  setRewriteSources(rewriteSources.filter((s) => s !== "chat"))
                                }
                              }}
                            />
                            <Label htmlFor="chat" className="text-gray-300">
                              当前AI对话
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="notes"
                              checked={rewriteSources.includes("notes")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setRewriteSources([...rewriteSources, "notes"])
                                } else {
                                  setRewriteSources(rewriteSources.filter((s) => s !== "notes"))
                                }
                              }}
                            />
                            <Label htmlFor="notes" className="text-gray-300">
                              笔记内容
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="knowledge" disabled />
                            <Label htmlFor="knowledge" className="text-gray-500">
                              知识库（敬请期待）
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* 优化描述 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">
                          优化描述<span className="text-red-400">（必填）</span>
                        </h3>
                        <Textarea
                          placeholder="请输入全文总结的需求。例如，分析文档的核心要点、关键信息、核心术语，用300字来总结全文的主要内容，要求逻辑严谨和逻辑构清晰。"
                          value={rewriteDescription}
                          onChange={(e) => setRewriteDescription(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 min-h-[100px]"
                        />
                      </div>

                      {/* 目标读者是 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">目标读者是</h3>
                        <div className="flex flex-wrap gap-2">
                          {["customer", "staff", "doctor", "nurse"].map((audience) => (
                            <button
                              key={audience}
                              className={`px-4 py-2 rounded-lg ${targetAudience === audience ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                              onClick={() => setTargetAudience(audience)}
                            >
                              {audience === "customer" && "医美客户"}
                              {audience === "staff" && "医护人员"}
                              {audience === "doctor" && "医美师"}
                              {audience === "nurse" && "护士"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 预期写作风格 */}
                      <div className="space-y-3">
                        <h3 className="text-white font-medium">预期写作风格</h3>
                        <div className="flex flex-wrap gap-2">
                          {["wechat", "xiaohongshu", "douyin"].map((style) => (
                            <button
                              key={style}
                              className={`px-4 py-2 rounded-lg ${writingStyle === style ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}
                              onClick={() => setWritingStyle(style)}
                            >
                              {style === "wechat" && "公众号"}
                              {style === "xiaohongshu" && "小红书"}
                              {style === "douyin" && "抖音"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-slate-700 flex-shrink-0">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      立即生成
                    </Button>
                  </div>
                </div>
              )}

              {rewriteTab === "result" && (
                <div className="flex-1 p-4">
                  <div className="text-gray-400 text-center py-8">请先在改写设置中配置并生成内容</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
