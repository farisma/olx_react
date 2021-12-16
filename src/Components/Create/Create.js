import React, { Fragment,useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router';
import { firebaseContext,userContext } from '../../store/Context';
const Create = () => {
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');
  const date = new Date();
  const {Firebase} = useContext(firebaseContext);
  const {user} = useContext(userContext);
  const history = useHistory();
  const handleSubmit = () => {
    Firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then((url)=>{
        console.log(url)
        Firebase.firestore().collection("products").add({
          userId:user.uid,
          name,
          price,
          category,
          url,
          createdAt: date.toString()
        }).then(()=>{
          history.push('/')
        })
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}  onChange={(e) => {setPrice(e.target.value)}}/>
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input type="file" onChange={(e)=>{console.log(e.target.files[0]);setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
