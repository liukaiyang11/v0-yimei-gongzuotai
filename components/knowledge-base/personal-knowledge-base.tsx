"use client"

import { useState } from "react"
import { Plus, Search, Calendar, FileText, Folder, MoreHorizontal, Upload, ArrowLeft, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface KnowledgeItem {
  id: string
  name: string
  type: "folder" | "file"
  createTime: string
  fileCount?: number
  wordCount?: number
  status?: "启用" | "禁用"
}

const mockRootFolders: KnowledgeItem[] = [
  { id: "1", name: "产品思维管理知识库", type: "folder", createTime: "2025-09-28 10:00:45", fileCount: 0 },
  { id: "2", name: "周报管理知识库", type: "folder", createTime: "2025-09-28 10:00:22", fileCount: 0 },
  { id: "3", name: "学习知识库", type: "folder", createTime: "2025-09-25 18:05:16", fileCount: 3 },
  { id: "4", name: "工作知识库", type: "folder", createTime: "2025-09-25 18:05:07", fileCount: 0 },
]

const mockFolderFiles: KnowledgeItem[] = [
  {
    id: "1",
    name: "AI生成合同_2025-9-17",
    type: "file",
    createTime: "2025-09-28 10:10:59",
    wordCount: 1606,
    status: "启用",
  },
  {
    id: "2",
    name: "劳动合同（word范本）",
    type: "file",
    createTime: "2025-09-28 10:10:47",
    wordCount: 1478,
    status: "启用",
  },
  { id: "3", name: "合同文档", type: "file", createTime: "2025-09-28 10:10:47", wordCount: 411, status: "启用" },
  { id: "4", name: "知识库1", type: "folder", createTime: "2025-09-28 10:10:30", fileCount: 2 },
]

type DialogType = 
  | "create" 
  | "rename" 
  | "move" 
  | "copy" 
  | "delete" 
  | "view"
  | null

interface TreeNode {
  id: string
  name: string
  type: "folder"
  children?: TreeNode[]
}

const mockKnowledgeTree: TreeNode[] = [
  { id: "1", name: "工作知识库", type: "folder" },
  { id: "2", name: "学习知识库", type: "folder" },
  { id: "3", name: "周报管理知识库", type: "folder" },
  {
    id: "4",
    name: "产品思维管理知识库",
    type: "folder",
    children: [{ id: "4-1", name: "知识库1", type: "folder" }],
  },
]

export function PersonalKnowledgeBase() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("")
  
  const [dialogType, setDialogType] = useState<DialogType>(null)
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [selectedTreeNodes, setSelectedTreeNodes] = useState<string[]>([])
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["4"])

  const isInFolder = currentPath.length > 0
  const currentData = isInFolder ? mockFolderFiles : mockRootFolders

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  const openDialog = (type: DialogType, item?: KnowledgeItem) => {
    setDialogType(type)
    setSelectedItem(item || null)
    setInputValue(item?.name || "")
    setSelectedTreeNodes([])
  }

  const closeDialog = () => {
    setDialogType(null)
    setSelectedItem(null)
    setInputValue("")
    setSelectedTreeNodes([])
  }

  const handleConfirm = () => {
    console.log("[v0] Dialog confirmed:", dialogType, inputValue, selectedTreeNodes)
    closeDialog()
  }

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
    )
  }

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const isSelected = selectedTreeNodes.includes(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id}>
        <div
          className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded cursor-pointer"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {hasChildren && (
            <button onClick={() => toggleNode(node.id)} className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
            </button>
          )}
          {!hasChildren && <span className="w-4" />}
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedTreeNodes([node.id])
              } else {
                setSelectedTreeNodes([])
              }
            }}
          />
          <Folder className="w-4 h-4 text-blue-500" />
          <span className="text-sm">{node.name}</span>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isInFolder && (
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
          )}
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => openDialog("create")}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isInFolder ? "新建文件夹" : "新建知识库"}
          </Button>
          {isInFolder && (
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              上传文档
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={isInFolder ? "文件名/文档关键词" : "请输入知识库名称"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>开始日期</span>
            <span>至</span>
            <span>结束日期</span>
          </div>
        </div>
      </div>

      {/* 面包屑导航 */}
      {currentPath.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>个人知识库</span>
          {currentPath.map((path, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span>›</span>
              <span>{path}</span>
            </div>
          ))}
        </div>
      )}

      {/* 数据表格 */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>{isInFolder ? "文件夹/文档名称" : "知识库名称"}</TableHead>
              {isInFolder ? (
                <>
                  <TableHead>创建时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>字数</TableHead>
                </>
              ) : (
                <>
                  <TableHead>创建时间</TableHead>
                  <TableHead>文件数</TableHead>
                </>
              )}
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {item.type === "folder" ? (
                      <Folder className="w-5 h-5 text-blue-500" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-500" />
                    )}
                    <span
                      className={item.type === "folder" ? "cursor-pointer hover:text-primary" : ""}
                      onClick={() => item.type === "folder" && handleFolderClick(item.name)}
                    >
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.createTime}</TableCell>
                {isInFolder ? (
                  <>
                    <TableCell>
                      {item.status && (
                        <Badge variant={item.status === "启用" ? "default" : "secondary"}>{item.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.wordCount?.toLocaleString()}</TableCell>
                  </>
                ) : (
                  <TableCell className="text-muted-foreground">{item.fileCount}</TableCell>
                )}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {isInFolder ? (
                        // Inside folder: different menus for folders vs files
                        item.type === "folder" ? (
                          <>
                            <DropdownMenuItem onClick={() => openDialog("rename", item)}>重命名</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog("move", item)}>移动</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => openDialog("delete", item)}>
                              删除
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem onClick={() => openDialog("view", item)}>查看</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog("rename", item)}>重命名</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog("move", item)}>移动</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDialog("copy", item)}>复制</DropdownMenuItem>
                            <DropdownMenuItem>导出</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => openDialog("delete", item)}>
                              删除
                            </DropdownMenuItem>
                          </>
                        )
                      ) : (
                        // Root level: only rename and delete for knowledge bases
                        <>
                          <DropdownMenuItem onClick={() => openDialog("rename", item)}>重命名知识库</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => openDialog("delete", item)}>
                            删除知识库
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 底部提示 */}
      <div className="text-center text-sm text-muted-foreground">没有更多了</div>

      
      {/* Create Dialog */}
      <Dialog open={dialogType === "create"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isInFolder ? "新建文件夹" : "新建知识库"}</DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={isInFolder ? "请在此输入文件夹名称" : "请在此输入知识库名称"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button onClick={handleConfirm}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog open={dialogType === "rename"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {!isInFolder ? "重命名知识库" : selectedItem?.type === "folder" ? "文件夹重命名" : "文档重命名"}
            </DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4">
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            {selectedItem?.type === "file" && (
              <p className="text-xs text-red-500 mt-2">请勿输入空文，数字，，字母及下划线以外的内容</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button onClick={handleConfirm}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={dialogType === "move"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>移动至</DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4 max-h-[400px] overflow-y-auto border rounded-lg">
            {mockKnowledgeTree.map((node) => renderTreeNode(node))}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button onClick={handleConfirm}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Dialog */}
      <Dialog open={dialogType === "copy"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>复制至</DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4 max-h-[400px] overflow-y-auto border rounded-lg">
            {mockKnowledgeTree.map((node) => renderTreeNode(node))}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button onClick={handleConfirm}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={dialogType === "view"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>详情</DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Document Header */}
              <div className="flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-50 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">法律</span>
                  </div>
                  <div>
                    <h3 className="font-medium">计议律专家智库</h3>
                    <p className="text-sm text-muted-foreground">
                      【法宝引证码】CLI.1.5308630
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center py-4">
                <h2 className="text-2xl font-bold">中华人民共和国仲裁法(2025修订)</h2>
              </div>

              {/* Document Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg">
                <div className="flex">
                  <span className="text-muted-foreground w-24">制定机关:</span>
                  <span className="text-blue-600">全国人大常委会</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">发文字号:</span>
                  <span>中华人民共和国主席令第54号</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">公布日期:</span>
                  <span>2025.09.12</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">施行日期:</span>
                  <span>2026.03.01</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">时效性:</span>
                  <span className="text-blue-600">尚未施行</span>
                </div>
                <div className="flex">
                  <span className="text-muted-foreground w-24">效力位阶:</span>
                  <span className="text-blue-600">法律</span>
                </div>
                <div className="flex col-span-2">
                  <span className="text-muted-foreground w-24">法规类别:</span>
                  <span className="text-blue-600">调解与仲裁 营商环境优化</span>
                </div>
              </div>

              {/* Version History */}
              <div className="flex gap-2 text-sm">
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  2017-2025对照
                </Button>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  2009-2017废注
                </Button>
                <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                  1994-2009废注
                </Button>
              </div>

              {/* Document Content */}
              <div className="text-center space-y-4">
                <h3 className="font-bold text-lg">中华人民共和国主席令</h3>
                <p className="text-sm">（第五十四号）</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogType === "delete"} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <button
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              确定要删除 "{selectedItem?.name}" 吗？此操作不可恢复。
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              确定删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
