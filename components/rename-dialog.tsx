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
import { Input } from '@/components/ui/input'

interface RenameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: { name: string; type: string }
}

export function RenameDialog({ open, onOpenChange, item }: RenameDialogProps) {
  const [name, setName] = useState(item.name)
  const [error, setError] = useState('')

  const handleConfirm = () => {
    // Validation
    if (name.includes('~') || name.includes('*') || name.includes('/')) {
      setError('请勿输入空格、数字、字母及下划线以外的内容')
      return
    }
    
    console.log('Renaming to:', name)
    setError('')
    onOpenChange(false)
  }

  const getTitle = () => {
    if (item.type === 'file') return '文档重命名'
    if (item.type === 'folder') return '文件夹重命名'
    return '重命名'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            className={error ? 'border-red-500' : ''}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
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
