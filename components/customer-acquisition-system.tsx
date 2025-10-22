"use client"

import { useState } from "react"
import { ArrowLeft, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    // 创建CSV内容
    const headers = ["序号", "昵称", "地区", "时间", "评论内容", "是否已联系"]
    const csvContent = [
      headers.join(","),
      ...customers.map((customer, index) => {
        return [
          index + 1,
          `"${customer.nickname}"`,
          `"${customer.region}"`,
          `"${customer.time}"`,
          `"${customer.comment.replace(/"/g, '""')}"`, // 转义双引号
          customer.contacted ? "是" : "否",
        ].join(",")
      }),
    ].join("\n")

    // 添加BOM以支持中文
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })

    // 创建下载链接
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

  return (
    <div className="fixed left-20 top-0 right-0 bottom-0 bg-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
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

      {/* 主内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "search" ? (
          <div className="h-full flex flex-col">
            {/* 顶部横幅 */}
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-2">医美获客神器</h2>
                <p className="text-slate-300">搜索视频、获取评论、发掘潜在客户</p>
              </div>
            </div>

            {/* 搜索栏 */}
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

                {/* 平台选择 */}
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
                                  <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300">
                                    去水印
                                  </Button>
                                  <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300">
                                    提取文案
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
            {/* 筛选栏 */}
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

            {/* 客户列表 */}
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
    </div>
  )
}
