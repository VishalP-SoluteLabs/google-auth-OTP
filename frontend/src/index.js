import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UsersContext from './context/usersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
     <BrowserRouter>
       <UsersContext>
         <App />
       </UsersContext>
     </BrowserRouter>
   </React.StrictMode>
);
