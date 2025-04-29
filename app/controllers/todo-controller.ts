
import { ToDo } from "../interfaces/to-do"
import { Metrics } from "../interfaces/metrics"

export async function fetchTodos(filters: URLSearchParams) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos?${filters}`)
    return await response.json()
}

export async function fetchMetrics() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics`)
    return await response.json()
}

export async function createTodo(payload: Partial<ToDo>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    return await response.json()
}

export async function updateTodo(payload: Partial<ToDo>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateToDo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    return await response.json()
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.ok
}

export async function markTodoDone(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/done/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.ok
}

export async function markTodoUndone(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/undone/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.ok
} 