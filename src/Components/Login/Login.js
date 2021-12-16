import React, { useState, useContext } from 'react';
import { firebaseContext } from '../../store/Context';
import { useHistory } from 'react-router';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {Firebase} = useContext(firebaseContext);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(email,password).then((result)=>{
       console.log("Loggein",result)
       history.push('/')
    }).catch((error)=>{
      console.log(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
