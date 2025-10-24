"use client"

import { useState } from "react"
import { ArrowLeft, Search, Download, Copy, Check, Sparkles, FileText, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface CustomerAcquisitionSystemProps {
  onBack: () => void
}

interface Video {
  id: string
  title: string
  publishTime: string
  author: {
    name: string
    avatar: string
    followers: string
  }
  commentCount: number
  platform: string
}

interface Customer {
  id: string
  nickname: string
  avatar: string
  region: string
  time: string
  comment: string
  contacted: boolean
}

export function CustomerAcquisitionSystem({ onBack }: CustomerAcquisitionSystemProps) {
  const [activeTab, setActiveTab] = useState<"search" | "customers">("search")
  const [selectedPlatform, setSelectedPlatform] = useState("全网")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])
  const [customerSearchKeyword, setCustomerSearchKeyword] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("不限")
  const [onlyUncontacted, setOnlyUncontacted] = useState(false)

  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false)
  const [extractDialogOpen, setExtractDialogOpen] = useState(false)
  const [recreateDialogOpen, setRecreateDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [copiedExtract, setCopiedExtract] = useState(false)
  const [copiedRecreate, setCopiedRecreate] = useState(false)

  const platforms = ["全网", "抖音", "小红书", "哔哩哔哩", "快手", "视频号"]

  const videos: Video[] = [
    {
      id: "1",
      title: "魔脂针真能溶脂吗 到底安全吗 听听医生怎么说...",
      publishTime: "2025-08-05 10:19:25",
      author: { name: "逸诗雅", avatar: "", followers: "380,467" },
      commentCount: 1204,
      platform: "抖音",
    },
    {
      id: "2",
      title: "魔脂针真实测评 #魔脂针 #的真相 #...",
      publishTime: "2024-09-14 18:00:00",
      author: { name: "皮肤美容-林柏松", avatar: "", followers: "6,847" },
      commentCount: 27,
      platform: "抖音",
    },
    {
      id: "3",
      title: "魔脂针！！十五双效对比✖️#魔脂...",
      publishTime: "2025-08-05 19:53:57",
      author: { name: "八八【医疗护理师】", avatar: "", followers: "948" },
      commentCount: 535,
      platform: "抖音",
    },
    {
      id: "4",
      title: "魔脂针三个月自我感觉明显瘦美容 #魔...",
      publishTime: "2024-09-14 18:31:40",
      author: { name: "单糖田田不不不", avatar: "", followers: "2743" },
      commentCount: 1417,
      platform: "抖音",
    },
    {
      id: "5",
      title: "魔脂针注射后注意事项 #魔脂针 #的真...",
      publishTime: "2024-09-14 17:30:05",
      author: { name: "协和医院广 嘉琪", avatar: "", followers: "5577" },
      commentCount: 24,
      platform: "抖音",
    },
    {
      id: "6",
      title: "魔脂针操作流程详解 #小红书 #...",
      publishTime: "2024-09-10 10:39:53",
      author: { name: "抗衰医美医生小沈", avatar: "", followers: "1,092" },
      commentCount: 64,
      platform: "小红书",
    },
    {
      id: "7",
      title: "打魔脂针的人真的太多了！ 的确打开就...",
      publishTime: "2025-08-05 22:11:49",
      author: { name: "鹅鹅的朋友圈", avatar: "", followers: "1,807" },
      commentCount: 696,
      platform: "抖音",
    },
    {
      id: "8",
      title: "魔脂针包括，姐妹，不要被骗单独...",
      publishTime: "2024-09-14 17:19:31",
      author: { name: "天天干饭佬", avatar: "", followers: "1735" },
      commentCount: 2845,
      platform: "抖音",
    },
  ]

  const customers: Customer[] = [
    {
      id: "1",
      nickname: "欣欣好",
      avatar: "",
      region: "江苏",
      time: "2025-10-16 17:27:31",
      comment: "金牌慕斯单次",
      contacted: false,
    },
    {
      id: "2",
      nickname: "王永宁",
      avatar: "",
      region: "吉林",
      time: "2025-10-16 12:36:08",
      comment: "价格通",
      contacted: false,
    },
    {
      id: "3",
      nickname: "州州好",
      avatar: "",
      region: "河北",
      time: "2025-10-16 11:59:00",
      comment: "我打魔脂针十一盒子，一次还没打完，不打我还是会继续打的，效果还是很明显的",
      contacted: false,
    },
    {
      id: "4",
      nickname: "左右名将",
      avatar: "",
      region: "浙江",
      time: "2025-10-16 11:00:38",
      comment: "我做过打的溶脂2000多，真的很贵",
      contacted: false,
    },
    {
      id: "5",
      nickname: "Mikibaby",
      avatar: "",
      region: "山东",
      time: "2025-10-15 15:58:13",
      comment: "八连打了几个了 要不来和我面对了",
      contacted: false,
    },
    {
      id: "6",
      nickname: "香芹",
      avatar: "",
      region: "辽宁",
      time: "2025-10-14 22:46:37",
      comment: "我想问海藻针有用吗 我就一次一一打了 正是没效果呀 是是是打少了吗",
      contacted: false,
    },
    {
      id: "7",
      nickname: "任何乐",
      avatar: "",
      region: "山东",
      time: "2025-10-14 13:15:57",
      comment: "金牌慕斯就好呀 咨询我就好",
      contacted: false,
    },
    {
      id: "8",
      nickname: "淘叨",
      avatar: "",
      region: "河南",
      time: "2025-10-14 10:15:51",
      comment: "我也在寻找注射瘦脸针的地方，能打魔脂针吗",
      contacted: false,
    },
    {
      id: "9",
      nickname: "Yanne",
      avatar: "",
      region: "广东",
      time: "2025-10-13 00:37:19",
      comment: "等等方面打魔脂针有用吗",
      contacted: false,
    },
    {
      id: "10",
      nickname: "李泽...",
      avatar: "",
      region: "贵州",
      time: "2025-10-11 15:40:48",
      comment: "三甲医院的大概 怎样么人知道",
      contacted: false,
    },
  ]

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      setHasSearched(true)
    }
  }

  const handleAcquireCustomers = (videoId: string) => {
    setActiveTab("customers")
  }

  const handleBackToVideos = () => {
    setActiveTab("search")
  }

  const handleExportCustomers = () => {
    const headers = ["序号", "昵称", "地区", "时间", "评论内容", "是否已联系"]
    const csvContent = [
      headers.join(","),
      ...customers.map((customer, index) => {
        return [
          index + 1,
          `"${customer.nickname}"`,
          `"${customer.region}"`,
          `"${customer.time}"`,
          `"${customer.comment.replace(/"/g, '""')}"`,
          customer.contacted ? "是" : "否",
        ].join(",")
      }),
    ].join("\n")

    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `客户数据_${new Date().toLocaleDateString()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleContactCustomer = (customerId: string) => {
    console.log("前往联系客户:", customerId)
  }

  const handleShowSummary = (video: Video) => {
    setSelectedVideo(video)
    setSummaryDialogOpen(true)
    setCopiedSummary(false)
  }

  const handleShowExtract = (video: Video) => {
    setSelectedVideo(video)
    setExtractDialogOpen(true)
    setCopiedExtract(false)
  }

  const handleShowRecreate = (video: Video) => {
    setSelectedVideo(video)
    setRecreateDialogOpen(true)
    setCopiedRecreate(false)
  }

  const copyToClipboard = (text: string, type: "summary" | "extract" | "recreate") => {
    navigator.clipboard.writeText(text)
    if (type === "summary") setCopiedSummary(true)
    if (type === "extract") setCopiedExtract(true)
    if (type === "recreate") setCopiedRecreate(true)
    setTimeout(() => {
      if (type === "summary") setCopiedSummary(false)
      if (type === "extract") setCopiedExtract(false)
      if (type === "recreate") setCopiedRecreate(false)
    }, 2000)
  }

  return (
    <div className="fixed left-20 top-0 right-0 bottom-0 bg-slate-900 flex flex-col">
      <div className="h-16 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">精准获客系统</h1>
        </div>
        {activeTab === "customers" && (
          <Button
            variant="outline"
            onClick={handleBackToVideos}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回视频列表
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "search" ? (
          <div className="h-full flex flex-col">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-2">医美获客神器</h2>
                <p className="text-slate-300">搜索视频、获取评论、发掘潜在客户</p>
              </div>
            </div>

            <div className="bg-slate-800/30 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="输入关键词搜索视频..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                    搜索
                  </Button>
                </div>

                <div className="flex gap-2 mt-4">
                  {platforms.map((platform) => (
                    <Button
                      key={platform}
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPlatform(platform)}
                      className={
                        selectedPlatform === platform
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700"
                      }
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {hasSearched ? (
              <div className="flex-1 overflow-hidden bg-slate-900/50">
                <div className="max-w-6xl mx-auto p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-slate-300">
                      已为您获取 <span className="text-blue-400 font-semibold">{videos.length}</span> 条视频
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-slate-300">
                        总评论数 <span className="text-blue-400 font-semibold">(999+条)</span>
                      </div>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                        筛选
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="h-[calc(100vh-400px)]">
                    <div className="bg-slate-800/50 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-slate-700/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">视频</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">达人</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">评论数</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                          {videos.map((video) => (
                            <tr key={video.id} className="hover:bg-slate-700/30">
                              <td className="px-4 py-4">
                                <div>
                                  <div className="text-white text-sm mb-1">{video.title}</div>
                                  <div className="text-slate-400 text-xs">{video.publishTime}</div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm">
                                    {video.author.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="text-white text-sm">{video.author.name}</div>
                                    <div className="text-slate-400 text-xs">粉丝数：{video.author.followers}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <span className="text-white">{video.commentCount}</span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-blue-400 hover:text-blue-300"
                                    onClick={() => handleShowSummary(video)}
                                  >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    总结摘要
                                  </Button>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-blue-400 hover:text-blue-300"
                                    onClick={() => handleShowExtract(video)}
                                  >
                                    <FileText className="w-3 h-3 mr-1" />
                                    提取文案
                                  </Button>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="text-purple-400 hover:text-purple-300"
                                    onClick={() => handleShowRecreate(video)}
                                  >
                                    <Wand2 className="w-3 h-3 mr-1" />
                                    进行二创
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAcquireCustomers(video.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    精准获客
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-slate-900/50">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Search className="w-12 h-12 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">开始搜索视频</h3>
                  <p className="text-slate-400">输入关键词并选择平台，点击搜索按钮开始获客</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="bg-slate-800/30 p-6 border-b border-slate-700/50">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    onClick={handleBackToVideos}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回视频列表
                  </Button>
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="输入关键词搜索评论..."
                      value={customerSearchKeyword}
                      onChange={(e) => setCustomerSearchKeyword(e.target.value)}
                      className="pl-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
                  >
                    <option value="不限">地区：不限</option>
                    <option value="江苏">江苏</option>
                    <option value="浙江">浙江</option>
                    <option value="山东">山东</option>
                    <option value="河北">河北</option>
                  </select>
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <Checkbox checked={onlyUncontacted} onCheckedChange={(checked) => setOnlyUncontacted(!!checked)} />
                    <span>仅看未联系</span>
                  </label>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 bg-transparent">
                    最新
                  </Button>
                  <Button onClick={handleExportCustomers} className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    批量导出
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-slate-900/50">
              <div className="max-w-7xl mx-auto p-6">
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="bg-slate-800/50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-700/50">
                        <tr>
                          <th className="px-4 py-3 text-center text-sm font-medium text-slate-300 w-16">序号</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">评论者</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">地区</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">时间</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">评论内容</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-slate-300">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50">
                        {customers.map((customer, index) => (
                          <tr key={customer.id} className="hover:bg-slate-700/30">
                            <td className="px-4 py-4 text-center text-slate-300">{index + 1}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm">
                                  {customer.nickname.charAt(0)}
                                </div>
                                <span className="text-white">{customer.nickname}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center text-slate-300">{customer.region}</td>
                            <td className="px-4 py-4 text-center text-slate-400 text-sm">{customer.time}</td>
                            <td className="px-4 py-4">
                              <div className="text-slate-300 text-sm line-clamp-2">{customer.comment}</div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Button
                                size="sm"
                                onClick={() => handleContactCustomer(customer.id)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                前往联系
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={summaryDialogOpen} onOpenChange={setSummaryDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-blue-400" />
              视频总结摘要
            </DialogTitle>
            <DialogDescription className="text-slate-400">AI智能分析视频内容，提取核心要点</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-2">视频信息</h4>
              <p className="text-white text-sm">{selectedVideo?.title}</p>
              <p className="text-slate-400 text-xs mt-1">
                作者：{selectedVideo?.author.name} | 发布时间：{selectedVideo?.publishTime}
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-3">核心内容摘要</h4>
              <div className="space-y-3 text-sm text-slate-200">
                <div className="flex gap-2">
                  <span className="text-blue-400 font-semibold">•</span>
                  <p>魔脂针是一种新型溶脂注射产品，主要成分为去氧胆酸，能够有效分解脂肪细胞</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400 font-semibold">•</span>
                  <p>适用于局部脂肪堆积部位，如双下巴、腰腹部等，效果因人而异</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400 font-semibold">•</span>
                  <p>注射后可能出现轻微肿胀、发红等正常反应，通常3-7天消退</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400 font-semibold">•</span>
                  <p>建议选择正规医疗机构和有资质的医生进行操作，确保安全性</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400 font-semibold">•</span>
                  <p>一般需要2-4次治疗才能达到理想效果，间隔4-6周</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-2">用户关注点</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">安全性</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">价格</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">效果持久性</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">副作用</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">恢复期</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                copyToClipboard(
                  `视频总结：${selectedVideo?.title}\n\n核心内容：\n• 魔脂针是一种新型溶脂注射产品...\n• 适用于局部脂肪堆积部位...\n• 注射后可能出现轻微肿胀...\n• 建议选择正规医疗机构...\n• 一般需要2-4次治疗...`,
                  "summary",
                )
              }
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  复制摘要
                </>
              )}
            </Button>
            <Button onClick={() => setSummaryDialogOpen(false)} className="bg-blue-600 hover:bg-blue-700">
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={extractDialogOpen} onOpenChange={setExtractDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5 text-green-400" />
              提取视频文案
            </DialogTitle>
            <DialogDescription className="text-slate-400">智能识别并提取视频中的文字内容</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-2">视频标题</h4>
              <p className="text-white text-sm">{selectedVideo?.title}</p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-3">提取的文案内容</h4>
              <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                <p className="text-blue-300 font-medium">【开场】</p>
                <p>姐妹们！今天来跟大家聊聊最近超火的魔脂针💉</p>

                <p className="text-blue-300 font-medium mt-3">【核心内容】</p>
                <p>很多人问我魔脂针到底能不能溶脂？安全吗？作为从业多年的医美医生，我必须告诉大家真相！</p>
                <p>
                  魔脂针的主要成分是去氧胆酸，这是一种能够破坏脂肪细胞膜的物质。简单来说，它确实可以溶解脂肪，但是！重点来了⚠️
                </p>

                <p className="text-blue-300 font-medium mt-3">【注意事项】</p>
                <p>1️⃣ 一定要去正规医疗机构</p>
                <p>2️⃣ 选择有资质的医生操作</p>
                <p>3️⃣ 不是所有人都适合打魔脂针</p>
                <p>4️⃣ 术后护理很重要</p>

                <p className="text-blue-300 font-medium mt-3">【结尾】</p>
                <p>想了解更多医美知识，记得关注我哦～有问题随时私信💌</p>

                <p className="text-slate-400 text-xs mt-3">#魔脂针 #医美科普 #溶脂针 #医美医生</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                copyToClipboard(
                  `【开场】\n姐妹们！今天来跟大家聊聊最近超火的魔脂针💉\n\n【核心内容】\n很多人问我魔脂针到底能不能溶脂？安全吗？...\n\n【注意事项】\n1️⃣ 一定要去正规医疗机构\n2️⃣ 选择有资质的医生操作...\n\n#魔脂针 #医美科普 #溶脂针 #医美医生`,
                  "extract",
                )
              }
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {copiedExtract ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  复制文案
                </>
              )}
            </Button>
            <Button onClick={() => setExtractDialogOpen(false)} className="bg-green-600 hover:bg-green-700">
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={recreateDialogOpen} onOpenChange={setRecreateDialogOpen}>
        <DialogContent className="max-w-3xl bg-slate-800 border-slate-700 text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Wand2 className="w-5 h-5 text-purple-400" />
              AI二次创作建议
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              基于原视频内容，为您生成多种创作方向和文案模板
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-2">原视频</h4>
              <p className="text-white text-sm">{selectedVideo?.title}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-purple-300">方向一：对比测评类</h4>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">推荐</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">将魔脂针与其他溶脂方式进行对比，突出优劣势</p>
              <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-200 leading-relaxed">
                <p className="text-purple-300 font-medium mb-2">📝 参考文案：</p>
                <p>魔脂针 VS 吸脂手术 VS 冷冻溶脂，哪个更适合你？</p>
                <p className="mt-2">今天用一张表格告诉你三种溶脂方式的区别👇</p>
                <p className="mt-2">💰价格对比：魔脂针2000-5000/次，吸脂手术8000-20000，冷冻溶脂3000-8000</p>
                <p className="mt-2">⏰恢复期：魔脂针3-7天，吸脂1-3个月，冷冻溶脂1-2周</p>
                <p className="mt-2">✨效果：魔脂针渐进式，吸脂立竿见影，冷冻溶脂温和持久</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-blue-300">方向二：避坑指南类</h4>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">高互动</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">分享打魔脂针的注意事项和常见误区</p>
              <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-200 leading-relaxed">
                <p className="text-blue-300 font-medium mb-2">📝 参考文案：</p>
                <p>打魔脂针前必看！这5个坑千万别踩❌</p>
                <p className="mt-2">1️⃣ 不要贪便宜选择非正规机构</p>
                <p>2️⃣ 不要一次打太多剂量</p>
                <p>3️⃣ 不要忽视术后护理</p>
                <p>4️⃣ 不要期望一次见效</p>
                <p>5️⃣ 不要在生理期或孕期注射</p>
                <p className="mt-2">姐妹们记得收藏保存！💾</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-green-300">方向三：真实体验类</h4>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">高转化</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">记录完整的治疗过程和效果变化</p>
              <div className="bg-slate-900/50 rounded p-3 text-sm text-slate-200 leading-relaxed">
                <p className="text-green-300 font-medium mb-2">📝 参考文案：</p>
                <p>打魔脂针30天全记录📹 真实效果大公开</p>
                <p className="mt-2">Day 1: 刚打完，有点肿胀但不疼</p>
                <p>Day 7: 肿胀消退，开始看到轮廓变化</p>
                <p>Day 15: 效果越来越明显了！</p>
                <p>Day 30: 对比图来了，姐妹们看看变化👀</p>
                <p className="mt-2">全程无滤镜无美颜，真实记录分享给你们～</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-2">💡 创作小贴士</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• 使用真实对比图增加可信度</li>
                <li>• 添加相关话题标签提高曝光</li>
                <li>• 在评论区积极互动回复问题</li>
                <li>• 可以制作系列内容持续输出</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                copyToClipboard(
                  `二创方向1：对比测评类\n魔脂针 VS 吸脂手术 VS 冷冻溶脂...\n\n二创方向2：避坑指南类\n打魔脂针前必看！这5个坑千万别踩...\n\n二创方向3：真实体验类\n打魔脂针30天全记录...`,
                  "recreate",
                )
              }
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {copiedRecreate ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  复制全部
                </>
              )}
            </Button>
            <Button onClick={() => setRecreateDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
