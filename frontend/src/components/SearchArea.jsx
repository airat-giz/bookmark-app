import './styles/SearchArea.css';
import React from 'react'
import { Link } from 'react-router-dom'


const SearchArea = ({setSearchText, handleColumnChange, searchColumns, searchText, filter_map}) => {
        
    return (
        <div className="search-area">
            <input  type="text"
                    className="search-area-input"
                    placeholder="Search..." 
                    value={searchText} 
                    onChange={e => setSearchText(e.target.value)} />

            {filter_map.map((filter_data) => {
                return <button type="button"
                               key={Object.keys(filter_data)} 
                               className={searchColumns.includes(Object.values(filter_data).toString()) ?
                                            "search-area-filter-btn-toggled" : 
                                            "search-area-filter-btn"}
                               onClick={() => handleColumnChange(Object.values(filter_data).toString())}>{Object.keys(filter_data)}
                        </button>
            })}

            <Link className="search-area-create-btn" to="/create">Create bookmark</Link>
        </div>
    )
}

export default SearchArea
