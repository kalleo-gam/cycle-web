import React, { useContext, useState, useEffect } from "react";
import api from "../api";
import Header from "../components/Header";
import "./fornecedores.css";
import { Context } from "../Context/AuthContext";

export default function Fornecedores() {
    const [fornecedores, setfornecedores] = useState([]);
    const [fornecedor, setfornecedor] = useState();
    const { handleLogout } = useContext(Context);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await api.get("http://localhost:3003", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data) {
                    setfornecedores(res.data);
                    setfornecedor(res.data[0]);
                }
            } catch (error) {
                handleLogout();
                console.error('Erro ao buscar fornecedores:', error);
            }
        })();
    }, []);

    const selectFornecedor = async (e) => {
        let id = e.target.value;
        const token = localStorage.getItem('token');

        try {
            const res = await api.get(`http://localhost:3003/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data) {
                setfornecedor(res.data);
            }
        } catch (error) {
            handleLogout();
            console.error('Erro ao buscar fornecedor:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fornecedores">
                <div className="titulo">Gestão de Fornecedores</div>
                <div className="row">
                    <label>Fornecedor:</label>
                    <div className="col-6">
                        <select className="form-select form-select-md mb-3" onChange={selectFornecedor}>
                            {fornecedores.map((n) => (
                                <option key={n.id} value={n.id}>
                                    {n.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </button>
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {fornecedor && (
                    <div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                Endereço:
                                <br /> <strong>{fornecedor.endereco}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                E-mail:
                                <br /> <strong>{fornecedor.email}</strong>
                            </div>
                            <div className="col-md-2 col-sm-12">
                                Celular:
                                <br /> <strong>{fornecedor.celular}</strong>
                            </div>
                            <div className="col-md-2 col-sm-12">
                                CNPJ:
                                <br /> <strong>{fornecedor.cnpj}</strong>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
