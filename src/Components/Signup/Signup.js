import React, { useState,useContext } from 'react';
import { firebaseContext } from '../../store/Context';
import { useHistory } from 'react-router';
import Logo from '../../olx-logo.png';
import Error from '../../Components/Errors/Error';
import './Signup.css';
// import {Firebase} from '../../Firebase/config';
//import firebasefunctions from 'firebase-functions';
// const db = getFirestore(firebase);
export default function Signup() {
  const history = useHistory();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [userEmail,setUseremail] = useState('');
  const [phone,setPhone] = useState('');
  const [error,setError] = useState(false);
  const [errorMessage,setErrormessage] = useState("no error");
  const {Firebase} = useContext(firebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Firebase)
    Firebase.auth().createUserWithEmailAndPassword(userEmail,password).then((result) => {
      result.user.updateProfile({displayName:username}).then(() => {
        Firebase.firestore().collection("users").add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          history.push('/login')
        })
      });
    }).catch((err)=>{
      //console.log("error",err.message)
      setError(true);
      setErrormessage(err.message);
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            
            value={userEmail}
            onChange={(e)=>setUseremail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
      {
       <Error message={errorMessage}></Error>
      // error?"error":"noerror"
      }
       
    </div>
  );
}
