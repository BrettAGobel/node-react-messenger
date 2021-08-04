import React, {useState, useEffect} from "react";


const Login = () => {
    return (
        <div>
           <form>
               <label htmlFor='username'>Username</label>
               <input type='text' name='username' value='username'/>
               <label htmlFor='password'>Password</label>
               <input type='text' name='password' value='password'/>
           </form>

        </div>


    )




}



export default Login