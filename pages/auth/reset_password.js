import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "/styles/Home.module.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Les deux mots de passes saisies sont différentes");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        throw new Error("Le changement de mot de passe a échoué");
      }
      const json = await response.json();
      router.push(`/auth/login?message=${json.message}`);
    } catch (error) {
      console.error(error);
      setErrorMessage("Le changement de mot de passe a échoué");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Réinitialisation du mot de passe</title>
      </Head>
      <main className={styles.main}>
        <div>
          <h1 className="font-semibold text-3xl" >Réinitialiser votre mot de passe</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nouveau mot de passe:
              <input
              className="mb-5 mt-2 h-14 p-2 rounded block mx-0 w-[500px]"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <label>
              Confirmer le nouveau mot de passe:
              <input
              className="mb-5 mt-2 h-14 p-2 rounded block mx-0 w-[500px]"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>

            <br />

            {errorMessage && <p className="py-5 text-red">{errorMessage}</p>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Chargement..." : "Réinitialiser"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
