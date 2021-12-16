import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext, Context } from './store/Context';
import { Firebase } from './Firebase/config';

ReactDOM.render(
   
    <firebaseContext.Provider value={{Firebase}}>
        <Context>
          <App />
        </Context>
    </firebaseContext.Provider>,
       
    document.getElementById('root'));
