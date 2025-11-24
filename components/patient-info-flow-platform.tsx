"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  User,
  FileText,
  UsersIcon,
  Lightbulb,
  ClipboardList,
  Upload,
  Mic,
  Camera,
  MessageSquare,
  Brain,
  AlertTriangle,
  Star,
  TrendingUp,
  Package,
  Calendar,
  Eye,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PatientInfoFlowPlatformProps {
  onBack: () => void
  selectedCustomer?: {
    id: number
    name: string
    project: string
    stage: string
    avatar: string
  } | null
}

export function PatientInfoFlowPlatform({ onBack, selectedCustomer }: PatientInfoFlowPlatformProps) {
  const [activeTab, setActiveTab] = useState("profiling")
  const [role, setRole] = useState<"咨询师" | "医生">("咨询师")

  // Mock patient data
  const [selectedPatient, setSelectedPatient] = useState(
    selectedCustomer || {
      id: 1,
      name: "刘小姐",
      age: 28,
      phone: "138****8888",
      source: "小红书",
      avatar: "刘",
      stage: "咨询中",
      budget: "1-2万",
      concerns: ["鼻子", "皮肤"],
    },
  )

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">患者信息流转平台 2.0</h1>
              <p className="text-sm text-slate-400">以客户为中心的全流程信息管理</p>
            </div>
          </div>

          {/* Role Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">当前角色:</span>
            <Select value={role} onValueChange={(value: "咨询师" | "医生") => setRole(value)}>
              <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="咨询师" className="text-white hover:bg-slate-700">
                  咨询师
                </SelectItem>
                <SelectItem value="医生" className="text-white hover:bg-slate-700">
                  医生
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Patient Info Sidebar */}
        <div className="w-80 bg-slate-800/30 border-r border-slate-700/50 p-6">
          <Card className="bg-slate-700/50 border-slate-600">
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 bg-blue-600">
                  <AvatarFallback className="text-white text-xl">{selectedPatient.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedPatient.name}</h3>
                  <p className="text-sm text-slate-400">
                    {selectedPatient.age}岁 · {selectedPatient.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">来源渠道</span>
                  <Badge className="bg-purple-600">{selectedPatient.source}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">当前阶段</span>
                  <Badge className="bg-blue-600">{selectedPatient.stage}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">预算范围</span>
                  <span className="text-sm text-white">{selectedPatient.budget}</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 block mb-2">关注部位</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.concerns.map((concern, idx) => (
                      <Badge key={idx} variant="outline" className="bg-slate-600/50 text-white border-slate-500">
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-600">
                <h4 className="text-sm font-semibold text-white mb-3">AI 洞察</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-slate-300">客户等级: S级</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-slate-300">成交概率: 85%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-300">性格类型: 专业型</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="bg-slate-800/30 border-b border-slate-700/50 px-6">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="profiling"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  <User className="w-4 h-4 mr-2" />
                  患者初步画像
                </TabsTrigger>
                <TabsTrigger
                  value="consultation"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  资讯沟通纪要
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                >
                  <UsersIcon className="w-4 h-4 mr-2" />
                  患者画像整合
                </TabsTrigger>
                <TabsTrigger
                  value="recommendation"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                  disabled={role === "咨询师"}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  智能推荐
                </TabsTrigger>
                <TabsTrigger
                  value="plan"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                  disabled={role === "咨询师"}
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  医生制定方案
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              {/* Module 1: Patient Initial Profiling */}
              <TabsContent value="profiling" className="h-full m-0">
                <ProfilingModule />
              </TabsContent>

              {/* Module 2: Consultation Minutes */}
              <TabsContent value="consultation" className="h-full m-0">
                <ConsultationModule />
              </TabsContent>

              {/* Module 3: Patient Profile Integration */}
              <TabsContent value="integration" className="h-full m-0">
                <IntegrationModule />
              </TabsContent>

              {/* Module 4: Smart Recommendation */}
              <TabsContent value="recommendation" className="h-full m-0">
                <RecommendationModule />
              </TabsContent>

              {/* Module 5: Doctor Treatment Plan */}
              <TabsContent value="plan" className="h-full m-0">
                <TreatmentPlanModule />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Module 1: Patient Initial Profiling
function ProfilingModule() {
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">患者初步画像</h2>
          <Button onClick={() => setShowUploadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            上传多模态数据
          </Button>
        </div>

        {/* Data Sources */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">聊天记录</h3>
                <p className="text-xs text-slate-400">小红书私信</p>
              </div>
            </div>
            <Badge className="bg-green-600">已提取</Badge>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">通话录音</h3>
                <p className="text-xs text-slate-400">初次咨询</p>
              </div>
            </div>
            <Badge className="bg-yellow-600">处理中</Badge>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">面部照片</h3>
                <p className="text-xs text-slate-400">正面+侧面</p>
              </div>
            </div>
            <Badge className="bg-slate-600">待上传</Badge>
          </Card>
        </div>

        {/* AI Extracted Information */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              AI 提取信息
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-300">基础信息</h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-slate-400">姓名</Label>
                    <Input value="刘小姐" readOnly className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-400">年龄</Label>
                    <Input value="28岁" readOnly className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-400">职业</Label>
                    <Input value="互联网运营" readOnly className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-400">居住地</Label>
                    <Input value="上海浦东" readOnly className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                </div>
              </div>

              {/* Medical Aesthetic Intentions */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-300">医美意向</h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-slate-400">关注部位</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-blue-600">鼻子</Badge>
                      <Badge className="bg-blue-600">皮肤</Badge>
                      <Badge className="bg-blue-600">抗衰</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-400">核心诉求</Label>
                    <Textarea
                      value="想让鼻子更高挺自然，改善红血丝问题，希望提拉紧致"
                      readOnly
                      className="bg-slate-600/50 border-slate-500 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400">预算范围</Label>
                    <Input value="1-2万" readOnly className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                </div>
              </div>

              {/* Psychological Profile */}
              <div className="space-y-4 col-span-2">
                <h4 className="text-sm font-semibold text-slate-300">客户性格/心理画像</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-600"># 专业知识丰富型</Badge>
                  <Badge className="bg-purple-600"># 注重效果</Badge>
                  <Badge className="bg-purple-600"># 理性决策</Badge>
                  <Badge className="bg-yellow-600"># 价格敏感度中等</Badge>
                </div>
                <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    💡 建议话术：对该客户应多谈技术细节和案例数据，少谈感性诉求。重点突出医生资质和项目安全性。
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Summary Card */}
            <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-300 mb-2">📱 预约摘要卡片已生成</h4>
              <p className="text-sm text-green-200">
                "您的14:00客户刘小姐，28岁，主要关注鼻部整形+皮肤改善，预算约1-2万，专业知识丰富，建议重点讲解技术和案例"
              </p>
            </div>
          </div>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>上传多模态数据</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 border-dashed border-slate-600 hover:border-blue-500 bg-transparent"
                >
                  <div className="text-center">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="text-sm">上传聊天截图</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 border-dashed border-slate-600 hover:border-blue-500 bg-transparent"
                >
                  <div className="text-center">
                    <Mic className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="text-sm">上传通话录音</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 border-dashed border-slate-600 hover:border-blue-500 bg-transparent"
                >
                  <div className="text-center">
                    <Camera className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="text-sm">上传面部照片</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 border-dashed border-slate-600 hover:border-blue-500 bg-transparent"
                >
                  <div className="text-center">
                    <FileText className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <span className="text-sm">手动输入备注</span>
                  </div>
                </Button>
              </div>

              <div>
                <Label>渠道来源</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="选择来源渠道" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="xiaohongshu">小红书</SelectItem>
                    <SelectItem value="meituan">美团</SelectItem>
                    <SelectItem value="referral">转介绍</SelectItem>
                    <SelectItem value="wechat">微信</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  取消
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">确认上传</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  )
}

// Module 2: Consultation Minutes
function ConsultationModule() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">资讯沟通纪要</h2>
          <Button
            onClick={() => setIsRecording(!isRecording)}
            className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
          >
            <Mic className={`w-4 h-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
            {isRecording ? "停止录音" : "开始录音"}
          </Button>
        </div>

        {isRecording && (
          <Card className="bg-red-600/20 border-red-600/50">
            <div className="p-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-300 font-medium">正在录音中... 00:03:25</span>
            </div>
          </Card>
        )}

        {/* Real-time Transcription */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              实时转写
            </h3>

            <ScrollArea className="h-64 bg-slate-600/30 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Badge className="bg-blue-600 h-fit">咨询师</Badge>
                  <p className="text-slate-300 text-sm">
                    刘小姐您好，我看到您之前在小红书上咨询过我们的鼻部整形项目，今天想详细了解一下您的具体需求。
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-green-600 h-fit">客户</Badge>
                  <p className="text-slate-300 text-sm">
                    对，我主要是觉得鼻子不够高挺，而且鼻翼有点宽。我看了很多案例，比较倾向于做肋软骨隆鼻。
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-blue-600 h-fit">咨询师</Badge>
                  <p className="text-slate-300 text-sm">
                    嗯，我理解您的需求。肋软骨隆鼻确实是一个很好的选择，特别适合您这种想要自然高挺效果的情况。不过我需要问一下，您之前有做过鼻部手术吗？
                  </p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-green-600 h-fit">客户</Badge>
                  <p className="text-slate-300 text-sm">没有，这是第一次。我比较担心恢复期的问题...</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* AI Analysis */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-700/50 border-slate-600">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                话术SOP质检
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-slate-300">已询问过往病史</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-slate-300">已进行风险告知</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-slate-300">未充分说明恢复期（需补充）</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-slate-300">未过度承诺效果</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                深层需求挖掘
              </h3>
              <div className="space-y-3">
                <div className="bg-yellow-600/20 border border-yellow-600/50 rounded p-3">
                  <p className="text-xs text-yellow-300 mb-1">⚠️ 迟疑点检测</p>
                  <p className="text-sm text-yellow-200">
                    客户在"恢复期"话题停顿3秒，语速变慢。建议后续重点解决恢复期顾虑。
                  </p>
                </div>
                <div className="bg-green-600/20 border border-green-600/50 rounded p-3">
                  <p className="text-xs text-green-300 mb-1">✓ 专业度评估</p>
                  <p className="text-sm text-green-200">客户提到"肋软骨"，显示有一定专业知识，建议深度交流技术细节。</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Generated Summary */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">面诊沟通纪要</h3>
              <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>

            <div className="bg-slate-600/50 rounded-lg p-4 space-y-3">
              <div>
                <Label className="text-slate-400">客户姓名</Label>
                <p className="text-white">刘小姐 | 28岁 | 互联网运营</p>
              </div>
              <div>
                <Label className="text-slate-400">核心诉求</Label>
                <p className="text-white">鼻部整形（肋软骨隆鼻），希望自然高挺，改善鼻翼宽度</p>
              </div>
              <div>
                <Label className="text-slate-400">顾虑与痛点</Label>
                <p className="text-white">担心恢复期时间长，影响工作</p>
              </div>
              <div>
                <Label className="text-slate-400">预算范围</Label>
                <p className="text-white">1-2万（可接受上调至2.5万）</p>
              </div>
              <div>
                <Label className="text-slate-400">下一步行动</Label>
                <p className="text-white">安排李医生面诊，准备恢复期详细方案和案例</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  )
}

// Module 3: Patient Profile Integration
function IntegrationModule() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">患者画像整合</h2>

        {/* Consistency Check */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              信息一致性检测
            </h3>

            <div className="space-y-3">
              <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-300">一致性良好</span>
                </div>
                <p className="text-sm text-green-200">线上和线下描述的预算范围基本一致（1-2万）</p>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-yellow-300">发现差异</span>
                </div>
                <p className="text-sm text-yellow-200">
                  线上未提及恢复期顾虑，但线下沟通中表现出较大担忧。建议重点解决这一痛点。
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Aesthetic Analysis Report */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-500" />
              美学分析报告
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-600/50 rounded-lg p-4">
                <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-slate-500" />
                </div>
                <p className="text-sm text-slate-400 text-center">正面照片</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-slate-400">面部轮廓分析</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">鼻梁高度</span>
                      <Badge variant="outline" className="bg-yellow-600/20 text-yellow-300 border-yellow-600">
                        偏低
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">鼻翼宽度</span>
                      <Badge variant="outline" className="bg-yellow-600/20 text-yellow-300 border-yellow-600">
                        偏宽
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">面部比例</span>
                      <Badge variant="outline" className="bg-green-600/20 text-green-300 border-green-600">
                        协调
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-400">黄金分割差距</Label>
                  <p className="text-sm text-slate-300 mt-1">鼻长/面长比值: 0.31（标准: 0.33）</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
              <p className="text-sm text-blue-300">
                💡 AI建议：适合进行鼻综合整形，重点提升鼻梁高度并缩小鼻翼。建议材料：肋软骨（持久性好，适合初次手术）
              </p>
            </div>
          </div>
        </Card>

        {/* CLV & Win Rate Prediction */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-700/50 border-slate-600">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                客户价值预测
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">S级</div>
                <p className="text-sm text-slate-400">长期高净值客户</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">预计首次消费</span>
                  <span className="text-white font-medium">2-2.5万</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">3年生命周期价值</span>
                  <span className="text-white font-medium">8-15万</span>
                </div>
              </div>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded p-3">
                <p className="text-xs text-yellow-300">建议：安排院长级医生面诊，提供VIP服务体验</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                成交概率分析
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
                <p className="text-sm text-slate-400">高成交概率</p>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-slate-400">主要促进因素</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-green-600">预算充足</Badge>
                    <Badge className="bg-green-600">专业认知</Badge>
                    <Badge className="bg-green-600">决策理性</Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400">主要抗性点</Label>
                  <Badge className="bg-red-600">恢复期顾虑</Badge>
                </div>
              </div>
              <div className="bg-green-600/20 border border-green-600/50 rounded p-3">
                <p className="text-xs text-green-300">建议：重点讲解快速恢复技术和术后护理方案</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Warning */}
        <Card className="bg-red-600/20 border-red-600/50">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              禁忌症与风险预警
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-300">无怀孕/备孕计划</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-300">无过敏史</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-300">无正在服用抗凝药物</span>
              </div>
            </div>
            <div className="bg-green-600/20 border border-green-600/50 rounded p-3">
              <p className="text-sm text-green-300">✓ 未检测到医疗禁忌症，可安全进行手术</p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  )
}

// Module 4: Smart Recommendation (Doctor Only)
function RecommendationModule() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">智能推荐项目</h2>

        {/* ABC Plans */}
        <div className="space-y-4">
          {/* Plan A */}
          <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-600/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-600 text-lg px-3 py-1">方案 A</Badge>
                  <h3 className="text-xl font-bold text-white">旗舰高端方案</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">¥28,000</div>
                  <p className="text-xs text-slate-400">预计利润率: 45%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">项目组合</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">肋软骨鼻综合（院长）</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">鼻翼缩小术</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">超声刀面部提升</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">方案优势</Label>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-slate-300">• 院长级医生操作，经验丰富</p>
                    <p className="text-sm text-slate-300">• 效果最佳，持久性强</p>
                    <p className="text-sm text-slate-300">• 赠送术后护理套餐</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded p-3">
                <p className="text-sm text-yellow-300">
                  💡 推荐理由：客户预算充足，追求高品质效果，且为S级高净值客户，适合推荐旗舰方案建立长期信任
                </p>
              </div>
            </div>
          </Card>

          {/* Plan B - Recommended */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-600/50 border-2">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-600 text-lg px-3 py-1">方案 B</Badge>
                  <h3 className="text-xl font-bold text-white">主推性价比方案</h3>
                  <Badge className="bg-green-600">最高成交率</Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">¥18,800</div>
                  <p className="text-xs text-slate-400">预计利润率: 38%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">项目组合</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">肋软骨鼻综合</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">鼻翼缩小术</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">方案优势</Label>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-slate-300">• 效果与价格最佳平衡</p>
                    <p className="text-sm text-slate-300">• 恢复期相对较短</p>
                    <p className="text-sm text-slate-300">• 历史成交率最高</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/20 border border-blue-600/50 rounded p-3">
                <p className="text-sm text-blue-300">
                  ⭐
                  推荐理由：完美匹配客户预算范围（1-2万），核心需求全覆盖，性价比突出。根据历史数据，类似画像客户选择此方案成交率达92%
                </p>
              </div>
            </div>
          </Card>

          {/* Plan C */}
          <Card className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 border-slate-600/50">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-slate-600 text-lg px-3 py-1">方案 C</Badge>
                  <h3 className="text-xl font-bold text-white">入门引流方案</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-400">¥12,800</div>
                  <p className="text-xs text-slate-400">预计利润率: 25%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">项目组合</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-white">假体隆鼻</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">方案优势</Label>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-slate-300">• 门槛低，易接受</p>
                    <p className="text-sm text-slate-300">• 手术时间短</p>
                    <p className="text-sm text-slate-300">• 为后续升单做铺垫</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-600/20 border border-slate-600/50 rounded p-3">
                <p className="text-sm text-slate-400">
                  推荐理由：若客户对预算极度敏感，可先选择入门方案建立信任，3-6个月后推荐修复升级
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Inventory & Scheduling Alert */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-yellow-600/20 border-yellow-600/50">
            <div className="p-4 space-y-3">
              <h4 className="font-semibold text-yellow-300 flex items-center gap-2">
                <Package className="w-4 h-4" />
                库存预警
              </h4>
              <p className="text-sm text-yellow-200">注意：肋软骨材料库存紧张（剩余3例），建议优先锁定</p>
            </div>
          </Card>

          <Card className="bg-blue-600/20 border-blue-600/50">
            <div className="p-4 space-y-3">
              <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                排期建议
              </h4>
              <p className="text-sm text-blue-200">李医生本周五下午有空档，建议安排面诊</p>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  )
}

// Module 5: Doctor Treatment Plan (Doctor Only)
function TreatmentPlanModule() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">医生制定方案</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              预览
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              确认方案
            </Button>
          </div>
        </div>

        {/* Selected Plan */}
        <Card className="bg-blue-600/20 border-blue-600/50">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-blue-300">已选方案：方案B（主推性价比方案）</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-400">项目</Label>
                <p className="text-white">肋软骨鼻综合 + 鼻翼缩小</p>
              </div>
              <div>
                <Label className="text-slate-400">总价</Label>
                <p className="text-white font-bold">¥18,800</p>
              </div>
              <div>
                <Label className="text-slate-400">预计手术时间</Label>
                <p className="text-white">2-3小时</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Doctor Modifications */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">医生方案调整</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>手术方式</Label>
                <Select defaultValue="rib">
                  <SelectTrigger className="bg-slate-600 border-slate-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="rib">肋软骨</SelectItem>
                    <SelectItem value="prosthesis">假体</SelectItem>
                    <SelectItem value="autologous">自体脂肪</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>麻醉方式</Label>
                <Select defaultValue="general">
                  <SelectTrigger className="bg-slate-600 border-slate-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="general">全身麻醉</SelectItem>
                    <SelectItem value="local">局部麻醉</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>医生补充说明</Label>
              <Textarea
                placeholder="输入手术注意事项、特殊说明等..."
                className="bg-slate-600 border-slate-500 text-white"
                rows={4}
                defaultValue="患者鼻部基础条件良好，适合采用肋软骨进行鼻综合整形。建议先提升鼻梁高度，同时进行鼻翼缩小，以达到最佳面部比例。术后需注意..."
              />
            </div>
          </div>
        </Card>

        {/* Injection Points (AI Generated) */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI生成治疗方案
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-2 block">手术部位标注</Label>
                <div className="aspect-square bg-slate-600/50 rounded-lg flex items-center justify-center">
                  <Camera className="w-16 h-16 text-slate-500" />
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">AI生成的手术部位标注图</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">材料用量建议</Label>
                  <div className="space-y-2 mt-2 bg-slate-600/30 rounded p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">肋软骨</span>
                      <span className="text-white">3-4cm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">鼻翼缩小量</span>
                      <span className="text-white">2-3mm/侧</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">恢复期预估</Label>
                  <div className="space-y-2 mt-2 bg-slate-600/30 rounded p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">消肿期: 7-10天</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300">完全恢复: 3-6个月</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Visual AI - Effect Simulation */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-500" />
              术后效果模拟
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-2 block">术前</Label>
                <div className="aspect-square bg-slate-600/50 rounded-lg flex items-center justify-center">
                  <Camera className="w-16 h-16 text-slate-500" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300 mb-2 block">术后预期效果</Label>
                <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-blue-600/50">
                  <div className="text-center">
                    <Lightbulb className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-300">AI模拟效果图</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 border border-purple-600/50 rounded p-3">
              <p className="text-sm text-purple-300">
                💡 AI模拟说明：根据面部比例和黄金分割，预计术后鼻梁提升4-5mm，鼻翼缩小2-3mm，整体面部协调度提升30%
              </p>
            </div>
          </div>
        </Card>

        {/* Auto-generated Documents */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">自动生成医疗文书</h3>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                治疗方案书
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                知情同意书
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                术前评估表
              </Button>
            </div>

            <div className="bg-green-600/20 border border-green-600/50 rounded p-3">
              <p className="text-sm text-green-300">✓ 所有文书已自动生成，请医生核对后签字确认</p>
            </div>
          </div>
        </Card>

        {/* Post-op Follow-up Plan */}
        <Card className="bg-slate-700/50 border-slate-600">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              术后随访计划
            </h3>

            <div className="space-y-3">
              {[
                { day: "术后第3天", content: "询问消肿情况，提醒按时用药" },
                { day: "术后第7天", content: "拆线复查，评估恢复进度" },
                { day: "术后第30天", content: "首次效果评估，拍摄对比照" },
                { day: "术后第90天", content: "最终效果评估，满意度调查" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-slate-600/30 rounded p-3">
                  <div className="w-24 flex-shrink-0">
                    <Badge className="bg-blue-600">{item.day}</Badge>
                  </div>
                  <p className="text-sm text-slate-300">{item.content}</p>
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                </div>
              ))}
            </div>

            <div className="bg-blue-600/20 border border-blue-600/50 rounded p-3">
              <p className="text-sm text-blue-300">✓ 随访计划已自动生成，将自动推送至客服和咨询师系统</p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  )
}
