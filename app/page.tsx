'use client'
import NewToDo from "@/components/new-todo";
import SearchBar from "@/components/search-bar";
import { ToDoTable } from "@/components/todo-table";
import TimeTable from "@/components/ttf-table";
import { useState, useEffect } from "react";
import { ToDo } from "./interfaces/to-do";
import useFilters from "./hooks/useFilters";
import { Metrics } from "./interfaces/metrics";


interface toDoData {
  content: ToDo[],
  totalPages: number,

}

export default function Home() {
  const [toDoData, setToDoData] = useState<toDoData>();
  const {filters, setFilters}= useFilters()
  const [lastId, setLastId]= useState<Number>(100)
  const [metrics, setMetrics]=useState<Metrics>()


  const fetchData= async() => {
    const params= new URLSearchParams(filters) 
    const response = await fetch(`http://localhost:9090/api/todos?${params}`)
    console.log(response)
    const result= await response.json()
    console.log(result)
    setToDoData(result)
    setLastId(result.list[result.list.length-1].id)
    console.log("last id", result.list[result.list.length-1].id)
  }
  useEffect(()=> {
    fetchData()
  }, [filters])

  useEffect(()=> {
    const fetchMetrics= async() => {
      const response = await fetch(`http://localhost:9090/api/metrics`)
      console.log(response)
      const result= await response.json()
      console.log("Metrics",result)
      setMetrics(result)
    }
    fetchMetrics()
  }, [toDoData])

  const handleSearch = (name: string, priority: string, state: string) => {
    setFilters((prev)=> ({
      ...prev,
      name,
      priority,
      status:state
    }))
  }

  const handleClear=() =>{
    setFilters((prev)=> ({
      ...prev,
      name: "",
      priority: "",
      status:""})
    )}

  const handlePageChange = (newPage: number) => {
    setFilters((prev)=> ({
      ...prev,
      page: newPage.toString()
  }))
    
  }

  return (

    <div>      
      <SearchBar onSearch={handleSearch} onClear={handleClear}/>
      <NewToDo lastId={lastId} fetchFunction={fetchData}/>
      {toDoData && <ToDoTable toDos={toDoData.content} onPageChange={handlePageChange} totalPages={toDoData.totalPages} fetchFunction={fetchData}/>}
      <TimeTable metrics={metrics}/>
    </div>
  
  );
}
