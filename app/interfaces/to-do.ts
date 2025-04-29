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