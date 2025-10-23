"use client"

import { useState } from "react"
import { ThinkTankHomepage } from "@/components/think-tank/homepage"
import { DeepInsightsList } from "@/components/think-tank/deep-insights-list"
import { DeepInsightsDetail } from "@/components/think-tank/deep-insights-detail"
import { DataCenter } from "@/components/think-tank/data-center"

type TabType = "homepage" | "insights" | "data-center"

export function MedicalBeautyThinkTank() {
  const [activeTab, setActiveTab] = useState<TabType>("homepage")
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleNavigateToInsightsList = (category?: string) => {
    setActiveTab("insights")
    if (category) {
      setSelectedCategory(category)
    }
  }

  const handleNavigateToInsightsDetail = (articleId: string) => {
    setSelectedArticleId(articleId)
  }

  const handleBackToList = () => {
    setSelectedArticleId(null)
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <nav className="flex gap-6">
            <button
              onClick={() => {
                setActiveTab("homepage")
                setSelectedArticleId(null)
              }}
              className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                activeTab === "homepage" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              首页
              {activeTab === "homepage" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button
              onClick={() => {
                setActiveTab("insights")
                setSelectedArticleId(null)
              }}
              className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                activeTab === "insights" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              深度洞察
              {activeTab === "insights" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button
              onClick={() => {
                setActiveTab("data-center")
                setSelectedArticleId(null)
              }}
              className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                activeTab === "data-center" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              数据中心
              {activeTab === "data-center" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === "homepage" && (
          <ThinkTankHomepage
            onNavigateToInsights={handleNavigateToInsightsList}
            onNavigateToDataCenter={() => setActiveTab("data-center")}
            onArticleClick={handleNavigateToInsightsDetail}
          />
        )}

        {activeTab === "insights" && (
          <>
            {selectedArticleId ? (
              <DeepInsightsDetail articleId={selectedArticleId} onBack={handleBackToList} />
            ) : (
              <DeepInsightsList
                selectedCategory={selectedCategory}
                onArticleClick={handleNavigateToInsightsDetail}
                onBack={() => setActiveTab("homepage")}
              />
            )}
          </>
        )}

        {activeTab === "data-center" && <DataCenter onBack={() => setActiveTab("homepage")} />}
      </div>
    </div>
  )
}
