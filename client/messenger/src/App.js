

import React, {useState, useEffect, useMemo} from "react";
import './App.css';
import Login from "./Login";
import Post from "./Post";
import Users from "./Users";
import { io } from 'socket.io-client'
import Messages from "./Messages";
import axios from "axios";
import jwt from "jsonwebtoken"
import Nav from "./Nav";
const bodyParser = require('body-parser')

function App() {



const [value, setValue] = useState({value: ''})
const [socket, setSocket] = useState('')
const [loggedStatus, setLoggedStatus] = useState(0)
const [currentUser, setCurrentUser] = useState('')
const [usersList, setUsersList] = useState([])
const [currentRoom, setRoom] =  useState('')





    useEffect(()=> {

        if (window.localStorage.token && socket === '') {

            try {

            //need to then re-validate token

            let token = localStorage.getItem('token')
            let payload = jwt.decode(token)
            let user = payload.userName

            async function validateToken () {

                let res = await axios.post('/validateToken', {token: localStorage.token, socketId: socket.id}).then(response => {
                    if (response.data.message === 'token is valid') {
                        console.log('token was valid ::)')

                        const newSocket =   io('http://localhost:3001', {})
                        setSocket(newSocket)
                        setLoggedStatus(1)
                        setCurrentUser(user)

                    } else console.log('no token this time')
                })
            }
            validateToken()

            }
            catch (error) {
                return console.log(error)
            }

        }


    }, [socket])


useEffect(()=> {
    if (socket) {
        socket.on('getUser', ()=> {
            console.log('this is the get user event')
            let token = localStorage.getItem('token')
            let payload = jwt.decode(token)
            let user = payload.userName
            socket.emit('clientUser', user)
        })
    }

}, [socket])


  return (
    <div className="App">
      <div className="main">
          {loggedStatus === 0 ? <Login setSocket={newSocket => {setSocket(newSocket)}} socket={socket} setLoggedStatus={setLoggedStatus} /> : null}
          {socket   ?  (
              <>
          <div className='main-container'>
              <Nav setLoggedStatus={setLoggedStatus} socket={socket} setSocket={setSocket} usersList={usersList} setUsersList={setUsersList}  />
              <Users socket = {socket} usersList={usersList} setUsersList={setUsersList} currentroom={currentRoom} setRoom={setRoom} value={value} currentUser={currentUser}/>
                <div className='message-module'>
                    <div className={'current-room'}>General</div>
                      <div className='messages-main'>
                      <Messages socket={socket} />
                      </div>
                      <Post socket={socket} currentUser={currentUser} value={value} setValue={setValue} currentRoom={currentRoom}/>
                </div>
          </div>
              </>
                        ) : null}


      </div>
    </div>
  );
}

export default App;
