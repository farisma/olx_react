import React, {useState, useContext, useEffect} from 'react';
import {postContext} from '../../store/postContext';
import { firebaseContext } from '../../store/Context';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './View.css';
function View() {
  const [userDetails,setUserdetails] = useState();
  const [productImages,setProductImages] = useState([]);
  const {postDetails} = useContext(postContext);
  const {Firebase} = useContext(firebaseContext);
  console.log("postdetauils",postDetails)
  useEffect(() => {
    const {userId} = postDetails;
    console.log('uid',userId)
    Firebase.firestore().collection('users').where("id","==",userId).get().then((res)=>{
      //console.log('res',res.data())
      res.forEach((doc) => {
        // console.log('doc',doc.data())
        setUserdetails(doc.data())
      });
    }).catch((err)=>{console.log(err.message)})
   /// console.log("IF",id)
    
  },[])

useEffect(() => {
  const {id} = postDetails;
  Firebase.firestore().collection('product_images').where("product_id","==",id).get().then((res)=>{
    //   console.log("iamgesurl",res.docs)
       //setProductImages(res.docs.data())
 res.forEach((doc) => {
       //  console.log('doc',doc.data().product_image_url,typeof productImages)
         setProductImages((productImages) => [...productImages,doc.data().product_image_url])
   });
});
 
}, [])
 console.log("image",productImages)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
      <Carousel>
        {
          productImages?productImages.map((item)=><div><img src={item}></img></div>):''
        }
      {/* <div>
        <img
          src={postDetails.url?postDetails.url:''}
          alt=""
        />
        </div>
        <div>
        <img
          src={postDetails.url?postDetails.url:''}
          alt=""
        />
        </div>
        <div>
        <img
          src={postDetails.url?postDetails.url:''}
          alt=""
        />
        </div> */}
        </Carousel>
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
