import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "../firebase";
import AppContext from "../components/AppContext";
import "./styles/SignIn.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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

  const handleUserNameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = (e) => {
    e.preventDefault();
    if (myContext.user) return auth.signOut();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: username,
        });
        setRedirect(true);
      })
      .catch((error) => {
        setRedirect(false);
        alert(error.message);
      });
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div className="page-container">
      <h1 className="page-title-header">Sign Up</h1>
      <div className="auth-form-container">
        <div className="auth-form-row">
          <label>Username</label>
          <br />
          <input
            type="text"
            name="sign-up-username-input"
            className="auth-text-input"
            value={username}
            onChange={handleUserNameChange}
          />
        </div>
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
          <button className="auth-form-submit" onClick={handleSignup}>
            Sign Up
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

export default SignUp;
