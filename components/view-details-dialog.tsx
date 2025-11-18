'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ViewDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: { name: string }
}

export function ViewDetailsDialog({
  open,
  onOpenChange,
  item,
}: ViewDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px]">
        <DialogHeader>
          <DialogTitle>详情</DialogTitle>
        </DialogHeader>
        <div className="max-h-[600px] overflow-y-auto py-4">
          <div className="border-b pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  法规
                </div>
                <span className="font-medium">计法律专家库</span>
              </div>
              <span className="text-sm text-muted-foreground">
                【法宝引证码】CLI.1.5308630
              </span>
            </div>
          </div>

          <h2 className="text-center text-xl font-semibold mb-8">
            中华人民共和国仲裁法(2025修订)
          </h2>

          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">制定机关:</span>
              <a href="#" className="text-blue-600 hover:underline">
                全国人大常委会
              </a>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">发文字号:</span>
              <span>中华人民共和国主席令第54号</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">公布日期:</span>
              <span>2025.09.12</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">施行日期:</span>
              <span>2026.03.01</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">时效性:</span>
              <a href="#" className="text-blue-600 hover:underline">
                尚未施行
              </a>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">效力位阶:</span>
              <a href="#" className="text-blue-600 hover:underline">
                法律
              </a>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <span className="text-muted-foreground">法规类别:</span>
              <div className="flex gap-2">
                <a href="#" className="text-blue-600 hover:underline">
                  调解与仲裁
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  营商环境优化
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              2017-2025对照
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              2009-2017编注
            </a>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              1994-2009编注
            </a>
          </div>

          <div className="mt-8 text-center">
            <h3 className="font-medium mb-2">中华人民共和国主席令</h3>
            <p className="text-sm text-muted-foreground">(第五十四号)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
