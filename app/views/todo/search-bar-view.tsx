'use client'

import { Button } from "@/components/ui/button";
import { SearchBarProps, SearchBarState } from "@/app/interfaces/to-do";
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
    const [state, setState] = useState<SearchBarState>({
        priority: "",
        state: "",
        name: ""
    });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            name: e.target.value
        }));
    };

    const handlePriorityChange = (value: string) => {
        setState(prev => ({
            ...prev,
            priority: value
        }));
    };

    const handleStateChange = (value: string) => {
        setState(prev => ({
            ...prev,
            state: value
        }));
    };

    const handleSearch = () => {
        onSearch(state.name, state.priority, state.state);
    };

    const handleClear = () => {
        setState({
            priority: "",
            state: "",
            name: ""
        });
        onClear();
    };

    const getStateLabel = () => {
        if (state.state === "True") return "Done";
        if (state.state === "False") return "UnDone";
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
                        value={state.name}
                    />
                </div>
                <div>
                    <div className="flex gap-4">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">State: {getStateLabel()}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Choose a State</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={state.state} onValueChange={handleStateChange}>
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