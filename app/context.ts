import { createContext, Dispatch, SetStateAction } from 'react';
import { FilterAttributes } from './interfaces/filter-attributes';

interface FiltertContextContent {
    filters: FilterAttributes,
    setFilters: Dispatch<SetStateAction<FilterAttributes>>
}
export const FilterContext= createContext<FiltertContextContent>({
    filters:{
        name: '',
        status:'',
        priority:'',
        page:"0",
        size: "10",
        sortBy:'id',
        sortDir:'asc'
      },
    setFilters: ()=>{}
})