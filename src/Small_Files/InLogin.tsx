import { useState } from "react";
import { Context } from "../Context/Context";
import { useContext } from "react";

export default function InLogin() {
  const { setLoggedIn, adminData } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  
    if (email === adminData[0].loginEmail && password === adminData[0].loginPassword) {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };
  

  return (
    <main className="inlogin--container">
      <div className="inlogin--box">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="login--minibox">
            <h4>Email</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login--minibox">
            <h4>Password</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginError && <p className="error-message">Invalid email or password</p>}
          <button type="submit">Log in</button>
        </form> 
      </div>
    </main>
  );
}
