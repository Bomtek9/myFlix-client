import React, { useState } from "react";

export const LoginView = ({ onloggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    fetch("https://dup-movies-18ba622158fa.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onloggedIn(username);
      } else {
        alert("Login Failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          minLength={4}
          maxLength={20}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          maxLength={20}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
