import { ToDo } from "@/app/interfaces/to-do"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, X} from "lucide-react"
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import UpdateModal from "./update-modal"
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
  
interface ToDoTableProps{
  toDos:ToDo[], 
  onPageChange:(currentPage:number)=> void, 
  totalPages: number
  fetchFunction: ()=>void
}
  export function ToDoTable({toDos, onPageChange, totalPages, fetchFunction}: ToDoTableProps) {


    const [isModalOpen, setIsModalOpen]= useState(false)
    const[selectedToDo, setSelectedToDo]= useState<ToDo|null>()||(null)
    const {filters, setFilters}= useFilters()
    const currentPage= Number(filters.page)
    const [sortBy, setSortBy]=useState("id")


    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
      setSelectedToDo(null)
    };

    const handleSortBy=() =>{
      setFilters((prev)=> ({
        ...prev,
        sortBy})
      )
    }

    useEffect(()=> {
        handleSortBy()
      }, [sortBy])

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
        fetchFunction()
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting item');
      }
    };


    const handleToDoDone = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:9090/api/done/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
  
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        alert('Great, you completed a task!!');
        fetchFunction()
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating status');
      }
    };

    const handleToDoUnDone = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:9090/api/undone/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
  
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        alert('Status Updated');
        fetchFunction()
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating status');
      }
    };

    console.log('this is the to do data', toDos)
    return (
      <div>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>Done</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead >Due Date</TableHead>
            <TableHead>Done Date</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">SortBy: {sortBy}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" >
                    <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="id">Id</DropdownMenuRadioItem>
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
            <TableRow key={toDo.id}>
              <TableCell>{toDo.status ? <Checkbox checked onCheckedChange={()=>handleToDoUnDone(toDo.id)}/> : <Checkbox onCheckedChange={()=>handleToDoDone(toDo.id)}/>}</TableCell>
              <TableCell>{toDo.name}</TableCell>
              <TableCell>{toDo.priority}</TableCell>
              <TableCell >{toDo.creationDate.toString()}</TableCell>
              {toDo.dueDate? <TableCell >{toDo.dueDate.toString()}</TableCell>:<TableCell ><X/></TableCell>}
              <TableCell >{toDo.doneDate ? <div>{toDo.doneDate.toString()}</div>: <X/>}</TableCell>
              <TableCell >
                <Button variant={"link"} onClick={()=>{setSelectedToDo(toDo);setIsModalOpen(true); console.log("toDo sent", toDo)}}>Update</Button>
                <Button variant={"link"} onClick={()=> handleDelete(toDo.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
      <TableRow>
        <TableCell colSpan={6} className="text-center">
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
      {(selectedToDo && isModalOpen) && <UpdateModal todo={selectedToDo} isOpen={isModalOpen} onClose={toggleModal} fetchFunction={fetchFunction}/>}
      </div>
    )
  }
  