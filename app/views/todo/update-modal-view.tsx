'use client'

import { ToDo } from "@/app/interfaces/to-do"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
import { useState } from "react"
import { updateTodo } from "@/app/controllers/todo-controller"

interface UpdateModalProps {
    todo: ToDo
    isOpen: boolean
    onClose: () => void
    fetchFunction: () => void
}

export function UpdateModalView({todo, isOpen, onClose, fetchFunction}: UpdateModalProps) {
    const [newPriority, setNewPriority]= useState(todo.priority)
    const [newName, setNewName]= useState(todo.name)
    const [date, setDate]= useState<Date>()

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleUpdate = async () => {
        const payload = {
            id: todo.id,
            name: newName,
            description: todo.description,
            priority: newPriority,
            status: todo.status,
            dueDate: date,
            doneDate: null,
            creationDate: new Date().toISOString(),
        }

        try {
            await updateTodo(payload);
            onClose();
            fetchFunction();
        } catch (error) {
            alert("Error updating To Do");
        }
    };

    return (
        <Dialog data-testid="update-modal" open={isOpen} onOpenChange={onClose} >
            <DialogContent className="max-w-md p-6">
                <Card className="p-4">
                    <DialogTitle className="text-xl font-bold mb-4">Update To Do</DialogTitle>
                    <Label htmlFor="text" className="text-lg text-black">Name</Label>
                    <Input 
                        type="text" 
                        placeholder="Enter Name" 
                        className="p-2 text-center rounded-md bg-white" 
                        onChange={handleNameChange} 
                        value={newName}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Priority: {newPriority}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={newPriority} onValueChange={setNewPriority}>
                                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    <Button onClick={handleUpdate}>Submit</Button>
                </Card>
            </DialogContent>
        </Dialog>
    )
} 