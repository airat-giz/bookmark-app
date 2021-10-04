import React from 'react'
import {useFilterContext} from './contexts/FilterContext'


const CategoryList = ({categories}) => {
    const {filterExists, setFilters, toggleFilter, Group} = useFilterContext();

    return (
        <div className='category-area'>
            
            <p className="category-area-label">Categories</p>
            <div className="category-list">
                {categories.map((category) => {
                    return <button className={(filterExists(category.title, Group.CATEGORY)) ? "category-btn category-toggled" : "category-btn"}                               key={category.id} 
                                onClick={() =>
                                    toggleFilter(
                                    category.title,
                                    Group.CATEGORY,
                                    (bookmark) => bookmark.category.id === category.id
                                    )
                                }>{category.title}</button> 
                })}
            </div>

        </div>
    )
}

export default CategoryList
