'use client'

import { useState } from 'react'
import { KnowledgeBaseList } from '@/components/knowledge-base-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CreateKnowledgeBaseDialog } from '@/components/create-knowledge-base-dialog'

export default function KnowledgeBasePage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">知识库 - 个人知识库</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            新建知识库
          </Button>
        </div>
        
        <KnowledgeBaseList />
        
        <CreateKnowledgeBaseDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </div>
  )
}
