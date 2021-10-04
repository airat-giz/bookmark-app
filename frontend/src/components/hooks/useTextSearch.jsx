import {useState} from 'react'

function useTextSearch(data) {
    
    const filter_map = [
        {Title: "title"},
        {Notes: "notes"},
        {Url: "url"},
        {Date: "date_added"}
    ]

    const [searchText, setSearchText] = useState("")
    const [searchColumns, setSearchColumns] = useState(["title"])

    function handleColumnChange(column) {
        if (searchColumns.includes(column)) {
            setSearchColumns(searchColumns.filter((searchColumn) => {
                return searchColumn !== column;
            }))
        } 
        else {
            return setSearchColumns([...searchColumns, column]);
        } 
    }

    function searchByText(data) {
        if (searchText === "" || searchColumns.length < 1) {
        return data;
        }
        else {
            return data.filter((bookmark) => {
            return searchColumns.some((column) => {
                return bookmark[column].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
            })
        })
    }}

    const filteredData = searchByText(data);

    return {filteredData, filter_map, searchText, setSearchText, searchColumns, handleColumnChange}
}

export default useTextSearch
