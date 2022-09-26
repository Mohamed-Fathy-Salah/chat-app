import { useState } from "react";
import { useRouter } from "next/router";
import client from "../../api/build-client";
import uuid from "react-uuid";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("aaa");
  const [email, setEmail] = useState(uuid().slice(0, 5) + "@aa.com");
  const [password, setPassword] = useState("123456");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await client().post("/auth/signup", { name, email, password });
      router.push("/");
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
