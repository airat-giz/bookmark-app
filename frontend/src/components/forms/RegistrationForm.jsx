import React from 'react';
import {Formik, Form} from 'formik';
import * as yup from 'yup';

//form-components
import CustomTextInput from '../form-components/CustomTextInput';
import APIactions from '../APIActions';

const passwordValidation = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const RegistrationForm = () => {

    const {userRegistration} = APIactions()

    return (
        <div>
          <Formik
           initialValues={initialValues}

           validationSchema={yup.object().shape({
                firstName: yup.string()
                          .min(2, 'Must be 2 - 30 characters')
                          .max(30, 'Must be 2 - 30 characters or less')
                          .required('First name is required'),
                lastName: yup.string()
                          .min(2, 'Must be 2 - 30 characters')
                          .max(30, 'Must be 2 - 30 characters or less')
                          .required('Last name is required'),
                email: yup.string().email('Must be valid email').required('Email is required'),
                password: yup.string().matches(passwordValidation, 'Password requires minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character').required('Password is required'),
                confirmPassword: yup.string()
                                    .oneOf([yup.ref('password'), null], 'Passwords must match')
                                    .required('Confirmation password is required')
           })}
           
           onSubmit={ async(values) => {
               const data = {first_name: values.firstName,
                             last_name: values.lastName,
                             email: values.email,
                             password: values.password}
               const userData = await userRegistration(data)
               console.log(userData)
          }}
          >
                  <Form>
                      <div className="signup-form">
                        <CustomTextInput
                            placeholder="Enter first name" 
                            label="First name"
                            name="firstName"
                            type="text"/>

                        <CustomTextInput
                            placeholder="Enter last name" 
                            label="Last name"
                            name="lastName"
                            type="text"/>
                    
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

                        <CustomTextInput 
                            placeholder="Confirm password"
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"/>

                        <button className="signup-btn" type="submit">SIGN UP</button>
                        </div>
                  </Form>
              
          </Formik>  
        </div>
    )
}

export default RegistrationForm
