import React, {useState, useEffect} from "react";
import axios from "axios";
import Messages from "./Messages";

const Post = () => {

const [messages, setMessages] = useState({value: ''})
const [data, setData] = useState()


    useEffect(() => {
      fetch("/messages")
          .then(res => res.json())
          .then(info => setData(info))

    }, [])


async function onSubmit(event) {
    event.preventDefault()
    // setMessages([event.target.name] = event.target.value)
    const postResponse = await axios.post('/messages', messages)
    setData(postResponse.data)


}





return (

    <div>


        <div className='post-messages'>
            <form onSubmit={event => onSubmit(event)} method='post' action='/messages'>
                <label htmlFor='post-message' />
                <input type='text' name='post-message' onChange={event => setMessages({value: event.target.value})}/>
                <button>Send Message</button>
            </form>
        </div>
        {!data ? "loading messages": <Messages data={data}/>}

    </div>

)


}


export default Post