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