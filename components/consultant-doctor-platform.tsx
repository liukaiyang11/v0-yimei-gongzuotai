"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Lightbulb,
  Star,
  MessageSquare,
  FileText,
  Stethoscope,
  Save,
  X,
  GripVertical,
  Upload,
  Mic,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ConsultantDoctorPlatformProps {
  onBack: () => void
}

export function ConsultantDoctorPlatform({ onBack }: ConsultantDoctorPlatformProps) {
  const [age, setAge] = useState("")
  const [skinType, setSkinType] = useState("")
  const [gender, setGender] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [customInput, setCustomInput] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const [leftWidth, setLeftWidth] = useState("25%")
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (containerRef.current && isResizing) {
        const containerWidth = containerRef.current.offsetWidth
        const newLeftWidth = ((e.clientX - containerRef.current.offsetLeft) / containerWidth) * 100 + "%"
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener("mousemove", handleResize)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50">
      {/* 顶部导航栏 */}
      <div className="h-16 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm flex items-center px-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="ml-4 flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-blue-400" />
          <h1 className="text-lg font-semibold text-white">咨询师&医生协作平台</h1>
        </div>
      </div>

      <div ref={containerRef} className="flex h-[calc(100vh-4rem)]">
        <div
          style={{ width: leftWidth }}
          className="border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-sm flex-shrink-0"
        >
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white mb-4">输入项</h2>

              {/* Part 1: 点选区域 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">基本信息</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 text-xs mb-2 block">年龄</Label>
                    <Input
                      type="number"
                      placeholder="请输入年龄"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-2 block">性别</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                        <SelectValue placeholder="请选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">女</SelectItem>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-2 block">肤质</Label>
                    <Select value={skinType} onValueChange={setSkinType}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                        <SelectValue placeholder="请选择肤质" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dry">干性</SelectItem>
                        <SelectItem value="oily">油性</SelectItem>
                        <SelectItem value="combination">混合性</SelectItem>
                        <SelectItem value="sensitive">敏感性</SelectItem>
                        <SelectItem value="normal">中性</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Part 2: 上传部分 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">资料上传</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 text-xs mb-2 block flex items-center">
                      <Upload className="w-3 h-3 mr-1" />
                      微信聊天截图
                    </Label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="screenshot-upload"
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
                          }
                        }}
                      />
                      <label htmlFor="screenshot-upload" className="cursor-pointer">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">点击或拖拽上传截图</p>
                          <p className="text-xs text-slate-500 mt-1">支持 JPG、PNG 格式</p>
                        </div>
                      </label>
                    </div>
                    {uploadedFiles.filter((f) => f.type.startsWith("image/")).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedFiles
                          .filter((f) => f.type.startsWith("image/"))
                          .map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-slate-900/50 rounded px-3 py-2"
                            >
                              <span className="text-xs text-slate-300 truncate">{file.name}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5 text-red-400 hover:text-red-300"
                                onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-slate-300 text-xs mb-2 block flex items-center">
                      <Mic className="w-3 h-3 mr-1" />
                      咨询录音
                    </Label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="audio/*"
                        className="hidden"
                        id="audio-upload"
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
                          }
                        }}
                      />
                      <label htmlFor="audio-upload" className="cursor-pointer">
                        <div className="text-center">
                          <Mic className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">点击或拖拽上传录音</p>
                          <p className="text-xs text-slate-500 mt-1">支持 MP3、WAV、M4A 格式</p>
                        </div>
                      </label>
                    </div>
                    {uploadedFiles.filter((f) => f.type.startsWith("audio/")).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedFiles
                          .filter((f) => f.type.startsWith("audio/"))
                          .map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-slate-900/50 rounded px-3 py-2"
                            >
                              <span className="text-xs text-slate-300 truncate">{file.name}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5 text-red-400 hover:text-red-300"
                                onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Part 3: 自定义输入 */}
              <Card className="bg-slate-800/50 border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">自定义输入</h3>
                <Textarea
                  placeholder="请输入其他相关信息，如客户特殊需求、过往病史、用药情况等..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="min-h-[200px] bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </Card>

              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Save className="w-4 h-4 mr-2" />
                保存输入信息
              </Button>
            </div>
          </ScrollArea>
        </div>

        <div
          className="w-1 bg-slate-700/50 hover:bg-blue-500/50 cursor-col-resize flex items-center justify-center group transition-colors"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="flex-1 bg-slate-900/30 overflow-hidden">
          <Tabs defaultValue="consultation" className="h-full flex flex-col">
            <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm px-6 flex-shrink-0">
              <TabsList className="bg-transparent h-14">
                <TabsTrigger
                  value="medical-record"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  快速病历
                </TabsTrigger>
                <TabsTrigger
                  value="consultation"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  咨询沟通纪要
                </TabsTrigger>
                <TabsTrigger
                  value="general-plan"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  辅助通用方案
                </TabsTrigger>
                <TabsTrigger
                  value="recommendation"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <Star className="w-4 h-4 mr-2" />
                  智能推荐
                </TabsTrigger>
                <TabsTrigger
                  value="plan"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  医生定制方案
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="medical-record" className="flex-1 m-0 overflow-hidden">
              <div className="h-full flex items-center justify-center">
                <Card className="bg-slate-800/50 border-slate-700 p-8 text-center max-w-md">
                  <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">快速病历</h3>
                  <p className="text-slate-400 mb-4">该功能正在开发中，敬请期待</p>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">待开发</Badge>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 2: 咨询沟通纪要 - Keep existing functionality */}
            <TabsContent value="consultation" className="flex-1 m-0 overflow-hidden"></TabsContent>

            <TabsContent value="general-plan" className="flex-1 m-0 overflow-hidden">
              <div className="h-full flex items-center justify-center">
                <Card className="bg-slate-800/50 border-slate-700 p-8 text-center max-w-md">
                  <Lightbulb className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">辅助通用方案</h3>
                  <p className="text-slate-400 mb-4">该功能正在开发中，敬请期待</p>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">待开发</Badge>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 4: 智能推荐 - Keep existing functionality */}
            <TabsContent value="recommendation" className="flex-1 m-0 overflow-hidden"></TabsContent>

            {/* Tab 5: 医生定制方案 - Keep existing functionality */}
            <TabsContent value="plan" className="flex-1 m-0 overflow-hidden"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
