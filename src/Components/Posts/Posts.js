import React,{useEffect,useContext,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext,userContext } from '../../store/Context';
import {postContext} from '../../store/postContext';
import {useHistory} from 'react-router-dom';
function Posts() {
const {Firebase} = useContext(firebaseContext);
const {setPostDetails} = useContext(postContext);
const {user}  = useContext(userContext);
const [products, setProducts] = useState([]);
const history = useHistory();
const date = new Date();
const handleClick = (product) => {
 
  setPostDetails(product);
  history.push('/view');
}
useEffect(() => {
  
  Firebase.firestore().collection('products').get().then((snapshot)=>{
     //console.log(snapshot.docs);
     const allPosts = snapshot.docs.map((product) => {
       //console.log(product.data())
       return {
         ...product.data(),
         id:product.id
        
     }
     })
     setProducts(allPosts)
  })

},[])

const addTofavourites = (product_id) => {
  //  console.log("fav",product_id);
//console.log("user",user.uid)
  if(Object.keys(user).length === 0 && user.constructor === Object){
    history.push('/login');
  }
  else {
  Firebase.firestore().collection("favourites").add({
    product_id,
    user_id:user.uid,     
    createdAt: date.toString()
  })
 }
}
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products? 
            products.map(product => {
              return <div className="card" >
            
          
              <div className="favorite" onClick={()=>addTofavourites(product.id)}>
                <Heart></Heart>
              </div>
              <div className="image" onClick={()=>handleClick(product)}>
                <img src={product.url?product.url:''} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price?product.price:''}</p>
                <span className="kilometer">{product.category?product.category:''}</span>
                <p className="name"> {product.name?product.name:''}</p>
              </div>
              <div className="date">
                {/* <span>{product.createdAt?product.createdAt:''}</span> */}
              </div>
            </div>
            })
            :''
          }
         
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
