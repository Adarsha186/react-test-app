import React, { useState } from "react";
import { hitSuccessAPI, hitFailureAPI } from "./services/api";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // email validation
  const validateEmail = (email) => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(email);
  };

  // name must contain only alphabets and spaces
  const validateName = (name) => {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Required fields
    if (!form.name || !form.email || !form.password) {
      setErrorMsg("All fields are required");
      await hitFailureAPI();
      return;
    }

    // Name validation
    if (form.name.length < 3) {
      setErrorMsg("Name must be at least 3 characters");
      await hitFailureAPI();
      return;
    }


    // Email validation
    if (!validateEmail(form.email)) {
      setErrorMsg("Invalid email format");
      await hitFailureAPI();
      return;
    }

    // Password validation
    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      // await hitFailureAPI();
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await hitSuccessAPI();
      setSuccessMsg(`Success: Received title - ${data.title}`);
    } catch (err) {
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f7f7f7",
    }}
  >
    <div
      style={{
        width: "380px",
        padding: "25px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Registration
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: loading ? "#888" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "15px",
            transition: "0.2s",
          }}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {errorMsg && (
        <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
          {errorMsg}
        </p>
      )}
      {successMsg && (
        <p style={{ color: "green", marginTop: "15px", textAlign: "center" }}>
          {successMsg}
        </p>
      )}
    </div>
  </div>
);
}

export default App;
