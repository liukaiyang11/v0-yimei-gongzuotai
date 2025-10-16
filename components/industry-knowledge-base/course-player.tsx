"use client"

import { useState } from "react"
import { Home, Download, MoreHorizontal, Play, Pause, Volume2, Maximize, FileText, Network, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CoursePlayerProps {
  courseTitle: string
  onBack: () => void
}

interface Chapter {
  id: string
  title: string
  time: string
  thumbnail: string
}

interface Transcript {
  speaker: string
  time: string
  content: string
}

const mockChapters: Chapter[] = [
  { id: "1", title: "诺和诺德与医美", time: "00:00", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "2", title: "生活美容与医疗", time: "03:27", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "3", title: "轻医美项目解析", time: "06:57", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "4", title: "医美行业产业链", time: "11:24", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "5", title: "营销医美行业三大难题", time: "15:24", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "6", title: "医美行业合规化", time: "17:50", thumbnail: "/placeholder.svg?height=80&width=120" },
  { id: "7", title: "医美行业乱象与监管升级", time: "21:26", thumbnail: "/placeholder.svg?height=80&width=120" },
]

const mockTranscripts: Transcript[] = [
  {
    speaker: "发言人 A",
    time: "00:00",
    content:
      "九月，LVMH集团趁势病年半的欧洲最大上市公司宝座被夺走。是什么公司，什么产品能够与拥有LV迪奥、宝格丽、名梵希、罗意威、Tiffany、珀金、fendi、safra等等五十多个奢侈品牌抗衡呢？打败魔法的只有魔法，他就是丹麦生物制药公司诺和诺德，为什么魔法呢？成立于1923年的诺和诺德，一百多年来都专注胰岛素领域的研究，虽然早已成为top级别的跨国制药公司，但离他现在药企市值一哥的地位还有很大距离。谁道是研发出可以治愈肥胖的重磅产品呢？恰恰相反，帮助胖和伟哥一样有个广为流传的，它可以让人减少机械感，减少饥饿。",
  },
  {
    speaker: "发言人 A",
    time: "00:44",
    content:
      "去年，当斯新克在推特发文称，减肥成功了18斤，极其被赞为高位，也就是大名鼎鼎的斯卡格鲁肽。正是凭借这款产品，诺和诺德被誉为到了37亿人民币，直接远超过口可口国家丹麦一年的基础APH么概念呢？一个诺和诺德等于再增加宝马加大众和国大奔驰等，宾利，兰博基尼，还要再加上光伏巨头隆基绿能的体量。如果欧洲公司大家没有概念，那么他们也许等于宝马加五粮液的市值，我们不禁要问了，减肥市场有这么大吗？",
  },
  {
    speaker: "发言人 A",
    time: "01:16",
    content:
      "FDA在21年只批准了斯美格鲁肽热用于肥胖或者重量人减肥，在中国目前批准了二型糖尿病，这样的市场及医疗角度看么也支撑不起二级市场对他此大的期望。实则将其推上的不是医疗用减肥，而是一个超应应用的需求，一位21世纪的真神，五块钱。",
  },
  {
    speaker: "发言人 A",
    time: "01:30",
    content: "医美行业监管的现状如何？消费者选择医美项目时要避免哪些坑？为什么推荐高端项目反而不能引导？",
  },
]

const keywordTags = ["诺和诺德", "斯卡格鲁肽", "医美", "轻医美", "玻尿酸", "肉毒素", "医疗美容", "产业链"]

export function CoursePlayer({ courseTitle, onBack }: CoursePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("21:26")
  const [totalTime] = useState("25:44")
  const [activeTab, setActiveTab] = useState("guide")
  const [activeGuideTab, setActiveGuideTab] = useState("original")
  const [question, setQuestion] = useState("")
  const [deepThinking, setDeepThinking] = useState(true)

  return (
    <div className="fixed left-20 top-0 right-0 bottom-0 bg-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-14 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-300 hover:text-white hover:bg-slate-700"
          >
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-white font-medium">{courseTitle}</h1>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
              <FileText className="w-4 h-4 mr-1" />
              添加文档
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-slate-700">
            <Download className="w-4 h-4 mr-1" />
            导出视频
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-700">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧视频区域 */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* 视频播放器 */}
          <div className="bg-black rounded-lg overflow-hidden mb-6 relative aspect-video">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
              </Button>
            </div>
            {/* 视频控制栏 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <span className="text-white text-sm">
                  {currentTime}/{totalTime}
                </span>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }} />
                </div>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 章节时间轴 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-slate-700">
              <button className="pb-2 border-b-2 border-blue-500 text-white font-medium">章节</button>
              <button className="pb-2 text-gray-400 hover:text-white">发言人</button>
            </div>
            <ScrollArea className="h-32">
              <div className="flex gap-3">
                {mockChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={`flex-shrink-0 w-32 cursor-pointer group ${
                      chapter.time === "21:26" ? "ring-2 ring-blue-500 rounded-lg" : ""
                    }`}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-2">
                      <img
                        src={chapter.thumbnail || "/placeholder.svg"}
                        alt={chapter.title}
                        className="w-full h-20 object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {chapter.time}
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 line-clamp-2 group-hover:text-white">{chapter.title}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* 右侧AI功能面板 */}
        <div className="w-[480px] bg-slate-800/50 backdrop-blur-sm border-l border-slate-700 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="bg-transparent border-b border-slate-700 rounded-none h-12 px-4">
              <TabsTrigger value="guide" className="data-[state=active]:bg-slate-700">
                导读
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700">
                对话
              </TabsTrigger>
              <TabsTrigger value="mindmap" className="data-[state=active]:bg-slate-700">
                思维导图
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-slate-700">
                笔记
              </TabsTrigger>
              <TabsTrigger value="rewrite" className="data-[state=active]:bg-slate-700">
                改写
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guide" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {/* 子标签 */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={activeGuideTab === "original" ? "default" : "ghost"}
                    onClick={() => setActiveGuideTab("original")}
                    className={activeGuideTab === "original" ? "bg-blue-600" : "text-gray-300"}
                  >
                    原文
                  </Button>
                  <Button
                    size="sm"
                    variant={activeGuideTab === "speed" ? "default" : "ghost"}
                    onClick={() => setActiveGuideTab("speed")}
                    className={activeGuideTab === "speed" ? "bg-blue-600" : "text-gray-300"}
                  >
                    章节速览
                  </Button>
                  <Button
                    size="sm"
                    variant={activeGuideTab === "keypoints" ? "default" : "ghost"}
                    onClick={() => setActiveGuideTab("keypoints")}
                    className={activeGuideTab === "keypoints" ? "bg-blue-600" : "text-gray-300"}
                  >
                    要点回顾
                  </Button>
                  <Button size="sm" variant="ghost" className="ml-auto text-gray-300 hover:text-white">
                    <Download className="w-4 h-4 mr-1" />
                    导出
                  </Button>
                </div>

                {/* 功能按钮 */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white">
                    <FileText className="w-4 h-4 mr-1" />
                    全文速读
                  </Button>
                  <Button size="sm" variant="default" className="bg-blue-600">
                    <FileText className="w-4 h-4 mr-1" />
                    文章摘要
                  </Button>
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white">
                    <Network className="w-4 h-4 mr-1" />
                    思维导图
                  </Button>
                </div>

                {/* 关键词标签 */}
                <div>
                  <h3 className="text-white text-sm font-medium mb-2">摘抄要点</h3>
                  <div className="flex flex-wrap gap-2">
                    {keywordTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 文字稿 */}
                <div className="space-y-4">
                  {mockTranscripts.map((transcript, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                          {index + 1}
                        </div>
                        <span className="text-gray-400 text-sm">
                          {transcript.speaker} {transcript.time}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed pl-8">{transcript.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底部输入框 */}
              <div className="p-4 border-t border-slate-700">
                <div className="mb-2 text-sm text-gray-400">
                  医美行业观对营销决策的心理作用是什么？为什么推荐高端项目反而不能引导？
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="请输入您的问题，点击发送按钮进行对话"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-12 resize-none"
                    rows={3}
                  />
                  <Button size="icon" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <FileText className="w-4 h-4 mr-1" />
                      包网通用
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">深度思考R1</span>
                    <Switch checked={deepThinking} onCheckedChange={setDeepThinking} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 p-4">
              <div className="text-gray-400 text-center py-8">对话功能开发中...</div>
            </TabsContent>

            <TabsContent value="mindmap" className="flex-1 p-4">
              <div className="text-gray-400 text-center py-8">思维导图功能开发中...</div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 p-4">
              <div className="text-gray-400 text-center py-8">笔记功能开发中...</div>
            </TabsContent>

            <TabsContent value="rewrite" className="flex-1 p-4">
              <div className="text-gray-400 text-center py-8">改写功能开发中...</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
