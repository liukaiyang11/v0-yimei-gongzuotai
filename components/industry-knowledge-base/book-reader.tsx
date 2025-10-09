"use client"

import { useState, useRef, useEffect } from "react"
import { Home, Menu, ZoomIn, ZoomOut, HelpCircle, Sparkles, Network, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BookReaderProps {
  bookTitle: string
  onBack: () => void
}

export function BookReader({ bookTitle, onBack }: BookReaderProps) {
  const [zoom, setZoom] = useState(100)
  const [activeTab, setActiveTab] = useState("guide")
  const [aiQuestion, setAiQuestion] = useState("")
  const [deepThinking, setDeepThinking] = useState(false)
  const [leftWidth, setLeftWidth] = useState(60) // 左侧占60%
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // 限制宽度在30%到80%之间
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
    <div className="bg-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-14 border-b border-white/10 bg-slate-800/50 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-white/10"
            onClick={onBack}
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-white font-medium text-sm max-w-md truncate">{bookTitle}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-white text-sm min-w-[60px] text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* 左侧文档内容 */}
        <div style={{ width: `${leftWidth}%` }} className="flex flex-col overflow-hidden">
          <div className="flex-1 bg-white overflow-y-auto">
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

              <p className="text-gray-700 mb-6">医美咨询师快速打消顾客怕受骗心理的5大招</p>

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
          </div>
        </div>

        <div
          className="w-1 bg-white/10 hover:bg-blue-500 cursor-col-resize transition-colors relative group flex-shrink-0"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20" />
        </div>

        {/* 右侧AI功能面板 */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col overflow-hidden bg-slate-800/30 backdrop-blur-sm"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none h-12 p-0 flex-shrink-0">
              <TabsTrigger
                value="guide"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-300 data-[state=active]:text-white"
              >
                导读
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-300 data-[state=active]:text-white"
              >
                对话
              </TabsTrigger>
              <TabsTrigger
                value="mindmap"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-300 data-[state=active]:text-white"
              >
                思维导图
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-300 data-[state=active]:text-white"
              >
                笔记
              </TabsTrigger>
              <TabsTrigger
                value="rewrite"
                className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-300 data-[state=active]:text-white"
              >
                改写
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guide" className="flex-1 flex flex-col mt-0 p-4 overflow-hidden">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  全文速读
                </Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <FileText className="w-4 h-4 mr-1" />
                  文章摘要
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Network className="w-4 h-4 mr-1" />
                  思维导图
                </Button>
              </div>

              <div className="text-sm text-gray-400 mb-3">摘抄要点</div>

              <ScrollArea className="flex-1">
                <div className="space-y-4 pr-2">
                  {[
                    "1.用90%的时间去获取顾客的信任，10%的时间来谈项目。其中咨询师的形象就是第一位重要的信任点，咨询师需先让顾客建立安全感",
                    "2.咨询师千万要注意自己的补充在形象...包装到位就是领先一步。第一印象决定了你在顾客心中的地位，专业度的形象是建立信赖感的第一步",
                    "3.专业与不专业，你一开口...就会赢得顾客的信赖。包装到位就是不一样",
                    "4.要坦诚而坦诚地告诉顾客...让她知道你不是一只想赚钱的人。风险透明化能够反而增强信任，体现职业道德和专业关怀的双重内涵技巧",
                    "5.给出适合本人实际需求和能力的合理方案...很快让客户为中心的服务理念。个性化方案设计能力比推销能力更重要，体现以客户为中心的服务理念",
                    "6.让顾客因熟悉而安得来吧，打消顾客怕来求的不安。环境熟悉化能够通过降低场景陌生感，属于心理铺垫技巧立于手段",
                  ].map((point, index) => (
                    <div key={index} className="text-gray-300 text-sm leading-relaxed">
                      {point}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 p-4 overflow-hidden">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-gray-300 text-sm">
                      预置问题决策共赢决策决策的心理作用是什么？为什么推荐高利润项目可能得其反?
                    </p>
                  </div>
                </div>
              </ScrollArea>

              <div className="space-y-3">
                <div className="relative">
                  <Textarea
                    placeholder="请输入您的问题，点击发送按钮进行对话"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12 resize-none"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">图书长文</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-gray-400"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">深度思考R1</span>
                    <Switch checked={deepThinking} onCheckedChange={setDeepThinking} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mindmap" className="flex-1 flex flex-col mt-0 p-4 overflow-hidden">
              <div className="flex gap-2 mb-4">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Network className="w-4 h-4 mr-1" />
                  生成思维导图
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  导出图片
                </Button>
              </div>

              <div className="flex-1 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <Network className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">点击"生成思维导图"按钮</p>
                  <p className="text-gray-500 text-sm mt-2">AI将自动分析文档内容并生成思维导图</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 flex flex-col mt-0 p-4 overflow-hidden">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white">
                    <span className="font-bold">B</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white">
                    <span className="italic">I</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white">
                    <span className="underline">U</span>
                  </Button>
                  <div className="w-px h-6 bg-white/10" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <Input
                placeholder="请输入标题"
                className="mb-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />

              <ScrollArea className="flex-1">
                <div className="space-y-2 text-white">
                  <p className="font-medium">如何做一个好的销售</p>
                  <p className="text-sm text-gray-300">1.好的形象给顾客以安全感</p>
                  <p className="text-sm text-gray-300">2.专业知识理解给获得用户信任感</p>
                  <p className="text-sm text-gray-300">3.坦诚告诉顾客，存在的风险。</p>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="rewrite" className="flex-1 flex flex-col mt-0 p-4 overflow-hidden">
              <div className="flex gap-2 mb-4">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                  润色优化
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  扩写
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  缩写
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  翻译
                </Button>
              </div>

              <div className="mb-3">
                <label className="text-sm text-gray-400 mb-2 block">选择要改写的文本</label>
                <Textarea
                  placeholder="粘贴或输入需要改写的内容..."
                  className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-4">
                <div className="text-sm text-gray-400 mb-2">改写结果</div>
                <div className="text-gray-300 text-sm">选择改写方式后，AI将在此处显示改写结果</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
