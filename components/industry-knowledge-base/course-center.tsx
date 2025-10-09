"use client"

import { useState } from "react"
import { Play, Clock, Users, Bot, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AIAssistantDialog } from "./ai-assistant-dialog"

interface Course {
  id: string
  title: string
  instructor: string
  cover: string
  description: string
  category: string
  rating: number
  students: number
  duration: string
  chapters: number
  progress?: number
  price: number
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "玻尿酸注射全科班",
    instructor: "张主任医师",
    cover: "/hyaluronic-acid-injection-course.jpg",
    description: "从基础理论到实操演练,全面掌握玻尿酸注射技术,包括面部轮廓塑形、除皱等应用。",
    category: "注射技术",
    rating: 4.9,
    students: 1280,
    duration: "12小时",
    chapters: 24,
    progress: 45,
    price: 1980,
  },
  {
    id: "2",
    title: "激光美容设备操作认证",
    instructor: "李教授",
    cover: "/laser-beauty-equipment-course.jpg",
    description: "系统学习各类激光设备的原理、操作规范及安全管理,获得专业认证资格。",
    category: "光电美容",
    rating: 4.8,
    students: 856,
    duration: "16小时",
    chapters: 32,
    price: 2680,
  },
  {
    id: "3",
    title: "医美咨询师实战训练营",
    instructor: "王老师",
    cover: "/medical-beauty-consultant-training.jpg",
    description: "提升咨询技巧,掌握客户心理分析、方案设计与成交话术,成为金牌咨询师。",
    category: "咨询管理",
    rating: 4.7,
    students: 2340,
    duration: "8小时",
    chapters: 16,
    progress: 80,
    price: 1280,
  },
  {
    id: "4",
    title: "皮肤管理高级进阶课程",
    instructor: "赵医生",
    cover: "/advanced-skin-management-course.jpg",
    description: "深入学习问题肌肤诊断与治疗,掌握各类皮肤管理项目的操作流程与注意事项。",
    category: "皮肤管理",
    rating: 4.9,
    students: 1560,
    duration: "20小时",
    chapters: 40,
    price: 3280,
  },
]

interface CourseCenterProps {
  searchQuery: string
}

export function CourseCenter({ searchQuery }: CourseCenterProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAIAssistant = (course: Course) => {
    setSelectedCourse(course)
    setShowAIAssistant(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={course.cover || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 right-3 bg-blue-500/90 text-white">{course.category}</Badge>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <Badge className="bg-black/60 text-white">
                    <Play className="w-3 h-3 mr-1" />
                    {course.chapters}章节
                  </Badge>
                  <Badge className="bg-black/60 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.duration}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <CardTitle className="text-white text-xl mb-2">{course.title}</CardTitle>
              <CardDescription className="text-gray-300 text-sm mb-3 flex items-center gap-4">
                <span>讲师: {course.instructor}</span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {course.students}人学习
                </span>
              </CardDescription>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm ml-1">{course.rating}</span>
                </div>
                <span className="text-orange-400 font-bold text-lg">¥{course.price}</span>
              </div>

              {course.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">学习进度</span>
                    <span className="text-white font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter className="p-5 pt-0 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => handleAIAssistant(course)}
              >
                <Bot className="w-4 h-4 mr-1" />
                AI助教
              </Button>
              <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                {course.progress !== undefined ? (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    继续学习
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    立即报名
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* AI助教对话框 */}
      {selectedCourse && (
        <AIAssistantDialog
          open={showAIAssistant}
          onOpenChange={setShowAIAssistant}
          title={selectedCourse.title}
          type="course"
        />
      )}
    </>
  )
}
