

import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Login from "./Login";
import Messages from "./Messages";

function App() {

const [data, setData] = useState()
const [users, setUsers] =useState(null)


  useEffect(() => {
    fetch("/api")
        .then(res => res.json())
        .then(data => setData(data.message))
  }, [])





  return (
    <div className="App">
      <header className="App-header">
        {users ? <Messages data={data} /> : <Login />}
        <p>
          {!data ? "loading...": data}
        </p>


      </header>
    </div>
  );
}

export default App;
