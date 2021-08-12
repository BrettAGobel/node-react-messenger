import React, {useState, useEffect} from "react";
import axios from "axios";

const Messages = () => {

const [messages, setMessages] = useState('')


function onSubmit(e) {
    e.preventDefault()
    setMessages([e.target.name] = e.target.value)
    axios.post('/messages', messages)


    }


return (
    <div>
        <div className='received-messages'>
            <p></p>
        </div>

        <div className='post-messages'>
            <form onSubmit={onSubmit} method='post' action='/messages'>
                <label htmlFor='post-message' />
                <input type='text' name='post-message' value='message' onChange={event => setMessages(event.target.value)}/>
                <button>Send Message</button>
            </form>
        </div>

    </div>

)


}


export default Messages