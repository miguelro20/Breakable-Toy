'use client'

import { NewToDoView } from "@/app/views/todo/new-todo-view";
import { SearchBarView } from "@/app/views/todo/search-bar-view";
import { ToDoTableView } from "@/app/views/todo/todo-table-view";
import { TimeTableView } from "@/app/views/todo/time-table-view";
import { useState, useEffect } from "react";
import { ToDo } from "./interfaces/to-do";
import useFilters from "./hooks/useFilters";
import { Metrics } from "./interfaces/metrics";
import { fetchMetrics, fetchTodos } from "./controllers/todo-controller";

interface ToDoData {
  content: ToDo[],
  totalPages: number,
}

export default function Home() {
  const [toDoData, setToDoData] = useState<ToDoData>();
  const {filters, setFilters}= useFilters()
  const [lastId, setLastId]= useState<Number>(100)
  const [metrics, setMetrics]=useState<Metrics>()

  const fetchData = async () => {
    const params = new URLSearchParams(Object.entries(filters).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.toString()
    }), {} as Record<string, string>));
    const result = await fetchTodos(params)
    setToDoData(result)
    setLastId(result.list[result.list.length-1].id)
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  useEffect(() => {
    const getMetrics = async () => {
      const result = await fetchMetrics()
      setMetrics(result)
    }
    getMetrics()
  }, [toDoData])

  const handleSearch = (name: string, priority: string, state: string) => {
    setFilters((prev) => ({
      ...prev,
      name,
      priority,
      status: state
    }))
  }

  const handleClear = () => {
    setFilters((prev) => ({
      ...prev,
      name: "",
      priority: "",
      status: ""
    }))
    fetchData()
  }

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage.toString()
    }))
  }

  return (
    <div>      
      <SearchBarView onSearch={handleSearch} onClear={handleClear}/>
      <NewToDoView lastId={lastId} fetchFunction={fetchData}/>
      {toDoData && <ToDoTableView toDos={toDoData.content} onPageChange={handlePageChange} totalPages={toDoData.totalPages} fetchFunction={fetchData}/>}
      <TimeTableView metrics={metrics}/>
    </div>
  );
}
