import React, {useEffect, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import { userContext,firebaseContext } from './store/Context';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Post from './store/postContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login';
function App() {
  const {user,setUser} = useContext(userContext);
  const {Firebase} = useContext(firebaseContext);
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    // return () => {
    //   cleanup
    // }
  })
  return (
    <div>
      <Post>
      <Router>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signup" >
        <Signup/>
      </Route>
      <Route path="/login" >
        <Login/>
      </Route>
      <Route path="/create" >
         {user? <Create/>:<Login/>} 
      </Route>
      <Route path="/view" >
        <View/>
      </Route>
      </Router>
      </Post>
    </div>
  );
}

export default App;
