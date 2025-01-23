'use client'

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Label } from "./ui/label";;
  import { useState, useEffect } from "react";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [priority, setPriority]= useState("All")
  const [state, setState]= useState("All")

    return (
        <div className="bg-red-900">
            <div className="flex ">            
            <Label htmlFor="text" className="text-xl text-white">Name</Label>
            <Input type="text" placeholder="text" className="ml-2 p-2 text-center rounded-md bg-white"/>
            </div>
            <div className="flex flex-row bg-blue-700">
                <div className="flex flex-col">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Priority: {priority}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Choose a Priority</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
                        <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="High">High</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Medium">Medium</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Low">Low</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">State: {state}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Choose a State</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={state} onValueChange={setState}>
                        <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Done">Done</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="UnDone">UnDone</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
                <Button size='lg' className="flex bg-slate-200 text-black justify-end">Search</Button>
            </div>
        </div>
    )
}