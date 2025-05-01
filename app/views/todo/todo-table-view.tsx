'use client'

import { ToDo, ToDoTableProps } from "@/app/interfaces/to-do"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X} from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UpdateModalView } from "./update-modal-view"
import useFilters from "@/app/hooks/useFilters"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteTodo, markTodoDone, markTodoUndone } from "@/app/controllers/todo-controller"

export function ToDoTableView({toDos, onPageChange, totalPages, fetchFunction}: ToDoTableProps) {
    const [isModalOpen, setIsModalOpen]= useState(false)
    const[selectedToDo, setSelectedToDo]= useState<ToDo|null>(null)
    const {filters, setFilters}= useFilters()
    const currentPage= Number(filters.page)
    const [sortBy, setSortBy]=useState("id")

    const handleToggleModal = () => {
      setIsModalOpen(!isModalOpen);
      setSelectedToDo(null)
    };

    const handleSortBy = useCallback(() => {
      setFilters((prev)=> ({
        ...prev,
        sortBy
      }))
    }, [sortBy, setFilters])

    const handleUpdateClick = (todo: ToDo) => {
      setSelectedToDo(todo);
      setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
      try {
        const success = await deleteTodo(id);
        if (success) {
          alert('Item deleted successfully!');
          fetchFunction();
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting item');
      }
    };

    const handleToDoDone = async (id: number) => {
      try {
        const success = await markTodoDone(id);
        if (success) {
          alert('Great, you completed a task!!');
          fetchFunction();
        } else {
          throw new Error('Failed to update status');
        }
      } catch {
        alert('Error updating status');
      }
    };

    const handleToDoUnDone = async (id: number) => {
      try {
        const success = await markTodoUndone(id);
        if (success) {
          alert('Status Updated');
          fetchFunction();
        } else {
          throw new Error('Failed to update status');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating status');
      }
    };

    const getDueDateClass = (dueDate: Date | undefined) => {
      if (!dueDate) return "bg-gray-100";
      const daysUntilDue = Math.ceil((new Date(dueDate).getTime() - new Date().getTime())/(1000*60*60*24));
      if (daysUntilDue <= 7) return "bg-red-200";
      if (daysUntilDue <= 14) return "bg-yellow-200";
      return "bg-green-200";
    };

    const getPriorityClass = (priority: string) => {
      switch(priority) {
        case "High": return "bg-red-200";
        case "Medium": return "bg-yellow-200";
        case "Low": return "bg-green-200";
        default: return "bg-gray-100";
      }
    };

    useEffect(()=> {
        handleSortBy()
    }, [sortBy, handleSortBy])

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
      <Table className="w-full border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-300">
            <TableHead className="text-center">Done</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead >Due Date</TableHead>
            <TableHead>Done Date</TableHead>
            <TableHead className="">Actions</TableHead>
            <TableHead>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">SortBy: {sortBy==="id"? "": sortBy}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" >
                    <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="due-date">Due Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toDos.map((toDo:ToDo ) => (
            <TableRow key={toDo.id} className="hover:bg-gray-100">
              <TableCell className="text-center">
                {toDo.status ? 
                  <Checkbox checked={true} onCheckedChange={() => handleToDoUnDone(toDo.id)}/> : 
                  <Checkbox checked={false} onCheckedChange={() => handleToDoDone(toDo.id)}/>
                }
              </TableCell>
              <TableCell>{toDo.name}</TableCell>
              <TableCell className={getPriorityClass(toDo.priority)}>{toDo.priority}</TableCell>
              <TableCell>{toDo.creationDate.toString()}</TableCell>
              {toDo.dueDate ? 
                <TableCell className={getDueDateClass(toDo.dueDate)}>
                  {toDo.dueDate.toString()}
                </TableCell> : 
                <TableCell><X/></TableCell>
              }
              <TableCell>{toDo.doneDate ? <div>{toDo.doneDate.toString()}</div>: <X/>}</TableCell>
              <TableCell>
                <Button variant={"link"} onClick={() => handleUpdateClick(toDo)}>Update</Button>
                <Button variant={"link"} onClick={() => handleDelete(toDo.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <Button 
                onClick={() => onPageChange(currentPage-1)} 
                disabled={currentPage === 0}
              >
                <ChevronLeft/>
              </Button>
              <Label className="text-lg"> {currentPage+1} </Label>
              <Button 
                onClick={() => onPageChange(currentPage+1)} 
                disabled={currentPage === totalPages-1}
              >
                <ChevronRight/>
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {(selectedToDo && isModalOpen) && 
        <UpdateModalView 
          todo={selectedToDo} 
          isOpen={isModalOpen} 
          onClose={handleToggleModal} 
          fetchFunction={fetchFunction}
        />
      }
      </div>
    )
  }