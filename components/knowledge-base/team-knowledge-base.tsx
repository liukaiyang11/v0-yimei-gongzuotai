"use client"

import { useState } from "react"
import { Plus, Search, Calendar, FileText, Folder, MoreHorizontal, Upload, ArrowLeft, X, ChevronRight, ChevronDown } from 'lucide-react'
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

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

interface KnowledgeBase {
  id: string
  name: string
  children?: KnowledgeFolder[]
}

interface KnowledgeFolder {
  id: string
  name: string
  type: "folder"
}

const mockKnowledgeBases: KnowledgeBase[] = [
  { id: "1", name: "工作知识库", children: [] },
  { id: "2", name: "学习知识库", children: [] },
  { id: "3", name: "周报管理知识库", children: [] },
  {
    id: "4",
    name: "产品思维管理知识库",
    children: [{ id: "4-1", name: "知识库1", type: "folder" }],
  },
]

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
  {
    id: "3",
    name: "文档文件夹",
    type: "folder",
    creator: "张三",
    createTime: "2025-09-28 10:05:00",
    fileCount: 5,
  },
]

export function TeamKnowledgeBase() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [creatorQuery, setCreatorQuery] = useState("")
  const [dateRange, setDateRange] = useState("")
  
  const [createKnowledgeBaseDialog, setCreateKnowledgeBaseDialog] = useState(false)
  const [createFolderDialog, setCreateFolderDialog] = useState(false)
  const [uploadFileDialog, setUploadFileDialog] = useState(false)
  const [renameDialog, setRenameDialog] = useState(false)
  const [moveDialog, setMoveDialog] = useState(false)
  const [copyDialog, setCopyDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [viewDialog, setViewDialog] = useState(false)
  
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("")
  const [folderName, setFolderName] = useState("")
  const [newName, setNewName] = useState("")
  const [visibility, setVisibility] = useState("all")
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [permissionLevel, setPermissionLevel] = useState("edit")
  const [expandedKnowledgeBases, setExpandedKnowledgeBases] = useState<string[]>([])
  const [selectedTargetId, setSelectedTargetId] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const isInFolder = currentPath.length > 0
  const currentData = isInFolder ? mockFolderFiles : mockRootFolders

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  const handleCreateKnowledgeBase = () => {
    console.log("Creating knowledge base:", {
      name: knowledgeBaseName,
      visibility,
      selectedDepartments,
      permissionLevel,
    })
    setCreateKnowledgeBaseDialog(false)
    setKnowledgeBaseName("")
    setVisibility("all")
    setSelectedDepartments([])
    setPermissionLevel("edit")
  }

  const handleCreateFolder = () => {
    console.log("Creating folder:", folderName)
    setCreateFolderDialog(false)
    setFolderName("")
  }

  const handleUploadFiles = () => {
    console.log("Uploading files:", uploadedFiles)
    setUploadFileDialog(false)
    setUploadedFiles([])
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedFiles(Array.from(files))
    }
  }

  const handleRename = () => {
    console.log("Renaming item:", selectedItem?.name, "to", newName)
    setRenameDialog(false)
    setNewName("")
    setSelectedItem(null)
  }

  const handleMove = () => {
    console.log("Moving item:", selectedItem?.name, "to", selectedTargetId)
    setMoveDialog(false)
    setSelectedTargetId("")
    setSelectedItem(null)
  }

  const handleCopy = () => {
    console.log("Copying item:", selectedItem?.name, "to", selectedTargetId)
    setCopyDialog(false)
    setSelectedTargetId("")
    setSelectedItem(null)
  }

  const handleDelete = () => {
    console.log("Deleting item:", selectedItem?.name)
    setDeleteDialog(false)
    setSelectedItem(null)
  }

  const toggleKnowledgeBase = (id: string) => {
    setExpandedKnowledgeBases((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const openActionDialog = (action: string, item: KnowledgeItem) => {
    setSelectedItem(item)
    setNewName(item.name)
    
    switch (action) {
      case "view":
        setViewDialog(true)
        break
      case "rename":
        setRenameDialog(true)
        break
      case "move":
        setMoveDialog(true)
        break
      case "copy":
        setCopyDialog(true)
        break
      case "delete":
        setDeleteDialog(true)
        break
    }
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
            onClick={() => isInFolder ? setCreateFolderDialog(true) : setCreateKnowledgeBaseDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isInFolder ? "新建文件夹" : "新建知识库"}
          </Button>
          {isInFolder && (
            <Button variant="outline" onClick={() => setUploadFileDialog(true)}>
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
                      {!isInFolder ? (
                        // Root level - only rename and delete for knowledge bases
                        <>
                          <DropdownMenuItem onClick={() => openActionDialog("rename", item)}>
                            重命名知识库
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => openActionDialog("delete", item)}
                          >
                            删除知识库
                          </DropdownMenuItem>
                        </>
                      ) : item.type === "folder" ? (
                        // Folder - rename, move, delete
                        <>
                          <DropdownMenuItem onClick={() => openActionDialog("rename", item)}>
                            重命名
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openActionDialog("move", item)}>
                            移动
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => openActionDialog("delete", item)}
                          >
                            删除
                          </DropdownMenuItem>
                        </>
                      ) : (
                        // File - view, rename, move, copy, export, delete
                        <>
                          <DropdownMenuItem onClick={() => openActionDialog("view", item)}>
                            查看
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openActionDialog("rename", item)}>
                            重命名
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openActionDialog("move", item)}>
                            移动
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openActionDialog("copy", item)}>
                            复制
                          </DropdownMenuItem>
                          <DropdownMenuItem>导出</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => openActionDialog("delete", item)}
                          >
                            删除
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

      <Dialog open={createKnowledgeBaseDialog} onOpenChange={setCreateKnowledgeBaseDialog}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>新建知识库</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="kb-name" className="text-sm">
                <span className="text-red-500">*</span> 知识库名称：
              </Label>
              <Input
                id="kb-name"
                placeholder="全场景数字资产整合知识库"
                value={knowledgeBaseName}
                onChange={(e) => setKnowledgeBaseName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm">可见范围：</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id="self" />
                  <Label htmlFor="self" className="font-normal cursor-pointer">
                    仅自己可见
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="selected" />
                  <Label htmlFor="selected" className="font-normal cursor-pointer">
                    指定范围可见
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal cursor-pointer">
                    全部成员可见
                  </Label>
                </div>
              </RadioGroup>
              
              {visibility === "selected" && (
                <div className="mt-4 p-6 bg-muted/30 rounded-lg border-2 border-dashed min-h-[200px] flex flex-col items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>
                    <button 
                      className="text-primary hover:underline font-medium"
                      onClick={() => {/* Open department/member selector */}}
                    >
                      选择部门/成员
                    </button>
                  </div>
                </div>
              )}
            </div>

            {visibility === "all" && (
              <div className="space-y-3">
                <Label className="text-sm">操作权限：</Label>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <RadioGroup value={permissionLevel} onValueChange={setPermissionLevel} className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="edit" id="edit" />
                          <Label htmlFor="edit" className="font-medium cursor-pointer">
                            可编辑
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          创建并管理已新建的文件夹/文档
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manage" id="manage" />
                          <Label htmlFor="manage" className="font-medium cursor-pointer">
                            可管理
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          管理知识库配置、权限及所有文件夹/文档
                        </p>
                      </div>
                      
                      <div className="space-y-1 p-3 bg-primary/5 rounded-md border-l-4 border-primary">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="view" id="view" />
                          <Label htmlFor="view" className="font-medium cursor-pointer text-primary">
                            仅查看
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          仅浏览内容、无任何编辑管理权限
                        </p>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateKnowledgeBaseDialog(false)}>
              取消
            </Button>
            <Button onClick={handleCreateKnowledgeBase}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createFolderDialog} onOpenChange={setCreateFolderDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>新建文件夹</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="请在此输入文件夹名称"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateFolderDialog(false)}>
              取消
            </Button>
            <Button onClick={handleCreateFolder}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadFileDialog} onOpenChange={setUploadFileDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>上传文档</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  点击或拖拽文件到此处上传
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  支持 PDF、Word、Excel、PPT、TXT 等格式
                </p>
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">已选择文件：</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadFileDialog(false)}>
              取消
            </Button>
            <Button onClick={handleUploadFiles} disabled={uploadedFiles.length === 0}>
              确定上传
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>详情</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4 overflow-y-auto">
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-lg">{selectedItem?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      【法宝引证码】CLI.1.5308630
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-8">中华人民共和国仲裁法(2025修订)</h2>
                
                <div className="space-y-3 text-left max-w-2xl mx-auto bg-muted/30 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">制定机关：</span>
                      <span className="text-primary">全国人大常委会</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">发文字号：</span>
                      <span>中华人民共和国主席令第54号</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">公布日期：</span>
                      <span>2025.09.12</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">施行日期：</span>
                      <span>2026.03.01</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">时效性：</span>
                      <span className="text-primary">尚未施行</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">效力位阶：</span>
                      <span className="text-primary">法律</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <span className="text-muted-foreground">法规类别：</span>
                    <span className="text-primary ml-2">调解与仲裁</span>
                    <span className="text-primary ml-2">营商环境优化</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewDialog(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={renameDialog} onOpenChange={setRenameDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === "folder" 
                ? (isInFolder ? "文件夹重命名" : "重命名知识库")
                : "文档重命名"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={selectedItem?.name}
            />
            {selectedItem?.type === "file" && (
              <p className="text-sm text-red-500">请勿输入次，数字、字母及下划线经外的内容</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog(false)}>
              取消
            </Button>
            <Button onClick={handleRename}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={moveDialog} onOpenChange={setMoveDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>移动至</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg max-h-[400px] overflow-y-auto">
              {mockKnowledgeBases.map((kb) => (
                <div key={kb.id} className="border-b last:border-b-0">
                  <div className="flex items-center space-x-2 p-3 hover:bg-muted/50">
                    <Checkbox
                      id={`kb-${kb.id}`}
                      checked={selectedTargetId === kb.id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTargetId(kb.id)
                          if (!expandedKnowledgeBases.includes(kb.id)) {
                            toggleKnowledgeBase(kb.id)
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => toggleKnowledgeBase(kb.id)}
                      className="flex items-center flex-1 space-x-2"
                    >
                      {kb.children && kb.children.length > 0 ? (
                        expandedKnowledgeBases.includes(kb.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )
                      ) : (
                        <div className="w-4" />
                      )}
                      <Folder className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{kb.name}</span>
                    </button>
                  </div>
                  {expandedKnowledgeBases.includes(kb.id) && kb.children && (
                    <div className="pl-8 bg-muted/30">
                      {kb.children.map((folder) => (
                        <div key={folder.id} className="flex items-center space-x-2 p-3 hover:bg-muted/50">
                          <Checkbox
                            id={`folder-${folder.id}`}
                            checked={selectedTargetId === folder.id}
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedTargetId(folder.id)
                            }}
                          />
                          <Folder className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{folder.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveDialog(false)}>
              取消
            </Button>
            <Button onClick={handleMove} disabled={!selectedTargetId}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={copyDialog} onOpenChange={setCopyDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>复制至</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg max-h-[400px] overflow-y-auto">
              {mockKnowledgeBases.map((kb) => (
                <div key={kb.id} className="border-b last:border-b-0">
                  <div className="flex items-center space-x-2 p-3 hover:bg-muted/50">
                    <Checkbox
                      id={`copy-kb-${kb.id}`}
                      checked={selectedTargetId === kb.id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTargetId(kb.id)
                          if (!expandedKnowledgeBases.includes(kb.id)) {
                            toggleKnowledgeBase(kb.id)
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => toggleKnowledgeBase(kb.id)}
                      className="flex items-center flex-1 space-x-2"
                    >
                      {kb.children && kb.children.length > 0 ? (
                        expandedKnowledgeBases.includes(kb.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )
                      ) : (
                        <div className="w-4" />
                      )}
                      <Folder className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{kb.name}</span>
                    </button>
                  </div>
                  {expandedKnowledgeBases.includes(kb.id) && kb.children && (
                    <div className="pl-8 bg-muted/30">
                      {kb.children.map((folder) => (
                        <div key={folder.id} className="flex items-center space-x-2 p-3 hover:bg-muted/50">
                          <Checkbox
                            id={`copy-folder-${folder.id}`}
                            checked={selectedTargetId === folder.id}
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedTargetId(folder.id)
                            }}
                          />
                          <Folder className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{folder.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCopyDialog(false)}>
              取消
            </Button>
            <Button onClick={handleCopy} disabled={!selectedTargetId}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              确定要删除 "{selectedItem?.name}" 吗？此操作无法撤销。
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              确定删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
