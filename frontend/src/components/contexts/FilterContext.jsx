import {createContext, useContext} from 'react'
import useGetFilters from '../hooks/useGetFilters'

export const FilterContext = createContext()

export const FilterContextProvider = (props) => {
    const {setFilters, filterExists, toggleFilter, filters, Group} = useGetFilters();

    return (
        <FilterContext.Provider value={{setFilters, filterExists, toggleFilter, filters, Group}}>
            {props.children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => useContext(FilterContext)

export default FilterContextProvider