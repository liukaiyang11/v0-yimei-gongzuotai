"use client"

import { useState } from "react"
import {
  Home,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CollaborativeServicePlatformProps {
  onBack: () => void
}

export function CollaborativeServicePlatform({ onBack }: CollaborativeServicePlatformProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [selectedCustomer, setSelectedCustomer] = useState("张小美")
  const [messageInput, setMessageInput] = useState("")
  const [showNewQADialog, setShowNewQADialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-16 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <Home className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-white">智能协同服务工作台</h1>
            <p className="text-sm text-slate-400">以群聊为中心 · AI为辅助 · 真人为决策</p>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            onClick={() => setActiveTab("chat")}
            className={
              activeTab === "chat"
                ? "bg-blue-600 hover:bg-blue-700"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            智能服务群聊
          </Button>
          <Button
            variant={activeTab === "kanban" ? "default" : "ghost"}
            onClick={() => setActiveTab("kanban")}
            className={
              activeTab === "kanban"
                ? "bg-blue-600 hover:bg-blue-700"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            客户旅程看板
          </Button>
          <Button
            variant={activeTab === "knowledge" ? "default" : "ghost"}
            onClick={() => setActiveTab("knowledge")}
            className={
              activeTab === "knowledge"
                ? "bg-blue-600 hover:bg-blue-700"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }
          >
            知识库管理
          </Button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && (
          <ChatInterface
            selectedCustomer={selectedCustomer}
            onSelectCustomer={setSelectedCustomer}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
          />
        )}
        {activeTab === "kanban" && <KanbanBoard />}
        {activeTab === "knowledge" && (
          <KnowledgeCenter
            showNewQADialog={showNewQADialog}
            setShowNewQADialog={setShowNewQADialog}
            showUploadDialog={showUploadDialog}
            setShowUploadDialog={setShowUploadDialog}
          />
        )}
      </div>
    </div>
  )
}

// 智能服务群聊界面
function ChatInterface({ selectedCustomer, onSelectCustomer, messageInput, setMessageInput }: any) {
  const [filterStage, setFilterStage] = useState("全部")
  const [aiDraft, setAiDraft] = useState({
    show: true,
    content:
      "张小美您好！热玛吉术后24-48小时内出现轻微红肿是完全正常的恢复现象，这是皮肤组织受热刺激后的自然反应。根据您的档案，您昨天下午进行的治疗，目前的红肿程度在预期范围内。\n\n建议您：\n1. 继续进行冷敷，每次15-20分钟\n2. 避免使用刺激性护肤品\n3. 注意防晒，避免高温环境\n4. 多喝水促进新陈代谢\n\n如症状加重或持续不退，请及时联系我们。",
  })

  const customers = [
    { name: "张小美", role: "咨询师", project: "热玛吉术后第2天", status: "high", avatar: "张", stage: "术后跟踪" },
    { name: "王美丽", role: "护士", project: "光子嫩肤术前7天", status: "medium", avatar: "王", stage: "已预约" },
  ]

  const messages = [
    { sender: "customer", content: "医生您好，我昨天做完热玛吉，脸上有点红肿，这正常吗？", time: "14:30" },
  ]

  return (
    <div className="flex h-full">
      {/* 左侧：会话列表 */}
      <div className="w-80 bg-slate-800/30 border-r border-slate-700/50 flex flex-col">
        <div className="p-4 space-y-3">
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

      {/* 中间：聊天窗口 */}
      <div className="flex-1 flex flex-col bg-slate-900/30">
        <div className="h-14 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-between px-6">
          <h3 className="text-white font-medium">
            与 {selectedCustomer} 的会话 - {customers.find((c) => c.name === selectedCustomer)?.stage || "术后跟踪"}
          </h3>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xl ${msg.sender === "customer" ? "bg-slate-700/50" : "bg-blue-600"} rounded-lg p-4`}
                >
                  <p className="text-sm text-slate-400 mb-1">
                    {msg.sender === "customer" ? "客户" : "医生"} {msg.time}
                  </p>
                  <p className="text-white">{msg.content}</p>
                </div>
              </div>
            ))}

            {aiDraft.show && (
              <div className="border-2 border-dashed border-yellow-500/50 bg-yellow-500/10 rounded-lg p-4">
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
        </ScrollArea>

        <div className="p-4 bg-slate-800/30 border-t border-slate-700/50">
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

      {/* 右侧：动态客户档案 */}
      <div className="w-96 bg-slate-800/30 border-l border-slate-700/50 p-6 overflow-y-auto">
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
    </div>
  )
}

// 客户旅程看板
function KanbanBoard() {
  const stages = [
    { id: "new", name: "新线索", count: 5, color: "bg-blue-600" },
    { id: "filing", name: "待建档", count: 3, color: "bg-purple-600" },
    { id: "planning", name: "方案确认中", count: 8, color: "bg-yellow-600" },
    { id: "scheduled", name: "已预约", count: 12, color: "bg-green-600" },
    { id: "followup", name: "术后跟踪", count: 15, color: "bg-orange-600" },
    { id: "completed", name: "服务完成", count: 23, color: "bg-slate-600" },
  ]

  const customers = [
    { name: "张小美", project: "热玛吉", stage: "followup", doctor: "李医生" },
    { name: "王美丽", project: "玻尿酸", stage: "scheduled", doctor: "张医生" },
    { name: "李娜", project: "光子嫩肤", stage: "planning", doctor: "王医生" },
  ]

  return (
    <div className="h-full p-6 overflow-x-auto">
      <div className="flex gap-4 h-full min-w-max">
        {stages.map((stage) => (
          <div key={stage.id} className="w-80 bg-slate-800/30 rounded-lg border border-slate-700/50 flex flex-col">
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{stage.name}</h3>
                <Badge className={`${stage.color}`}>{stage.count}</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {customers
                  .filter((c) => c.stage === stage.id)
                  .map((customer, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/50 rounded-lg p-4 cursor-move hover:bg-slate-700/70 transition-colors border border-slate-600/50"
                      draggable
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white">{customer.name}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>查看详情</DropdownMenuItem>
                            <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{customer.project}</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6 bg-blue-600">
                          <AvatarFallback className="text-xs text-white">{customer.doctor[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-400">{customer.doctor}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
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
  const qaItems = [
    {
      question: "热玛吉术后红肿正常吗？",
      answer: "术后24-48小时内轻微红肿是正常现象...",
      tags: ["医生", "热玛吉", "术后1-3天", "术后反应"],
    },
    {
      question: "玻尿酸填充后多久可以化妆？",
      answer: "建议术后24小时后再化妆...",
      tags: ["护士", "玻尿酸", "术后1-3天", "护理方法"],
    },
  ]

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
        <Button onClick={() => setShowNewQADialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          新建问答
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-5xl mx-auto">
          {qaItems.map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-medium text-white">{item.question}</h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>编辑</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">删除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-slate-300 mb-4">{item.answer}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIdx) => (
                  <Badge key={tagIdx} variant="outline" className="border-slate-600 text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={showNewQADialog} onOpenChange={setShowNewQADialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>新建问答</DialogTitle>
            <DialogDescription className="text-slate-400">添加标准化问答对，确保AI回复的准确性</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>标准问题</Label>
              <Input placeholder="输入标准问题..." className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div>
              <Label>标准答案</Label>
              <Textarea
                placeholder="输入标准答案..."
                className="min-h-[120px] bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>适用角色</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">医生</SelectItem>
                    <SelectItem value="nurse">护士</SelectItem>
                    <SelectItem value="consultant">咨询师</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>适用项目</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="选择项目" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thermage">热玛吉</SelectItem>
                    <SelectItem value="hyaluronic">玻尿酸</SelectItem>
                    <SelectItem value="photon">光子嫩肤</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewQADialog(false)}
              className="border-slate-600 text-slate-300"
            >
              取消
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 深度知识库
function DocumentLibrary({ showUploadDialog, setShowUploadDialog }: any) {
  const documents = [
    { name: "热玛吉操作手册.pdf", type: "PDF", date: "2025-10-15", status: "已就绪" },
    { name: "玻尿酸注射指南.docx", type: "DOCX", date: "2025-10-12", status: "已就绪" },
    { name: "术后护理标准.pdf", type: "PDF", date: "2025-10-10", status: "索引中..." },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="搜索文档..."
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          上传文档
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-3 max-w-5xl mx-auto">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{doc.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-slate-400">{doc.type}</span>
                    <span className="text-sm text-slate-400">{doc.date}</span>
                    <Badge variant={doc.status === "已就绪" ? "default" : "secondary"} className="text-xs">
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

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
