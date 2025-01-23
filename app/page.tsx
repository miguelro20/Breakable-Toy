import NewToDo from "@/components/new-todo";
import SearchBar from "@/components/search-bar";
import TimeTable from "@/components/ttf-table";


export default function Home() {
  return (
    <div>      
      <SearchBar/>
      <NewToDo/>
      <TimeTable/>
    </div>
  
  );
}
