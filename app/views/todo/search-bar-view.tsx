'use client'

import { Button } from "@/components/ui/button";
import { SearchBarProps } from "@/app/interfaces/to-do";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function SearchBarView({onSearch, onClear}: SearchBarProps) {
    const [priority, setPriority]= useState("")
    const [state, setState]= useState("")
    const [name, setName]= useState("")

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSearch = () => {
        onSearch(name, priority, state);
    };

    const handleClear = () => {
        onClear();
        setPriority("");
        setName("");
        setState("");
    };

    const getStateLabel = () => {
        if (state === "True") return "Done";
        if (state === "False") return "UnDone";
        return "";
    };

    return (
        <div data-testid="search-bar" className="border border-gray-300 rounded-md rounded-md p-4">
            <div className="flex gap-4">
                <div className="flex flex-col w-1/4 ">            
                    <Label htmlFor="text" className="text-lg text-black mb-1">Name</Label>
                    <Input 
                        type="text" 
                        placeholder="Enter Name" 
                        className="p-2 text-center rounded-md bg-white border border-gray-300" 
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <div className="flex gap-4">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">State: {getStateLabel()}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Choose a State</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={state} onValueChange={setState}>
                                    <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="True">Done</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="False">UnDone</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            size='lg' 
                            className="flex bg-slate-200 text-black justify-end" 
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                        <Button 
                            size='lg' 
                            className="flex bg-slate-200 text-black justify-end" 
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 