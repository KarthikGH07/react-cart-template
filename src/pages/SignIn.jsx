import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import AppContext from "../components/AppContext";
import "./styles/SignIn.css";
import { Link, Redirect } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const myContext = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        myContext.setUser(authUser);
      } else {
        myContext.setUser(null);
      }
    });
    return () => {
      console.log(myContext.user);
      unsubscribe();
    };
  }, [myContext]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  const logUserIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(auth.currentUser);
        alert(email + "signed in successfully", clearFields());
        setRedirect(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setRedirect(false);
          alert("Password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div className="page-container">
      <h1 className="page-title-header">Log In</h1>
      <div className="auth-form-container">
        <div className="auth-form-row">
          <label>Email</label>
          <br />
          <input
            type="email"
            name="sign-up-email-input"
            className="auth-text-input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="auth-form-row">
          <label>Password</label>
          <br />
          <input
            type="password"
            name="sign-up-password-input"
            className="auth-text-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="auth-form-row">
          <button className="auth-form-submit" onClick={logUserIn}>
            Log In
          </button>
        </div>
        <div className="auth-form-row">
          <p className="auth-alternate-prompt">
            Don't have a account? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
