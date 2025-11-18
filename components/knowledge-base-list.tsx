'use client'

import { useState } from 'react'
import { Folder, File, MoreHorizontal, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RenameDialog } from '@/components/rename-dialog'
import { DeleteDialog } from '@/components/delete-dialog'
import { MoveDialog } from '@/components/move-dialog'
import { CopyDialog } from '@/components/copy-dialog'
import { ViewDetailsDialog } from '@/components/view-details-dialog'
import { CreateFolderDialog } from '@/components/create-folder-dialog'

type ItemType = 'knowledgeBase' | 'folder' | 'file'

interface KnowledgeItem {
  id: string
  name: string
  type: ItemType
  children?: KnowledgeItem[]
}

// Mock data
const mockData: KnowledgeItem[] = [
  {
    id: '1',
    name: '工作知识库',
    type: 'knowledgeBase',
    children: []
  },
  {
    id: '2',
    name: '学习知识库',
    type: 'knowledgeBase',
    children: []
  },
  {
    id: '3',
    name: '周报管理知识库',
    type: 'knowledgeBase',
    children: []
  },
  {
    id: '4',
    name: '产品思维管理知识库',
    type: 'knowledgeBase',
    children: [
      {
        id: '4-1',
        name: '知识库1',
        type: 'folder',
        children: [
          {
            id: '4-1-1',
            name: '中华人民共和国仲裁法(2025修订)(FBM~CLI.1.5308630)',
            type: 'file'
          }
        ]
      }
    ]
  }
]

export function KnowledgeBaseList() {
  const [data, setData] = useState<KnowledgeItem[]>(mockData)
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)
  const [dialogType, setDialogType] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['4']))

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleAction = (item: KnowledgeItem, action: string) => {
    setSelectedItem(item)
    setDialogType(action)
  }

  const renderItem = (item: KnowledgeItem, level: number = 0) => {
    const isExpanded = expandedIds.has(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className="select-none">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(item.id)}
              className="flex h-4 w-4 items-center justify-center"
            >
              <svg
                className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          {item.type === 'knowledgeBase' && (
            isExpanded ? <FolderOpen className="h-4 w-4 text-blue-500" /> : <Folder className="h-4 w-4 text-blue-500" />
          )}
          {item.type === 'folder' && <Folder className="h-4 w-4 text-yellow-500" />}
          {item.type === 'file' && <File className="h-4 w-4 text-gray-500" />}
          
          <span className="flex-1 text-sm">{item.name}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {item.type === 'knowledgeBase' && (
                <>
                  <DropdownMenuItem onClick={() => handleAction(item, 'rename')}>
                    重命名知识库
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'delete')} className="text-destructive">
                    删除知识库
                  </DropdownMenuItem>
                </>
              )}
              {item.type === 'folder' && (
                <>
                  <DropdownMenuItem onClick={() => handleAction(item, 'rename')}>
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'move')}>
                    移动
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'delete')} className="text-destructive">
                    删除
                  </DropdownMenuItem>
                </>
              )}
              {item.type === 'file' && (
                <>
                  <DropdownMenuItem onClick={() => handleAction(item, 'view')}>
                    查看
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'rename')}>
                    重命名
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'move')}>
                    移动
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'copy')}>
                    复制
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'export')}>
                    导出
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction(item, 'delete')} className="text-destructive">
                    删除
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {item.children!.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4">
        {data.map(item => renderItem(item))}
      </div>

      {selectedItem && (
        <>
          <RenameDialog
            open={dialogType === 'rename'}
            onOpenChange={(open) => !open && setDialogType(null)}
            item={selectedItem}
          />
          <DeleteDialog
            open={dialogType === 'delete'}
            onOpenChange={(open) => !open && setDialogType(null)}
            item={selectedItem}
          />
          <MoveDialog
            open={dialogType === 'move'}
            onOpenChange={(open) => !open && setDialogType(null)}
            item={selectedItem}
          />
          <CopyDialog
            open={dialogType === 'copy'}
            onOpenChange={(open) => !open && setDialogType(null)}
            item={selectedItem}
          />
          <ViewDetailsDialog
            open={dialogType === 'view'}
            onOpenChange={(open) => !open && setDialogType(null)}
            item={selectedItem}
          />
        </>
      )}
    </div>
  )
}
