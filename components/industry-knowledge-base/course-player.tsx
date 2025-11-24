"use client"

import { useState } from "react"
import {
  Download,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  Maximize,
  FileText,
  Send,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Table,
  Code,
  AlignLeft,
  Undo,
  Redo,
  Smile,
  MoreVertical,
  Maximize2,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  {
    id: "1",
    title: "诺和诺德与医美行业：揭秘减肥药与医美市场",
    time: "00:00",
    thumbnail: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "2",
    title: "生活美容与医疗美容的区别及发展",
    time: "03:27",
    thumbnail: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "3",
    title: "轻医美项目解析：注射疗法与光电疗法",
    time: "06:57",
    thumbnail: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "4",
    title: "医美行业产业链与商业模式深度解析",
    time: "11:24",
    thumbnail: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "5",
    title: "警惕医美行业三大黑幕：机构、医生、产品",
    time: "15:24",
    thumbnail: "/placeholder.svg?height=80&width=120",
  },
  { id: "6", title: "医美行业合规化与营销策略分析", time: "17:50", thumbnail: "/placeholder.svg?height=80&width=120" },
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

// Added keyPointsData
const keyPointsData = [
  {
    tag: "要点",
    speaker: "发言人1",
    content:
      "月初时，LVMH集团的欧洲最大上市公司宝座被夺走了。打败LVMH的是丹麦生物制药公司诺和诺德，凭借其重磅减肥药产品斯卡格鲁肽在市场上的成功，诺和诺德的市值超越了拥有50多个奢侈品牌的LVMH集团。",
  },
  {
    tag: "要点",
    speaker: "发言人3",
    content:
      "斯卡格鲁肽在中国目前只批准用于二型糖尿病治疗，但在美国FDA已批准用于肥胖或超重人群减肥。这款药物的成功不仅来自医疗用途，更多是超适应症使用的需求，即医美行业的应用。",
  },
  {
    tag: "要点",
    speaker: "发言人4",
    content:
      "医美行业的市场规模以15%的年复合增长率持续扩大。其中轻医美项目（如注射类、光电类）因风险低、恢复快而受到消费者青睐，占据了医美市场的主要份额。",
  },
  {
    tag: "要点",
    speaker: "发言人6",
    content:
      "医美行业存在三大黑幕：黑机构违规经营、黑医生无资质行医、黑产品使用假冒伪劣产品。这些问题导致消费者权益受损，行业信任度下降。",
  },
  {
    tag: "要点",
    speaker: "发言人10",
    content:
      "医美行业正在经历合规化转型。政府及相关部门出台了一系列规范市场、保护消费者权益的措施，包括严格监管、专业人才培训等，推动行业向规范化、品牌化、精细化发展。",
  },
  {
    tag: "要点",
    speaker: "发言人12",
    content:
      "轻医美项目主要分为注射疗法和光电疗法。注射疗法包括玻尿酸、肉毒素、除皱、瘦脸等，光电疗法利用激光、射频、超声波技术作用于皮肤，实现脱毛、嫩肤、紧致等效果。新型产品和成熟技术的结合，推动了轻医美市场的发展。",
  },
  {
    tag: "要点",
    speaker: "发言人13",
    content: "轻医美项目的主要成本是什么？轻医美项目主要分为两大类：注射疗法和光电疗法。",
  },
  {
    tag: "要点",
    speaker: "发言人14",
    content:
      "敷父母做医美项目的用药有哪些？敷父母尿酸（透明质酸）在医美领域主要用于皮肤填充和塑形，如填充皱纹、丰唇、隆鼻等，以及通过注射达到美容效果。",
  },
  {
    tag: "要点",
    speaker: "发言人15",
    content:
      "酶母肉毒素在医美中的工作原理是什么？酶母肉毒素主要利用激光、强脉冲光、射频和超声波等技术，作用于皮肤，实现脱毛、嫩肤、紧致等效果，作用于大体积或较深层次，但不能完全免疫问题，但能显著提升消费者安全意识。",
  },
  {
    tag: "要点",
    speaker: "发言人16",
    content:
      "激光和射频HIPL（光子嫩肤）的区别是什么？激光利用干激光技术，作用精准，辐射和超声波波段大；射频利用射频能量，作用于皮肤深层，刺激胶原蛋白再生，适用于紧致、提亮肤色、缩小毛孔等。",
  },
  {
    tag: "要点",
    speaker: "发言人18",
    content:
      "射频和超声波技术的工作原理是什么？射频技术利用射频能量作用于皮肤深层，刺激胶原蛋白再生，达到紧致提升效果；超声波技术则利用超声波能量，作用于皮下组织，促进胶原蛋白增生，达到紧致和提升效果。",
  },
  {
    tag: "要点",
    speaker: "发言人19",
    content:
      "射频技术和超声波技术的工作原理是什么？射频技术利用射频能量作用于皮肤深层，刺激胶原蛋白再生，达到紧致提升效果；超声波技术则利用超声波能量，作用于皮下组织，促进胶原蛋白增生，达到紧致和提升效果。",
  },
  {
    tag: "要点",
    speaker: "发言人20",
    content:
      "医美行业产业链的上游主要由哪些部分组成？医美行业上游主要由原材料供应商、器械制造商、药品生产商等组成。例如，玻尿酸和肉毒素等产品的生产商，以及激光设备、射频设备等器械的制造商。",
  },
  {
    tag: "要点",
    speaker: "发言人A",
    content:
      "公立医院的整形外科、皮肤科与非法医美机构的乱象，上游市场花样百出，新老玩家竞争激烈，中游则因门槛低导致乱象频发，非法医美机构和医生资质问题严重，消费者需警惕。",
  },
]

export function CoursePlayer({ courseTitle, onBack }: CoursePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("21:26")
  const [totalTime] = useState("25:44")
  const [activeTab, setActiveTab] = useState("guide")
  const [activeGuideTab, setActiveGuideTab] = useState("original")
  const [question, setQuestion] = useState("")
  const [deepThinking, setDeepThinking] = useState(true)

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
            <ArrowLeft className="w-5 h-5" />
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
        <div className="w-[480px] bg-slate-800/50 backdrop-blur-sm border-l border-slate-700 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
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

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white">
                    全文速读
                  </Button>
                  <Button size="sm" variant="default" className="bg-blue-600">
                    文章摘要
                  </Button>
                  <Button size="sm" variant="outline" className="bg-slate-700 border-slate-600 text-white">
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

                {activeGuideTab === "original" && (
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
                )}

                {activeGuideTab === "speed" && (
                  <div className="space-y-4">
                    {mockChapters.map((chapter, index) => (
                      <div key={chapter.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            {index + 1}
                          </div>
                          <span className="text-blue-400 text-sm font-medium">{chapter.time}</span>
                        </div>
                        <h4 className="text-white font-medium pl-8">{chapter.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed pl-8">
                          {index === 0 &&
                            "对话探讨了诺和诺德如何凭借一款糖尿病药意外克服肥胖药领域，从而在欧洲市值超越LVMH集团，成为欧洲最大上市公司。同时，深入分析了医美行业，包括其市场规模、分类、产业链及未来发展趋势，指出尽管行业存在乱象，但消费者需求和收入提升了酸碱经济的持续增长。"}
                          {index === 1 &&
                            "美容从古至今一直存在，随着技术发展，美容手段分为生活美容和医疗美容。生活美容包括化妆、护肤等非侵入性方法，医疗美容则涉及手术、药物等创伤性手段。分为重医美和轻医美因操作简单、风险低而日益受欢迎，与重医美平分市场，并有望在未来占主导地位。此外，还提到了一些具体的医美项目，如双眼皮、隆鼻、牙齿矫正等，以及部分项目是否合属于美容手术的争议。"}
                          {index === 2 &&
                            "轻医美项目主要分为注射疗法与光电疗法。注射疗法包括玻尿酸、肉毒素、除皱、瘦脸等，光电疗法利用激光、射频、超声波技术作用于皮肤，实现脱毛、嫩肤、紧致等效果。新型产品和成熟技术的结合，推动了轻医美市场的发展。"}
                          {index === 3 &&
                            "对话深入探讨了医美行业的产业链结构，从上游药品和器械厂商的市场态势，到中游医美机构的类型与问题，特别指出黑机构违规经营、黑医生无资质行医、黑产品使用假冒伪劣产品的三大问题，揭示了行业乱象频发、消费者需警惕的现状。"}
                          {index === 4 &&
                            "对话详细阐述了医美行业存在的三大问题：黑机构违规经营超出可证范围或无证经营、黑医生无资质行医或无证行医、黑产品使用假冒伪劣产品或无效产品。这些问题导致消费者权益受损，甚至危及生命安全，揭示了行业监管缺失、专业人才短缺等深层次问题，但能显著提升消费者安全意识。"}
                          {index === 5 &&
                            "医美行业面临入门槛低、竞争激烈、集中度低等问题，正向合规化、品牌化、精细化发展。不同于传统医疗行业，医美行业以To C模式为主，需通过广告、推广、异业合作仅是要客户，尤其在三四线城市和乡镇有效。结合式广告、推广、异业合作仅是要客户，尤其在三四线城市和乡镇有效。"}
                          {index === 6 &&
                            "对话深入探讨了医美行业的发展历程，从传统电视广告到自媒体流量，揭示了行业在追求暴利过程中的种种问题，包括虚假宣传、监管缺失、专业人才短缺等。同时，介绍了政府及相关部门为规范市场、保护消费者权益所采取的一系列措施，展现了医美行业规范化发展的前景。"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeGuideTab === "keypoints" && (
                  <div className="space-y-4">
                    {keyPointsData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                            {item.tag}
                          </Badge>
                          <span className="text-gray-400 text-sm">{item.speaker}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                )}
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
                      <span>原文共计9443字，读完预计9分钟。</span>
                      <a href="#" className="text-blue-400 hover:underline">
                        AI在7s内完成阅读并生成总结
                      </a>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 text-gray-300 text-sm leading-relaxed">
                      <p>
                        好的，我现在需要处理用户的查询，为他生成一份结构良好的文案概述。首先，我需要理解用户提供的参考内容，理解其中的核心要素。
                      </p>
                      <p>
                        用户提供的文案内容主要分为两部分：首先是月套餐对公司活和营销策略的影响，其次是医美行业的现状、挑战及未来展望。我需要将这两个主题整合到概述中，按照引言、主题概述、方法步骤、适用读者、价格评估和结论。
                      </p>
                      <p>
                        用户要求述还不超过6句话，总字数500以内，每句话不超过100字。因此，我需要提炼每个部分的关键点。
                      </p>
                      <p>首先，引言要突出减肥药的成功和营销策略的分析，主题概述需要概括医美行业的分析。</p>
                      <p>
                        需要注意用户可能的深层需求：他们可能希望提炼出营销策略的关键点，用于商业决策或行业分析。因此，概述需要简洁准确，信息准确。适用读者应为医美行业从业者、营销策略研究者、行业从业者及消费者。价格评估需要简洁调整，结合是否符合格式要求。
                      </p>
                      <p>
                        需要注意用户可能的深层需求：他们可能希望提炼出营销策略的关键点，用于商业决策或行业分析。因此，概述需要简洁准确，信息准确。适用读者应为医美行业从业者、营销策略研究者、行业从业者及消费者。价格评估需要简洁调整，结合是否符合格式要求。
                      </p>
                    </div>
                  </div>

                  {/* 文档概述 */}
                  <div className="space-y-3">
                    <h3 className="text-white font-medium">2. 文案概述:</h3>
                    <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                      <p>
                        &lt;文案以LVMH集团被诺和诺德代欧洲市值首位为引，串联医疗与医美两大主题，前半篇聚焦于诺和诺德尿病药意外转型减肥药领域，市值突破3万亿超越奢驰马逊和，后半篇深度解构医美行业现状，包装历史溯源、营销模式及监管动向，指出行业面临人才短缺与监管趋严问题，住在政策规范与消费升级下将黄金发展期，全文通过案例对比（医药创新VS消费医疗）与数据聚焦，帮助医疗投资者、医美从业者及消费群体把握行业兴场动向，既展现医疗疗产品界价值，又揭示医疗债值与消费升级融合趋势有服务价值。&gt;
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
                        帮我总结视频中的核心要点，包括不限于人物、观点、目的、步骤、结论、建议等。
                        <span className="ml-auto text-blue-400">→</span>
                      </button>
                      <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        帮我预测出视频中的金句和要点信息。
                        <span className="ml-auto text-blue-400">→</span>
                      </button>
                    </div>
                  </div>

                  {/* 历史问题 */}
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>马斯克提到的减肥药物是什么？2023年医美行业监管的指导文件及哪些部门？</p>
                  </div>
                </div>
              </ScrollArea>

              {/* 底部输入框 */}
              <div className="p-4 border-t border-slate-700">
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
              <div className="border-b border-slate-700">
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
                        <img src="/placeholder.svg?height=400&width=600" alt="思维导图" className="max-w-full h-auto" />
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

                  <div className="p-4 border-t border-slate-700">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      立即生成
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* 富文本编辑器工具栏 */}
                <div className="border-b border-slate-700 p-2 space-y-2">
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
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                      <Table className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-300">
                      <AlignLeft className="w-4 h-4" />
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
              </div>
            </TabsContent>

            <TabsContent value="rewrite" className="flex-1 flex flex-col mt-0 overflow-hidden">
              <div className="border-b border-slate-700">
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

                  <div className="p-4 border-t border-slate-700">
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
