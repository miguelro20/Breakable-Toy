# To Do Application Frontend 

## Getting Started

### This is a To Do Application which handles the following basic operations:
- View my ToDos
- Update current ToDos
- Create To Dos
- Mark ToDos as Done/Undone

## Technical Aspects
- #### Application created using Next JS, TypeScript, React Context, ShadCN/UI and Jest for testing.
- #### The application developer server runs on port 8080, this can be modified inside the package.json file.
- #### Displayed data comes from the ToDo API, running on http://localhost:9090 .

## Architechture
### Components
#### Custom components are found inside app/components folder. This include:
- ##### NewToDo. The main purpose of this component is creating new ToDos, obtaining the DueDate, the Name, Priority, and Description of the task. This component accepts two parameters, a lastId, to assign Ids to the new ToDo object, and fetchFunction, a function called when a ToDo creation succeeds to update the main ToDoTable, which displays the current ToDos in the DataBase.
- ##### SearchBar. The main functionality of this component is establishing the filters for fetching ToDos, this is done by setting the name and/or priority and/or status in the filters. This component accepts two functions, onSearch and onClear, which determines the behaviour to follow when clicking on the search and clear buttons respectively. 
- ##### ToDoTable. This component is made to display different ToDos in an orderly manner, it displays the ToDo Name, Status, Due Date, Creation Date, and if provided a Completion Date. The component has the ability to update and delete ToDos by clicking on the respective button, plus update their Done/Undone status by checking a box. This component needs an array of ToDos, the fetchFunction, a onPageChange (To hangle page change), and the number of total pages.
- ##### TimeTable. This component is made to display the metrics of the average time to complete different tasks depending on their prority. This component accepts a metrics object, which contains the data to display.
- ##### UpdateModal. This component is triggered from within the ToDoTable, and its purpose is to update the selected ToDo object inside the DataBase. To do so, it handles a PUT request, and accepts the ToDo object, isOpen which is a boolean value to open the modal, onClose a function to be triggered on close of the modal, fetchFunction a function that refetches the data within the ToDoTable if the PUT request was successful.

---

### Hooks
#### Hooks are found inside app/hooks and include:
- ##### useFilters. This hook is used to access the value and function established within the FilterContext. The hook returns the State Variable filters and its setter setFilters, to be used anywhere needed.

---

### Interfaces
#### Interfaces are found inside /app/interfaces and define the different interfaces of objects used in the application, such as:
- ##### ToDo: {id: number; name:string; description:string; priority:string; status:string; dueDate: Date | null; doneDate: string | null; creationDate:mstring; }
- ##### Metrics: {totalAverage: Number, highAverage: Number, mediumAverage: Number, lowAverage: Number}
- ##### FilterAttributes: {name: string; status: string; priority: string; page: string; size: string; sortBy: string; sortDir: string;}

### Context
#### The context is established inside /app, and consists of:
- ##### context.ts Where the filters context is created.
- ##### providers.ts Where the context is wrapped inside providers function.
- ##### layout.tsx Where the context is used so it is consistent across the app.

### Integration
#### All components, hooks and context are used in /app/page.tsx, the main page of the application. This component uses the filters within the context to call the api that fetches a list of ToDos and values from the backend, along with their metrics. This data is then used to render the custom components. The functions for changing pages, handling close of modals, and data fetching are defined within this document.