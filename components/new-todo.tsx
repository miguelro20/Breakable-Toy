'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"

export default function NewToDo({lastId, fetchFunction}:{lastId: Number, fetchFunction: ()=>void}) {
    const [isOpen, setIsOpen]= useState(false)
    const [name, setName]= useState("")
    const [description, setDescription]= useState("")
    const [priority, setPriority]= useState("")
    const [state, setState]= useState("")
    const [date, setDate]= useState<Date>()

    const newId= +lastId +1

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

      const handleUpload = async () => {
        const payload = {
          id: newId,  
          name,
          description,
          priority,
          status: false,
          dueDate: date, 
          creationDate: new Date(),
        };
        
        console.log("payload", JSON.stringify(payload))

        try {
          const response = await fetch('http://localhost:9090/api/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update');
          }
    
          const data = await response.json();
          console.log('Update successful:', data);
          fetchFunction()
        } catch (error) {
          console.error('Error:', error);
          alert("Error creating To Do")
        }
      };
    
    return (
        <div>
            {!isOpen ? 
            <Button onClick={toggleModal}><Check/>New To Do</Button>
            :
            <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent>
              <Card>
            <DialogTitle>Create a New ToDo</DialogTitle>
              <Label htmlFor="text" className="text-lg text-black">Name</Label>
              <Input type="text" placeholder="Enter Name" className="ml-2 p-2 text-center rounded-md bg-white" onChange={(e)=> setName(e.target.value)}/>
              <Label htmlFor="description" className="text-lg text-black">Description</Label>
              <Input type="text" placeholder="Enter Description (max 120 chars.)" className="ml-2 p-2 text-center rounded-md bg-white" onChange={(e)=> setDescription(e.target.value)} maxLength={120}/>
              <p>{description.length}/120 characters</p>
              <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Priority: {priority}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
                        <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            <div className="flex justify-center text-center items-center">
            <Label>Pick a Due Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="flex items-center"
              />
              </div>
          <Button onClick={handleUpload}>Submit</Button>
              </Card>
            </DialogContent>
          </Dialog>
            }
        </div>
    )
}