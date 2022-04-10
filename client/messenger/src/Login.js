import React, {useState, useEffect} from "react";
import formik, { useFormik } from 'formik'
import axios from "axios";
import { io } from 'socket.io-client'




const Login = ({setSocket, setLoggedStatus, setUserList, socket}) => {




    const validate = values => {

        const errors = {};
        if (!values.userName) {
            errors.userName = 'Required';
        } else if (values.userName.length > 15) {

            errors.userName = 'Must be 15 characters or less';

        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 20) {
            errors.password = 'Must be 20 characters or less';
        }

        // reg-Ex front end validation
        // if (!values.email) {
        //
        //     errors.email = 'Required';
        //
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //
        //     errors.email = 'Invalid email address';
        //
        // }

        return errors;

    };

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',


        },
        validate,

        onSubmit: async (values) => {
            const { userName, password } = values
            const response = await axios.post('/login', {userName, password})
            if (response.data.validatedUser.token) {
                localStorage.setItem('token', response.data.validatedUser.token)
                // supposed to provide a socket only after login
                // * newSocket is point of Socket connection at login, there is second point of socket connection, but after login it doesn't matter for users list because login status is already achieved in the database
                const newSocket = await io('http://localhost:3001')
                setLoggedStatus(1)
                setSocket(newSocket)

            }

        },


    });

    return (
        <div className='login-form'>
            <div className='form-inner'>
           <form onSubmit={formik.handleSubmit} method='post' action='/login'><div>
               <label htmlFor='userName'>userName</label>
               <input type='text' id='userName' name='userName' value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
               {/*{formik.errors.userName ? <div>{formik.errors.userName}</div> : null}*/}
               {formik.touched.userName && formik.errors.userName ? (

                   <div>{formik.errors.userName}</div>

               ) : null}
           </div>
               <div>
               <label htmlFor='password'>Password</label>
               <input type='text' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
               {formik.touched.password && formik.errors.password ? (

                   <div>{formik.errors.password}</div>

               ) : null}
               </div>
               <button type='submit'>Login</button>

           </form>

            </div>
        </div>


    )




}



export default Login