"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface DataTableProps<T> {
  data: T[]
  columns: {
    key: Extract<keyof T, string>
    label: string
    render?: (item: T) => React.ReactNode
  }[]
  onCreate?: (item: T) => Promise<void>
  onUpdate?: (id: string, item: Partial<T>) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  renderForm?: (item: T | null, onSubmit: (item: T) => void) => React.ReactNode
  itemsPerPage?: number
  userList?: { id: string; name: string }[] // Nueva propiedad para la lista de usuarios
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  renderForm,
  itemsPerPage = 10,
  userList,
}: DataTableProps<T>) {
  // Remove local state for items and filteredItems
  // const [items, setItems] = useState<T[]>(data)
  // const [filteredItems, setFilteredItems] = useState<T[]>(data)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filtering is now done directly on the data prop
  const filteredItems = Array.isArray(data)
    ? data.filter((item) =>
        columns.some((column) =>
          String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, data, columns])

  const handleCreate = async (item: T) => {
    await onCreate?.(item)
    // No local state update; parent will update data prop
  }

  const handleUpdate = async (id: string, item: Partial<T>) => {
    await onUpdate?.(id, item)
    // No local state update; parent will update data prop
  }

  const handleDelete = async (id: string) => {
    await onDelete?.(id)
    // No local state update; parent will update data prop
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Dialog open state for Add Item
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">Add Item</Button>
          </DialogTrigger>
          <DialogContent className="bg-[url('/assets/images/bgb.jpg')] bg-repeat bg-[length:100px_100px] bg-opacity-5 text-white">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            {renderForm?.(null, async (newItem) => {
              console.log('DataTable create newItem:', newItem);
              if (userList) {
                //@ts-ignore
                const selectedUser = userList.find((user) => user.id === newItem.userId)
                if (selectedUser) {
                  await handleCreate({ ...newItem, user: selectedUser } as T)
                }
              } else {
                await handleCreate(newItem)
              }
              setAddDialogOpen(false); // Close dialog after create
            })}
          </DialogContent>
        </Dialog>
        <Input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-white-200 border-b border-black text-black"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-black">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="text-black-300">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-black-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((item) => (
            <TableRow key={item.id} className="border-b border-black">
              {columns.map((column) => (
                <TableCell key={String(column.key)} className="text-black-300">
                  {column.render ? column.render(item) : String(item[column.key])}
                </TableCell>
              ))}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2 text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[url('/assets/images/bgb.jpg')] bg-repeat bg-[length:100px_100px] bg-opacity-5 text-white">
                    <DialogHeader>
                      <DialogTitle>Edit Item</DialogTitle>
                    </DialogHeader>
                    {renderForm?.(editingItem, (updatedItem) => handleUpdate(item.id, updatedItem))}
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={`page-${i + 1}`}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem key="next">
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

