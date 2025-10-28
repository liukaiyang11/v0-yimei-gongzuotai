"use client"

import { useState } from "react"
import { BookOpen, GraduationCap, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookLibrary } from "@/components/industry-knowledge-base/book-library"
import { CourseCenter } from "@/components/industry-knowledge-base/course-center"
import { BookReader } from "@/components/industry-knowledge-base/book-reader"
import { CoursePlayer } from "@/components/industry-knowledge-base/course-player"

interface IndustryKnowledgeBaseProps {
  onOpenBookReader: (state: { show: boolean; bookTitle: string }) => void
  bookReaderState: { show: boolean; bookTitle: string }
  onOpenCoursePlayer: (state: { show: boolean; courseTitle: string }) => void
  coursePlayerState: { show: boolean; courseTitle: string }
}

export function IndustryKnowledgeBase({
  onOpenBookReader,
  bookReaderState,
  onOpenCoursePlayer,
  coursePlayerState,
}: IndustryKnowledgeBaseProps) {
  const [activeTab, setActiveTab] = useState("books")
  const [searchQuery, setSearchQuery] = useState("")

  if (coursePlayerState.show) {
    return (
      <CoursePlayer
        courseTitle={coursePlayerState.courseTitle}
        onBack={() => onOpenCoursePlayer({ show: false, courseTitle: "" })}
      />
    )
  }

  if (bookReaderState.show) {
    return (
      <BookReader
        bookTitle={bookReaderState.bookTitle}
        onBack={() => onOpenBookReader({ show: false, bookTitle: "" })}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">行业知识库</h1>
          <p className="text-gray-300">专业医美知识,AI赋能学习体验</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20">
          <TabsTrigger value="books" className="data-[state=active]:bg-white/20">
            <BookOpen className="w-4 h-4 mr-2" />
            医美图书
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-white/20">
            <GraduationCap className="w-4 h-4 mr-2" />
            专业课程
          </TabsTrigger>
        </TabsList>

        {/* 搜索和筛选栏 */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索图书或课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
        </div>

        {/* 内容区域 */}
        <TabsContent value="books" className="mt-6">
          <BookLibrary searchQuery={searchQuery} onOpenBookReader={onOpenBookReader} />
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <CourseCenter searchQuery={searchQuery} onOpenCoursePlayer={onOpenCoursePlayer} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
