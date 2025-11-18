'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: { name: string; type: string }
}

export function DeleteDialog({ open, onOpenChange, item }: DeleteDialogProps) {
  const handleConfirm = () => {
    console.log('Deleting:', item.name)
    onOpenChange(false)
  }

  const getItemType = () => {
    if (item.type === 'knowledgeBase') return '知识库'
    if (item.type === 'folder') return '文件夹'
    return '文件'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>删除{getItemType()}</DialogTitle>
          <DialogDescription>
            确定要删除 "{item.name}" 吗？此操作无法撤销。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            确定删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
