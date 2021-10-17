

import React, {useState, useEffect} from "react";
import './App.css';
import Login from "./Login";
import Post from "./Post";
import { io } from 'socket.io-client'
import socketClient  from "socket.io-client"
import  openSocket  from 'socket.io-client'
import Messages from "./Messages";
import axios from "axios";
import jwt from "jsonwebtoken"

function App() {




const [socket, setSocket] = useState()
const [loggedStatus, setLoggedStatus] = useState(false)
const [currentUser, setCurrentUser] =useState('')


    useEffect(()=> {
        async function validateToken() {
        console.log(loggedStatus)
        if (window.localStorage.token) {
            //need to then re-validate token
            let token = localStorage.getItem('token')
            let payload = jwt.decode(token)
            let user = payload.userName

            setCurrentUser(user)
            await axios.post('/validateToken', {token: localStorage.token})
            // setLoggedStatus(true)

        }
        }
        validateToken().then(success => {
            const newSocket = io('http://localhost:3001', {})
            setSocket(newSocket)
        })
    }, [loggedStatus])

  // useEffect(() => {
  //   fetch("/messages")
  //       .then(res => res.json())
  //       .then(info => setData(info))
  //
  // }, [])

// function messageMap (messageData) {
//
//     messageData.map(obj => {
//         return (
//
//             <>
//             <p>{obj.userId}</p>
//             <p>{obj.username}</p>
//             <p>{obj.messageText}</p>
//             </>
//         )
//
//     })
// }



  return (
    <div className="App">
      <div className="main">
        {/*{users ? <Messages messageText={data.messageText} /> : <Login />}*/}
          {loggedStatus === false ? <Login setSocket={newSocket => {setSocket(newSocket)}} socket={socket} setLoggedStatus={setLoggedStatus}/> : null}
          {socket ? (<><div className='message-module'><div className='messages-main'>
                <Messages socket={socket} currentUser={currentUser}/>

          </div> <Post socket={socket} currentUser={currentUser}/></div></>) : (<div>"not connected"</div>)}


      </div>
    </div>
  );
}

export default App;
