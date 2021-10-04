import React from 'react'

// Components
import BookmarkList from '../components/BookmarkList';
import Sidebar from '../components/Sidebar';

// Hooks
import useApplyFilters from './hooks/useApplyFilters';
import useGetCategoriesAndTags from './hooks/useGetCategoriesAndTags';

// Contexts
import {useDataContext} from './contexts/DataContext';
import {useFilterContext} from './contexts/FilterContext'


const BookmarkApp = () => {
    
    const {bookmarks, handleDelete} = useDataContext()
    const {filters, Group} = useFilterContext();
    const filterData = useApplyFilters(bookmarks, filters, Group);
    const categoriesByData = useGetCategoriesAndTags().sortCategoriesByData(filterData)
    const tagsByCategory = useGetCategoriesAndTags().sortTagsByCategory(filterData)

    return (
        <div className="bookmark-app">
            <Sidebar tags={tagsByCategory}
                     categories={categoriesByData}/>
               
            <BookmarkList filterData={filterData}
                          handleDelete={handleDelete}/>
        </div>
    )
}

export default BookmarkApp
