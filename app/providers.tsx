'use client'

import { useState } from "react"
import { FilterContext } from "./context"
import { FilterAttributes } from "./interfaces/filter-attributes"

export function Providers({ children }: {children: any}) {
      const [filtersInContext,setFiltersInContext]=useState<FilterAttributes>({
        name: '',
        status:'',
        priority:'',
        page:"0",
        size: "10",
        sortBy:'id',
        sortDir:'asc'
      })
    return(
        <FilterContext.Provider value={{filters: filtersInContext, setFilters: setFiltersInContext}}>
            {children}
        </FilterContext.Provider>
    )
}