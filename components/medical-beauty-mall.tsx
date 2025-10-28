"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Package,
  FileText,
  Award,
  Clock,
  CreditCard,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Filter,
  Star,
  ArrowLeft,
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
  hasTraining: boolean
  hasInstallment: boolean
  tags: string[]
}

interface CartItem extends Product {
  quantity: number
}

interface Order {
  id: string
  date: string
  status: "pending" | "shipped" | "delivered" | "received"
  items: CartItem[]
  total: number
}

export function MedicalBeautyMall({ onBack }: MedicalBeautyMallProps) {
  const [currentView, setCurrentView] = useState<"home" | "list" | "detail" | "cart" | "orders">("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "received",
      items: [],
      total: 15800,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      items: [],
      total: 8900,
    },
  ])

  const categories = [
    { id: "injection", name: "注射类", icon: "💉", color: "from-blue-500 to-blue-600" },
    { id: "photoelectric", name: "光电类", icon: "⚡", color: "from-purple-500 to-purple-600" },
    { id: "mask", name: "医用面膜", icon: "🎭", color: "from-green-500 to-green-600" },
    { id: "thread", name: "线雕类", icon: "🧵", color: "from-pink-500 to-pink-600" },
    { id: "equipment", name: "设备耗材", icon: "🔧", color: "from-orange-500 to-orange-600" },
    { id: "skincare", name: "医学护肤", icon: "✨", color: "from-teal-500 to-teal-600" },
  ]

  const allProducts: Product[] = [
    // 注射类产品
    {
      id: "inj-1",
      name: "瑞蓝2号玻尿酸",
      brand: "瑞蓝 Restylane",
      category: "injection",
      price: 2800,
      originalPrice: 3200,
      image: "/hyaluronic-acid-injection.jpg",
      nmpaNumber: "国械注进20173085858",
      rating: 4.9,
      sales: 1580,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "热销", "培训支持"],
    },
    {
      id: "inj-2",
      name: "乔雅登雅致玻尿酸",
      brand: "乔雅登 JUVÉDERM",
      category: "injection",
      price: 3500,
      originalPrice: 3800,
      image: "/juvederm-filler.jpg",
      nmpaNumber: "国械注进20163085858",
      rating: 4.8,
      sales: 1230,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "进口", "分期付款"],
    },
    {
      id: "inj-3",
      name: "艾莉薇玻尿酸",
      brand: "艾莉薇 Ellansé",
      category: "injection",
      price: 4200,
      originalPrice: 4500,
      image: "/ellanse-hyaluronic-acid-injection-medical-beauty.jpg",
      nmpaNumber: "国械注进20183085123",
      rating: 4.7,
      sales: 890,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "长效", "培训支持"],
    },
    {
      id: "inj-4",
      name: "保妥适肉毒素",
      brand: "保妥适 BOTOX",
      category: "injection",
      price: 2200,
      image: "/botox-botulinum-toxin-injection-medical.jpg",
      nmpaNumber: "国械注进20153085234",
      rating: 4.9,
      sales: 2100,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "热销", "除皱"],
    },
    {
      id: "inj-5",
      name: "衡力肉毒素",
      brand: "衡力 Hengli",
      category: "injection",
      price: 1800,
      originalPrice: 2000,
      image: "/hengli-botulinum-toxin-chinese-brand-medical.jpg",
      nmpaNumber: "国械注准20183085345",
      rating: 4.6,
      sales: 1650,
      hasTraining: true,
      hasInstallment: false,
      tags: ["NMPA认证", "国产", "性价比高"],
    },
    {
      id: "inj-6",
      name: "童颜针（舒颜萃）",
      brand: "Sculptra",
      category: "injection",
      price: 5800,
      image: "/sculptra-poly-l-lactic-acid-injection-anti-aging.jpg",
      nmpaNumber: "国械注进20173085456",
      rating: 4.8,
      sales: 720,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "抗衰", "胶原再生"],
    },

    // 光电类产品
    {
      id: "photo-1",
      name: "超皮秒激光设备耗材包",
      brand: "赛诺秀 Cynosure",
      category: "photoelectric",
      price: 8900,
      image: "/picosecond-laser-consumables.jpg",
      nmpaNumber: "国械注进20183085858",
      rating: 4.7,
      sales: 580,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "设备耗材", "技术支持"],
    },
    {
      id: "photo-2",
      name: "热玛吉探头（900发）",
      brand: "Thermage",
      category: "photoelectric",
      price: 15800,
      image: "/thermage-rf-treatment-tip-900-shots-medical-device.jpg",
      nmpaNumber: "国械注进20193085567",
      rating: 4.9,
      sales: 420,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "正品", "紧致提升"],
    },
    {
      id: "photo-3",
      name: "超声刀探头套装",
      brand: "Ultherapy",
      category: "photoelectric",
      price: 12500,
      image: "/ultherapy-ultrasound-transducer-set-medical-beauty.jpg",
      nmpaNumber: "国械注进20183085678",
      rating: 4.8,
      sales: 350,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "抗衰", "无创"],
    },
    {
      id: "photo-4",
      name: "OPT光子嫩肤耗材",
      brand: "科医人 Lumenis",
      category: "photoelectric",
      price: 6800,
      image: "/opt-ipl-photofacial-consumables-medical-device.jpg",
      nmpaNumber: "国械注进20173085789",
      rating: 4.6,
      sales: 680,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "嫩肤", "祛斑"],
    },
    {
      id: "photo-5",
      name: "点阵激光治疗头",
      brand: "飞顿 Alma",
      category: "photoelectric",
      price: 9200,
      image: "/fractional-laser-treatment-head-medical-device.jpg",
      nmpaNumber: "国械注进20183085890",
      rating: 4.7,
      sales: 520,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "祛疤", "嫩肤"],
    },

    // 医用面膜
    {
      id: "mask-1",
      name: "可复美医用面膜",
      brand: "可复美 Cocovel",
      category: "mask",
      price: 680,
      originalPrice: 780,
      image: "/medical-facial-mask.jpg",
      nmpaNumber: "国械注准20183640125",
      rating: 4.9,
      sales: 3200,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "热销", "术后修复"],
    },
    {
      id: "mask-2",
      name: "敷尔佳医用面膜",
      brand: "敷尔佳 Foreo",
      category: "mask",
      price: 580,
      originalPrice: 650,
      image: "/foreo-medical-facial-mask-post-treatment-repair.jpg",
      nmpaNumber: "国械注准20183640236",
      rating: 4.8,
      sales: 2850,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "热销", "补水修复"],
    },
    {
      id: "mask-3",
      name: "创福康医用面膜",
      brand: "创福康 Winfull",
      category: "mask",
      price: 520,
      image: "/winfull-medical-facial-mask-wound-healing.jpg",
      nmpaNumber: "国械注准20183640347",
      rating: 4.7,
      sales: 1980,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "创面修复", "舒缓"],
    },
    {
      id: "mask-4",
      name: "芙清医用面膜",
      brand: "芙清 Fuqing",
      category: "mask",
      price: 620,
      originalPrice: 680,
      image: "/fuqing-medical-facial-mask-sensitive-skin-repair.jpg",
      nmpaNumber: "国械注准20183640458",
      rating: 4.8,
      sales: 2200,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "敏感肌", "抗炎"],
    },

    // 线雕类
    {
      id: "thread-1",
      name: "PDO蛋白线（平滑线）",
      brand: "韩国 Cog",
      category: "thread",
      price: 3200,
      image: "/pdo-thread-lift-smooth-threads-medical-beauty.jpg",
      nmpaNumber: "国械注进20183085901",
      rating: 4.7,
      sales: 890,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "提升", "培训支持"],
    },
    {
      id: "thread-2",
      name: "PPDO大V线",
      brand: "韩国 V-Lift",
      category: "thread",
      price: 4500,
      image: "/ppdo-v-line-thread-lift-face-contouring-medical.jpg",
      nmpaNumber: "国械注进20183086012",
      rating: 4.8,
      sales: 650,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "面部轮廓", "长效"],
    },
    {
      id: "thread-3",
      name: "螺旋线套装",
      brand: "韩国 Mint",
      category: "thread",
      price: 3800,
      image: "/mint-spiral-thread-lift-set-medical-beauty-korea.jpg",
      nmpaNumber: "国械注进20183086123",
      rating: 4.6,
      sales: 720,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "螺旋提升", "固定力强"],
    },
    {
      id: "thread-4",
      name: "锯齿线（Cog线）",
      brand: "韩国 Cog",
      category: "thread",
      price: 4200,
      image: "/cog-barbed-thread-lift-medical-beauty-korea.jpg",
      nmpaNumber: "国械注进20183086234",
      rating: 4.9,
      sales: 580,
      hasTraining: true,
      hasInstallment: true,
      tags: ["NMPA认证", "强力提升", "即刻见效"],
    },

    // 设备耗材
    {
      id: "equip-1",
      name: "一次性无菌注射器套装",
      brand: "BD",
      category: "equipment",
      price: 280,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国械注准20183086345",
      rating: 4.8,
      sales: 4500,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "一次性", "安全"],
    },
    {
      id: "equip-2",
      name: "医用冷敷贴",
      brand: "3M",
      category: "equipment",
      price: 380,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国械注准20183086456",
      rating: 4.7,
      sales: 3200,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "术后护理", "消肿"],
    },
    {
      id: "equip-3",
      name: "医用无菌手套（100只装）",
      brand: "Ansell",
      category: "equipment",
      price: 180,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国械注准20183086567",
      rating: 4.9,
      sales: 5800,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "防护", "舒适"],
    },
    {
      id: "equip-4",
      name: "超声耦合剂",
      brand: "Aquasonic",
      category: "equipment",
      price: 120,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国械注准20183086678",
      rating: 4.6,
      sales: 2800,
      hasTraining: false,
      hasInstallment: false,
      tags: ["NMPA认证", "超声专用", "大容量"],
    },

    // 医学护肤
    {
      id: "skin-1",
      name: "修丽可CE精华液",
      brand: "SkinCeuticals",
      category: "skincare",
      price: 1280,
      originalPrice: 1480,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国妆备进字J20183086789",
      rating: 4.9,
      sales: 1850,
      hasTraining: false,
      hasInstallment: false,
      tags: ["抗氧化", "热销", "医学级"],
    },
    {
      id: "skin-2",
      name: "理肤泉B5修复霜",
      brand: "La Roche-Posay",
      category: "skincare",
      price: 280,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国妆备进字J20183086890",
      rating: 4.8,
      sales: 3500,
      hasTraining: false,
      hasInstallment: false,
      tags: ["修复", "敏感肌", "舒缓"],
    },
    {
      id: "skin-3",
      name: "薇诺娜舒敏保湿特护霜",
      brand: "WINONA",
      category: "skincare",
      price: 320,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国妆备字G20183086901",
      rating: 4.7,
      sales: 2600,
      hasTraining: false,
      hasInstallment: false,
      tags: ["国产", "敏感肌", "保湿"],
    },
    {
      id: "skin-4",
      name: "润百颜玻尿酸次抛精华",
      brand: "Bloomage",
      category: "skincare",
      price: 580,
      originalPrice: 680,
      image: "/placeholder.svg?height=400&width=400",
      nmpaNumber: "国妆备字G20183087012",
      rating: 4.8,
      sales: 2100,
      hasTraining: false,
      hasInstallment: false,
      tags: ["玻尿酸", "补水", "医学级"],
    },
  ]

  const recommendedProducts = allProducts.slice(0, 4)
  const frequentlyPurchased = allProducts.filter((p) => p.category === "injection").slice(0, 2)

  const getFilteredProducts = () => {
    if (!selectedCategory) return allProducts
    return allProducts.filter((p) => p.category === selectedCategory)
  }

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleOneClickWarehouse = (orderId: string) => {
    // This would integrate with the inventory management system
    alert(`订单 ${orderId} 已确认入库，库存已自动更新`)
  }

  const renderHome = () => (
    <div className="space-y-8">
      {/* 搜索栏 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="搜索产品名称、品牌、注册证号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-base border-gray-200 rounded-xl"
          />
        </div>
      </div>

      {/* 品类快捷入口 */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">采购品类</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-0"
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentView("list")
              }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl mb-3 mx-auto`}
              >
                {category.icon}
              </div>
              <p className="text-center font-medium text-gray-800">{category.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 常购清单 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">常购清单</h2>
          <Button
            variant="ghost"
            className="text-blue-400 hover:text-blue-300"
            onClick={() => {
              setSelectedCategory(null)
              setCurrentView("list")
            }}
          >
            查看全部 <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frequentlyPurchased.map((product) => (
            <Card key={product.id} className="p-6 bg-white border-0 hover:shadow-xl transition-all duration-300">
              <div className="flex gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-0">常购</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-orange-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    加入采购车
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 个性化推荐 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-semibold text-white">为您推荐</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden bg-white border-0 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedProduct(product)
                setCurrentView("detail")
              }}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="bg-orange-500 text-white border-0 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.sales})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-orange-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    加购
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProductList = () => {
    const filteredProducts = getFilteredProducts()
    const categoryName = selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : "全部商品"

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCurrentView("home")
              setSelectedCategory(null)
            }}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-white flex-1">{categoryName}</h2>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden bg-white border-0 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedProduct(product)
                setCurrentView("detail")
              }}
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className="bg-orange-500 text-white border-0 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.sales})</span>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Award className="w-3 h-3" />
                    <span>NMPA: {product.nmpaNumber}</span>
                  </div>
                  {product.hasInstallment && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <CreditCard className="w-3 h-3" />
                      <span>支持分期付款</span>
                    </div>
                  )}
                  {product.hasTraining && (
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <FileText className="w-3 h-3" />
                      <span>提供培训支持</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-orange-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    加购
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const renderProductDetail = () => {
    if (!selectedProduct) return null

    return (
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white border-0 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* 产品图片 */}
            <div>
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
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

              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-gray-600">机构采购价</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-orange-600">¥{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">¥{selectedProduct.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">NMPA认证</p>
                    <p className="text-sm text-gray-600">{selectedProduct.nmpaNumber}</p>
                  </div>
                </div>

                {selectedProduct.hasInstallment && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">支持分期付款</p>
                      <p className="text-sm text-gray-600">最高可分12期，低息或免息</p>
                    </div>
                  </div>
                )}

                {selectedProduct.hasTraining && (
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-800">培训支持</p>
                      <p className="text-sm text-gray-600">提供专业操作培训和技术指导</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  加入采购车
                </Button>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setCurrentView("cart")
                  }}
                  className="flex-1 py-6 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  立即采购
                </Button>
              </div>

              <div className="pt-6 border-t">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">产品详情</TabsTrigger>
                    <TabsTrigger value="specs">规格参数</TabsTrigger>
                    <TabsTrigger value="service">售后服务</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-4 text-gray-600">
                    <p>本产品为正品行货，具有完整的NMPA认证资质，适用于医疗美容机构使用。</p>
                  </TabsContent>
                  <TabsContent value="specs" className="mt-4 text-gray-600">
                    <p>规格：1ml/支，保质期：24个月，储存条件：2-8℃冷藏</p>
                  </TabsContent>
                  <TabsContent value="service" className="mt-4 text-gray-600">
                    <p>提供7天无理由退换货服务，质量问题免费退换，全国联保。</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const renderCart = () => (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">采购车</h2>

      {cart.length === 0 ? (
        <Card className="p-12 text-center bg-white border-0">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">采购车是空的</p>
          <Button onClick={() => setCurrentView("home")} className="bg-gradient-to-r from-blue-500 to-blue-600">
            去采购
          </Button>
        </Card>
      ) : (
        <>
          <Card className="bg-white border-0">
            <div className="divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Award className="w-3 h-3" />
                      <span>{item.nmpaNumber}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-xl font-bold text-orange-600">¥{item.price}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white border-0 p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">商品总额</span>
                <span className="font-semibold">¥{cartTotal}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">运费</span>
                <span className="font-semibold text-green-600">免运费</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-2xl">
                <span className="font-bold text-gray-800">合计</span>
                <span className="font-bold text-orange-600">¥{cartTotal}</span>
              </div>
              <Button
                onClick={() => {
                  alert("订单已提交，等待资质审核")
                  setCart([])
                  setCurrentView("orders")
                }}
                className="w-full py-6 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                提交订单
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )

  const renderOrders = () => (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-white">我的订单</h2>

      {orders.map((order) => (
        <Card key={order.id} className="bg-white border-0 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600">订单号: {order.id}</span>
              <span className="text-sm text-gray-600">{order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              {order.status === "pending" && (
                <>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600">待发货</span>
                </>
              )}
              {order.status === "shipped" && (
                <>
                  <Package className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">已发货</span>
                </>
              )}
              {order.status === "delivered" && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">已送达</span>
                </>
              )}
              {order.status === "received" && (
                <>
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">已签收</span>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">订单金额</p>
                <p className="text-2xl font-bold text-orange-600">¥{order.total}</p>
              </div>
              <div className="flex gap-3">
                {order.status === "delivered" && (
                  <Button
                    onClick={() => handleOneClickWarehouse(order.id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    一键入库
                  </Button>
                )}
                <Button variant="outline">查看详情</Button>
              </div>
            </div>

            {order.status === "received" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 mb-1">订单已签收</p>
                  <p className="text-sm text-green-700">
                    商品已送达并签收，如需入库请点击"一键入库"按钮，系统将自动更新院内库存。
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 顶部导航栏 */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-2xl font-bold text-white">医美商城</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={currentView === "home" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("home")}
              className={currentView === "home" ? "bg-white/20 text-white" : "text-white hover:bg-white/10"}
            >
              商城首页
            </Button>
            <Button
              variant={currentView === "orders" ? "secondary" : "ghost"}
              onClick={() => setCurrentView("orders")}
              className={currentView === "orders" ? "bg-white/20 text-white" : "text-white hover:bg-white/10"}
            >
              <Package className="w-4 h-4 mr-2" />
              我的订单
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("cart")}
              className="text-white hover:bg-white/10 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {currentView === "home" && renderHome()}
        {currentView === "list" && renderProductList()}
        {currentView === "detail" && renderProductDetail()}
        {currentView === "cart" && renderCart()}
        {currentView === "orders" && renderOrders()}
      </div>

      {/* 库存预警提示（示例） */}
      {currentView === "home" && (
        <div className="fixed bottom-8 right-8 max-w-sm">
          <Card className="bg-orange-50 border-orange-200 border-2">
            <div className="p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-orange-800 mb-1">库存预警</p>
                <p className="text-sm text-orange-700 mb-3">瑞蓝2号玻尿酸库存不足，当前库存：3支</p>
                <Button
                  size="sm"
                  onClick={() => {
                    const product = allProducts.find((p) => p.name.includes("瑞蓝"))
                    if (product) {
                      setSelectedProduct(product)
                      setCurrentView("detail")
                    }
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  一键补货
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
