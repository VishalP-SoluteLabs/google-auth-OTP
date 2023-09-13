import React, { useEffect, useState } from 'react';
import './googleAuthSuccess.css';

const GoogleAuthSuccess = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUSer = async () => {
      fetch(`http://localhost:8080/success`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }
      }).then(res => {
        // console.log('res line 19-->', res)
        if(res.status === 200){
          return res.json()
        }
        throw new Error('something happened at line 22 in success file')
      }).then(res => {
        setUserData(res)
      }).catch(err => console.log(err))
    }
    getUSer();
  }, []);


  return (
    <div className="user-profile">
      <img src={userData.pic} alt="User Profile" className="profile-pic" />
      <div className="user-info">
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
