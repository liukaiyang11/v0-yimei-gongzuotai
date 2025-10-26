"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LaunchpadGrid } from "@/components/launchpad-grid"
import { Sidebar } from "@/components/sidebar"
import { KnowledgeBase } from "@/components/knowledge-base"
import { IndustryKnowledgeBase } from "@/components/industry-knowledge-base"
import { AdComplianceReview } from "@/components/ad-compliance-review"
import { AICollaborationAssistant } from "@/components/ai-collaboration-assistant"
import { CollaborativeServicePlatform } from "@/components/collaborative-service-platform"
import { CustomerAcquisitionSystem } from "@/components/customer-acquisition-system"
import { AppMarketplace } from "@/components/app-marketplace"
import { MedicalBeautyThinkTank } from "@/components/medical-beauty-think-tank"
import { Screensaver } from "@/components/screensaver"

const IDLE_TIMEOUT = 5 * 60 * 1000 // 5 minutes in milliseconds

export function WorkspaceLayout() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("启动台")
  const [bookReaderState, setBookReaderState] = useState<{ show: boolean; bookTitle: string }>({
    show: false,
    bookTitle: "",
  })
  const [coursePlayerState, setCoursePlayerState] = useState<{ show: boolean; courseTitle: string }>({
    show: false,
    courseTitle: "",
  })
  const [showAdCompliance, setShowAdCompliance] = useState(false)
  const [showCollaborationAssistant, setShowCollaborationAssistant] = useState(false)
  const [showCollaborativeService, setShowCollaborativeService] = useState(false)
  const [showCustomerAcquisition, setShowCustomerAcquisition] = useState(false)
  const [showAppMarketplace, setShowAppMarketplace] = useState(false)
  const [showScreensaver, setShowScreensaver] = useState(false)

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [addedApps, setAddedApps] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("addedApps")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("addedApps", JSON.stringify(addedApps))
    }
  }, [addedApps])

  useEffect(() => {
    if (activeSection !== "启动台") {
      // Clear timer if not on launchpad
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
      return
    }

    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      idleTimerRef.current = setTimeout(() => {
        setShowScreensaver(true)
      }, IDLE_TIMEOUT)
    }

    // Events that reset the idle timer
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

    events.forEach((event) => {
      document.addEventListener(event, resetIdleTimer)
    })

    // Start the timer
    resetIdleTimer()

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer)
      })
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [activeSection])

  const handleAppClick = (appId: string) => {
    if (appId === "ad-compliance") {
      setShowAdCompliance(true)
    }
    if (appId === "sales-assistant") {
      setShowCollaborationAssistant(true)
    }
    if (appId === "collaborative-service") {
      setShowCollaborativeService(true)
    }
    if (appId === "customer-acquisition") {
      setShowCustomerAcquisition(true)
    }
  }

  const handleAddApp = (appId: string) => {
    if (!addedApps.includes(appId)) {
      setAddedApps([...addedApps, appId])
    }
  }

  if (showScreensaver) {
    return <Screensaver onExit={() => setShowScreensaver(false)} />
  }

  if (showCustomerAcquisition) {
    return <CustomerAcquisitionSystem onBack={() => setShowCustomerAcquisition(false)} />
  }

  if (showCollaborativeService) {
    return <CollaborativeServicePlatform onBack={() => setShowCollaborativeService(false)} />
  }

  if (showCollaborationAssistant) {
    return <AICollaborationAssistant onBack={() => setShowCollaborationAssistant(false)} />
  }

  if (showAdCompliance) {
    return <AdComplianceReview onBack={() => setShowAdCompliance(false)} />
  }

  const renderContent = () => {
    if (activeSection === "知识库") {
      return <KnowledgeBase />
    }
    if (activeSection === "行业知识库") {
      return (
        <IndustryKnowledgeBase
          onOpenBookReader={setBookReaderState}
          bookReaderState={bookReaderState}
          onOpenCoursePlayer={setCoursePlayerState}
          coursePlayerState={coursePlayerState}
        />
      )
    }
    if (activeSection === "医美智库") {
      return (
        <div className="fixed inset-0 left-20 flex flex-col">
          <MedicalBeautyThinkTank />
        </div>
      )
    }
    return <LaunchpadGrid searchQuery={searchQuery} onAppClick={handleAppClick} addedApps={addedApps} />
  }

  const showSearchBar = activeSection === "启动台"

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 侧边栏 */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* 主内容区域 */}
      <div className={`ml-20 min-h-screen relative z-10 ${activeSection === "医美智库" ? "" : "px-8"}`}>
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
        <div className={activeSection === "医美智库" ? "" : `pb-8 ${!showSearchBar ? "pt-8" : ""}`}>
          {renderContent()}
        </div>

        {activeSection === "启动台" && (
          <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
            <Button
              size="icon"
              onClick={() => setShowScreensaver(true)}
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 shadow-lg backdrop-blur-sm border-0 transition-all duration-300 hover:scale-110"
              title="进入屏保模式"
            >
              <Leaf className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={() => setShowAppMarketplace(true)}
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 shadow-lg backdrop-blur-sm border-0 transition-all duration-300 hover:scale-110"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {showAppMarketplace && (
        <AppMarketplace onClose={() => setShowAppMarketplace(false)} onAddApp={handleAddApp} addedApps={addedApps} />
      )}
    </div>
  )
}
