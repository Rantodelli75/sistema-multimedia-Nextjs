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
  columns: { key: keyof T; label: string }[]
  onCreate: (item: T) => Promise<void>
  onUpdate: (id: string, item: Partial<T>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  renderForm: (item: T | null, onSubmit: (item: T) => void) => React.ReactNode
  itemsPerPage?: number
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  renderForm,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [items, setItems] = useState<T[]>(data)
  const [filteredItems, setFilteredItems] = useState<T[]>(data)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const filtered = items.filter((item) =>
      columns.some((column) => String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredItems(filtered)
    setCurrentPage(1)
  }, [searchTerm, items, columns])

  const handleCreate = async (item: T) => {
    await onCreate(item)
    setItems((prevItems) => [...prevItems, item])
  }

  const handleUpdate = async (id: string, item: Partial<T>) => {
    await onUpdate(id, item)
    setItems((prevItems) =>
      prevItems.map((prevItem) => (prevItem.id === id ? ({ ...prevItem, ...item } as T) : prevItem)),
    )
  }

  const handleDelete = async (id: string) => {
    await onDelete(id)
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">Add Item</Button>
          </DialogTrigger>
          <DialogContent className="bg-[url('/assets/images/bgb.jpg')] bg-repeat bg-[length:100px_100px] bg-opacity-5 text-white">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            {renderForm(null, handleCreate)}
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
                  {String(item[column.key])}
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
                    {renderForm(editingItem, (updatedItem) => handleUpdate(item.id, updatedItem))}
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

