import React, {useState, useEffect} from "react";
import axios from "axios";
import Messages from "./Messages";
import  { io } from 'socket.io-client'

const Post = ({socket}) => {

const [value, setValue] = useState({value: ''})



    // useEffect(() => {
    //   fetch("http://localhost:3001/messages")
    //       .then(res => res.json())
    //       .then(info => setData(info))
    //
    // }, [])


    async function onSubmit(event) {
    event.preventDefault()
    await socket.emit('message', value.value)
        setValue('')




}





return (




        <div >
            <form className='post-messages' onSubmit={event => onSubmit(event)} method='post' action='/messages'>
                <label htmlFor='post-message' />
                <input type='text' name='post-message' id='post-input' onChange={event => setValue({value: event.target.value})}/>
                <button id='send-message'>Send Message</button>
            </form>
        </div>




)


}


export default Post