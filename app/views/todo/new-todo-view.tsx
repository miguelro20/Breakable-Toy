'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
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
import { createTodo } from "@/app/controllers/todo-controller"
import { NewToDoProps, NewTodoState } from "@/app/interfaces/to-do"

export function NewToDoView({lastId, fetchFunction}: NewToDoProps) {
    const [state, setState] = useState<NewTodoState>({
        isOpen: false,
        name: "",
        description: "",
        priority: "",
        date: undefined
    });

    const newId = +lastId + 1

    const handleToggleModal = () => {
        setState(prev => ({
            ...prev,
            isOpen: !prev.isOpen
        }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            name: e.target.value
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            description: e.target.value
        }));
    };

    const handlePriorityChange = (value: string) => {
        setState(prev => ({
            ...prev,
            priority: value
        }));
    };

    const handleDateChange = (date: Date | undefined) => {
        setState(prev => ({
            ...prev,
            date
        }));
    };

    const handleUpload = async () => {
        const payload = {
            id: newId,  
            name: state.name,
            description: state.description,
            priority: state.priority,
            status: "false",
            dueDate: state.date,
            creationDate: new Date().toISOString(),
        };

        try {
            await createTodo(payload);
            alert("To Do created");
            handleToggleModal();
            fetchFunction();
        } catch (error) {
            console.error('Error:', error);
            alert("Error creating To Do");
        }
    };
    
    return (
        <div>
            {!state.isOpen ? 
                <Button 
                    data-testid="new-todo-button" 
                    onClick={handleToggleModal} 
                    className="flex ml-4 items-center gap-2"
                >
                    <Check/>New To Do
                </Button>
                :
                <Dialog open={state.isOpen} onOpenChange={handleToggleModal}>
                    <DialogContent className="max-w-md p-6">
                        <Card className="p-4">
                            <DialogTitle className="text-xl font-bold mb-4">Create a New ToDo</DialogTitle>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="text" className="text-lg text-black">Name</Label>
                                <Input 
                                    type="text" 
                                    placeholder="Enter Name" 
                                    className="p-2 text-center rounded-md bg-white" 
                                    onChange={handleNameChange}
                                    value={state.name}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description" className="text-lg text-black">Description</Label>
                                <Input 
                                    type="text" 
                                    placeholder="Enter Description (max 120 chars.)" 
                                    className="p-2 text-center rounded-md bg-white" 
                                    onChange={handleDescriptionChange} 
                                    maxLength={120}
                                    value={state.description}
                                />
                                <p className="text-sm text-gray-500">{state.description.length}/120 characters</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Priority: {state.priority}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={state.priority} onValueChange={handlePriorityChange}>
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
                                    selected={state.date}
                                    onSelect={handleDateChange}
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