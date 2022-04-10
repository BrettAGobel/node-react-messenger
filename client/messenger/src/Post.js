import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Messages from "./Messages";
import  { io } from 'socket.io-client'

const Post = ({socket, currentUser, value, setValue, currentRoom}) => {


const postInputRef = useRef(null)


    async function onSubmit(event) {
    event.preventDefault()
    await socket.emit('message', {messageText: value.value, user: currentUser, userSocket: socket.id, messageTarget: 'socket address', targetRoom: currentRoom })
        postInputRef.current.value = ''
        setValue('')

}


return (

        <div className='post-container'>
            <form className='post-messages' onSubmit={event => onSubmit(event)} >
                <label htmlFor='post-message' />
                <input type='text' name='post-message' id='post-input' onChange={event => setValue({value: event.target.value})} ref={postInputRef}/>
                <button id='send-message'>Send Message</button>
            </form>
        </div>

        )

}


export default Post