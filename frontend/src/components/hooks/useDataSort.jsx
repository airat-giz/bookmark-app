import {useState} from 'react'

function useDataSort(data) {
    const [sortingField, setSortingField] = useState("")
    const [ascOrder, setAscOrder] = useState(false)
    
    function handleSortChange(string) {
        if (sortingField === string) {
            setAscOrder(prev => !prev)
        }
        else { 
            setSortingField(string);
            setAscOrder(true)
        }
    }

    function compare(a, b) {
        if (sortingField === "title") {
            var sort_a = a.title.toLowerCase()
            var sort_b = b.title.toLowerCase()
        }
        else if (sortingField === "category") {
            var sort_a = a.category.title.toLowerCase()
            var sort_b = b.category.title.toLowerCase()
        }
        else if (sortingField === "date") {
            var sort_a = a.date_added.toLowerCase()
            var sort_b = b.date_added.toLowerCase()
        }
        else if (sortingField === "tags") {
            var sort_a = a.tags.length
            var sort_b = b.tags.length
        }
        
        if (sort_a !== sort_b) {
            let comparison = 0
            if (sort_a > sort_b) {
                comparison = 1
            }
            else if (sort_a < sort_b) {
                comparison = -1
            }
            if (ascOrder === true) {
                return comparison
            }
            else return comparison * -1
        }
        else return 0
    }


    function dataSorting(data, sortingField) {
        if (sortingField === "") {
            return data;
        }
        else if (sortingField !== "") {
            return data.sort(compare)
        }
    }

    const sortedData = dataSorting(data, sortingField);

    return {sortedData, handleSortChange, sortingField, ascOrder};
}

export default useDataSort
