"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Package,
  AlertTriangle,
  ShoppingCart,
  TrendingDown,
  Search,
  Plus,
  Download,
  Upload,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InventoryManagementProps {
  onBack?: () => void
  onNavigateToMall?: () => void
}

interface InventoryItem {
  id: string
  name: string
  brand: string
  category: string
  currentStock: number
  safetyStock: number
  unit: string
  price: number
  lastPurchaseDate: string
  expiryDate: string
  status: "normal" | "low" | "critical"
}

interface PurchaseOrder {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "shipped" | "delivered" | "received"
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "瑞蓝2号玻尿酸",
    brand: "瑞蓝 Restylane",
    category: "注射类",
    currentStock: 8,
    safetyStock: 15,
    unit: "支",
    price: 2680,
    lastPurchaseDate: "2024-01-15",
    expiryDate: "2025-06-30",
    status: "low",
  },
  {
    id: "2",
    name: "乔雅登雅致玻尿酸",
    brand: "乔雅登 JUVÉDERM",
    category: "注射类",
    currentStock: 3,
    safetyStock: 10,
    unit: "支",
    price: 3280,
    lastPurchaseDate: "2024-01-10",
    expiryDate: "2025-08-15",
    status: "critical",
  },
  {
    id: "3",
    name: "可复美医用面膜",
    brand: "可复美 Recosma",
    category: "医用面膜",
    currentStock: 156,
    safetyStock: 100,
    unit: "盒",
    price: 168,
    lastPurchaseDate: "2024-01-20",
    expiryDate: "2025-12-31",
    status: "normal",
  },
  {
    id: "4",
    name: "一次性注射器",
    brand: "BD",
    category: "医用耗材",
    currentStock: 45,
    safetyStock: 200,
    unit: "支",
    price: 2.5,
    lastPurchaseDate: "2024-01-18",
    expiryDate: "2026-01-01",
    status: "critical",
  },
]

const mockOrders: PurchaseOrder[] = [
  {
    id: "1",
    orderNumber: "PO202401250001",
    date: "2024-01-25",
    status: "delivered",
    items: [
      { name: "瑞蓝2号玻尿酸", quantity: 20, price: 2680 },
      { name: "可复美医用面膜", quantity: 50, price: 168 },
    ],
    total: 62000,
  },
  {
    id: "2",
    orderNumber: "PO202401240002",
    date: "2024-01-24",
    status: "shipped",
    items: [{ name: "乔雅登雅致玻尿酸", quantity: 15, price: 3280 }],
    total: 49200,
  },
]

export function InventoryManagement({ onBack, onNavigateToMall }: InventoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("inventory")
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null)

  const lowStockItems = mockInventory.filter((item) => item.status === "low" || item.status === "critical")
  const criticalStockItems = mockInventory.filter((item) => item.status === "critical")

  const handleWarehouseEntry = (order: PurchaseOrder) => {
    // 模拟入库操作
    alert(`订单 ${order.orderNumber} 已确认入库！库存已自动更新。`)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: { label: "库存正常", className: "bg-green-100 text-green-700" },
      low: { label: "库存偏低", className: "bg-yellow-100 text-yellow-700" },
      critical: { label: "库存告急", className: "bg-red-100 text-red-700" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getOrderStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "待发货", className: "bg-gray-100 text-gray-700" },
      shipped: { label: "已发货", className: "bg-blue-100 text-blue-700" },
      delivered: { label: "已签收", className: "bg-green-100 text-green-700" },
      received: { label: "已入库", className: "bg-purple-100 text-purple-700" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">院内库存/耗材管理</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出报表
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                导入数据
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 库存预警看板 */}
        {lowStockItems.length > 0 && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-2">库存预警 ({lowStockItems.length} 项)</h3>
                <div className="space-y-2">
                  {criticalStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <Package className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            当前库存: <span className="text-red-600 font-semibold">{item.currentStock}</span>{" "}
                            {item.unit} / 安全库存: {item.safetyStock} {item.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(item.status)}
                        <Button size="sm" onClick={onNavigateToMall} className="bg-blue-600 hover:bg-blue-700">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          一键补货
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">总库存品类</span>
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{mockInventory.length}</p>
            <p className="text-sm text-gray-500 mt-1">种商品</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">库存告急</span>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{criticalStockItems.length}</p>
            <p className="text-sm text-gray-500 mt-1">需要补货</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">待入库订单</span>
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {mockOrders.filter((o) => o.status === "delivered").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">笔订单</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">本月采购额</span>
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">¥111.2K</p>
            <p className="text-sm text-gray-500 mt-1">较上月 +12%</p>
          </Card>
        </div>

        {/* 主要内容标签页 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="inventory">库存管理</TabsTrigger>
            <TabsTrigger value="orders">采购订单</TabsTrigger>
            <TabsTrigger value="alerts">库存预警</TabsTrigger>
          </TabsList>

          {/* 库存管理 */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="搜索商品名称或品牌..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={onNavigateToMall}>
                <Plus className="w-4 h-4 mr-2" />
                去商城采购
              </Button>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">商品信息</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">品类</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">当前库存</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">安全库存</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">状态</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">有效期</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.brand}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-semibold ${
                              item.status === "critical"
                                ? "text-red-600"
                                : item.status === "low"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {item.currentStock} {item.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.safetyStock} {item.unit}
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.expiryDate}</td>
                        <td className="px-6 py-4">
                          {(item.status === "low" || item.status === "critical") && (
                            <Button size="sm" variant="outline" onClick={onNavigateToMall}>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              补货
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* 采购订单 */}
          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                        {getOrderStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500">下单时间: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">订单总额</p>
                      <p className="text-2xl font-bold text-blue-600">¥{order.total.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-t">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">¥{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {order.status === "delivered" && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button className="flex-1" onClick={() => handleWarehouseEntry(order)}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        确认入库
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        查看详情
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 库存预警 */}
          <TabsContent value="alerts" className="space-y-4">
            {lowStockItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${item.status === "critical" ? "bg-red-100" : "bg-yellow-100"}`}>
                    <AlertTriangle
                      className={`w-6 h-6 ${item.status === "critical" ? "text-red-600" : "text-yellow-600"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">当前库存</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">安全库存</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.safetyStock} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">建议补货</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {item.safetyStock - item.currentStock} {item.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button onClick={onNavigateToMall}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        立即补货
                      </Button>
                      <Button variant="outline">调整安全库存</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
