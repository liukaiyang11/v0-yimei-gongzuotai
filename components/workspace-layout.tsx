"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LaunchpadGrid } from "@/components/launchpad-grid"
import { Sidebar } from "@/components/sidebar"
import { KnowledgeBase } from "@/components/knowledge-base"
import { IndustryKnowledgeBase } from "@/components/industry-knowledge-base"
import { IndustryInsightsPage } from "@/components/industry-insights-page"

export function WorkspaceLayout() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("启动台")
  const [bookReaderState, setBookReaderState] = useState<{ show: boolean; bookTitle: string }>({
    show: false,
    bookTitle: "",
  })

  const renderContent = () => {
    if (activeSection === "知识库") {
      return <KnowledgeBase />
    }
    if (activeSection === "行业知识库") {
      return <IndustryKnowledgeBase onOpenBookReader={setBookReaderState} bookReaderState={bookReaderState} />
    }
    if (activeSection === "行业观察") {
      return <IndustryInsightsPage />
    }
    return <LaunchpadGrid searchQuery={searchQuery} />
  }

  const showSearchBar = activeSection === "启动台"

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 侧边栏 */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* 主内容区域 */}
      <div className="ml-20 min-h-screen relative z-10">
        {showSearchBar && (
          <div className="flex justify-center pt-16 pb-8">
            <div className="relative w-full max-w-2xl">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500">
                <Search className="w-5 h-5" />
              </div>
              <Input
                placeholder="输入搜索内容"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-0 rounded-full text-gray-800 placeholder:text-gray-500 shadow-lg text-base"
              />
            </div>
          </div>
        )}

        {/* 内容区域 */}
        <div className={`px-8 pb-8 ${!showSearchBar ? "pt-8" : ""}`}>{renderContent()}</div>

        {activeSection === "启动台" && (
          <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 shadow-lg backdrop-blur-sm border-0"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
