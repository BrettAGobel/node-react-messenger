import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

export default function Users ({socket, usersList , setUsersList, value, currentUser, setRoom, currentRoom}) {

// const [usersList, setUsersList] = useState([])
   const [isActive, setActive] = useState(false)


    const toggleClass = () => {
        setActive(!isActive);

    }

    const sendPrivate = (event) => {

        let targetSocketId = event.target.dataset.socket
        let privateMessage = {value: value, socketId: targetSocketId}
        socket.emit('private message', privateMessage)
    }


    const changeRoom = (event) => {
       // if (event.target.innerText === 'General') {
       //
       // }
        let socketId = event.target.dataset.socket
        let roomName = `${event.target.dataset.user} & ${currentUser}'s room`
        let cb = ()=> {

        }

        setRoom(`${socketId}`)

    }


    useEffect(() => {
        socket.on('users', async users => {

            let userArr = await users.map(userObj => {
            return {userName: userObj.userName, socketId:userObj.userSocket }

            })

            setUsersList(userArr)
        })
    }, [socket])


    useEffect(()=> {
        socket.on('new-room', room => {
        console.log('this is the new room event')

        setRoom(room)
        })
    }, [socket])


    if (usersList.length >= 1) {
        return (
            <div className='users-container'>
                <div className='users-container-header'>
                    <h1>Users List</h1>
                </div>
                <div className={'user'} onDoubleClick={event => {changeRoom(event)}}>General</div>

                {usersList.map(({ userName, socketId }) => {
                    return (
                        <>
                        <div className={'user'}  onDoubleClick={event => changeRoom(event)} data-socket={socketId} data-user={userName}>
                                 <span>{userName}</span>
                             </div>
                        </>
                    )
                })}
            </div>
        )


} return (
    <div className='users'>

    </div>
    )
}