import React, { useContext, useState } from "react";

import { Context } from "../Context/AuthContext";

export default function Login() {
    const { handleLogin } = useContext(Context);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    async function handleSubmit() {
        let valid = true;

        if (!username) {
            setUsernameValid(false);
            valid = false;
        } else {
            setUsernameValid(true);
        }

        if (!password) {
            setPasswordValid(false);
            valid = false;
        } else {
            setPasswordValid(true);
        }

        if (valid) {
            const success = await handleLogin(username, password);
            if (!success) {
                setUsernameValid(false);
                setPasswordValid(false);
            }
        }
    }

    return (
        <>
            <div className="container-header">
                <div className="header" style={{ justifyContent: "center" }}>
                <div class="logo-container">
                    <img src="https://github.com" alt="Site Logo" />
                </div>
                </div>
            </div>
            <div className="container-fornecedores" style={{ maxWidth: "450px" }}>
                <div className="row">
                    <div className="col">
                        Usuário
                        <br />
                        <input
                            type="text"
                            className={(usernameValid ? "" : "is-invalid ") + "form-control"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Senha
                        <br />
                        <input
                            type="password"
                            className={(passwordValid ? "" : "is-invalid ") + "form-control"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ textAlign: 'center'}}>
                        <button className="confirmButton" onClick={handleSubmit} style={{ width: '100%'}}>
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
