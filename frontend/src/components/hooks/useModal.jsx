import {useState, useRef, useEffect, useCallback} from 'react'

function useModal() {
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef()

    function handleClickOutside(e) {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback((e) => {
        if (e.key === "Escape" && showModal) {
            setShowModal(false)
            }
        },
        [setShowModal, showModal])
    
    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    return {showModal, setShowModal, handleClickOutside, modalRef}
}

export default useModal
