import React from 'react'
import {useFilterContext} from './contexts/FilterContext'


const TagList = ({tags}) => {
   
    const {filterExists, toggleFilter, Group} = useFilterContext();

    return (
        <div className="tag-area">
            <p className="tag-area-label">Tags</p>
            <div className="tag-list">
            {tags.map((tag) => {
                return <div className={(filterExists(tag.title, Group.TAG)) ? "tag-btn tag-toggled" : "tag-btn"}
                            key={tag.id}
                            onClick={() =>
                                toggleFilter(
                                  tag.title,
                                  Group.TAG,
                                  (bookmark) => bookmark.tags.map(tag => tag.id).indexOf(tag.id) !== -1
                                )
                              }>{tag.title}</div> 
            })}
            </div>
        </div>
    )
}

export default TagList
