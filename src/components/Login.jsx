import React, { useState } from "react";
import logo from "../assets/logo.svg";

// const MASTER_PHRASE = "1botGT";

function Login({ onLogin }) {
  // const [phrase, setPhrase] = useState("");

  const handleMasterPhraseLogin = () => {
    if (phrase === MASTER_PHRASE) {
      onLogin(true);
    } else {
      alert("Frase maestra incorrecta. Por favor intenta de nuevo.");
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Inicio con Google Exitoso:", credentialResponse);
    onLogin(true);
  };

  const handleGoogleLoginError = () => {
    alert("Inicio con Google Fallo. Por favor intenta de nuevo.");
  };

  React.useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "975236426037-nh30851j3ve16707tb5jck455g8qlcav.apps.googleusercontent.com",
          callback: handleGoogleLoginSuccess,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-login-button"),
          { theme: "outline", size: "large" }
        );
      } else {
        // If window.google is not available, try again after a short delay
        setTimeout(initializeGoogleSignIn, 100); // Try every 100ms
      }
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="bg-[#EFECE6] min-h-screen flex justify-center items-center">
      <div className="p-8 rounded shadow-md w-96 bg-white">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <h2
          className="text-2xl font-bold text-center text-gray-800 mb-6"
          style={{ color: "#00B1E5" }}
        >
          Inicio de Sesión
        </h2>
        {/* <div className="mb-4">
          <label
            htmlFor="masterPhrase"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Frase Maestra:
          </label>
          <input
            type="password"
            id="masterPhrase"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa Frase Maestra"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-[#FF259D] hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleMasterPhraseLogin}
          >
            Ingresar
          </button>
        </div> */}
        <div className="mb-4">
          <div id="google-login-button"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
