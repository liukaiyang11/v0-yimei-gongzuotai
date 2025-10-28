"use client"

import { useState } from "react"
import { Plus, Search, Calendar, FileText, Folder, MoreHorizontal, Upload, ArrowLeft } from "lucide-react"
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

interface KnowledgeItem {
  id: string
  name: string
  type: "folder" | "file"
  creator?: string
  createTime: string
  fileCount?: number
  wordCount?: number
  status?: "启用" | "禁用"
}

const mockRootFolders: KnowledgeItem[] = [
  {
    id: "1",
    name: "合同审核法律核知识库",
    type: "folder",
    creator: "张三",
    createTime: "2025-09-28 10:01:25",
    fileCount: 0,
  },
  { id: "2", name: "合资项目知识库", type: "folder", creator: "张三", createTime: "2025-09-28 10:00:09", fileCount: 0 },
]

const mockFolderFiles: KnowledgeItem[] = [
  {
    id: "1",
    name: "AI生成合同_2025-9-17",
    type: "file",
    creator: "张三",
    createTime: "2025-09-28 10:10:27",
    wordCount: 1606,
    status: "启用",
  },
  {
    id: "2",
    name: "劳动合同（word范本）",
    type: "file",
    creator: "张三",
    createTime: "2025-09-28 10:10:26",
    wordCount: 1478,
    status: "启用",
  },
]

export function TeamKnowledgeBase() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [creatorQuery, setCreatorQuery] = useState("")
  const [dateRange, setDateRange] = useState("")

  const isInFolder = currentPath.length > 0
  const currentData = isInFolder ? mockFolderFiles : mockRootFolders

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1))
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
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
          {!isInFolder && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="请输入创建人名称"
                value={creatorQuery}
                onChange={(e) => setCreatorQuery(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
          )}
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
          <span>团队知识库</span>
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
              <TableHead>创建者</TableHead>
              <TableHead>创建时间</TableHead>
              {isInFolder ? (
                <>
                  <TableHead>状态</TableHead>
                  <TableHead>字数</TableHead>
                </>
              ) : (
                <TableHead>文件数</TableHead>
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
                <TableCell className="text-muted-foreground">{item.creator}</TableCell>
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
                      <DropdownMenuItem>查看</DropdownMenuItem>
                      <DropdownMenuItem>应用</DropdownMenuItem>
                      <DropdownMenuItem>收藏</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>重命名</DropdownMenuItem>
                      <DropdownMenuItem>移动</DropdownMenuItem>
                      <DropdownMenuItem>复制</DropdownMenuItem>
                      <DropdownMenuItem>导出</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
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
    </div>
  )
}
