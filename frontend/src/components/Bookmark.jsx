import './styles/Bookmark.css'
import { BsArrowsExpand } from 'react-icons/bs'
import { BsX } from 'react-icons/bs';
import React from 'react'
import { Link } from 'react-router-dom'
import { deleteBookmark } from './APIActions'
import { useDataContext } from './contexts/DataContext'

const Bookmark = ({bookmark, toggle, selected}) => {
    const {id, title, url, notes, category, tags, date_added} = bookmark
    const { fetchData } = useDataContext()

    function handleDelete(id) {
        deleteBookmark(id)
        .then(fetchData)
        .catch((error) => {
            console.log(error.response.status);
            console.log(error.response.headers);
    })
    }

    return (
        <>
        {selected !== id ? 
        
        <div className="bookmark">
           <a href={url} className="bookmark-title" rel="noopener noreferrer" target="_blank">{title}</a>
           <p className="bookmark-category">{category.title}</p>
           <div className="bookmark-tags">
               {tags.map(tag => <p className="tag" key={tag.id}>{tag.title}</p>)}
           </div>
           <p className="bookmark-date">{date_added.slice(0, 10).split('-').reverse().join('-') }</p>
           
           <div className="bookmark-actions">
               <button className="bookmark-delete-btn" onClick={() => handleDelete(id)}>Delete</button>
               <Link className="bookmark-edit-btn" to={"/edit/" + id}>Edit</Link>
               <button className="bookmark-toggle-btn" onClick={() => toggle(id)}><BsArrowsExpand /></button> 
            </div>        
        </div>
        
        
        : 
        
        <div className="bookmark-toggled">
            <p>Title: <a href={url} className="bookmark-title-toggled" rel="noopener noreferrer" target="_blank">{title}</a></p>
            <BsX className="toggle-icon" onClick={() => toggle(id)} />
            <p className="bookmark-date-toggled">Date: {date_added.slice(0, 10).split('-').reverse().join('-') }</p>
            <p className="bookmark-category-toggled">Category: {category.title}</p>
            <div className="bookmark-tags-toggled">
                <p>Tags: </p>
               {tags.map(tag => <p className="tag" key={tag.id}>{tag.title}</p>)}
            </div>
            <p>Notes:</p>
            <p className="bookmark-notes-toggled">{notes}</p>
            <div className="bookmark-toggled-actions">
                <button className="bookmark-toggled-delete-btn" onClick={() => handleDelete(id)}>Delete</button>
                <Link className="bookmark-toggled-edit-btn" to={"/edit/" + id}>Edit</Link>
            </div>
        </div>
        
        }   
        </>
    )
}

export default Bookmark
