import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UsersData = createContext([]);

const UsersContext = ({ children }) => {
    const [email, setEmail] = useState([]);
    const [isVerified, setIsVerified] = useState(false)
    

    const signup = async (data) => {
      const res = await axios.post(`http://localhost:8080/signup`, data)
      if(res.status === 201){
        setEmail(data.email)
      }
    }

    const login = async (data) => {
        await axios.post(`http://localhost:8080/login`, data);
    }

    const verifyOTP = async (data) => {
        const res = await axios.post(`http://localhost:8080/verify-otp`, data)
        if(res.status === 200){
            setIsVerified(true)
        }
    }
    
    
    const googleLogin = async () => {
      const res = await axios.get(`http://localhost:8080/google`)
      console.log('dddddddddd-> ', res)
    }
    
    // const googleLoginSuccess = async () => {
    //   const res = await axios.get()
    // }


    
  return (
    <UsersData.Provider value={{ email, signup, login, verifyOTP, isVerified, googleLogin  }}>     {/**used in index.js so that App.js is its child and every*/}
      {children}                                                  {/**component can use it as other components are child of App.js*/}
    </UsersData.Provider>
  );
};

export function useContextData() {
  const contextValue = useContext(UsersData);   //written here so that need not to import it in every file
  return contextValue;
}

export default UsersContext;