import React, {useState} from 'react';
import { useDataContext } from './contexts/DataContext';
import PropagateLoader from "react-spinners/PropagateLoader";

//components
import Bookmark from './Bookmark';
import SearchArea from './SearchArea';
import SortingArea from './SortingArea';

//hooks
import useTextSearch from './hooks/useTextSearch';
import useDataSort from './hooks/useDataSort';


const BookmarkList = ({filterData, handleDelete}) => {
    
    const { isLoading } = useDataContext()
    const [selected, setSelected] = useState(null);
    const {sortedData, handleSortChange, sortingField, ascOrder} = useDataSort(filterData)
    const {filteredData, filter_map, searchText, setSearchText, searchColumns, handleColumnChange} = useTextSearch(sortedData)
    
    const toggle = (i) => {
        selected === i ? setSelected(null) : setSelected(i)
    }

    return (
        <div className="bookmark-section">
            <SearchArea setSearchText={setSearchText}
                        searchText={searchText} 
                        handleColumnChange={handleColumnChange}
                        searchColumns={searchColumns}
                        filter_map={filter_map}/>
            
            <SortingArea handleSortChange={handleSortChange} 
                         sortingField={sortingField}
                         ascOrder={ascOrder}/>
            
            <div className='bookmark-list'>
                {(isLoading) ?
                 
                    <div className="loader-spinner">
                        <PropagateLoader color={"#1a768d"} speedMultiplier={1}/> 
                    </div> :

                filteredData.map((bookmark) => {
                    return <Bookmark key={bookmark.id}
                                     bookmark={bookmark}
                                     toggle={toggle} 
                                     selected={selected}
                                     handleDelete={handleDelete}/>
                })
                }
            </div>
        </div>
    ) 
}

export default BookmarkList
