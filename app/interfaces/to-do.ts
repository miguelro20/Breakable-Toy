export interface ToDo {
    id: number;
    name:string;
    description:string;
    priority:string;
    status:string;
    dueDate: Date | null;
    doneDate: string | null;
    creationDate:string;
  }