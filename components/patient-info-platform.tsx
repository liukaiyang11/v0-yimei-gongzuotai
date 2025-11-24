"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  User,
  FileText,
  MessageSquare,
  Lightbulb,
  Stethoscope,
  Phone,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Camera,
  Upload,
  Sparkles,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react"

interface PatientInfoPlatformProps {
  onBack: () => void
  selectedPatientId?: number
}

export function PatientInfoPlatform({ onBack, selectedPatientId }: PatientInfoPlatformProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  // 模拟患者数据库
  const patients = [
    {
      id: 1,
      name: "刘小姐",
      age: 28,
      phone: "138****5678",
      location: "上海市浦东新区",
      avatar: "刘",
      stage: "新线索",
      // 模块一：患者初步画像
      onlineProfile: {
        source: "小红书",
        interests: ["鼻子", "抗衰"],
        concerns: ["想变高挺", "提拉紧致"],
        budget: "1-2万",
        personality: ["犹豫型", "价格敏感型"],
        initialContact: "2024-01-15",
        chatSummary: "通过小红书咨询鼻部整形，对比了多家机构，关注性价比和恢复期",
      },
      // 模块二：资讯沟通纪要
      consultationNotes: [
        {
          date: "2024-01-16",
          consultant: "张咨询师",
          duration: "35分钟",
          summary: "客户主要关注鼻综合整形，希望自然不夸张，预算2万左右。对恢复期较为担心。",
          keyPoints: ["偏好自然效果", "恢复期敏感", "价格在预算内"],
          hesitationPoints: ["恢复期长度", "效果持久性"],
        },
      ],
      // 模块三：患者画像整合
      integratedProfile: {
        consistencyCheck: {
          status: "正常",
          notes: "线上线下信息一致，无重大差异",
        },
        aestheticAnalysis: {
          facialStructure: "鼻梁略低，鼻头圆钝",
          skinCondition: "肤质良好，轻微色素沉着",
          goldenRatio: "85%符合度",
        },
        clvPrediction: {
          level: "A级",
          score: 82,
          strategy: "长期高价值客户，建议重点维护",
        },
        conversionProbability: {
          rate: "85%",
          mainResistance: "恢复期顾虑",
          suggestion: "重点讲解术后护理服务和快速恢复方案",
        },
        riskWarnings: [],
      },
      // 模块四：智能推荐项目
      recommendations: [
        {
          plan: "A",
          type: "旗舰版",
          project: "鼻综合整形（含假体+鼻尖）",
          price: "28,000元",
          profit: "高",
          reason: "效果最佳，适合追求完美效果的客户",
          details: ["进口假体", "鼻尖精细雕塑", "术后1年免费复查"],
        },
        {
          plan: "B",
          type: "主推版",
          project: "鼻综合整形（标准版）",
          price: "18,000元",
          profit: "中",
          reason: "性价比最高，符合客户预算，成交率最高",
          details: ["国产优质假体", "标准鼻尖处理", "术后半年复查"],
          recommended: true,
        },
        {
          plan: "C",
          type: "入门版",
          project: "玻尿酸隆鼻",
          price: "8,000元",
          profit: "中",
          reason: "无创入门，可后续升级",
          details: ["进口玻尿酸", "即做即走", "维持1-2年"],
        },
      ],
      // 模块五：医生制定方案
      doctorPlan: null,
    },
    {
      id: 2,
      name: "陈女士",
      age: 35,
      phone: "139****1234",
      location: "上海市徐汇区",
      avatar: "陈",
      stage: "方案确认中",
      onlineProfile: {
        source: "美团",
        interests: ["热玛吉", "抗衰"],
        concerns: ["面部松弛", "法令纹"],
        budget: "3-5万",
        personality: ["专业知识丰富型"],
        initialContact: "2024-01-10",
        chatSummary: "对热玛吉有深入了解，咨询过多家机构，关注设备和医生资质",
      },
      consultationNotes: [
        {
          date: "2024-01-12",
          consultant: "张咨询师",
          duration: "45分钟",
          summary: "客户专业素养高，了解热玛吉原理。主要关注设备是否为正品，医生经验。",
          keyPoints: ["设备真伪", "医生资质", "效果持久性"],
          hesitationPoints: ["价格略高"],
        },
      ],
      integratedProfile: {
        consistencyCheck: {
          status: "正常",
          notes: "客户线上线下表现一致，购买力强",
        },
        aestheticAnalysis: {
          facialStructure: "面部轮廓清晰，轻度松弛",
          skinCondition: "干性皮肤，细纹明显",
          goldenRatio: "92%符合度",
        },
        clvPrediction: {
          level: "S级",
          score: 95,
          strategy: "顶级客户，建议院长亲自接待",
        },
        conversionProbability: {
          rate: "90%",
          mainResistance: "价格敏感",
          suggestion: "强调设备和医生优势，提供VIP服务",
        },
        riskWarnings: [],
      },
      recommendations: [
        {
          plan: "A",
          type: "旗舰版",
          project: "热玛吉FLX + 玻尿酸组合",
          price: "48,000元",
          profit: "高",
          reason: "联合治疗效果最佳",
          details: ["正品热玛吉FLX", "进口玻尿酸填充", "院长亲诊"],
          recommended: true,
        },
        {
          plan: "B",
          type: "主推版",
          project: "热玛吉FLX",
          price: "35,000元",
          profit: "中",
          reason: "单项治疗，效果显著",
          details: ["正品热玛吉FLX", "资深医生操作", "术后跟踪"],
        },
      ],
      doctorPlan: {
        doctor: "李医生",
        date: "2024-01-18",
        finalPlan: "热玛吉FLX",
        details: {
          treatment: "热玛吉FLX 600发",
          areas: ["全脸", "颈部"],
          dosage: "600发（面部400发 + 颈部200发）",
          expectedEffect: "紧致提升，改善法令纹和面部松弛",
          recoveryTime: "无恢复期，术后即可正常生活",
        },
        documents: ["治疗方案书", "知情同意书", "术前评估表"],
        followupPlan: ["术后第3天回访", "术后第7天回访", "术后1个月回访", "术后3个月回访"],
      },
    },
  ]

  // 初始化选中的患者
  useState(() => {
    if (selectedPatientId) {
      const patient = patients.find((p) => p.id === selectedPatientId)
      if (patient) {
        setSelectedPatient(patient)
      }
    }
  })

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
  }

  return (
    <div className="fixed inset-0 left-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="h-16 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-700 text-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-white">患者信息流转平台 2.0</h1>
            <p className="text-sm text-slate-400">以客户为中心 · 全流程协同</p>
          </div>
        </div>

        {selectedPatient && (
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {selectedPatient.stage}
            </Badge>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8 bg-blue-600">
                <AvatarFallback className="text-white text-sm">{selectedPatient.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-white font-medium">{selectedPatient.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧患者列表 */}
        <div className="w-80 bg-slate-800/30 border-r border-slate-700/50 overflow-y-auto">
          <div className="p-4 border-b border-slate-700/50">
            <div className="relative">
              <Input
                placeholder="搜索患者..."
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="p-4 space-y-3">
            {patients.map((patient) => (
              <Card
                key={patient.id}
                className={`p-4 cursor-pointer transition-all hover:bg-slate-700/50 ${
                  selectedPatient?.id === patient.id ? "bg-blue-600/20 border-blue-500" : "bg-slate-800/50"
                }`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 bg-blue-600">
                    <AvatarFallback className="text-white">{patient.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">{patient.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {patient.stage}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{patient.onlineProfile.interests.join(" · ")}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="w-3 h-3" />
                      {patient.phone}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 右侧详细信息 */}
        <div className="flex-1 overflow-y-auto">
          {selectedPatient ? (
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
                    <User className="w-4 h-4 mr-2" />
                    初步画像
                  </TabsTrigger>
                  <TabsTrigger value="consultation" className="data-[state=active]:bg-blue-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    沟通纪要
                  </TabsTrigger>
                  <TabsTrigger value="integrated" className="data-[state=active]:bg-blue-600">
                    <Activity className="w-4 h-4 mr-2" />
                    画像整合
                  </TabsTrigger>
                  <TabsTrigger value="recommendation" className="data-[state=active]:bg-blue-600">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    智能推荐
                  </TabsTrigger>
                  <TabsTrigger value="plan" className="data-[state=active]:bg-blue-600">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    医生方案
                  </TabsTrigger>
                </TabsList>

                {/* 模块一：患者初步画像 */}
                <TabsContent value="profile" className="space-y-4 mt-6">
                  <Card className="p-6 bg-slate-800/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      线上画像提取
                    </h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">基础信息</label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white">
                              <User className="w-4 h-4 text-slate-400" />
                              <span>{selectedPatient.name}</span>
                              <span className="text-slate-400">· {selectedPatient.age}岁</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <Phone className="w-4 h-4 text-slate-400" />
                              {selectedPatient.phone}
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              {selectedPatient.location}
                            </div>
                            <div className="flex items-center gap-2 text-white">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              初次接触：{selectedPatient.onlineProfile.initialContact}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">渠道来源</label>
                          <Badge className="bg-purple-600">{selectedPatient.onlineProfile.source}</Badge>
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">医美意向</label>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-slate-500">关注部位：</span>
                              <div className="flex gap-2 mt-1">
                                {selectedPatient.onlineProfile.interests.map((interest: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-blue-400 border-blue-400">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-slate-500">核心诉求：</span>
                              <div className="flex gap-2 mt-1">
                                {selectedPatient.onlineProfile.concerns.map((concern: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-green-400 border-green-400">
                                    {concern}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">预算范围</label>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">{selectedPatient.onlineProfile.budget}</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">客户性格/心理画像</label>
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.onlineProfile.personality.map((trait: string, idx: number) => (
                              <Badge key={idx} className="bg-orange-600">
                                #{trait}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">AI生成摘要</label>
                          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {selectedPatient.onlineProfile.chatSummary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* 模块二：资讯沟通纪要 */}
                <TabsContent value="consultation" className="space-y-4 mt-6">
                  {selectedPatient.consultationNotes.map((note: any, idx: number) => (
                    <Card key={idx} className="p-6 bg-slate-800/50">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-blue-400" />
                          面诊沟通纪要 #{idx + 1}
                        </h3>
                        <Badge className="bg-green-600">AI自动生成</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{note.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{note.consultant}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">时长：{note.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-2 block">智能摘要</label>
                          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <p className="text-slate-300 leading-relaxed">{note.summary}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-slate-400 mb-2 block">关键信息点</label>
                            <div className="space-y-2">
                              {note.keyPoints.map((point: string, pidx: number) => (
                                <div key={pidx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-300">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-slate-400 mb-2 block">客户迟疑点</label>
                            <div className="space-y-2">
                              {note.hesitationPoints.map((point: string, pidx: number) => (
                                <div key={pidx} className="flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-300">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Card className="p-6 bg-slate-800/50 border-dashed">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      上传新的面诊录音
                    </Button>
                  </Card>
                </TabsContent>

                {/* 模块三：患者画像整合 */}
                <TabsContent value="integrated" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6 bg-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        信息一致性检测
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">检测状态</span>
                          <Badge className="bg-green-600">
                            {selectedPatient.integratedProfile.consistencyCheck.status}
                          </Badge>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <p className="text-sm text-slate-300">
                            {selectedPatient.integratedProfile.consistencyCheck.notes}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-purple-400" />
                        美学分析报告
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs text-slate-500">面部轮廓</span>
                          <p className="text-sm text-slate-300 mt-1">
                            {selectedPatient.integratedProfile.aestheticAnalysis.facialStructure}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500">皮肤状况</span>
                          <p className="text-sm text-slate-300 mt-1">
                            {selectedPatient.integratedProfile.aestheticAnalysis.skinCondition}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500">黄金比例符合度</span>
                          <p className="text-sm text-slate-300 mt-1 font-medium">
                            {selectedPatient.integratedProfile.aestheticAnalysis.goldenRatio}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        客户生命周期价值预测
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">客户等级</span>
                          <Badge
                            className={`${
                              selectedPatient.integratedProfile.clvPrediction.level === "S级"
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                            }`}
                          >
                            {selectedPatient.integratedProfile.clvPrediction.level}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 mb-2 block">价值评分</span>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                style={{ width: `${selectedPatient.integratedProfile.clvPrediction.score}%` }}
                              />
                            </div>
                            <span className="text-white font-medium">
                              {selectedPatient.integratedProfile.clvPrediction.score}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500">
                          <p className="text-sm text-blue-300">
                            {selectedPatient.integratedProfile.clvPrediction.strategy}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-slate-800/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-400" />
                        成交概率预测
                      </h3>
                      <div className="space-y-4">
                        <div className="text-center py-4">
                          <div className="text-4xl font-bold text-white mb-2">
                            {selectedPatient.integratedProfile.conversionProbability.rate}
                          </div>
                          <div className="text-sm text-slate-400">预计成交概率</div>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 mb-2 block">主要抗性点</span>
                          <Badge variant="outline" className="text-orange-400 border-orange-400">
                            {selectedPatient.integratedProfile.conversionProbability.mainResistance}
                          </Badge>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg">
                          <span className="text-xs text-slate-500 mb-1 block">AI建议</span>
                          <p className="text-sm text-slate-300">
                            {selectedPatient.integratedProfile.conversionProbability.suggestion}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {selectedPatient.integratedProfile.riskWarnings.length > 0 && (
                    <Card className="p-6 bg-red-900/20 border-red-500">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        禁忌症与风险预警
                      </h3>
                      <div className="space-y-2">
                        {selectedPatient.integratedProfile.riskWarnings.map((warning: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-red-300">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{warning}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </TabsContent>

                {/* 模块四：智能推荐项目 */}
                <TabsContent value="recommendation" className="space-y-4 mt-6">
                  <div className="grid gap-4">
                    {selectedPatient.recommendations.map((rec: any, idx: number) => (
                      <Card
                        key={idx}
                        className={`p-6 ${
                          rec.recommended
                            ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500"
                            : "bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-white">方案 {rec.plan}</h3>
                              <Badge
                                className={`${
                                  rec.type === "旗舰版"
                                    ? "bg-yellow-600"
                                    : rec.type === "主推版"
                                      ? "bg-blue-600"
                                      : "bg-green-600"
                                }`}
                              >
                                {rec.type}
                              </Badge>
                              {rec.recommended && <Badge className="bg-orange-600">AI主推</Badge>}
                            </div>
                            <h4 className="text-lg text-slate-300">{rec.project}</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{rec.price}</div>
                            <Badge variant="outline" className="mt-1">
                              {rec.profit}利润
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="p-3 bg-slate-900/50 rounded-lg">
                            <span className="text-xs text-slate-500 block mb-1">推荐理由</span>
                            <p className="text-sm text-slate-300">{rec.reason}</p>
                          </div>

                          <div>
                            <span className="text-xs text-slate-500 block mb-2">方案详情</span>
                            <div className="space-y-1">
                              {rec.details.map((detail: string, didx: number) => (
                                <div key={didx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-slate-300">{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {rec.recommended && (
                            <div className="flex gap-2 pt-2">
                              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">选择此方案</Button>
                              <Button variant="outline">查看详情</Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* 模块五：医生制定方案 */}
                <TabsContent value="plan" className="space-y-4 mt-6">
                  {selectedPatient.doctorPlan ? (
                    <>
                      <Card className="p-6 bg-slate-800/50">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">医生治疗方案</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              <div className="flex items-center gap-2">
                                <Stethoscope className="w-4 h-4" />
                                {selectedPatient.doctorPlan.doctor}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {selectedPatient.doctorPlan.date}
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-600">方案已确认</Badge>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-slate-400 mb-2 block">最终确认项目</label>
                            <div className="text-lg font-medium text-white">{selectedPatient.doctorPlan.finalPlan}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-500 mb-2 block">治疗方案</label>
                              <p className="text-sm text-slate-300">{selectedPatient.doctorPlan.details.treatment}</p>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 mb-2 block">治疗部位</label>
                              <div className="flex gap-2">
                                {selectedPatient.doctorPlan.details.areas.map((area: string, idx: number) => (
                                  <Badge key={idx} variant="outline">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 mb-2 block">具体用量</label>
                              <p className="text-sm text-slate-300">{selectedPatient.doctorPlan.details.dosage}</p>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 mb-2 block">恢复时间</label>
                              <p className="text-sm text-slate-300">
                                {selectedPatient.doctorPlan.details.recoveryTime}
                              </p>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-slate-500 mb-2 block">预期效果</label>
                            <div className="p-3 bg-slate-900/50 rounded-lg">
                              <p className="text-sm text-slate-300">
                                {selectedPatient.doctorPlan.details.expectedEffect}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6 bg-slate-800/50">
                        <h3 className="text-lg font-semibold text-white mb-4">生成的医疗文书</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedPatient.doctorPlan.documents.map((doc: string, idx: number) => (
                            <Button key={idx} variant="outline" className="justify-start bg-transparent">
                              <FileText className="w-4 h-4 mr-2" />
                              {doc}
                            </Button>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6 bg-slate-800/50">
                        <h3 className="text-lg font-semibold text-white mb-4">术后随访计划</h3>
                        <div className="space-y-2">
                          {selectedPatient.doctorPlan.followupPlan.map((plan: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-slate-300">{plan}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </>
                  ) : (
                    <Card className="p-12 bg-slate-800/50 text-center">
                      <Stethoscope className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">等待医生制定方案</h3>
                      <p className="text-slate-400 mb-6">患者尚未进入医生方案制定阶段</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">创建治疗方案</Button>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">请选择患者</h3>
                <p className="text-slate-400">从左侧列表中选择一个患者以查看详细信息</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
