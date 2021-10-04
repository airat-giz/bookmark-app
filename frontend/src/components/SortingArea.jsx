import './styles/SortingArea.css'
import { BsArrowUp } from 'react-icons/bs'
import React from 'react'

const SortingArea = ({handleSortChange, sortingField, ascOrder}) => {
    return (
        <div className="sorting-area">
            <div className="sorting-area-label-btn" onClick={() => handleSortChange("title")}>
                Title 
                {sortingField === "title" ? <BsArrowUp className={ascOrder === true ? "sorting-area-icon" : "sorting-area-icon-desc"} /> : null}
            </div>
            <div className="sorting-area-label-btn" onClick={() => handleSortChange("category")}>
                Category
                {sortingField === "category" ? <BsArrowUp className={ascOrder === true ? "sorting-area-icon" : "sorting-area-icon-desc"} /> : null}
                </div>
            <div className="sorting-area-label-btn" onClick={() => handleSortChange("tags")}>
                Tags
                {sortingField === "tags" ? <BsArrowUp className={ascOrder === true ? "sorting-area-icon" : "sorting-area-icon-desc"} /> : null}
            </div>
            <div className="sorting-area-label-btn" onClick={() => handleSortChange("date")}>
                Date
                {sortingField === "date" ? <BsArrowUp className={ascOrder === true ? "sorting-area-icon" : "sorting-area-icon-desc"} /> : null}
            </div>
            <div className="sorting-area-label">Actions</div>
        </div>
    )
}

export default SortingArea
