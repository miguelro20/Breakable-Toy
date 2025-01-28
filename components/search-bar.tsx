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

export default function SearchBar({onSearch}) {
  const [priority, setPriority]= useState("")
  const [state, setState]= useState("")
  const [name, setName]= useState("")

    return (
        <div className="border border-gray-300 rounded-md justify-center">
            <div className="flex w-1/4 ">            
            <Label htmlFor="text" className="text-lg text-black">Name</Label>
            <Input type="text" placeholder="Enter Name" className="ml-2 p-2 text-center rounded-md bg-white" onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className="flex flex-row mt-2">
                <div className="flex flex-col">
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
                        <Button variant="outline">State: {state}</Button>
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
                <Button size='lg' className="flex bg-slate-200 text-black justify-end" onClick={()=>onSearch(name, priority, state)}>Search</Button>
            </div>
        </div>
    )
}