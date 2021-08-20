

import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import Post from "./Post";

function App() {

const [data, setData] = useState()
const [users, setUsers] =useState()

  //
  // useEffect(() => {
  //   fetch("/messages")
  //       .then(res => res.json())
  //       .then(info => setData(info))
  //
  // }, [])

function messageMap (messageData) {

    messageData.map(obj => {
        return (

            <>
            <p>{obj.userId}</p>
            <p>{obj.username}</p>
            <p>{obj.messageText}</p>
            </>
        )

    })
}



  return (
    <div className="App">
      <div className="main">
        {/*{users ? <Messages messageText={data.messageText} /> : <Login />}*/}
          <Login />
          <Post />

        {/*  <div>*/}
        {/*      {!data ? "loading...": messageMap(data)}*/}
        {/*  </div>*/}

      </div>
    </div>
  );
}

export default App;
