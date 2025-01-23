'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Check } from "lucide-react"

export default function NewToDo() {
    const [newStatus, setNewStatus]= useState(false)
    return (
        <div>
            {!newStatus ? 
            <Button onClick={() => setNewStatus(true)}><Check/>New To Do</Button>
            :<div></div>
            }
        </div>
    )
}