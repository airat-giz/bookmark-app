import React, { useState } from 'react';
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import { handleLogin } from '../APIActions';
import { useDataContext } from '../contexts/DataContext';
import { useUserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router';

//form-components
import CustomTextInput from '../form-components/CustomTextInput';


const initialValues = {
    email: '',
    password: '',
}

const LoginForm = () => {
    
    let history = useHistory();
    const {fetchData} = useDataContext()
    const {setIsAuthenticated} = useUserContext()

    return (
        <div>
          <Formik
           initialValues={initialValues}
           validationSchema={yup.object().shape({
                email: yup.string()
                          .email('Must be valid email')
                          .required('Email is required'),
                password: yup.string().required('Password is required'),
           })}
           
           onSubmit={async(values) => {
               try {
                const loginData = await handleLogin(values)
                if (loginData.statusText === "OK" && loginData.status === 200) {
                    await fetchData()
                    await setIsAuthenticated(true)
                    history.push('/app')
                } else if (loginData.statusText === "Unauthorized" && loginData.status === 401) {
                    alert(loginData.data.detail)
                }
               } catch (error) {
                   throw console.error();
               }

          }}
          >
                  <Form>
                        <div className="login-form">                   
                            <CustomTextInput
                                placeholder="Enter email"
                                label="Email"
                                name="email"
                                type="email"/>
                        
                            <CustomTextInput
                                placeholder="Enter password"
                                label="Password"
                                name="password"
                                type="password"/>

                            <button className="login-btn" type="submit">LOGIN</button>
                        </div> 
                  </Form>
              
          </Formik>  
        </div>
    )
}

export default LoginForm
