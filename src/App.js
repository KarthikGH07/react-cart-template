import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import firebase from "firebase";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostList from "./components/PostList";
//AppContext(global context for maintaining state value)
import AppContext from "./components/AppContext";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  // const [openSignup, setOpenSignup] = useState(true);
  const [newPost, setNewPost] = useState("");

  const loggedInCheck = {
    user,
    setUser,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      console.log(user);
      unsubscribe();
    };
  }, [user]);

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   if (user) return auth.signOut();
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       const user = auth.currentUser;
  //       user.updateProfile({
  //         displayName: username,
  //       });
  //     })
  //     .catch((error) => alert(error.message));

  //   setEmail("");
  //   setPassword("");
  //   setUsername("");
  //   setOpenSignup(false);
  // };

  // const closeSignup = () => {
  //   setOpenSignup(false);
  // };

  // const handleAuthClick = (e) => {
  //   e.preventDefault();
  //   setOpenSignup(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    db.collection("posts")
      .add({
        text: newPost,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const authPrompt = user ? user.displayName : "Sign Up";

  return (
    <AppContext.Provider value={loggedInCheck}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {/* {openSignup && (
                <div className="app__modalContainer">
                  <div className="app__modalHeader">
                    <button
                      className="app__modalHeaderButton"
                      onClick={closeSignup}
                    >
                      X
                    </button>
                  </div>
                  <div className="app__modalBox">
                    <h1 className="app__modalBoxPrompt">Sign Up</h1>
                    <div className="app__modalInputContainer">
                      <label htmlFor="">Username</label>
                      <br />
                      <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="app__modalBoxInput"
                      />
                    </div>
                    <div className="app__modalBoxInputContainer">
                      <label>Email</label>
                      <br />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="app__modalBoxInput"
                      />
                    </div>
                    <div className="app__modalInputContainer">
                      <label htmlFor="">Password</label>
                      <br />
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="app__modalBoxInput"
                      />
                    </div>
                    <button
                      className="app__modalBoxSubmit"
                      onClick={handleSignup}
                    >
                      {authPrompt}
                    </button>
                    <p className="app__modalBoxAltPrompt">
                      Already a User? Login <Link to="login">Here</Link>
                    </p>
                  </div>
                </div>
              )} */}
              <div className="app__header">
                <h2>Lil' Twitter</h2>
                <button onClick={}>Logout</button>
              </div>

              <div className="app__newPostContainer">
                <form>
                  <textarea
                    type="text"
                    placeholder="What's on your mind? (Max 240 characters)"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="app_newPostTextInput"
                    maxLength="240"
                  />
                  <button
                    className="app__newPostTextSubmit"
                    onClick={handleSubmit}
                    disabled={!user}
                  >
                    Post It!
                  </button>
                </form>
              </div>
              <div className="app__allPostsContainer">
                <PostList />
              </div>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
