import React, { useState,useEffect } from "react";
import styles from "./UserAuth.module.css";
import { useNavigate } from "react-router-dom";
const UserAuth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailL, setEmailL] = useState("");
  const [passwordL, setPasswordL] = useState("");
  const [name, setName] = useState("");
  const [emailS, setEmailS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [role, setRole] = useState("");
  let username;
  const saveLocal = (email,role,name) => {
    localStorage.setItem("user", JSON.stringify(email));
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("name", JSON.stringify(name));
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId:emailL, password:passwordL }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.message);
      alert("Invalid login credentials");
      return;
    }
    username = json.user.userName;
    const role = json.user.role;
    console.log(json);
    saveLocal(emailL,role,username);
    if (response.ok) {
      navigate("/");
      window.location.reload();
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const response = await fetch("/auth/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName:name,emailId:emailS, password:passwordS,role:role}),
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.message);
    }
    saveLocal(emailS,role,name);
    if (response.ok) {
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <>
      <div className={styles.Body}>
        <h2 className="text-center text-3xl mb-4 ">
          <span className="block font-bold text-indigo-700 xl:inline">
            LegalHub
          </span>{" "}
          User Authentication
        </h2>
        <div
          className={`${styles.container} ${
            isSignUp ? styles["right-panel-active"] : ""
          }`}
          id="container"
        >
          <div
            className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
          >
            <form className={styles.Form} action="#">
              <h1 className="font-bold m-0">Create Account</h1>
              <input
                onChange={(e) => setName(e.target.value)}
                className={styles.Input}
                type="text"
                placeholder="Name"
              />
              <input
                onChange={(e) => setEmailS(e.target.value)}
                className={styles.Input}
                type="email"
                id="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPasswordS(e.target.value)}
                className={styles.Input}
                type="password"
                placeholder="Password"
              />
              <select
                className={styles.Select}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" defaultValue>
                  Select Role
                </option>
                <option value="User">Plaintiff/Defendant</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Judge">Judge</option>
              </select>

              <button onClick={handleSignUp} className="Button">
                Sign Up
              </button>
            </form>
          </div>
          <div
            className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
          >
            <form className={styles.Form} action="#">
              <h1 className="font-bold m-0">Sign in</h1>
              <input
                onChange={(e) => setEmailL(e.target.value)}
                className={styles.Input}
                type="email"
                id="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPasswordL(e.target.value)}
                className={styles.Input}
                type="password"
                placeholder="Password"
              />
              <a className="fp" href="#">
                Forgot your password?
              </a>
              <button onClick={handleLogin} className="Button">
                Sign In
              </button>
            </form>
          </div>
          <div className={styles["overlay-container"]}>
            <div className={styles.overlay}>
              <div
                className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
              >
                <h1 className="font-bold m-0">Welcome Back!</h1>
                <p className="text-sm">
                  To stay connected with us, please login using your personal
                  information.
                </p>
                <button className={styles.ghost} onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div
                className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
              >
                <h1 className="font-bold m-0">Welcome to the High Court</h1>
                <p className="text-sm">
                  Enter your personal details to begin interacting with our
                  system.
                </p>
                <button className={styles.ghost} onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuth;
