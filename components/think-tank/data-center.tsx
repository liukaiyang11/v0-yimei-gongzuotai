"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, ArrowUpDown, Building2 } from "lucide-react"

interface DataCenterProps {
  onBack: () => void
}

const tabs = [
  { id: "listed-companies", label: "上市公司" },
  { id: "investments", label: "投融资库" },
  { id: "products", label: "合规产品库" },
]

const listedCompaniesData = [
  {
    id: "1",
    name: "华熙生物",
    code: "688363",
    market: "A股",
    industry: "上游原料",
    marketCap: "580亿",
    pe: "45.2",
    change: 8.5,
  },
  {
    id: "2",
    name: "爱美客",
    code: "300896",
    market: "A股",
    industry: "上游原料",
    marketCap: "420亿",
    pe: "52.8",
    change: 6.2,
  },
  {
    id: "3",
    name: "昊海生科",
    code: "688366",
    market: "A股",
    industry: "上游原料",
    marketCap: "180亿",
    pe: "38.5",
    change: 4.8,
  },
  {
    id: "4",
    name: "华东医药",
    code: "000963",
    market: "A股",
    industry: "中游机构",
    marketCap: "320亿",
    pe: "28.3",
    change: -2.3,
  },
  {
    id: "5",
    name: "贝泰妮",
    code: "300957",
    market: "A股",
    industry: "下游平台",
    marketCap: "250亿",
    pe: "42.1",
    change: -3.1,
  },
]

const investmentsData = [
  {
    id: "1",
    date: "2025-10-19",
    company: "再生医学科技",
    logo: "/company-logo-1.png",
    sector: "再生医学",
    round: "B轮",
    amount: "5亿元",
    investors: "红杉中国、高瓴资本",
  },
  {
    id: "2",
    date: "2025-10-17",
    company: "智能医美SaaS",
    logo: "/company-logo-2.png",
    sector: "服务SaaS",
    round: "A+轮",
    amount: "2亿元",
    investors: "腾讯投资、IDG资本",
  },
  {
    id: "3",
    date: "2025-10-15",
    company: "医美供应链平台",
    logo: "/company-logo-3.png",
    sector: "下游平台",
    round: "战略投资",
    amount: "3亿元",
    investors: "阿里健康",
  },
  {
    id: "4",
    date: "2025-10-12",
    company: "光电设备研发",
    logo: "/company-logo-4.png",
    sector: "医美器械",
    round: "C轮",
    amount: "8亿元",
    investors: "软银中国、经纬创投",
  },
  {
    id: "5",
    date: "2025-10-08",
    company: "医美连锁机构",
    logo: "/company-logo-5.png",
    sector: "医美机构",
    round: "B+轮",
    amount: "6亿元",
    investors: "高榕资本、启明创投",
  },
]

const productsData = [
  {
    id: "1",
    name: "润百颜玻尿酸",
    certNo: "国械注准20233150234",
    company: "华熙生物",
    category: "注射用玻尿酸",
    approvalDate: "2023-05-15",
    type: "国产",
  },
  {
    id: "2",
    name: "嗨体颈纹",
    certNo: "国械注准20223150189",
    company: "爱美客",
    category: "注射用玻尿酸",
    approvalDate: "2022-11-20",
    type: "国产",
  },
  {
    id: "3",
    name: "乔雅登雅致",
    certNo: "国械注进20183151234",
    company: "艾尔建",
    category: "注射用玻尿酸",
    approvalDate: "2018-08-10",
    type: "进口",
  },
  {
    id: "4",
    name: "保妥适",
    certNo: "国械注进20183150567",
    company: "艾尔建",
    category: "肉毒素",
    approvalDate: "2018-06-25",
    type: "进口",
  },
  {
    id: "5",
    name: "热玛吉FLX",
    certNo: "国械注进20203151890",
    company: "Solta Medical",
    category: "射频设备",
    approvalDate: "2020-09-15",
    type: "进口",
  },
]

export function DataCenter({ onBack }: DataCenterProps) {
  const [activeTab, setActiveTab] = useState("listed-companies")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">数据中心</h1>
        <p className="text-gray-400 mt-1">医美行业全景数据库，助力精准决策</p>
      </div>

      {/* 标签页导航 */}
      <div className="flex items-center space-x-2 border-b border-white/10">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`relative px-6 py-3 rounded-none ${
              activeTab === tab.id
                ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧筛选条件 */}
        <Card className="bg-white/5 border-white/10 p-6 h-fit">
          <h3 className="text-white font-semibold mb-4">筛选条件</h3>
          <div className="space-y-4">
            {activeTab === "listed-companies" && (
              <ListedCompaniesFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            )}
            {activeTab === "investments" && (
              <InvestmentsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            )}
            {activeTab === "products" && <ProductsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
          </div>
        </Card>

        {/* 右侧数据展示 */}
        <div className="lg:col-span-3">
          {activeTab === "listed-companies" && <ListedCompaniesTable data={listedCompaniesData} />}
          {activeTab === "investments" && <InvestmentsTable data={investmentsData} />}
          {activeTab === "products" && <ProductsTable data={productsData} />}
        </div>
      </div>
    </div>
  )
}

function ListedCompaniesFilters({
  searchQuery,
  setSearchQuery,
}: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">关键词搜索</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索公司名称或代码"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">市场板块</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部市场</SelectItem>
            <SelectItem value="a-share">A股</SelectItem>
            <SelectItem value="hk">港股</SelectItem>
            <SelectItem value="us">美股</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">产业链环节</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部环节</SelectItem>
            <SelectItem value="upstream">上游原料</SelectItem>
            <SelectItem value="midstream">中游机构</SelectItem>
            <SelectItem value="downstream">下游平台</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">市值范围</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部市值</SelectItem>
            <SelectItem value="large">500亿以上</SelectItem>
            <SelectItem value="medium">100-500亿</SelectItem>
            <SelectItem value="small">100亿以下</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
        重置筛选
      </Button>
    </>
  )
}

function InvestmentsFilters({
  searchQuery,
  setSearchQuery,
}: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">关键词搜索</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索公司名称或投资机构"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">融资轮次</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部轮次</SelectItem>
            <SelectItem value="seed">种子/天使轮</SelectItem>
            <SelectItem value="a">A轮</SelectItem>
            <SelectItem value="b">B轮</SelectItem>
            <SelectItem value="c">C轮及以后</SelectItem>
            <SelectItem value="strategic">战略投资</SelectItem>
            <SelectItem value="ma">并购</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">赛道/领域</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部赛道</SelectItem>
            <SelectItem value="materials">上游原料</SelectItem>
            <SelectItem value="devices">医美器械</SelectItem>
            <SelectItem value="clinics">医美机构</SelectItem>
            <SelectItem value="regenerative">再生医学</SelectItem>
            <SelectItem value="saas">服务SaaS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">融资金额</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部金额</SelectItem>
            <SelectItem value="large">5亿以上</SelectItem>
            <SelectItem value="medium">1-5亿</SelectItem>
            <SelectItem value="small">1亿以下</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
        重置筛选
      </Button>
    </>
  )
}

function ProductsFilters({
  searchQuery,
  setSearchQuery,
}: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">关键词搜索</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索产品名、注册证号或企业"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">产品分类</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部产品</SelectItem>
            <SelectItem value="ha">注射用玻尿酸</SelectItem>
            <SelectItem value="collagen">胶原蛋白</SelectItem>
            <SelectItem value="regenerative">再生材料</SelectItem>
            <SelectItem value="botox">肉毒素</SelectItem>
            <SelectItem value="laser">光电设备</SelectItem>
            <SelectItem value="rf">射频设备</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">管理类别</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类别</SelectItem>
            <SelectItem value="class3">三类医疗器械</SelectItem>
            <SelectItem value="class2">二类医疗器械</SelectItem>
            <SelectItem value="drug">药品</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-2 block">国产/进口</label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="domestic">国产</SelectItem>
            <SelectItem value="imported">进口</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
        重置筛选
      </Button>
    </>
  )
}

function ListedCompaniesTable({ data }: { data: typeof listedCompaniesData }) {
  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <p className="text-gray-400 text-sm">共找到 {data.length} 家企业</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>公司名称</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">代码</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">市场</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">产业链</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>市值</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">市盈率</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>涨跌幅</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((company) => (
              <tr
                key={company.id}
                className="border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-white font-medium">{company.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400 text-sm">{company.code}</td>
                <td className="p-4">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {company.market}
                  </Badge>
                </td>
                <td className="p-4 text-gray-400 text-sm">{company.industry}</td>
                <td className="p-4 text-white font-semibold">{company.marketCap}</td>
                <td className="p-4 text-gray-400 text-sm">{company.pe}</td>
                <td className="p-4">
                  <div
                    className={`flex items-center space-x-1 ${company.change >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {company.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-semibold">
                      {company.change > 0 ? "+" : ""}
                      {company.change}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function InvestmentsTable({ data }: { data: typeof investmentsData }) {
  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <p className="text-gray-400 text-sm">共找到 {data.length} 条融资事件</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>融资时间</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">公司名称</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">赛道/领域</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">融资轮次</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>融资金额</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">投资方</th>
            </tr>
          </thead>
          <tbody>
            {data.map((investment) => (
              <tr
                key={investment.id}
                className="border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="p-4 text-gray-400 text-sm">{investment.date}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white font-medium">{investment.company}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400 text-sm">{investment.sector}</td>
                <td className="p-4">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {investment.round}
                  </Badge>
                </td>
                <td className="p-4 text-white font-semibold">{investment.amount}</td>
                <td className="p-4 text-gray-400 text-sm">{investment.investors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function ProductsTable({ data }: { data: typeof productsData }) {
  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <p className="text-gray-400 text-sm">共找到 {data.length} 个合规产品</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">产品名称</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">注册证号</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">申请企业</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">产品分类</th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>批准日期</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left p-4 text-gray-400 text-sm font-medium">国产/进口</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr
                key={product.id}
                className="border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="p-4 text-white font-medium">{product.name}</td>
                <td className="p-4 text-gray-400 text-sm font-mono">{product.certNo}</td>
                <td className="p-4 text-gray-400 text-sm">{product.company}</td>
                <td className="p-4">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {product.category}
                  </Badge>
                </td>
                <td className="p-4 text-gray-400 text-sm">{product.approvalDate}</td>
                <td className="p-4">
                  <Badge className={product.type === "国产" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}>
                    {product.type}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
