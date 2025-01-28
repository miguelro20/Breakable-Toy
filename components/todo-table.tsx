import { ToDo } from "@/app/interfaces/to-do"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { Check, ChevronLeft, ChevronRight, X} from "lucide-react"
import { useState } from "react"
import { Label } from "./ui/label"
  
interface ToDoTableProps{
  toDos:ToDo[], 
  onPageChange:(currentPage:number)=> void, 
  currentPage: number, 
  totalPages: number
}

  export function ToDoTable({toDos, onPageChange, currentPage, totalPages}: ToDoTableProps) {

    const [isOpen, setIsOpen]= useState(false)

    const handleDelete = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:9090/api/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
  
        if (!response.ok) {
          throw new Error('Failed to delete');
        }
        alert('Item deleted successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting item');
      }
    };


    console.log('this is the to do data', toDos)
    return (
      <div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Done</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toDos.map((toDo:ToDo ) => (
            <TableRow key={toDo.id}>
              <TableCell>{toDo.status ? <Check/> : <X/>}</TableCell>
              <TableCell>{toDo.name}</TableCell>
              <TableCell>{toDo.priority}</TableCell>
              <TableCell className="text-right">{toDo.dueDate}</TableCell>
              <TableCell className="items-start">
                <Button variant={"link"} >Update</Button>
                {/* {isOpen &&
        <UpdateModal   />
            } */}
                <Button variant={"link"} onClick={()=> handleDelete(toDo.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>Page {currentPage}</TableCell>
        <TableCell className="text-right">
          <Button onClick={()=>onPageChange(currentPage-1)} 
          disabled={currentPage === 0}
          >
            <ChevronLeft/>
          </Button>
          <Label> {currentPage+1} </Label>
          <Button onClick={()=> onPageChange(currentPage+1)} 
          disabled={currentPage === totalPages-1}
          >
          <ChevronRight/>
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
      </Table>
      </div>
    )
  }
  