import { useState } from "react";
import Router from "next/router";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("aaa");
  const [email, setEmail] = useState("aa@aa.com");
  const [password, setPassword] = useState("123456");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      Router.push("/chat");
    } catch (e) {
      console.error("---", e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
