"use client"
import { ShoppingCart, Bot, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Book {
  id: string
  title: string
  author: string
  cover: string
  description: string
  category: string
  rating: number
  price: number
  type: "physical" | "digital"
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "医美注射技术精要",
    author: "张医生",
    cover: "/medical-beauty-injection-book.jpg",
    description: "全面讲解医美注射技术的理论基础与实践操作,包括玻尿酸、肉毒素等常见注射项目。",
    category: "注射技术",
    rating: 4.8,
    price: 198,
    type: "physical",
  },
  {
    id: "2",
    title: "皮肤管理实战指南",
    author: "李主任",
    cover: "/skin-management-guide-book.jpg",
    description: "从基础到进阶,系统讲解皮肤管理的各个方面,包括问题肌肤诊断与治疗方案。",
    category: "皮肤管理",
    rating: 4.9,
    price: 168,
    type: "digital",
  },
  {
    id: "3",
    title: "光电美容设备操作手册",
    author: "王教授",
    cover: "/laser-beauty-equipment-manual.jpg",
    description: "详细介绍各类光电美容设备的原理、操作流程及安全注意事项。",
    category: "光电美容",
    rating: 4.7,
    price: 228,
    type: "physical",
  },
  {
    id: "4",
    title: "医美咨询与沟通艺术",
    author: "赵老师",
    cover: "/medical-beauty-consultation-book.jpg",
    description: "提升医美咨询师的专业沟通能力,掌握客户心理分析与方案设计技巧。",
    category: "咨询管理",
    rating: 4.6,
    price: 158,
    type: "digital",
  },
]

interface BookLibraryProps {
  searchQuery: string
  onOpenBookReader: (state: { show: boolean; bookTitle: string }) => void
}

export function BookLibrary({ searchQuery, onOpenBookReader }: BookLibraryProps) {
  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAIAssistant = (book: Book) => {
    onOpenBookReader({ show: true, bookTitle: book.title })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <Card key={book.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 right-2 bg-blue-500/90 text-white">{book.category}</Badge>
              {book.type === "digital" && (
                <Badge className="absolute top-2 left-2 bg-green-500/90 text-white">电子版</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-white text-lg mb-2 line-clamp-2">{book.title}</CardTitle>
            <CardDescription className="text-gray-300 text-sm mb-3">作者: {book.author}</CardDescription>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">{book.description}</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm ml-1">{book.rating}</span>
              </div>
              <span className="text-orange-400 font-semibold">¥{book.price}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => handleAIAssistant(book)}
            >
              <Bot className="w-4 h-4 mr-1" />
              AI助教
            </Button>
            <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              <ShoppingCart className="w-4 h-4 mr-1" />
              购买
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
