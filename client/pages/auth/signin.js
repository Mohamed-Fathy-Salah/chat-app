import { useState } from "react";
import { useRouter } from "next/router";
import client from "../../api/build-client";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("aa@aa.com");
  const [password, setPassword] = useState("123456");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await client().post("/auth/signin", { email, password });
      router.push("/");
    } catch (e) {
      console.error("---", e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
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
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default Signin;
