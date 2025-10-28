"use client"

import { useState } from "react"
import { PersonalKnowledgeBase } from "./knowledge-base/personal-knowledge-base"
import { TeamKnowledgeBase } from "./knowledge-base/team-knowledge-base"
import { cn } from "@/lib/utils"

export function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<"personal" | "team">("personal")

  return (
    <div className="space-y-6">
      {/* 标签切换 */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("personal")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "personal"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          个人知识库
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeTab === "team"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          团队知识库
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === "personal" ? <PersonalKnowledgeBase /> : <TeamKnowledgeBase />}
    </div>
  )
}
