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
    <form onSubmit={handleSubmit} className="pb-5 w-[500px]">
      {errorMessage && <p className="py-5 text-red">{errorMessage}</p>}
      <label>
        Email:
        <input
          className="mb-5 mt-2 h-14 p-2 rounded-md block mx-0 w-[500px]"
          type="email"
          value={email}
          placeholder="armelieLaBiau@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Mot de passe:
        <input
          className="mb-5 mt-2 h-14 p-2 rounded-md block mx-0 w-[500px]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Link href={"/auth/ask_reset_password"}>
        <p className="px-5 text-right font-thin text-red-600">Mot de passe oublié ?</p>
      </Link>
      <button type="submit" className=" font-semibold">Se Connecter</button>
    </form>
  );
}
