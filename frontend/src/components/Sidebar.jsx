import './styles/Sidebar.css'
import React, {useState} from 'react'
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import CategoryList from './CategoryList'
import TagList from './TagList'
import UserArea from './UserArea'
import { useFilterContext } from './contexts/FilterContext'

const Sidebar = ({tags, categories}) => {
    const [show, setShow] = useState(false)
    const {setFilters} = useFilterContext()


    return (
        <div className={show ? "sidebar" : "sidebar toggle-sidebar"}>
            <div className="sidebar-icon-container" onClick={() => setShow(!show)} >
                <AiOutlineMenuUnfold className={(show) ? "sidebar-icon sidebar-open" : "sidebar-icon"} />
            </div>
            <div className={show ? "sidebar-actions show-sidebar-actions": "sidebar-actions hide-sidebar-actions"}>
            <button type="button"
                    className="filter-reset-btn"
                    onClick={() => setFilters([])}>Reset filters</button>  
                <CategoryList categories={categories}/>

                <TagList tags={tags}/>

                <UserArea />
            </div>
        </div>
    )
}

export default Sidebar
