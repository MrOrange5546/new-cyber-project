import React, { useEffect, useState } from "react";
import { auth,provider } from "./ui/config";
import {signInWithPopup} from "firebase/auth";
import Forms from "./ui/Forms"

function SignIn(){
    const [value,setValue] = useState('')
    const handleClick =()=>{
      signInWithPopup(auth,provider).then((data)=>{
        setValue(data.user.email)
        localStorage.setItem("email",data.user.email)
      })
    }

    useEffect(()=>{
      setValue(localStorage.getItem('email'));
    })

  return (
<div style={{justifyContent: 'center', alignItems: 'center'}}>
  {value?<Forms/> :
    <button 
      onClick={handleClick} 
      style={{
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s",
      }}
    >
      SignIn with Google
    </button>
  }
</div>

  );
}
  export default SignIn;
