import axios from "axios";
import jwt from "jsonwebtoken";
import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCoffee, faXmark} from "@fortawesome/free-solid-svg-icons";






const Nav = ({setLoggedStatus, socket, setSocket, usersList, setUsersList}) => {

    const element = <FontAwesomeIcon icon={faCoffee} />

    useEffect(() => {
        let token = localStorage.getItem('token')
        socket.on('logged off', ()=> {
            socket.disconnect()
            localStorage.removeItem('token')
            setLoggedStatus(0)
            setSocket('')

        })
    }, [socket])


async function logout () {
    let token = localStorage.getItem('token')
    let payload = jwt.decode(token)
    let user = payload.userName
    let userObj = {
        user: user,  socketId: socket.id
    }
    console.log(userObj)
    socket.emit('logout',  userObj)
    // let res = await axios.post('/logout', {user: user,  socketId: socket.id} )



    // if (res.data.message ==='logged out') {
    //     // setUsersList('')
    //     // await socket.emit('users', 'trying to disconnect')
    //
    //     socket.disconnect()
    //
    //
    //     localStorage.removeItem('token')
        // let tempUsers = [...usersList]
        // console.log(tempUsers)
        // let userIndex = tempUsers.indexOf(user)
        // console.log(userIndex)
        // tempUsers.splice(userIndex, 1)
        // console.log(tempUsers)
        // socket.on('users', users => {
        //     let userArr = users.map(userObj => {
        //         return userObj.userName
        //     })
        //     setUsersList(userArr)
        // })

        // setLoggedStatus(0)
        // setSocket('')
        // setUsersList('')
    }

    return (

        <nav className='nav-container'>
            <div className='nav-menu'>
            <button id='close-button'><FontAwesomeIcon icon={faXmark} /></button>
            <button id='menu-options'><FontAwesomeIcon icon={faCaretDown} /></button>

            <button id='logout' onClick={event => logout()}>Logout</button>
            </div>
        </nav>
    )





}





export default Nav