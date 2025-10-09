"use client"

import { useState } from "react"
import { Bot, Send, Sparkles, BookOpen, Lightbulb, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface AIAssistantDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  type: "book" | "course"
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickQuestions = [
  { icon: BookOpen, text: "这本书的核心观点是什么?" },
  { icon: Lightbulb, text: "帮我总结重点内容" },
  { icon: FileText, text: "生成思维导图" },
  { icon: Sparkles, text: "有哪些实践建议?" },
]

export function AIAssistantDialog({ open, onOpenChange, title, type }: AIAssistantDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `你好!我是AI助教,很高兴为你解读《${title}》。你可以问我关于${type === "book" ? "这本书" : "这门课程"}的任何问题,比如核心观点、重点总结、实践建议等。我还可以帮你生成思维导图和学习笔记。`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `关于"${inputValue}",让我为你详细解答:\n\n这是一个很好的问题。基于${type === "book" ? "书中" : "课程"}的内容,我可以为你提供以下几点分析:\n\n1. 核心要点一:专业理论基础\n2. 核心要点二:实践操作技巧\n3. 核心要点三:注意事项与风险管理\n\n你还想了解更多细节吗?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[600px] bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Bot className="w-6 h-6 text-blue-400" />
            AI助教 - {title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">智能问答 · 内容摘要 · 思维导图生成</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* 快捷问题 */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {quickQuestions.map((q, index) => {
              const Icon = q.icon
              return (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => handleQuickQuestion(q.text)}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {q.text}
                </Button>
              )
            })}
          </div>

          {/* 消息列表 */}
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-100 border border-white/10"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-400" />
                        <Badge className="bg-blue-500/20 text-blue-300 text-xs">AI助教</Badge>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* 输入框 */}
          <div className="flex gap-2">
            <Input
              placeholder="输入你的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
