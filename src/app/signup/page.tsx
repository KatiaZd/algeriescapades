/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignupPage.module.scss";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    prenom: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const validateFields = () => {
    const errors = {
      name: "",
      prenom: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!/^[a-zA-Z]+$/.test(name)) {
      errors.name = "Le nom ne doit contenir que des lettres.";
      isValid = false;
    }

    if (!/^[a-zA-Z]+$/.test(prenom)) {
      errors.prenom = "Le prénom ne doit contenir que des lettres.";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "L'email doit contenir un @.";
      isValid = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      errors.password =
        "Le mot de passe doit contenir au moins une lettre et un chiffre.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, prenom }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      setError("Erreur lors de la création du compte. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
        />
        {validationErrors.name && (
          <p className={styles.error}>{validationErrors.name}</p>
        )}
        <input
          className={styles.input}
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Prénom"
          required
        />
        {validationErrors.prenom && (
          <p className={styles.error}>{validationErrors.prenom}</p>
        )}
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {validationErrors.email && (
          <p className={styles.error}>{validationErrors.email}</p>
        )}
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        {validationErrors.password && (
          <p className={styles.error}>{validationErrors.password}</p>
        )}
        <button className={styles.cta} type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
