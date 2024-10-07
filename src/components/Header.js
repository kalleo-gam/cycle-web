import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/AuthContext";
import "./header.css";

function Header() {
    const { handleLogout, activePage, setActivePage } = useContext(Context);

    return (
        <div className="container-header">
            <div className="header">
                <div class="logo-container">
                    <img src="https://github.com" alt="Site Logo" />
                </div>
                <Link className={activePage == "fornecedores" ? "active" : ""} onClick={() => setActivePage("fornecedores")} to="/fornecedores">
                    Fornecedores
                </Link>
                <Link className={activePage == "pecas" ? "active" : ""} onClick={() => setActivePage("pecas")} to="/pecas">
                    Peças
                </Link>
                <a
                    className="sair"
                    onClick={() => {
                        handleLogout();
                        setActivePage("fornecedores");
                    }}
                >
                    Sair
                </a>
            </div>
        </div>
    );
}

export default Header;
