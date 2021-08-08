

import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import Messages from "./Messages";

function App() {

const [data, setData] = useState()
const [users, setUsers] =useState()


  useEffect(() => {
    fetch("/messages")
        .then(res => res.json())
        .then(info => setData(info))

  }, [])

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
      <header className="App-header">
        {users ? <Messages messageText={data.messageText} /> : <Login />}
        <div>
          {!data ? "loading...": data.map(obj => {
              return (
                  <>
                      <p>{obj.userName}</p>
                  <p>{obj.userId}</p>
                  <p>{obj.messageText}</p>
                  </>)})}
        </div>
        {/*  <div>*/}
        {/*      {!data ? "loading...": messageMap(data)}*/}
        {/*  </div>*/}

      </header>
    </div>
  );
}

export default App;
