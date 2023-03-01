import { useState } from 'react';
import Router from 'next/router';
import { authenticate } from '../../utils/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem("token") },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
        const json = await res.json();
        console.log(json.message)
        authenticate(json.token);
      Router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Mot de passe:
        <input
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
