export interface ToDo {
    id: number;
    name:string;
    description:string;
    priority:string;
    status:string;
    dueDate: Date | undefined;
    doneDate: string | null;
    creationDate:string;
}

export interface SearchBarProps {
    onSearch: (name:string, priority:string, state:string)=>void,
    onClear: ()=>void
}

export interface ToDoTableProps {
    toDos:ToDo[], 
    onPageChange:(currentPage:number)=> void, 
    totalPages: number
    fetchFunction: ()=>void
}

export interface NewToDoProps {
    lastId: Number
    fetchFunction: () => void
}

export interface NewTodoState {
    isOpen: boolean;
    name: string;
    description: string;
    priority: string;
    date?: Date;
}

export interface SearchBarState {
    priority: string;
    state: string;
    name: string;
}

export interface UpdateModalProps {
    todo: ToDo
    isOpen: boolean
    onClose: () => void
    fetchFunction: () => void
}

export interface UpdateModalState {
    name: string;
    priority: string;
    date?: Date;
}