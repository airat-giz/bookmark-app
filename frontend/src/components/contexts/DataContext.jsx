import React, {createContext, useContext, useState, useEffect} from 'react'
import getBookmarkList, {getCategories, getTags} from '../APIActions'
import axios from 'axios'


export const DataContext = createContext()

export const DataContextProvider = (props) => {
    
    const [bookmarks, setBookmarks] = useState([])
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchData = () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : null
        if (isAuthenticated) {
            setIsLoading(true)
            axios.all([getBookmarkList(), getCategories(), getTags()])
            .then(axios.spread((...response) => {
                setBookmarks(response[0]) 
                setCategories(response[1]) 
                setTags(response[2])
            }))
            .then(() => setIsLoading(false))
            .catch((error) => {
                setIsLoading(false)
                setError(error.response);
            }
            )
        }
      }
  
      useEffect(() => {
          fetchData()
      }, []);

    return (
        <DataContext.Provider value={{error, isLoading, bookmarks, tags, categories, fetchData}}>
            {props.children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)

export default DataContextProvider
