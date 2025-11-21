"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  Send,
  Edit3,
  Upload,
  Download,
  Trash2,
  MoreVertical,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle,
  ArrowLeft,
  UserCircle2,
  Stethoscope,
  Mic,
  ImageIcon,
  FileUp,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CollaborativeServicePlatformProps {
  onBack: () => void
}

export function CollaborativeServicePlatform({ onBack }: CollaborativeServicePlatformProps) {
  const [currentRole, setCurrentRole] = useState<"咨询师" | "医生">("咨询师")

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="h-16 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">咨询师&医生协作平台</h1>
              <p className="text-sm text-slate-400">专业医疗协作 · 智能辅助决策</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">当前角色：</span>
          <Select value={currentRole} onValueChange={(value: "咨询师" | "医生") => setCurrentRole(value)}>
            <SelectTrigger className="w-[150px] bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="咨询师" className="text-white hover:bg-slate-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="w-4 h-4 text-blue-400" />
                  <span>咨询师</span>
                </div>
              </SelectItem>
              <SelectItem value="医生" className="text-white hover:bg-slate-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-green-400" />
                  <span>医生</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <RoleBasedContent role={currentRole} />
      </div>
    </div>
  )
}

function RoleBasedContent({ role }: { role: "咨询师" | "医生" }) {
  const [activeTab, setActiveTab] = useState(role === "咨询师" ? "quick-record" : "smart-recommend")

  useState(() => {
    setActiveTab(role === "咨询师" ? "quick-record" : "smart-recommend")
  })

  if (role === "咨询师") {
    return (
      <div className="h-full flex flex-col">
        <div className="h-14 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-center gap-2 px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("quick-record")}
            className={
              activeTab === "quick-record"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            <FileText className="w-4 h-4 mr-2" />
            快速病历
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("communication")}
            className={
              activeTab === "communication"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            <FileText className="w-4 h-4 mr-2" />
            资讯沟通纪要
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("general-plan")}
            className={
              activeTab === "general-plan"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            <FileText className="w-4 h-4 mr-2" />
            辅助通用方案
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "quick-record" && <QuickRecordModule />}
          {activeTab === "communication" && <CommunicationModule />}
          {activeTab === "general-plan" && <GeneralPlanModule />}
        </div>
      </div>
    )
  } else {
    return (
      <div className="h-full flex flex-col">
        <div className="h-14 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-center gap-2 px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("smart-recommend")}
            className={
              activeTab === "smart-recommend"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            智能推荐
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("doctor-plan")}
            className={
              activeTab === "doctor-plan"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            医生制定方案
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "smart-recommend" && <SmartRecommendModule />}
          {activeTab === "doctor-plan" && <DoctorPlanModule />}
        </div>
      </div>
    )
  }
}

// 咨询师模块 1: 快速病历
function QuickRecordModule() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [recordForm, setRecordForm] = useState({
    name: "",
    age: "",
    gender: "女",
    phone: "",
    concerns: "",
    medicalHistory: "",
    allergies: "",
    skinType: "",
    expectations: "",
  })

  const patients = [
    { name: "刘小姐", project: "玻尿酸咨询", lastVisit: "2025-09-25" },
    { name: "陈女士", project: "热玛吉方案确认", lastVisit: "2025-09-26" },
    { name: "赵美丽", project: "光子嫩肤咨询", lastVisit: "2025-09-24" },
  ]

  return (
    <div className="h-full flex">
      {/* 客户列表 */}
      <div className="w-80 bg-slate-800/30 border-r border-slate-700/50 p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索客户..."
              className="pl-9 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-2">
            {patients.map((patient) => (
              <div
                key={patient.name}
                onClick={() => setSelectedPatient(patient.name)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedPatient === patient.name
                    ? "bg-blue-600/20 border border-blue-500/50"
                    : "bg-slate-700/30 hover:bg-slate-700/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 bg-blue-600">
                    <AvatarFallback className="text-white">{patient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{patient.name}</h4>
                    <p className="text-sm text-slate-400 truncate">{patient.project}</p>
                    <p className="text-xs text-slate-500 mt-1">最后访问：{patient.lastVisit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 病历表单 */}
      <div className="flex-1 bg-slate-900/30 overflow-auto">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">快速病历录入</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                导入历史记录
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                保存病历
              </Button>
            </div>
          </div>

          <div className="space-y-6 bg-slate-800/30 rounded-lg p-6 border border-slate-700/50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">姓名 *</Label>
                <Input
                  value={recordForm.name}
                  onChange={(e) => setRecordForm({ ...recordForm, name: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <Label className="text-slate-300">年龄</Label>
                <Input
                  value={recordForm.age}
                  onChange={(e) => setRecordForm({ ...recordForm, age: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white"
                  placeholder="请输入年龄"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">性别</Label>
                <Select
                  value={recordForm.gender}
                  onValueChange={(value) => setRecordForm({ ...recordForm, gender: value })}
                >
                  <SelectTrigger className="mt-1.5 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="女" className="text-white">
                      女
                    </SelectItem>
                    <SelectItem value="男" className="text-white">
                      男
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">联系电话</Label>
                <Input
                  value={recordForm.phone}
                  onChange={(e) => setRecordForm({ ...recordForm, phone: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white"
                  placeholder="请输入联系电话"
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300">主要诉求 *</Label>
              <Textarea
                value={recordForm.concerns}
                onChange={(e) => setRecordForm({ ...recordForm, concerns: e.target.value })}
                className="mt-1.5 bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                placeholder="请描述客户的主要诉求和期望..."
              />
            </div>

            <div>
              <Label className="text-slate-300">既往病史</Label>
              <Textarea
                value={recordForm.medicalHistory}
                onChange={(e) => setRecordForm({ ...recordForm, medicalHistory: e.target.value })}
                className="mt-1.5 bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
                placeholder="请填写相关病史..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">过敏史</Label>
                <Input
                  value={recordForm.allergies}
                  onChange={(e) => setRecordForm({ ...recordForm, allergies: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white"
                  placeholder="如：青霉素过敏"
                />
              </div>
              <div>
                <Label className="text-slate-300">肤质类型</Label>
                <Select
                  value={recordForm.skinType}
                  onValueChange={(value) => setRecordForm({ ...recordForm, skinType: value })}
                >
                  <SelectTrigger className="mt-1.5 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="请选择肤质" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="干性" className="text-white">
                      干性
                    </SelectItem>
                    <SelectItem value="油性" className="text-white">
                      油性
                    </SelectItem>
                    <SelectItem value="混合性" className="text-white">
                      混合性
                    </SelectItem>
                    <SelectItem value="敏感性" className="text-white">
                      敏感性
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-slate-300">预期效果</Label>
              <Textarea
                value={recordForm.expectations}
                onChange={(e) => setRecordForm({ ...recordForm, expectations: e.target.value })}
                className="mt-1.5 bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
                placeholder="客户期望达到的效果..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 咨询师模块 2: 资讯沟通纪要
function CommunicationModule() {
  const [communications, setCommunications] = useState([
    {
      id: 1,
      customer: "刘小姐",
      date: "2025-09-25",
      type: "电话沟通",
      summary: "讨论玻尿酸填充方案，客户对价格比较敏感，需要进一步沟通优惠方案",
      nextStep: "准备优惠方案，3天内回访",
    },
    {
      id: 2,
      customer: "陈女士",
      date: "2025-09-26",
      type: "面诊",
      summary: "客户对热玛吉效果很感兴趣，已完成面部评估，准备制定详细方案",
      nextStep: "联系医生制定方案，明天提供给客户",
    },
  ])

  const [showNewDialog, setShowNewDialog] = useState(false)
  const [newComm, setNewComm] = useState({
    customer: "",
    type: "电话沟通",
    summary: "",
    nextStep: "",
  })

  const handleAddCommunication = () => {
    if (newComm.customer && newComm.summary) {
      setCommunications([
        ...communications,
        {
          id: communications.length + 1,
          ...newComm,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewComm({ customer: "", type: "电话沟通", summary: "", nextStep: "" })
      setShowNewDialog(false)
    }
  }

  return (
    <div className="h-full bg-slate-900/30 overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">资讯沟通纪要</h2>
          <Button onClick={() => setShowNewDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新建纪要
          </Button>
        </div>

        <div className="space-y-4">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className="bg-slate-800/30 rounded-lg p-5 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-blue-600">
                    <AvatarFallback className="text-white">{comm.customer[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">{comm.customer}</h3>
                    <p className="text-sm text-slate-400">
                      {comm.date} · {comm.type}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">
                      <Edit3 className="w-4 h-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-700/30 rounded p-3">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">沟通摘要</span>
                  <p className="text-white mt-1">{comm.summary}</p>
                </div>
                <div className="bg-blue-600/10 rounded p-3 border border-blue-500/20">
                  <span className="text-xs text-blue-400 uppercase tracking-wide">下一步行动</span>
                  <p className="text-blue-300 mt-1 font-medium">{comm.nextStep}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 新建纪要对话框 */}
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogContent className="bg-slate-800 border-2 border-slate-700 text-white max-w-2xl shadow-2xl backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-xl">新建沟通纪要</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-300">客户姓名</Label>
                <Input
                  value={newComm.customer}
                  onChange={(e) => setNewComm({ ...newComm, customer: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white"
                  placeholder="请输入客户姓名"
                />
              </div>
              <div>
                <Label className="text-slate-300">沟通方式</Label>
                <Select value={newComm.type} onValueChange={(value) => setNewComm({ ...newComm, type: value })}>
                  <SelectTrigger className="mt-1.5 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="电话沟通" className="text-white">
                      电话沟通
                    </SelectItem>
                    <SelectItem value="面诊" className="text-white">
                      面诊
                    </SelectItem>
                    <SelectItem value="微信沟通" className="text-white">
                      微信沟通
                    </SelectItem>
                    <SelectItem value="其他" className="text-white">
                      其他
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">沟通摘要</Label>
                <Textarea
                  value={newComm.summary}
                  onChange={(e) => setNewComm({ ...newComm, summary: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                  placeholder="请输入沟通内容摘要..."
                />
              </div>
              <div>
                <Label className="text-slate-300">下一步行动</Label>
                <Textarea
                  value={newComm.nextStep}
                  onChange={(e) => setNewComm({ ...newComm, nextStep: e.target.value })}
                  className="mt-1.5 bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
                  placeholder="请输入下一步需要采取的行动..."
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowNewDialog(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                取消
              </Button>
              <Button onClick={handleAddCommunication} className="bg-blue-600 hover:bg-blue-700">
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// 咨询师模块 3: 辅助通用方案
function GeneralPlanModule() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const generalPlans = [
    {
      id: "plan1",
      name: "抗衰老基础方案",
      category: "抗衰",
      items: ["热玛吉", "光子嫩肤", "玻尿酸填充"],
      price: "¥18,800",
      duration: "3-6个月",
      description: "适合初期抗衰需求的客户，综合改善面部轮廓和肤质",
    },
    {
      id: "plan2",
      name: "美白提亮套餐",
      category: "美白",
      items: ["激光美白", "水光针", "维C导入"],
      price: "¥12,600",
      duration: "2-3个月",
      description: "针对色素沉着，提亮肤色，改善暗沉",
    },
    {
      id: "plan3",
      name: "祛痘修复方案",
      category: "祛痘",
      items: ["果酸焕肤", "红蓝光治疗", "修复面膜"],
      price: "¥8,900",
      duration: "1-2个月",
      description: "控油祛痘，修复痘印，改善痘肌",
    },
  ]

  const filteredPlans = generalPlans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="h-full bg-slate-900/30 overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">辅助通用方案</h2>
          <div className="flex gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索方案..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              创建方案
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`bg-slate-800/30 rounded-lg p-5 border cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === plan.id
                  ? "border-blue-500/50 shadow-blue-500/20"
                  : "border-slate-700/50 hover:border-slate-600/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 mb-2">{plan.category}</Badge>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">
                      <Edit3 className="w-4 h-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      导出
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-slate-400 mb-4">{plan.description}</p>

              <div className="space-y-3 mb-4">
                <div className="bg-slate-700/30 rounded p-2">
                  <div className="text-xs text-slate-400 mb-1">包含项目</div>
                  <div className="flex flex-wrap gap-1">
                    {plan.items.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-slate-400">参考价格</div>
                    <div className="text-blue-400 font-semibold">{plan.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400">周期</div>
                    <div className="text-white font-medium">{plan.duration}</div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30">
                应用此方案
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 医生模块 1: 智能推荐
function SmartRecommendModule() {
  const [selectedPatient, setSelectedPatient] = useState("张小美")

  const patientData = {
    name: "张小美",
    age: 28,
    gender: "女",
    skinType: "混合性",
    concerns: ["面部松弛", "法令纹", "皮肤暗沉"],
    budget: "20000-30000",
  }

  const recommendations = [
    {
      id: 1,
      treatment: "热玛吉FLX",
      priority: "高",
      reason: "针对面部松弛效果显著，适合客户年龄和需求",
      price: "¥18,800",
      duration: "60-90分钟",
      recovery: "无恢复期",
      effect: "持续12-18个月",
      confidence: 95,
    },
    {
      id: 2,
      treatment: "玻尿酸填充",
      priority: "高",
      reason: "改善法令纹，立即见效，安全性高",
      price: "¥8,600",
      duration: "30-45分钟",
      recovery: "1-2天",
      effect: "持续8-12个月",
      confidence: 92,
    },
    {
      id: 3,
      treatment: "光子嫩肤",
      priority: "中",
      reason: "改善肤色暗沉，提亮肤色",
      price: "¥3,200",
      duration: "30分钟",
      recovery: "3-5天",
      effect: "持续6-9个月",
      confidence: 88,
    },
  ]

  return (
    <div className="h-full bg-slate-900/30 overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">智能推荐系统</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* 患者信息 */}
          <div className="col-span-1 bg-slate-800/30 rounded-lg p-5 border border-slate-700/50 h-fit">
            <h3 className="text-lg font-semibold text-white mb-4">患者信息</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 bg-blue-600">
                  <AvatarFallback className="text-white text-lg">{patientData.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{patientData.name}</div>
                  <div className="text-sm text-slate-400">
                    {patientData.age}岁 · {patientData.gender}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/50 space-y-2">
                <div>
                  <div className="text-xs text-slate-400">肤质类型</div>
                  <div className="text-white">{patientData.skinType}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">预算范围</div>
                  <div className="text-white">{patientData.budget}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">主要诉求</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patientData.concerns.map((concern, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 推荐方案 */}
          <div className="col-span-2 space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-800/30 rounded-lg p-5 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">{rec.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{rec.treatment}</h3>
                      <p className="text-sm text-slate-400">{rec.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        rec.priority === "高"
                          ? "bg-red-600/20 text-red-400 border-red-500/30"
                          : "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {rec.priority}优先级
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">推荐度</div>
                      <div className="text-lg font-semibold text-blue-400">{rec.confidence}%</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">参考价格</div>
                    <div className="text-white font-semibold">{rec.price}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">治疗时长</div>
                    <div className="text-white font-medium">{rec.duration}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">恢复期</div>
                    <div className="text-white font-medium">{rec.recovery}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded p-3">
                    <div className="text-xs text-slate-400 mb-1">效果持续</div>
                    <div className="text-white font-medium">{rec.effect}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    采纳方案
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 医生模块 2: 医生制定方案
function DoctorPlanModule() {
  const [ageGroup, setAgeGroup] = useState("18-25")
  const [gender, setGender] = useState("女")
  const [skinTypes, setSkinTypes] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null)
  const [phases, setPhases] = useState([
    { id: 1, name: "家居皮肤调理", items: [] },
    { id: 2, name: "院线光电治疗", items: [] },
    { id: 3, name: "巩固保养", items: [] },
  ])

  const toggleSkinType = (type: string) => {
    setSkinTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <div className="h-full flex">
      {/* 左侧：客户信息录入 */}
      <div className="w-[360px] bg-slate-800/30 border-r border-slate-700/50 flex flex-col">
        <div className="p-4 border-b border-slate-700/50">
          <h3 className="font-semibold text-white">客户信息录入</h3>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {/* 基本信息 */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">基本信息</h4>

              <div className="mb-4">
                <Label className="text-slate-300 text-sm">年龄</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["18-25", "26-35", "36-45", "46+"].map((age) => (
                    <Button
                      key={age}
                      variant="outline"
                      size="sm"
                      onClick={() => setAgeGroup(age)}
                      className={
                        ageGroup === age
                          ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                          : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }
                    >
                      {age}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-sm">性别</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["女", "男", "其他"].map((g) => (
                    <Button
                      key={g}
                      variant="outline"
                      size="sm"
                      onClick={() => setGender(g)}
                      className={
                        gender === g
                          ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                          : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 肤质 */}
            <div>
              <Label className="text-slate-300 text-sm">肤质</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["干性", "油性", "混合性", "敏感性"].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSkinType(type)}
                    className={
                      skinTypes.includes(type)
                        ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* 资料上传 */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">资料上传</h4>

              {/* 微信聊天截图 */}
              <div className="mb-4">
                <Label className="text-slate-300 text-sm">微信聊天截图</Label>
                <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors cursor-pointer bg-slate-700/20">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 mb-1">点击或拖拽上传图</p>
                  <p className="text-xs text-slate-500">支持 PNG, JPG 格式</p>
                </div>
                {uploadedImages.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-700/30 rounded p-2">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-300 flex-1">图片 {idx + 1}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 咨询录音 */}
              <div>
                <Label className="text-slate-300 text-sm">咨询录音</Label>
                <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors cursor-pointer bg-slate-700/20">
                  <Mic className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 mb-1">点击上传录音文件</p>
                  <p className="text-xs text-slate-500">支持 MP3, WAV, M4A 格式</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* 右侧：治疗方案构建 */}
      <div className="flex-1 bg-slate-900/30 flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-semibold text-white">治疗方案构建</h2>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {phases.map((phase, index) => (
              <div key={phase.id} className="bg-slate-800/30 rounded-lg p-5 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        index === 0
                          ? "bg-blue-600/20 text-blue-400"
                          : index === 1
                            ? "bg-purple-600/20 text-purple-400"
                            : "bg-green-600/20 text-green-400"
                      }`}
                    >
                      {phase.id}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      第{["一", "二", "三"][index]}阶段：{phase.name}
                    </h3>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-1" />
                    添加项目
                  </Button>
                </div>

                {phase.items.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <FileUp className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p>暂无项目，点击上方按钮添加</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {phase.items.map((item: any, idx: number) => (
                      <div key={idx} className="bg-slate-700/30 rounded p-3 flex items-center justify-between">
                        <span className="text-white">{item}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 方案总计 */}
            <div className="bg-slate-800/30 rounded-lg p-5 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">方案总计</h3>
                <div className="text-right">
                  <div className="text-sm text-slate-400">预估总价</div>
                  <div className="text-3xl font-bold text-blue-400">¥0</div>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 h-12">
                <FileText className="w-5 h-5 mr-2" />
                保存方案
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 h-12 bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                生成方案书
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function ChatInterface({ selectedCustomer, onSelectCustomer, messageInput, setMessageInput }: any) {
  const [filterStage, setFilterStage] = useState("全部")
  const [aiDraft, setAiDraft] = useState({
    show: true,
    content:
      "张小美您好！热玛吉术后24-48小时内出现轻微红肿是完全正常的恢复现象，这是皮肤组织受热刺激后的自然反应。根据您的档案，您昨天下午进行的治疗，目前的红肿程度在预期范围内。\n\n建议您：\n1. 继续进行冷敷，每次15-20分钟\n2. 避免使用刺激性护肤品\n3. 注意防晒，避免高温环境\n4. 多喝水促进新陈代谢\n\n如症状加重或持续不退，请及时联系我们。",
  })

  const allCustomers = [
    // 售前客户（咨询师角色）
    {
      name: "刘小姐",
      role: "咨询师",
      project: "玻尿酸咨询中",
      status: "medium",
      avatar: "刘",
      stage: "新线索",
      stageFilter: "售前",
    },
    {
      name: "陈女士",
      role: "咨询师",
      project: "热玛吉方案确认",
      status: "high",
      avatar: "陈",
      stage: "方案确认中",
      stageFilter: "售前",
    },
    {
      name: "赵美丽",
      role: "咨询师",
      project: "光子嫩肤咨询",
      status: "low",
      avatar: "赵",
      stage: "待建档",
      stageFilter: "售前",
    },

    // 术前客户（医生和护士角色）
    {
      name: "王美丽",
      role: "医生",
      project: "光子嫩肤术前准备",
      status: "medium",
      avatar: "王",
      stage: "已预约",
      stageFilter: "术前",
    },
    {
      name: "李娜",
      role: "护士",
      project: "玻尿酸术前7天",
      status: "low",
      avatar: "李",
      stage: "已预约",
      stageFilter: "术前",
    },
    {
      name: "周小姐",
      role: "医生",
      project: "肉毒素术前检查",
      status: "medium",
      avatar: "周",
      stage: "已预约",
      stageFilter: "术前",
    },

    // 术后客户（医生和护士角色）
    {
      name: "张小美",
      role: "医生",
      project: "热玛吉术后第2天",
      status: "high",
      avatar: "张",
      stage: "术后跟踪",
      stageFilter: "术后",
    },
    {
      name: "孙丽丽",
      role: "护士",
      project: "玻尿酸术后第5天",
      status: "medium",
      avatar: "孙",
      stage: "术后跟踪",
      stageFilter: "术后",
    },
    {
      name: "吴小姐",
      role: "医生",
      project: "光子嫩肤术后30天",
      status: "low",
      avatar: "吴",
      stage: "服务完成",
      stageFilter: "术后",
    },
  ]

  // 根据筛选条件过滤客户
  const customers = filterStage === "全部" ? allCustomers : allCustomers.filter((c) => c.stageFilter === filterStage)

  const messages = [
    {
      sender: "customer",
      name: "张小美",
      content: "医生您好，我昨天做完热玛吉，脸上有点红肿，这正常吗？",
      time: "14:30",
      avatar: "张",
    },
    {
      sender: "doctor",
      name: "李医生",
      content: "您好张小美，术后24-48小时内轻微红肿是正常现象，这是皮肤组织受热刺激后的自然反应。",
      time: "14:32",
      avatar: "李",
    },
    { sender: "customer", name: "张小美", content: "那我需要注意什么吗？", time: "14:33", avatar: "张" },
    {
      sender: "nurse",
      name: "王护士",
      content: "您好，我是王护士。建议您继续冷敷，每次15-20分钟，避免使用刺激性护肤品。",
      time: "14:35",
      avatar: "王",
    },
    {
      sender: "consultant",
      name: "张咨询师",
      content: "张小美您好，我会持续关注您的恢复情况，有任何问题随时联系我们。",
      time: "14:37",
      avatar: "张",
    },
    { sender: "customer", name: "张小美", content: "好的，谢谢各位老师！", time: "14:38", avatar: "张" },
  ]

  const getRoleBgColor = (sender: string) => {
    switch (sender) {
      case "customer":
        return "bg-slate-700/50"
      case "doctor":
        return "bg-blue-600/80"
      case "nurse":
        return "bg-green-600/80"
      case "consultant":
        return "bg-purple-600/80"
      default:
        return "bg-slate-700/50"
    }
  }

  const getRoleLabel = (sender: string) => {
    switch (sender) {
      case "customer":
        return "客户"
      case "doctor":
        return "医生"
      case "nurse":
        return "护士"
      case "consultant":
        return "咨询师"
      default:
        return ""
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-80 bg-slate-800/30 border-r border-slate-700/50 flex flex-col">
        <div className="p-4 space-y-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索客户姓名、项目..."
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2">
            {["全部", "售前", "术前", "术后"].map((stage) => (
              <Button
                key={stage}
                variant={filterStage === stage ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStage(stage)}
                className={filterStage === stage ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300"}
              >
                {stage}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {customers.map((customer) => (
              <div
                key={customer.name}
                onClick={() => onSelectCustomer(customer.name)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCustomer === customer.name
                    ? "bg-blue-600/20 border border-blue-500/50"
                    : "hover:bg-slate-700/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 bg-blue-600">
                      <AvatarFallback className="text-white">{customer.avatar}</AvatarFallback>
                    </Avatar>
                    {customer.status === "high" && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{customer.name}</h4>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {customer.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 truncate">{customer.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-slate-900/30">
        <div className="h-14 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-between px-6 flex-shrink-0">
          <h3 className="text-white font-medium">
            与 {selectedCustomer} 的会话 - {allCustomers.find((c) => c.name === selectedCustomer)?.stage || "术后跟踪"}
          </h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Avatar
                    className={`w-10 h-10 flex-shrink-0 ${msg.sender === "customer" ? "bg-slate-600" : "bg-blue-600"}`}
                  >
                    <AvatarFallback className="text-white text-sm">{msg.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{msg.name}</span>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {getRoleLabel(msg.sender)}
                      </Badge>
                      <span className="text-xs text-slate-500">{msg.time}</span>
                    </div>
                    <div className={`${getRoleBgColor(msg.sender)} rounded-lg p-3 inline-block max-w-xl`}>
                      <p className="text-white">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {aiDraft.show && (
                <div className="border-2 border-dashed border-yellow-500/50 bg-yellow-500/10 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-yellow-600 hover:bg-yellow-700">AI助手草稿 · 待审核</Badge>
                  </div>
                  <p className="text-white whitespace-pre-line mb-4">{aiDraft.content}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      直接发送
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      <Edit3 className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      忽略
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 bg-slate-800/30 border-t border-slate-700/50 flex-shrink-0">
          <div className="flex gap-2">
            <Textarea
              placeholder="输入消息..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="min-h-[60px] bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 h-[60px] w-[60px]">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-96 bg-slate-800/30 border-l border-slate-700/50 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-3 bg-blue-600">
                  <AvatarFallback className="text-2xl text-white">张</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-white">{selectedCustomer}</h3>
                <Badge className="mt-2 bg-orange-600 hover:bg-orange-700">热玛吉术后第2天</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    基本信息
                  </h4>
                  <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">年龄</span>
                      <span className="text-white">32岁</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">肤质</span>
                      <span className="text-white">敏感混合性</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">过敏史</span>
                      <span className="text-white">无</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">当前项目</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">项目</span>
                      <span className="text-white">第五代热玛吉面部抗衰</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">操作时间</span>
                      <span className="text-white">2025-10-18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">主治医生</span>
                      <span className="text-white">李医生</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    当前阶段关怀要点
                  </h4>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• 术后24-48小时内轻微红肿正常</li>
                      <li>• 避免高温环境，如桑拿、温泉</li>
                      <li>• 加强保湿，使用温和护肤产品</li>
                      <li>• 避免刺激性、美白、去角质产品</li>
                      <li>• 仪器清洁，避免辛辣刺激食物</li>
                      <li>• 让顾客因熟悉而安得来，打消顾客怕来的不安</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

// 客户旅程看板
function KanbanBoard() {
  const [draggedCard, setDraggedCard] = useState<any>(null)
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)
  const [showAutomationPreview, setShowAutomationPreview] = useState(false)
  const [automationActions, setAutomationActions] = useState<string[]>([])
  const [showAutomationResult, setShowAutomationResult] = useState(false)
  const [executedActions, setExecutedActions] = useState<string[]>([])

  const stages = [
    { id: "new", name: "新线索", count: 3, color: "bg-blue-600" },
    { id: "filing", name: "待建档", count: 1, color: "bg-purple-600" },
    { id: "planning", name: "方案确认中", count: 1, color: "bg-yellow-600" },
    { id: "scheduled", name: "已预约", count: 3, color: "bg-green-600" },
    { id: "followup", name: "术后跟踪", count: 2, color: "bg-orange-600" },
    { id: "completed", name: "服务完成", count: 1, color: "bg-slate-600" },
  ]

  // 与智能服务群聊对应的客户数据
  const [customers, setCustomers] = useState([
    // 新线索
    { id: 1, name: "刘小姐", project: "玻尿酸咨询", stage: "new", doctor: "张咨询师", daysInStage: 2, avatar: "刘" },
    { id: 2, name: "陈女士", project: "热玛吉咨询", stage: "new", doctor: "张咨询师", daysInStage: 1, avatar: "陈" },
    { id: 3, name: "林小姐", project: "光子嫩肤咨询", stage: "new", doctor: "张咨询师", daysInStage: 3, avatar: "林" },

    // 待建档
    { id: 4, name: "赵美丽", project: "光子嫩肤", stage: "filing", doctor: "张咨询师", daysInStage: 1, avatar: "赵" },

    // 方案确认中
    { id: 5, name: "陈女士", project: "热玛吉", stage: "planning", doctor: "李医生", daysInStage: 2, avatar: "陈" },

    // 已预约
    { id: 6, name: "王美丽", project: "光子嫩肤", stage: "scheduled", doctor: "李医生", daysInStage: 5, avatar: "王" },
    { id: 7, name: "李娜", project: "玻尿酸填充", stage: "scheduled", doctor: "王护士", daysInStage: 7, avatar: "李" },
    {
      id: 8,
      name: "周小姐",
      project: "肉毒素注射",
      stage: "scheduled",
      doctor: "李医生",
      daysInStage: 3,
      avatar: "周",
    },

    // 术后跟踪
    { id: 9, name: "张小美", project: "热玛吉", stage: "followup", doctor: "李医生", daysInStage: 2, avatar: "张" },
    {
      id: 10,
      name: "孙丽丽",
      project: "玻尿酸填充",
      stage: "followup",
      doctor: "王护士",
      daysInStage: 5,
      avatar: "孙",
    },

    // 服务完成
    {
      id: 11,
      name: "吴小姐",
      project: "光子嫩肤",
      stage: "completed",
      doctor: "李医生",
      daysInStage: 30,
      avatar: "吴",
    },
  ])

  // 获取自动化规则
  const getAutomationRules = (fromStage: string, toStage: string, customer: any) => {
    const rules: string[] = []

    if (fromStage === "scheduled" && toStage === "followup") {
      rules.push(`📱 发送术后注意事项给${customer.name}`)
      rules.push(`👩‍⚕️ 创建护士回访任务`)
      rules.push(`📋 设置术后第1天问卷提醒`)
      rules.push(`📋 设置术后第3天问卷提醒`)
      rules.push(`📋 设置术后第7天问卷提醒`)
    } else if (fromStage === "new" && toStage === "filing") {
      rules.push(`📝 创建客户档案`)
      rules.push(`📞 安排初次咨询`)
      rules.push(`📧 发送欢迎邮件`)
    } else if (fromStage === "filing" && toStage === "planning") {
      rules.push(`📋 生成方案模板`)
      rules.push(`👨‍⚕️ 分配主治医生`)
      rules.push(`💰 发送报价单`)
    } else if (fromStage === "planning" && toStage === "scheduled") {
      rules.push(`📅 创建预约日程`)
      rules.push(`📱 发送术前准备事项`)
      rules.push(`🔔 设置术前提醒`)
    } else if (fromStage === "followup" && toStage === "completed") {
      rules.push(`✅ 标记服务完成`)
      rules.push(`⭐ 发送满意度调查`)
      rules.push(`🎁 发送优惠券`)
    }

    return rules
  }

  // 拖拽开始
  const handleDragStart = (e: React.DragEvent, customer: any) => {
    setDraggedCard(customer)
    e.dataTransfer.effectAllowed = "move"
  }

  // 拖拽经过
  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    if (draggedCard && draggedCard.stage !== stageId) {
      setDragOverStage(stageId)
      const actions = getAutomationRules(draggedCard.stage, stageId, draggedCard)
      setAutomationActions(actions)
      setShowAutomationPreview(actions.length > 0)
    }
  }

  // 拖拽离开
  const handleDragLeave = () => {
    setDragOverStage(null)
    setShowAutomationPreview(false)
  }

  // 放置
  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault()

    if (draggedCard && draggedCard.stage !== targetStage) {
      // 更新客户阶段
      setCustomers(
        customers.map((c) =>
          c.id === draggedCard.id
            ? {
                ...c,
                stage: targetStage,
                daysInStage: 0,
              }
            : c,
        ),
      )

      // 显示自动化执行结果
      const actions = getAutomationRules(draggedCard.stage, targetStage, draggedCard)
      setExecutedActions(actions)
      setShowAutomationResult(true)

      // 3秒后自动关闭结果提示
      setTimeout(() => {
        setShowAutomationResult(false)
      }, 3000)
    }

    setDraggedCard(null)
    setDragOverStage(null)
    setShowAutomationPreview(false)
  }

  // 拖拽结束
  const handleDragEnd = () => {
    setDraggedCard(null)
    setDragOverStage(null)
    setShowAutomationPreview(false)
  }

  return (
    <div className="h-full p-6 overflow-x-auto relative">
      <div className="flex gap-4 h-full min-w-max">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`w-80 bg-slate-800/30 rounded-lg border-2 transition-all ${
              dragOverStage === stage.id ? "border-blue-500 bg-blue-500/10" : "border-slate-700/50"
            } flex flex-col`}
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{stage.name}</h3>
                <Badge className={`${stage.color}`}>{customers.filter((c) => c.stage === stage.id).length}</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {customers
                  .filter((c) => c.stage === stage.id)
                  .map((customer) => (
                    <div
                      key={customer.id}
                      className={`bg-slate-700/50 rounded-lg p-4 cursor-move hover:bg-slate-700/70 transition-all border border-slate-600/50 ${
                        draggedCard?.id === customer.id ? "opacity-50 scale-95" : ""
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, customer)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-10 h-10 bg-blue-600">
                            <AvatarFallback className="text-white">{customer.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{customer.name}</h4>
                            <p className="text-xs text-slate-400">{customer.project}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">查看详情</DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">编辑信息</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="w-5 h-5 bg-blue-600">
                            <AvatarFallback className="text-xs text-white">{customer.doctor[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-slate-400">{customer.doctor}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span className="text-slate-400">
                            滞留 <span className="text-orange-400 font-medium">{customer.daysInStage}</span> 天
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      {/* 拖拽预览提示 */}
      {showAutomationPreview && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 border-2 border-blue-500 rounded-lg p-4 shadow-2xl z-50 max-w-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">即将触发自动化动作</h4>
              <ul className="space-y-1">
                {automationActions.map((action, idx) => (
                  <li key={idx} className="text-sm text-slate-300">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 自动化执行结果 */}
      {showAutomationResult && (
        <div className="fixed top-20 right-8 bg-green-600 border border-green-500 rounded-lg p-4 shadow-2xl z-50 max-w-md animate-in slide-in-from-right">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-2">自动化任务已执行</h4>
              <ul className="space-y-1">
                {executedActions.map((action, idx) => (
                  <li key={idx} className="text-sm text-white/90 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 知识库管理中心
function KnowledgeCenter({ showNewQADialog, setShowNewQADialog, showUploadDialog, setShowUploadDialog }: any) {
  const [knowledgeTab, setKnowledgeTab] = useState("qa")

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <Tabs value={knowledgeTab} onValueChange={setKnowledgeTab}>
          <TabsList className="bg-slate-800/50">
            <TabsTrigger value="qa">精准问答库</TabsTrigger>
            <TabsTrigger value="documents">深度知识库</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-hidden">
        {knowledgeTab === "qa" && (
          <QALibrary showNewQADialog={showNewQADialog} setShowNewQADialog={setShowNewQADialog} />
        )}
        {knowledgeTab === "documents" && (
          <DocumentLibrary showUploadDialog={showUploadDialog} setShowUploadDialog={setShowUploadDialog} />
        )}
      </div>
    </div>
  )
}

// 精准问答库
function QALibrary({ showNewQADialog, setShowNewQADialog }: any) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedQA, setSelectedQA] = useState<any>(null)
  const [editingQA, setEditingQA] = useState<any>(null)

  // 问答数据
  const [qaItems, setQaItems] = useState([
    {
      id: 1,
      query: "热玛吉术后红肿吗？",
      answer: "术后24-48小时内轻微红肿是正常现象，这是皮肤组织受热刺激后的自然反应...",
      roles: ["医生", "护士"],
      projects: ["热玛吉"],
      stages: ["术后1-3天", "术后7天"],
      types: ["术后反应"],
    },
    {
      id: 2,
      query: "玻尿酸填充后多久可以化妆？",
      answer: "建议术后24小时后再化妆，使用温和的化妆品...",
      roles: ["护士", "咨询师"],
      projects: ["玻尿酸填充"],
      stages: ["术后1-3天"],
      types: ["护理方法"],
    },
  ])

  // 选项配置
  const roleOptions = ["医生", "护士", "咨询师"]
  const projectOptions = ["玻尿酸填充", "热玛吉", "光子嫩肤", "超声炮", "水光针", "肉毒素"]
  const stageOptions = ["售前咨询", "术前准备", "术后1-3天", "术后7天", "术后30天", "长期维养"]
  const typeOptions = ["价格咨询", "术后反应", "护理方法", "效果预期", "预约改期", "投诉建议"]

  // 新建问答表单状态
  const [newQA, setNewQA] = useState({
    query: "",
    answer: "",
    roles: [] as string[],
    projects: [] as string[],
    stages: [] as string[],
    types: [] as string[],
  })

  // 下载Excel模板
  const downloadTemplate = () => {
    // 创建模板数据
    const template = [
      ["query", "answer", "roles", "projects", "stages", "types"],
      ["示例问题", "示例答案", "医生,护士", "热玛吉", "术后1-3天", "术后反应"],
    ]

    // 转换为CSV格式
    const csvContent = template.map((row) => row.join(",")).join("\n")
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "问答库导入模板.csv"
    link.click()
  }

  // 删除问答
  const handleDelete = () => {
    if (selectedQA) {
      setQaItems(qaItems.filter((item) => item.id !== selectedQA.id))
      setShowDeleteDialog(false)
      setSelectedQA(null)
    }
  }

  // 保存新建问答
  const handleSaveNew = () => {
    if (newQA.query && newQA.answer) {
      setQaItems([...qaItems, { ...newQA, id: Date.now() }])
      setNewQA({
        query: "",
        answer: "",
        roles: [],
        projects: [],
        stages: [],
        types: [],
      })
      setShowNewQADialog(false)
    }
  }

  // 保存编辑
  const handleSaveEdit = () => {
    if (editingQA) {
      setQaItems(qaItems.map((item) => (item.id === editingQA.id ? editingQA : item)))
      setShowEditDialog(false)
      setEditingQA(null)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索问答..."
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            下载模板
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowImportDialog(true)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
          >
            <Upload className="w-4 h-4 mr-2" />
            批量导入
          </Button>
          <Button onClick={() => setShowNewQADialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新建问答
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableHead className="text-slate-300 font-semibold">Query</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Answer</TableHead>
                  <TableHead className="text-slate-300 font-semibold">角色</TableHead>
                  <TableHead className="text-slate-300 font-semibold">适用项目</TableHead>
                  <TableHead className="text-slate-300 font-semibold">适用阶段</TableHead>
                  <TableHead className="text-slate-300 font-semibold">问题类型</TableHead>
                  <TableHead className="text-slate-300 font-semibold w-20">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qaItems.map((item) => (
                  <TableRow key={item.id} className="border-slate-700/50 hover:bg-slate-700/30">
                    <TableCell className="text-white max-w-xs">
                      <div className="truncate">{item.query}</div>
                    </TableCell>
                    <TableCell className="text-slate-300 max-w-md">
                      <div className="truncate">{item.answer}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.roles.map((role, idx) => (
                          <Badge key={idx} variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.projects.map((project, idx) => (
                          <Badge key={idx} variant="outline" className="border-purple-500/50 text-purple-300 text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.stages.map((stage, idx) => (
                          <Badge key={idx} variant="outline" className="border-green-500/50 text-green-300 text-xs">
                            {stage}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.types.map((type, idx) => (
                          <Badge key={idx} variant="outline" className="border-orange-500/50 text-orange-300 text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingQA({ ...item })
                              setShowEditDialog(true)
                            }}
                            className="text-slate-300 hover:bg-slate-700"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedQA(item)
                              setShowDeleteDialog(true)
                            }}
                            className="text-red-400 hover:bg-slate-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ScrollArea>

      {/* 新建问答对话框 */}
      <Dialog open={showNewQADialog} onOpenChange={setShowNewQADialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新建问答对</DialogTitle>
            <DialogDescription className="text-slate-400">添加标准化问答对，确保AI回复的准确性</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-slate-300">Query *</Label>
              <Input
                placeholder="输入标准问题..."
                value={newQA.query}
                onChange={(e) => setNewQA({ ...newQA, query: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-300">Answer *</Label>
              <Textarea
                placeholder="输入标准答案..."
                value={newQA.answer}
                onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
                className="min-h-[120px] bg-slate-700/50 border-slate-600 text-white mt-1"
              />
            </div>

            <div>
              <Label className="text-slate-300 mb-2 block">适用角色</Label>
              <div className="flex flex-wrap gap-3">
                {roleOptions.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={newQA.roles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewQA({ ...newQA, roles: [...newQA.roles, role] })
                        } else {
                          setNewQA({ ...newQA, roles: newQA.roles.filter((r) => r !== role) })
                        }
                      }}
                      className="border-slate-600"
                    />
                    <label htmlFor={`role-${role}`} className="text-sm text-slate-300 cursor-pointer">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-2 block">适用项目</Label>
              <div className="flex flex-wrap gap-3">
                {projectOptions.map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Checkbox
                      id={`project-${project}`}
                      checked={newQA.projects.includes(project)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewQA({ ...newQA, projects: [...newQA.projects, project] })
                        } else {
                          setNewQA({ ...newQA, projects: newQA.projects.filter((p) => p !== project) })
                        }
                      }}
                      className="border-slate-600"
                    />
                    <label htmlFor={`project-${project}`} className="text-sm text-slate-300 cursor-pointer">
                      {project}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-2 block">适用阶段</Label>
              <div className="flex flex-wrap gap-3">
                {stageOptions.map((stage) => (
                  <div key={stage} className="flex items-center space-x-2">
                    <Checkbox
                      id={`stage-${stage}`}
                      checked={newQA.stages.includes(stage)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewQA({ ...newQA, stages: [...newQA.stages, stage] })
                        } else {
                          setNewQA({ ...newQA, stages: newQA.stages.filter((s) => s !== stage) })
                        }
                      }}
                      className="border-slate-600"
                    />
                    <label htmlFor={`stage-${stage}`} className="text-sm text-slate-300 cursor-pointer">
                      {stage}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-2 block">问题类型</Label>
              <div className="flex flex-wrap gap-3">
                {typeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={newQA.types.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewQA({ ...newQA, types: [...newQA.types, type] })
                        } else {
                          setNewQA({ ...newQA, types: newQA.types.filter((t) => t !== type) })
                        }
                      }}
                      className="border-slate-600"
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-slate-300 cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewQADialog(false)
                setNewQA({
                  query: "",
                  answer: "",
                  roles: [],
                  projects: [],
                  stages: [],
                  types: [],
                })
              }}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveNew} className="bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑问答对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑问答对</DialogTitle>
          </DialogHeader>
          {editingQA && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Query *</Label>
                <Input
                  value={editingQA.query}
                  onChange={(e) => setEditingQA({ ...editingQA, query: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Answer *</Label>
                <Textarea
                  value={editingQA.answer}
                  onChange={(e) => setEditingQA({ ...editingQA, answer: e.target.value })}
                  className="min-h-[120px] bg-slate-700/50 border-slate-600 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">适用角色</Label>
                <div className="flex flex-wrap gap-3">
                  {roleOptions.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-role-${role}`}
                        checked={editingQA.roles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingQA({ ...editingQA, roles: [...editingQA.roles, role] })
                          } else {
                            setEditingQA({ ...editingQA, roles: editingQA.roles.filter((r: string) => r !== role) })
                          }
                        }}
                        className="border-slate-600"
                      />
                      <label htmlFor={`edit-role-${role}`} className="text-sm text-slate-300 cursor-pointer">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">适用项目</Label>
                <div className="flex flex-wrap gap-3">
                  {projectOptions.map((project) => (
                    <div key={project} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-project-${project}`}
                        checked={editingQA.projects.includes(project)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingQA({ ...editingQA, projects: [...editingQA.projects, project] })
                          } else {
                            setEditingQA({
                              ...editingQA,
                              projects: editingQA.projects.filter((p: string) => p !== project),
                            })
                          }
                        }}
                        className="border-slate-600"
                      />
                      <label htmlFor={`edit-project-${project}`} className="text-sm text-slate-300 cursor-pointer">
                        {project}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">适用阶段</Label>
                <div className="flex flex-wrap gap-3">
                  {stageOptions.map((stage) => (
                    <div key={stage} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-stage-${stage}`}
                        checked={editingQA.stages.includes(stage)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingQA({ ...editingQA, stages: [...editingQA.stages, stage] })
                          } else {
                            setEditingQA({ ...editingQA, stages: editingQA.stages.filter((s: string) => s !== stage) })
                          }
                        }}
                        className="border-slate-600"
                      />
                      <label htmlFor={`edit-stage-${stage}`} className="text-sm text-slate-300 cursor-pointer">
                        {stage}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">问题类型</Label>
                <div className="flex flex-wrap gap-3">
                  {typeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-type-${type}`}
                        checked={editingQA.types.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditingQA({ ...editingQA, types: [...editingQA.types, type] })
                          } else {
                            setEditingQA({ ...editingQA, types: editingQA.types.filter((t: string) => t !== type) })
                          }
                        }}
                        className="border-slate-600"
                      />
                      <label htmlFor={`edit-type-${type}`} className="text-sm text-slate-300 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                setEditingQA(null)
              }}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription className="text-slate-400">确定要删除这条问答吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          {selectedQA && (
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-white font-medium mb-2">{selectedQA.query}</p>
              <p className="text-slate-400 text-sm">{selectedQA.answer}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false)
                setSelectedQA(null)
              }}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 批量导入对话框 */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>批量导入问答</DialogTitle>
            <DialogDescription className="text-slate-400">请先下载模板，按照格式填写后上传</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">拖拽Excel文件到此处或点击上传</p>
              <p className="text-sm text-slate-400">支持 .xlsx, .xls, .csv 格式</p>
              <Button variant="outline" className="mt-4 border-slate-600 text-slate-300 bg-transparent">
                选择文件
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImportDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">开始导入</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 深度知识库
function DocumentLibrary({ showUploadDialog, setShowUploadDialog }: any) {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // 角色分类的一级文件夹
  const rootFolders = [
    { id: 1, name: "咨询师知识库", type: "folder", date: "2025-10-15", fileCount: 12 },
    { id: 2, name: "医生知识库", type: "folder", date: "2025-10-14", fileCount: 28 },
    { id: 3, name: "护士知识库", type: "folder", date: "2025-10-13", fileCount: 15 },
    { id: 4, name: "通用知识库", type: "folder", date: "2025-10-12", fileCount: 8 },
  ]

  const [documents, setDocuments] = useState([
    {
      id: 101,
      name: "热玛吉操作手册.pdf",
      type: "document",
      date: "2025-09-28 10:10:59",
      enabled: true,
      words: 1606,
    },
    {
      id: 102,
      name: "玻尿酸注射指南.docx",
      type: "document",
      date: "2025-09-28 10:10:47",
      enabled: true,
      words: 1478,
    },
    {
      id: 103,
      name: "术后护理标准.pdf",
      type: "document",
      date: "2025-09-28 10:10:47",
      enabled: true,
      words: 411,
    },
    {
      id: 104,
      name: "光子嫩肤治疗流程.docx",
      type: "document",
      date: "2025-09-27 15:30:22",
      enabled: false,
      words: 892,
    },
    {
      id: 105,
      name: "肉毒素注射技术规范.pdf",
      type: "document",
      date: "2025-09-26 09:15:33",
      enabled: true,
      words: 2134,
    },
  ])

  // 当前显示的内容
  const currentItems = currentPath.length === 0 ? rootFolders : documents

  const toggleDocumentEnabled = (id: number) => {
    setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, enabled: !doc.enabled } : doc)))
  }

  // 进入文件夹
  const enterFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  // 返回上一级
  const goBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // 返回根目录
  const goToRoot = () => {
    setCurrentPath([])
  }

  // 切换选中状态
  const toggleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(currentItems.map((item) => item.id))
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/30">
      {/* 顶部操作栏 */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
        <div className="flex items-center gap-3">
          {currentPath.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              返回
            </Button>
          )}
          {currentPath.length === 0 ? (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              新建文件夹
            </Button>
          ) : (
            <>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                新建文件夹
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
              >
                <Upload className="w-4 h-4 mr-2" />
                上传文档
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="文件名/文档类名称"
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-sm">开始日期</span>
            <span className="text-sm">至</span>
            <span className="text-sm">结束日期</span>
          </div>
        </div>
      </div>

      {/* 面包屑导航 */}
      {currentPath.length > 0 && (
        <div className="px-6 py-3 border-b border-slate-700/50 bg-slate-800/20">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={goToRoot} className="text-slate-400 hover:text-white transition-colors">
              个人知识库
            </button>
            {currentPath.map((folder, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-slate-600">&gt;</span>
                <span className="text-white">{folder}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 表格内容 */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="border-slate-600"
                    />
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold">
                    {currentPath.length === 0 ? "知识库名称" : "文件夹/文档名称"}
                  </TableHead>
                  <TableHead className="text-slate-300 font-semibold">创建时间</TableHead>
                  {currentPath.length === 0 ? (
                    <TableHead className="text-slate-300 font-semibold">文件数</TableHead>
                  ) : (
                    <>
                      <TableHead className="text-slate-300 font-semibold">状态</TableHead>
                      <TableHead className="text-slate-300 font-semibold">字数</TableHead>
                    </>
                  )}
                  <TableHead className="text-slate-300 font-semibold w-20">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.id} className="border-slate-700/50 hover:bg-slate-700/30">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                        className="border-slate-600"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.type === "folder" ? (
                          <>
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                />
                              </svg>
                            </div>
                            <button
                              onClick={() => enterFolder(item.name)}
                              className="text-white hover:text-blue-400 transition-colors font-medium"
                            >
                              {item.name}
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-white">{item.name}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{item.date}</TableCell>
                    {currentPath.length === 0 ? (
                      <TableCell className="text-slate-300">{(item as any).fileCount}</TableCell>
                    ) : (
                      <>
                        <TableCell>
                          <Switch
                            checked={(item as any).enabled}
                            onCheckedChange={() => toggleDocumentEnabled(item.id)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </TableCell>
                        <TableCell className="text-slate-300">{(item as any).words?.toLocaleString()}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          {item.type === "folder" ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => enterFolder(item.name)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                打开
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">重命名</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-slate-700">删除</DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">查看</DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">重命名</DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">移动</DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">导出</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-slate-700">删除</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {currentItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">没有更多了</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 上传文档对话框 */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>上传文档</DialogTitle>
            <DialogDescription className="text-slate-400">支持 PDF、DOCX、TXT、MD 格式</DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-2">拖拽文件到此处或点击上传</p>
            <p className="text-sm text-slate-400">最大支持 50MB</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">开始上传</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
