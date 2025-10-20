"use client"

import { useState } from "react"
import {
  Home,
  Search,
  Plus,
  Send,
  Edit3,
  X,
  Check,
  AlertCircle,
  Upload,
  Download,
  Trash2,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CollaborativeServiceWorkspaceProps {
  onBack: () => void
}

export function CollaborativeServiceWorkspace({ onBack }: CollaborativeServiceWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [selectedConversation, setSelectedConversation] = useState("customer-1")
  const [messageInput, setMessageInput] = useState("")
  const [isInternalMode, setIsInternalMode] = useState(false)

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="h-16 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-300 hover:text-white">
            <Home className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-white">智能协同服务工作台</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="w-full justify-start border-b border-slate-700/50 bg-slate-900/30 rounded-none px-6">
            <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700/50">
              智能服务群聊
            </TabsTrigger>
            <TabsTrigger value="journey" className="data-[state=active]:bg-slate-700/50">
              客户旅程看板
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-slate-700/50">
              AI知识中心
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="chat" className="h-full m-0">
              <ChatInterface
                selectedConversation={selectedConversation}
                onSelectConversation={setSelectedConversation}
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                isInternalMode={isInternalMode}
                setIsInternalMode={setIsInternalMode}
              />
            </TabsContent>

            <TabsContent value="journey" className="h-full m-0">
              <JourneyBoard />
            </TabsContent>

            <TabsContent value="knowledge" className="h-full m-0">
              <KnowledgeCenter />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

// Chat Interface Component
function ChatInterface({
  selectedConversation,
  onSelectConversation,
  messageInput,
  setMessageInput,
  isInternalMode,
  setIsInternalMode,
}: any) {
  const conversations = [
    { id: "customer-1", name: "张小姐", role: "医生", status: "high", hasAIDraft: true, avatar: "张" },
    { id: "customer-2", name: "李女士", role: "护士", status: "medium", hasAIDraft: false, avatar: "李" },
    { id: "customer-3", name: "王先生", role: "咨询师", status: "normal", hasAIDraft: false, avatar: "王" },
  ]

  const messages = [
    { id: 1, sender: "customer", content: "医生您好，我想咨询一下热玛吉术后的护理问题", time: "10:30" },
    {
      id: 2,
      type: "ai-draft",
      content: "您好张小姐，热玛吉术后护理需要注意以下几点：1. 术后24小时内避免化妆 2. 保持面部清洁 3. 避免高温环境...",
      time: "10:31",
    },
    {
      id: 3,
      sender: "doctor",
      name: "李医生",
      content: "您好张小姐，关于热玛吉术后护理，我来为您详细解答...",
      time: "10:32",
    },
  ]

  return (
    <div className="h-full flex">
      {/* Left: Conversation List */}
      <div className="w-80 border-r border-slate-700/50 bg-slate-900/30 flex flex-col">
        <div className="p-4 border-b border-slate-700/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="搜索客户..." className="pl-10 bg-slate-800/50 border-slate-700" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`p-4 border-b border-slate-700/50 cursor-pointer hover:bg-slate-800/50 transition-colors ${
                selectedConversation === conv.id ? "bg-slate-800/50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-500 text-white">{conv.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{conv.name}</span>
                    {conv.hasAIDraft && <AlertCircle className="w-4 h-4 text-red-400" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {conv.role}
                    </Badge>
                    {conv.status === "high" && <span className="text-xs text-red-400">待审核</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Middle: Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-slate-700/50 bg-slate-900/30 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-500 text-white">张</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-white">张小姐</div>
              <div className="text-xs text-slate-400">热玛吉 · 术后第3天</div>
            </div>
          </div>
          <Button
            variant={isInternalMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsInternalMode(!isInternalMode)}
            className={isInternalMode ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            {isInternalMode ? "内部讨论中" : "切换内部讨论"}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg) => {
              if (msg.type === "ai-draft") {
                return (
                  <div key={msg.id} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        AI助手草稿 · 待审核
                      </Badge>
                      <span className="text-xs text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-slate-200 mb-3">{msg.content}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Check className="w-4 h-4 mr-1" />
                        直接发送
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit3 className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="ghost">
                        <X className="w-4 h-4 mr-1" />
                        忽略
                      </Button>
                    </div>
                  </div>
                )
              }

              return (
                <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[70%] ${msg.sender === "customer" ? "bg-slate-700" : "bg-blue-600"} rounded-lg p-3`}
                  >
                    {msg.name && <div className="text-xs text-slate-300 mb-1">{msg.name}</div>}
                    <p className="text-white">{msg.content}</p>
                    <div className="text-xs text-slate-300 mt-1">{msg.time}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-slate-700/50 bg-slate-900/30 p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder={isInternalMode ? "输入内部讨论内容（仅团队可见）..." : "输入消息..."}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className={`min-h-[60px] resize-none ${isInternalMode ? "bg-amber-900/20 border-amber-600/50" : "bg-slate-800/50 border-slate-700"}`}
            />
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Customer Profile */}
      <div className="w-80 border-l border-slate-700/50 bg-slate-900/30 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-3">客户旅程</h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-blue-400 font-medium">热玛吉术后第3天</div>
              <div className="text-xs text-slate-400 mt-1">关键关怀期</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-3">客户信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">姓名</span>
                <span className="text-white">张小姐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">年龄</span>
                <span className="text-white">32岁</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">肤质</span>
                <span className="text-white">混合性</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-3">当前项目</h3>
            <Card className="bg-slate-800/50 border-slate-700 p-3">
              <div className="font-medium text-white mb-2">热玛吉面部提升</div>
              <div className="text-xs text-slate-400 space-y-1">
                <div>操作日期: 2025-01-17</div>
                <div>负责医生: 李医生</div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="text-xs font-medium text-slate-300 mb-2">术后注意事项</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• 避免高温环境</li>
                  <li>• 加强保湿护理</li>
                  <li>• 注意防晒</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Journey Board Component
function JourneyBoard() {
  const stages = [
    { id: "new", name: "新线索", count: 5 },
    { id: "filing", name: "待建档", count: 3 },
    { id: "confirming", name: "方案确认中", count: 8 },
    { id: "scheduled", name: "已预约", count: 12 },
    { id: "followup", name: "术后跟踪", count: 15 },
    { id: "completed", name: "服务完成", count: 23 },
  ]

  const customers = [
    { id: 1, name: "张小姐", project: "热玛吉", responsible: "李医生", stage: "followup" },
    { id: 2, name: "李女士", project: "玻尿酸", responsible: "王医生", stage: "scheduled" },
    { id: 3, name: "王先生", project: "光子嫩肤", responsible: "赵护士", stage: "confirming" },
  ]

  return (
    <div className="h-full p-6 overflow-x-auto">
      <div className="flex gap-4 h-full min-w-max">
        {stages.map((stage) => (
          <div key={stage.id} className="w-80 flex flex-col">
            <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">{stage.name}</h3>
                <Badge variant="secondary">{stage.count}</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {customers
                  .filter((c) => c.stage === stage.id)
                  .map((customer) => (
                    <Card
                      key={customer.id}
                      className="bg-slate-800/50 border-slate-700 p-4 cursor-move hover:bg-slate-800 transition-colors"
                    >
                      <div className="font-medium text-white mb-2">{customer.name}</div>
                      <div className="text-sm text-slate-400 space-y-1">
                        <div>项目: {customer.project}</div>
                        <div>负责人: {customer.responsible}</div>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  )
}

// Knowledge Center Component
function KnowledgeCenter() {
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState("qa")

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeKnowledgeTab} onValueChange={setActiveKnowledgeTab} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start border-b border-slate-700/50 bg-slate-900/30 rounded-none px-6">
          <TabsTrigger value="qa">精准问答库</TabsTrigger>
          <TabsTrigger value="documents">深度知识库</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="qa" className="h-full m-0">
            <QALibrary />
          </TabsContent>
          <TabsContent value="documents" className="h-full m-0">
            <DocumentLibrary />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

// QA Library Component
function QALibrary() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const qaItems = [
    {
      id: 1,
      question: "热玛吉术后多久可以化妆？",
      answer: "建议术后24小时后再化妆，以免影响恢复效果。",
      tags: { role: ["医生", "护士"], project: ["热玛吉"], stage: ["术后1-3天"], type: "护理方法" },
    },
    {
      id: 2,
      question: "玻尿酸填充的价格是多少？",
      answer: "玻尿酸填充价格根据品牌和用量不同，一般在3000-8000元之间。",
      tags: { role: ["咨询师"], project: ["玻尿酸"], stage: ["售前"], type: "价格咨询" },
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">精准问答库</h2>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                新增问答
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">新增标准问答</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label className="text-slate-300">标准问题</Label>
                  <Input placeholder="输入标准问题..." className="bg-slate-900/50 border-slate-700 mt-2" />
                </div>
                <div>
                  <Label className="text-slate-300">标准答案</Label>
                  <Textarea
                    placeholder="输入标准答案..."
                    className="bg-slate-900/50 border-slate-700 mt-2 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">适用角色</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 mt-2">
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
                    <Label className="text-slate-300">适用项目</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 mt-2">
                        <SelectValue placeholder="选择项目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thermage">热玛吉</SelectItem>
                        <SelectItem value="hyaluronic">玻尿酸</SelectItem>
                        <SelectItem value="photorejuvenation">光子嫩肤</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    取消
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">保存</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="搜索问答..." className="pl-10 bg-slate-800/50 border-slate-700" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {qaItems.map((item) => (
            <Card key={item.id} className="bg-slate-800/50 border-slate-700 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-2">{item.question}</h3>
                  <p className="text-sm text-slate-300">{item.answer}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.role.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
                {item.tags.project.map((project) => (
                  <Badge key={project} variant="outline" className="text-xs">
                    {project}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                  {item.tags.stage[0]}
                </Badge>
                <Badge variant="outline" className="text-xs text-purple-400 border-purple-400">
                  {item.tags.type}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Document Library Component
function DocumentLibrary() {
  const documents = [
    { id: 1, name: "热玛吉操作手册.pdf", type: "PDF", date: "2025-01-15", status: "已就绪" },
    { id: 2, name: "玻尿酸产品白皮书.docx", type: "DOCX", date: "2025-01-14", status: "已就绪" },
    { id: 3, name: "术后护理指南.pdf", type: "PDF", date: "2025-01-13", status: "索引中..." },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">深度知识库</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            上传文档
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="搜索文档..." className="pl-10 bg-slate-800/50 border-slate-700" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="bg-slate-800/50 border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{doc.name}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {doc.type} · {doc.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={doc.status === "已就绪" ? "default" : "secondary"} className="text-xs">
                    {doc.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
