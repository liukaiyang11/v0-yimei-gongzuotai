'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Folder } from 'lucide-react'

interface MoveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: { name: string }
}

const knowledgeBases = [
  { id: '1', name: '工作知识库', children: [] },
  { id: '2', name: '学习知识库', children: [] },
  { id: '3', name: '周报管理知识库', children: [] },
  {
    id: '4',
    name: '产品思维管理知识库',
    children: [{ id: '4-1', name: '知识库1' }],
  },
]

export function MoveDialog({ open, onOpenChange, item }: MoveDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['4']))

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleConfirm = () => {
    console.log('Moving to:', selectedId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>移动至</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto py-4">
          {knowledgeBases.map((kb) => (
            <div key={kb.id}>
              <div className="flex items-center gap-2 py-2">
                {kb.children.length > 0 && (
                  <button
                    onClick={() => toggleExpand(kb.id)}
                    className="flex h-4 w-4 items-center justify-center"
                  >
                    <svg
                      className={`h-3 w-3 transition-transform ${
                        expandedIds.has(kb.id) ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
                {kb.children.length === 0 && <div className="w-4" />}
                <Checkbox
                  checked={selectedId === kb.id}
                  onCheckedChange={() => setSelectedId(kb.id)}
                />
                <Folder className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{kb.name}</span>
              </div>
              {expandedIds.has(kb.id) &&
                kb.children.map((child) => (
                  <div key={child.id} className="ml-8 flex items-center gap-2 py-2">
                    <Checkbox
                      checked={selectedId === child.id}
                      onCheckedChange={() => setSelectedId(child.id)}
                    />
                    <Folder className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{child.name}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm}>确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
