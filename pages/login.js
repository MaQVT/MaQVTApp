import { useRouter } from "next/router";
import LoginForm from "../components/Login/LoginForm";
import { isAuthenticated } from "../utils/auth";
import {useEffect, useState} from "react"

export default function LoginPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);
  const [email, setEmail] = useState('');


  const resetMail = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/auth/send_reset_mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
        const json = await res.json();
        console.log(json.message)
    }
  };

  useEffect(() => {
    // Redirect the user to the login page if they are not authenticated
    if (isAuthenticated()) {
      router.push('/');
    }else{
      setLoggedIn(false)
    }
  }, []);

  return (
    !loggedIn &&
    <div>
      <h1>Se Connecter</h1>
      <LoginForm />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      <button onClick={resetMail}>Mot de passe oublié ?</button>
    </div>
  );
}
