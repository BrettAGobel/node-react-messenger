import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

export default function Users ({socket, usersList , setUsersList, value, currentUser, setRoom, currentRoom}) {


   const [isActive, setActive] = useState(false)


    const toggleClass = () => {
        setActive(!isActive);

    }

    const changeRoom = (event) => {

        let socketId = event.target.dataset.socket
        let userName = event.target.dataset.user
        let recipient = {
            socketId, userName
        }
        if (socketId === "General") {
            recipient = {socketId: "General"}
        }

        let cb = ()=> {

        }

        setRoom(recipient)

    }


    useEffect(() => {
        socket.on('users', async users => {
            console.log(users)
            // let userArr = await users.map(userObj => {
            // return {userName: userObj.userName, socketId:userObj.userSocket }
            //
            // })

            setUsersList(users)
        })
    }, [usersList])


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
                <div className={'user'} onDoubleClick={event => {changeRoom(event)}} data-socket={"General"}>General</div>

                {usersList.map(obj => {
                    return (
                        <>
                        <div className={'user'}  onDoubleClick={event => changeRoom(event)} data-socket={obj.address} data-user={obj.userName}>
                                 <span>{obj.userName}</span>
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