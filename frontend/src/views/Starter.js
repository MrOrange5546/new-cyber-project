import React, { useEffect, useState } from "react";
import { auth, provider } from "./ui/config";
import { signInWithPopup } from "firebase/auth";
import Forms from "./ui/Forms"; 
import './Starter.css';

function SignIn() {
  const [value, setValue] = useState('')
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  })

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      {value ? <Forms /> :
        <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
          <div className="background">
            <h3>Login Here</h3>
            <hr />  
            <button onClick={handleClick}>
              SignIn with Google
            </button>
          </div>
        </div>
      }
    </div>

  );
}
export default SignIn;
