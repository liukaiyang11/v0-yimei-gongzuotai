"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Award,
  CreditCard,
  FileText,
  ArrowLeft,
  Filter,
  Star,
  CheckCircle2,
  TrendingUp,
  Truck,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MedicalBeautyMallProps {
  onBack?: () => void
}

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  image: string
  nmpaNumber: string
  rating: number
  sales: number
  hasInstallment: boolean
  hasTraining: boolean
  inStock: boolean
  tags: string[]
}

interface CartItem extends Product {
  quantity: number
}

const categories = [
  { id: "injection", name: "注射类", icon: "💉" },
  { id: "photoelectric", name: "光电类", icon: "⚡" },
  { id: "mask", name: "医用面膜", icon: "🎭" },
  { id: "equipment", name: "医疗设备", icon: "🔬" },
  { id: "skincare", name: "医学护肤", icon: "✨" },
  { id: "consumables", name: "医用耗材", icon: "📦" },
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "瑞蓝2号玻尿酸",
    brand: "瑞蓝 Restylane",
    category: "injection",
    price: 2680,
    originalPrice: 3200,
    image: "/hyaluronic-acid-injection.jpg",
    nmpaNumber: "国械注进20173465988",
    rating: 4.9,
    sales: 1256,
    hasInstallment: true,
    hasTraining: true,
    inStock: true,
    tags: ["热销", "NMPA认证", "可分期"],
  },
  {
    id: "2",
    name: "乔雅登雅致玻尿酸",
    brand: "乔雅登 JUVÉDERM",
    category: "injection",
    price: 3280,
    originalPrice: 3800,
    image: "/juvederm-filler.jpg",
    nmpaNumber: "国械注进20153465789",
    rating: 4.8,
    sales: 982,
    hasInstallment: true,
    hasTraining: true,
    inStock: true,
    tags: ["进口", "NMPA认证"],
  },
  {
    id: "3",
    name: "超皮秒激光仪",
    brand: "赛诺秀 Cynosure",
    category: "photoelectric",
    price: 1280000,
    image: "/picosecond-laser-device.jpg",
    nmpaNumber: "国械注进20183241567",
    rating: 4.9,
    sales: 45,
    hasInstallment: true,
    hasTraining: true,
    inStock: true,
    tags: ["高端设备", "培训支持", "可分期"],
  },
  {
    id: "4",
    name: "可复美医用面膜",
    brand: "可复美 Recosma",
    category: "mask",
    price: 168,
    originalPrice: 198,
    image: "/medical-facial-mask.jpg",
    nmpaNumber: "国械注准20183640125",
    rating: 4.7,
    sales: 3456,
    hasInstallment: false,
    hasTraining: false,
    inStock: true,
    tags: ["热销", "国产"],
  },
]

export function MedicalBeautyMall({ onBack }: MedicalBeautyMallProps) {
  const [currentView, setCurrentView] = useState<"home" | "list" | "detail" | "cart" | "checkout">("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentView("list")
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView("detail")
  }

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // 商城首页
  const renderHome = () => (
    <div className="space-y-8">
      {/* 搜索栏 */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="搜索产品名称 / 品牌 / 注册证号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-12 text-base border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 常购清单 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">常购清单</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600">
            查看全部
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {mockProducts.slice(0, 4).map((product) => (
            <Card
              key={product.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥{product.price}</span>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                >
                  加入采购车
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 品类快捷入口 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">采购品类</h3>
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-6 cursor-pointer hover:shadow-md hover:border-blue-500 transition-all text-center"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <p className="font-medium text-gray-900">{category.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 推荐产品 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">为您推荐</h3>
        <div className="grid grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">已售 {product.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-blue-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    加入采购车
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  // 商品列表页
  const renderList = () => {
    const filteredProducts = selectedCategory
      ? mockProducts.filter((p) => p.category === selectedCategory)
      : mockProducts

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {categories.find((c) => c.id === selectedCategory)?.name || "全部商品"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">共 {filteredProducts.length} 件商品</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">已售 {product.sales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-blue-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    加入采购车
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // 商品详情页
  const renderDetail = () => {
    if (!selectedProduct) return null

    return (
      <div className="grid grid-cols-2 gap-8">
        <div>
          <img
            src={selectedProduct.image || "/placeholder.svg"}
            alt={selectedProduct.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedProduct.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-600">{selectedProduct.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-medium">{selectedProduct.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">已售 {selectedProduct.sales} 件</span>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm text-gray-600">机构采购价</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-blue-600">¥{selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <span className="text-lg text-gray-400 line-through">¥{selectedProduct.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">NMPA认证</span>
              <span className="text-sm text-green-700">{selectedProduct.nmpaNumber}</span>
            </div>
            {selectedProduct.hasInstallment && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">支持分期付款</span>
                <span className="text-sm text-purple-700">最高12期免息</span>
              </div>
            )}
            {selectedProduct.hasTraining && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Award className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">提供培训支持</span>
                <span className="text-sm text-orange-700">专业技术指导</span>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">冷链配送</span>
              <span className="text-sm text-blue-700">48小时内送达</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1" onClick={() => handleAddToCart(selectedProduct)}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              加入采购车
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => {
                handleAddToCart(selectedProduct)
                setCurrentView("cart")
              }}
            >
              立即采购
            </Button>
          </div>

          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">产品详情</TabsTrigger>
              <TabsTrigger value="specs">规格参数</TabsTrigger>
              <TabsTrigger value="certification">资质认证</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 mt-4">
              <p className="text-gray-600 leading-relaxed">
                {selectedProduct.name}是一款经过NMPA认证的高品质医美产品，适用于专业医疗美容机构使用。
                产品采用先进的生产工艺，确保安全性和有效性。
              </p>
            </TabsContent>
            <TabsContent value="specs" className="space-y-2 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">品牌</p>
                  <p className="font-medium text-gray-900">{selectedProduct.brand}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">注册证号</p>
                  <p className="font-medium text-gray-900">{selectedProduct.nmpaNumber}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="certification" className="mt-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">NMPA认证</p>
                  <p className="text-sm text-green-700">国家药品监督管理局认证产品</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // 采购车页面
  const renderCart = () => (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">采购车</h2>

      {cart.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">采购车是空的</p>
          <Button onClick={() => setCurrentView("home")}>去采购</Button>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center gap-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    <div className="flex items-center gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="w-32 text-right">
                      <p className="text-xl font-bold text-blue-600">¥{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-500">单价 ¥{item.price}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveFromCart(item.id)}>
                      删除
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">商品总额</span>
              <span className="text-2xl font-bold text-blue-600">¥{cartTotal.toFixed(2)}</span>
            </div>
            <Button size="lg" className="w-full" onClick={() => setCurrentView("checkout")}>
              提交订单 ({cartItemCount} 件商品)
            </Button>
          </Card>
        </>
      )}
    </div>
  )

  // 结算页面
  const renderCheckout = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">提交订单</h2>

      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">收货信息</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">收货机构</label>
            <Input placeholder="请输入机构名称" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系人</label>
              <Input placeholder="请输入联系人姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
              <Input placeholder="请输入联系电话" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">收货地址</label>
            <Input placeholder="请输入详细地址" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">支付方式</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500">
            <input type="radio" name="payment" defaultChecked />
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">对公转账</p>
              <p className="text-sm text-gray-500">支持对公账户转账</p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500">
            <input type="radio" name="payment" />
            <CreditCard className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">分期付款</p>
              <p className="text-sm text-gray-500">最高支持12期免息</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">订单商品</h3>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">¥{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between text-xl font-bold">
            <span className="text-gray-900">订单总额</span>
            <span className="text-blue-600">¥{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button size="lg" variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentView("cart")}>
          返回采购车
        </Button>
        <Button size="lg" className="flex-1">
          <FileText className="w-5 h-5 mr-2" />
          确认订单并签署合同
        </Button>
      </div>
    </div>
  )

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
              <h1 className="text-2xl font-bold text-gray-900">医美商城</h1>
              {currentView !== "home" && (
                <Button variant="ghost" size="sm" onClick={() => setCurrentView("home")}>
                  返回首页
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={() => setCurrentView("cart")} className="relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              采购车
              {cartItemCount > 0 && <Badge className="absolute -top-2 -right-2 bg-red-500">{cartItemCount}</Badge>}
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "home" && renderHome()}
        {currentView === "list" && renderList()}
        {currentView === "detail" && renderDetail()}
        {currentView === "cart" && renderCart()}
        {currentView === "checkout" && renderCheckout()}
      </div>
    </div>
  )
}
