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
  const [thumbnail,setThumbnail] = useState('');
  const date = new Date();
  const {Firebase} = useContext(firebaseContext);
  const {user} = useContext(userContext);
  const history = useHistory();
  const handleSubmit = () => {
    console.log("state_rtn", thumbnail);
    Firebase.storage().ref(`/image/product_images/${thumbnail.name}`).put(thumbnail).then(({ref}) => {
      ref.getDownloadURL().then((url)=>{
        Firebase.firestore().collection("products").add({
          userId:user.uid,
          name,
          price,
          category,      
          createdAt: date.toString(),
          url:url
    
        }).then((docRef)=>{
        let name;
        console.log('doc',docRef.id)
        for (const [key] of Object.entries(image)) {
           name = image[key].name;
       
         
                Firebase.storage().ref(`/image/product_images/${name}`).put(image[key]).then(({ref}) => {
                  ref.getDownloadURL().then((url)=>{
                  //  console.log("retunedURL",url)
                    Firebase.firestore().collection("product_images").add({
                       product_image_url:url,
                       product_id:docRef.id
                    });
                
                  })
               
            })
        }
          history.push('/')
        })

      });
    });
   
    
  
   

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
          <label htmlFor="Thumbnail">Thumbnail</label>
          <br />
          <input type="file" onChange={(e)=>{console.log(e.target.files[0]);setThumbnail(e.target.files[0])}} />
          {/* <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img> */}
          
            <br />
            <label htmlFor="Thumbnail">Other images</label>
          <br />
            <input type="file" multiple onChange={(e)=>{console.log(e.target.files);setImage(e.target.files)}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
