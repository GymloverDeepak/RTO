import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ip, setIp] = useState("");

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  const users = [
    // { email: "kapil", password: "kapil" },
    // { email: "dev", password: "dev" },
    // { email: "loki", password: "loki" },
     { email: "gym", password: "gymlover" },
  ];

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setNum1(a);
    setNum2(b);
    setCaptchaInput("");
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (parseInt(captchaInput) !== num1 + num2) {
      setError("CAPTCHA is incorrect.");
      generateCaptcha();
      return;
    }

    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        alert("Welcome Dude : " + data.ip);
      });

    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      sessionStorage.setItem("user_token", JSON.stringify(user));
      navigate("/");
      setError("");
    } else {
      setError("Majdoor hi keh d");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {isLoggedIn ? (
          <div className="welcome">
            <h2>Welcome!</h2>
            <p>You are successfully logged in.</p>
          </div>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}

            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="captcha-box">
              <label>
                Solve CAPTCHA: <strong>{num1} + {num2} = ?</strong>
              </label>
              <input
              style={{ width: "44%" ,marginTop: "10px"}}
                type="number"
                placeholder="Enter CAPTCHA answer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
            </div>

            <button onClick={handleLogin}>Login</button>

            <p className="info">
              Kripya phle paise de phir login kre! IP: <strong>{ip}</strong>
            </p>
          </>
        )}
      </div>
      {/* <h2>Out of Service !</h2> */}
    </div>
  );
}
