

import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import Post from "./Post";
import { io } from 'socket.io-client'
import socketClient  from "socket.io-client"
import  openSocket  from 'socket.io-client'
import Messages from "./Messages";
import axios from "axios";

function App() {




const [socket, setSocket] = useState()
const [loggedStatus, setLoggedStatus] = useState()
// const [users, setUsers] =useState()


    useEffect(()=> {
        console.log(loggedStatus)
        if (window.localStorage.token) {
            //need to then re-validate token
            let res = axios.post('/validateToken', {token: localStorage.token})
          // setLoggedStatus(true)
            const newSocket = io('http://localhost:3001')
            setSocket(newSocket)
        }
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
          {loggedStatus === false ? null : <Login setSocket={newSocket => {setSocket(newSocket)}} socket={socket} setLoggedStatus={setLoggedStatus}/>}
          {socket ? (<><div className='message-module'><div className='messages-main'>
                <Messages socket={socket}/>

          </div> <Post socket={socket}/></div></>) : (<div>"not connected"</div>)}


      </div>
    </div>
  );
}

export default App;
