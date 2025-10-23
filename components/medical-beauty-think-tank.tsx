"use client"

import { useState } from "react"
import { ThinkTankHomepage } from "@/components/think-tank/homepage"
import { DeepInsightsList } from "@/components/think-tank/deep-insights-list"
import { DeepInsightsDetail } from "@/components/think-tank/deep-insights-detail"
import { DataCenter } from "@/components/think-tank/data-center"

type ViewType = "homepage" | "insights-list" | "insights-detail" | "data-center"

export function MedicalBeautyThinkTank() {
  const [currentView, setCurrentView] = useState<ViewType>("homepage")
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleNavigateToInsightsList = (category?: string) => {
    setCurrentView("insights-list")
    if (category) {
      setSelectedCategory(category)
    }
  }

  const handleNavigateToInsightsDetail = (articleId: string) => {
    setSelectedArticleId(articleId)
    setCurrentView("insights-detail")
  }

  const handleNavigateToDataCenter = () => {
    setCurrentView("data-center")
  }

  const handleBackToHomepage = () => {
    setCurrentView("homepage")
    setSelectedCategory("all")
  }

  const handleBackToList = () => {
    setCurrentView("insights-list")
    setSelectedArticleId(null)
  }

  if (currentView === "insights-detail" && selectedArticleId) {
    return <DeepInsightsDetail articleId={selectedArticleId} onBack={handleBackToList} />
  }

  if (currentView === "insights-list") {
    return (
      <DeepInsightsList
        selectedCategory={selectedCategory}
        onArticleClick={handleNavigateToInsightsDetail}
        onBack={handleBackToHomepage}
      />
    )
  }

  if (currentView === "data-center") {
    return <DataCenter onBack={handleBackToHomepage} />
  }

  return (
    <ThinkTankHomepage
      onNavigateToInsights={handleNavigateToInsightsList}
      onNavigateToDataCenter={handleNavigateToDataCenter}
      onArticleClick={handleNavigateToInsightsDetail}
    />
  )
}
