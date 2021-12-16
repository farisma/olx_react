import React, {useState, useContext, useEffect} from 'react';
import {postContext} from '../../store/postContext';
import { firebaseContext } from '../../store/Context';
import './View.css';
function View() {
  const [userDetails,setUserdetails] = useState();
  const {postDetails} = useContext(postContext);
  const {Firebase} = useContext(firebaseContext);
  console.log("postdetauils",postDetails)
  useEffect(() => {
    const {userId} = postDetails;
    console.log('uid',userId)
    Firebase.firestore().collection('users').where("id","==",userId).get().then((res)=>{
      //console.log('res',res.data())
      res.forEach((doc) => {
        console.log('doc',doc.data())
        setUserdetails(doc.data())
      });
    }).catch((err)=>{console.log(err.message)})
    
  },[])
 
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url?postDetails.url:''}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price?postDetails.price:'' }</p>
          <span>{postDetails.name?postDetails.name:''}</span>
          <p>{postDetails.category?postDetails.category:''}</p>
          <span>{postDetails.createdAt?postDetails.createdAt:''}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {
            userDetails?
            <p>{userDetails.username? userDetails.username:''}</p>
            :''
          }
         
          {/* <p>{userDetails.name?`Age: ${userDetails.name}`:''}</p> */}
        </div>
      </div>
    </div>
  );
}
export default View;
