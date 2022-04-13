import React, {useState, useEffect, useRef} from "react";


const Messages = ({socket, currentRoom, setRoom}) => {


    const [messages, setMessages] = useState([])
    const [currentSide, setSide] = useState('message-container-right')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

// was trying to get messages to go back and forth.  might work on this later for 1 to 1 connection but in allChat it doesn't matter

// const leftOrRight = (currentSide) => {
    //     let newSide;
    //     (currentSide === 'message-container-right')
    //         ? newSide = 'message-container-left'
    //         : newSide = 'message-container-right';
    //     setSide(newSide)
    // }

// useEffect(() =>{
//     leftOrRight(currentSide)
// },[])


useEffect(() => {

    socket.on('greeting', greeting => {
        let temp = messages
        temp.push(greeting)
        setMessages([...temp])
        scrollToBottom()
    })


    socket.on('message', message => {
        setRoom(message.targetRoom)
        let temp = messages
        temp.push(message)
        setMessages([...temp])
        scrollToBottom()

    })

}, [socket])

// private message supposed to make its own room between the two sockets.  But for my implementation It's better to manually create a room
//     socket.on('private message', (privateMessage) => {
//         console.log(`From: ${privateMessage.socketId}\n Message: ${privateMessage.value}`)
//     })
//
// }, [socket])


    if (messages.length >= 1) {
            return (
                <div className='message-container'>
                    {messages.map(messageObj => {
                        return (
                            <>
                                <div className='message-content-container'>
                                    <span id='sender'>{messageObj.user}</span>
                                    <span id='message-content'>{messageObj.messageText}</span>
                                </div>
                                <div ref={messagesEndRef}></div>
                            </>
                        )
                    })}
                </div>
            )

    } return null

}





export default Messages


// this way of using useEffect is kinda crazy
// the first log will log nothing, because "newMessages" hasn't been returned yet
// once "newMessages" is returned once, "setMessages" is triggered with a value, setting the state and triggering a rerender
// after the re-render the callback passed to "setMessages" runs
// callbacks passed to "setState" will run *immediately after the render, triggered by setting a new state
// the callback is then run with the parameter that was the value passed to setState last time
// we now understand that value as the "prevMessage"
// we take this "prevMessage" value and spread it into a fresh "newMessages" object
// once it is spread and re-instantiated? it can simply take a new property, which is the sockets id, taken from the message object returned from the server push
// this new property is assigned a value, which is the entire message, here including the socket id again
// problem here is that after establishing an id as a key in the obj, it will replace the old value of message with the new one...
// how can i add multiple messages to the same object from the same user?
// the cycle continues and is triggered by a client "emitting" a message
// the "prevMessage" variable is persisted through renders until a socket is changed and useEffect can run again fresh



// useEffect(() => {
//
//
//     const messageListener = (message) => {
//         setMessages((prevMessages) => {
//             const newMessages = {...prevMessages};
//             console.log(newMessages)
//             newMessages[message.id] = message.message;
//             return newMessages;
//         });
//     };
//
//
//     socket.on('message', messageListener);
//     socket.emit('getMessages') ;
//
// }, [socket]);

// useEffect(() => {
//     const messageListener = (message) => {
//         setMessages(prevMessages => {
//             const newMessages = {...prevMessages}
//             newMessages[message.id] = message;
//             console.log(newMessages)
//
//         })
//     }
//     socket.on('chatMessage', messageListener)
//     // socket.emit('getMessages')
// }
//         );
// const newMessages = {...prevMessages};
// newMessages[message.id] = message;
// return newMessages;


// useEffect(() => {
//     const messageListener = (message) => {
//         setMessages((prevMessages) => {}