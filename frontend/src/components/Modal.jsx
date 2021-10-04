import React from 'react'
import BookmarkForm from './forms/BookmarkForm'


const Modal = ({modalRef, handleClickOutside, handleCreate, handleUpdate, setShowModal, allTags, categories, editData}) => {
    return (
        <div className="modal-background" ref={modalRef} onClick={handleClickOutside}>
            <div className="modal-container">
                <BookmarkForm allTags={allTags}
                              categories={categories}
                              handleCreate={handleCreate}
                              handleUpdate={handleUpdate}
                              editData={editData}/>
               {/* <button onClick={() => setShowModal(false)}>close</button> */}
            </div>
        </div>
    )
}

export default Modal
