import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login'
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// function auth() {

//   axios.post('http://myweburl.org/app/web/checkLogin', { headers: {'Accept': 'application/json'} })
//     .then((response) => {
//       console.log(response);
//       if(response.data.success){
//         return true;
//       }else if(response.data.error){
//         return false;
//       }
//     });

// };

// const isAuthorized = auth();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById("root")
);

