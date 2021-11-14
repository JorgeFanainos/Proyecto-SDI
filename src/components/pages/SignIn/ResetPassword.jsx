import { useState } from "react";
import React from "react";
import "../../../App";
import { auth } from "../../../utils/firebaseApp";

function ResetPassword() {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    emailErr: "",
  });

  const validate = () => {
    let emailErr = "";

    if (values.email === "") {
      emailErr = "No deje el campo vacio";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      emailErr = "Ingrese su correo correctamente";
    }

    if (emailErr) {
      setErrors({
        emailErr,
      });
      return false;
    }

    return true;
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        await auth.sendPasswordResetEmail(values.email);
        console.log("noice");
      } catch (error) {
        const errorMessage = error.code;
        if (errorMessage === "auth/user-not-found") {
          let emailErr = "";
          emailErr = "Usuario no registrado";
          setErrors({ emailErr });
        }
      }
    } else {
      console.log("out of reach error");
    }
  };

  return (
    <div>
      <br />
      <label className="correo">Correo: </label>
      <br />
      <input
        className="input_contra"
        name="email"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleOnChange}
      />
      <div className="error">{errors.emailErr}</div>
      <br />
      <br />
      <br />
      <button className="boton" onClick={handleSubmit}>
        Recuperar
      </button>
    </div>
  );
}

export default ResetPassword;
