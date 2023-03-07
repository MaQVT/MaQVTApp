import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { authenticate } from "../../utils/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const { message } = router.query;

  useEffect(() => {
    setColor("green");
    setErrorMessage(message);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json.message);
      authenticate(json.token);
      Router.push("/");
    } else {
      const json = await res.json();
      setColor("red");
      setErrorMessage(json.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      {errorMessage && <p style={{ color: color }}>{errorMessage}</p>}
      <br />

      <label>
        Email:
        <input
          className="border"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Mot de passe:
        <input
          className="border"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Se Connecter</button>
    </form>
  );
}
