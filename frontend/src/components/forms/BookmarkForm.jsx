import '../styles/BookmarkForm.css';
import PropagateLoader from "react-spinners/PropagateLoader";
import {BsX} from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import { useDataContext } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { getBookmark, createBookmark, updateBookmark } from '../APIActions';
import { useHistory } from 'react-router';


//form-components
import CustomTextInput from '../form-components/CustomTextInput';
import CustomTextareaInput from '../form-components/CustomTextareaInput';
import CategorySelect from '../form-components/CategorySelect';
import TagsSelect from '../form-components/TagsSelect';


const URL = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const BookmarkForm = (props) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const history = useHistory()
    
    const initialState = {
        title: '',
        url: '',
        notes: '',
        category: {},
        tags: [],
        author: user.id
    }
    
    const [initialValues, setInitialValues] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const {tags, categories, fetchData} = useDataContext()

    async function fetchBookmark(id) {
        try {
            setIsLoading(true)
            const response = await getBookmark(id)
            setInitialValues({
                title: response.title,
                url: response.url,
                notes: response.notes,
                category: response.category,
                tags: response.tags,
                author: response.author
            })
            setIsLoading(false);
        } catch(error) {
            setError(error);
            setIsLoading(false)
            console.log(error)
          };
      };
    
    useEffect(() => {
        if (props.match.path === "/edit/:id") {
            fetchBookmark(props.match.params.id)
        } else {
            setInitialValues(initialState)
        }
    }, [])

    const categoryOptions = categories.map(category => {
        return ({label: category.title, value: category.id})
    })
    const tagsOptions = tags.map(tag => {
        return ({label: tag.title, value: tag.id})
    })

    return (
        <div>
          <Formik
           enableReinitialize={true}
           initialValues={initialValues}

           validationSchema={yup.object().shape({
                title: yup.string()
                          .min(3, 'Must be 3 - 100 characters')
                          .max(100, 'Must be 3 - 100 characters or less')
                          .required('Title is required'),
                url: yup.string().url('Input correct URL adress. URL must contain "https://" or "http://"').required('Url is required'),
                notes: yup.string().max(1000, 'Must be 1000 characters or less'),
                category: yup.object().shape({
                    id: yup.string(),
                    title: yup.string()
                              .min(3, 'Must be 3 - 50 characters')
                              .max(50, 'Must be 3 - 50 characters')
                              .required('Category is required')}),
                tags: yup.array().of(yup.object().shape({
                    id: yup.number(),
                    title: yup.string()
                                .min(3, 'Must be 3 - 20 characters')
                                .max(20, 'Must be 3 - 20 characters')}
                ))
           })}
           
           onSubmit={(values) => {
               if (props.match.path === "/edit/:id") {
                   updateBookmark(props.match.params.id, values)
                   .then(fetchData)
                   .then(history.push('/app'))
                   .catch((error) => {
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    })
                } else { 
                   createBookmark(values)
                   .then(setInitialValues(initialState))
                   .then(fetchData)
                   .then(history.push('/app'))
                   .catch((error) => {
                        console.log(error.response.status);
                        console.log(error.response.headers);
                })
          }}}
          >    
                  <Form>
                        <div className="bookmark-form">
                        
                        {(isLoading) ? 
              
                            <div className="bookmark-loader-spinner">
                                <PropagateLoader color={"#1a768d"} speedMultiplier={1}/> 
                            </div> :
                        
                        <>
                            <h1 className="bookmark-form-title">
                                {(props.match.path === "/edit/:id") ? "Edit bookmark" : "Create bookmark"}
                            </h1>
                            
                            <Link to="/app">
                                <BsX className="exit-icon" />
                            </Link>

                            <CustomTextInput
                                placeholder="Enter title" 
                                label="Title"
                                name="title"
                                type="text"/>
                        
                            <CustomTextInput
                                placeholder="Enter URL"
                                label="Url"
                                name="url"
                                type="text"/>

                            <CategorySelect
                                label="Category" 
                                name="category"
                                options={categoryOptions}/>

                            <TagsSelect 
                                label="Tags"
                                name="tags"
                                options={tagsOptions}/>
                        
                            <CustomTextareaInput
                                placeholder="Enter description"
                                label="Description"
                                name="notes"
                                type="textarea"/>

                            <button className="bookmark-form-submit-btn" type="submit">Submit</button>
                            <button className="bookmark-form-reset-btn" type="reset">Reset</button>
                            <Link to="/app"><button className ="bookmark-form-home-btn">Home</button></Link>
                        </>
                        }
                        </div>
                  </Form>
          </Formik>  
        </div>
    )
}

export default BookmarkForm
