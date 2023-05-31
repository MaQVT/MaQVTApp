import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from 'next/link'
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
      authenticate(json.token);
      Router.push("/");
    } else {
      const json = await res.json();
      setColor("red");
      setErrorMessage(json.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-5 w-[500px] sm:w-[80%]">
      {errorMessage && <p className={`py-5 text-${color}-600`}>{errorMessage}</p>}
      <label>
        Email:
        <input
          className="mb-5 mt-2 h-14 px-5 py-2 rounded-md block mx-0 w-[500px] focus:outline-none sm:w-[100%]"
          type="email"
          value={email}
          placeholder="utilisateur@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Mot de passe:
        <input
          className="mb-5 mt-2 h-14 px-5 py-2 rounded-md block mx-0 w-[500px] focus:outline-none sm:w-[100%]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Link href={"/auth/ask_reset_password"}>
        <p className="px-5 text-right font-thin text-red-600">Mot de passe oublié ?</p>
      </Link>
      <button type="submit" className="sm:mt-5 font-semibold">Se Connecter</button>
    </form>
  );
}
