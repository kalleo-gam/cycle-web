import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../history";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(username, password) {
        try {
            const response = await api.post("http://localhost:3001/", { username, password });
            
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                setAuthenticated(true);
                history.push("/fornecedores");
                return true;
            } else {
                console.error(`Login falhou: ${response.status}`);
                return false;
            }
        } catch (error) {
            console.error("Erro ao realizar o login:", error);
            return false;
        }
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem("token");
        history.push("/login");
    }

    return { authenticated, loading, handleLogin, handleLogout };
}
