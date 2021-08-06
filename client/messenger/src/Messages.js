import React, {useState, useEffect} from "react";


const Messages = (data) => {

const [messages, setMessages] = useState('')


function onSubmit(e, messages) {
    e.preventDefault()


    }


return (
    <div>
        <div className='received-messages'>
            <p>{data}</p>
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