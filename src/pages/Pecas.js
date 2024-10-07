import React, { useContext, useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { Context } from "../Context/AuthContext";
import Header from "../components/Header";
import "./pecas.css";

export default function Pecas() {
    const [pecas, setpecas] = useState([]);
    const [peca, setpeca] = useState();
    const [fornecedores, setfornecedores] = useState([]);
    const [idFornecedor, setidfornecedor] = useState();
    const [nome, setnome] = useState();
    const [email, setemail] = useState();
    const [celular, setcelular] = useState();
    const { handleLogout } = useContext(Context);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch("http://localhost:3002",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then(function (data) {
                setpecas(data);
                setpeca(data[0]);
            })
            .catch(function (error) {
                handleLogout();
                console.log(error);
            });
        fetch("http://localhost:3003",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then(function (data) {
                setfornecedores(data);
                setnome(data[0].id);
            })
            .catch(function (error) {
                handleLogout();
                console.log(error);
            });
    }, []);

    const selectpeca = (e) => {
        document.querySelector("#selectFornecedor").value = "";
        setnome("");
        setemail("");
        setcelular("");
        let id = e.target.value;
        fetch("http://localhost:3002/" + id,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => resp.json())
            .then(function (data) {
                setpeca(data);
            })
            .catch(function (error) {
                handleLogout();
                console.log(error);
            });
    };

    const selectNome = (e) => {
        let idFor =  e.target.value;
        fornecedores.map((f) => {
            if (f.id == idFor) {
                setidfornecedor(f.id);
                setnome(f.nome);
                setemail(f.email);
                setcelular(f.celular);
            }
        });
    };

    const selectEmail = (e) => {
        setemail(e.target.value);
    };

    const selectCelular = (e) => {
        setcelular(e.target.value);
    };

    const salvaNovoFornecedor= () => {
        const newFornecedor = peca.fornecedores.filter(f => f.id == idFornecedor )[0] == undefined;
        if (!newFornecedor) {
            return
        }
        const fornecedor = {
            "id": idFornecedor,
            nome,
            email,
            celular,
        };
        fetch("http://localhost:3002/" + peca.id, {
            method: "POST",
            body: JSON.stringify(fornecedor),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`
            },
        })
            .then(function (res) {
                fetch("http://localhost:3002",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })  .then((resp) => resp.json())
                    .then(function (data) {
                        setpecas(data);
                        console.log(data);
                        const novaPeca = data.filter(c => c.id == peca.id);
                        setpeca(novaPeca[0]);
                        document.querySelector("#selectFornecedor").value = "";
                        setnome("");
                        setemail("");
                        setcelular("");
                    })
                    .catch(function (error) {
                        handleLogout();
                        console.log(error);
                    });
            })
            .catch(function (error) {
                handleLogout();
                console.log(error);
            });
    };

    return (
        <>
            <Header />
            <div className="container-pecas">
                <div className="titulo">Gestão de Peças</div>
                <div className="row">
                    <label>Peça:</label>
                    <div className="col-6">
                        <select class="form-select form-select-md mb-3" onChange={selectpeca}>
                            {pecas.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </button>
                        <button className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {peca && (
                    <div>
                        <div className="row">
                            <div className="col-md-2 col-sm-12">
                                Código de Série:
                                <br /> <strong>{peca.codigoDeSerie}</strong>
                            </div>
                            <div className="col">
                                Fabricante:
                                <br /> <strong>{peca.fabricante}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <label>Fornecedores:</label>
                            <div className="col">
                                <div className="fornecedor">
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Nome</Th>
                                                <Th>E-mail</Th>
                                                <Th>Celular</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {peca.fornecedores.map((f) => (
                                                <Tr key={f.id}>
                                                    <Td>{f.nome}</Td>
                                                    <Td>{f.email}</Td>
                                                    <Td>{f.celular}</Td>
                                                    <Td></Td>
                                                </Tr>
                                            ))}
                                            <Tr>
                                                <Td>
                                                    <select id="selectFornecedor" style={{ width: "90%" }} className="form-select" onChange={selectNome}>
                                                        <option value="" disabled selected>Selecione um Fornecedor</option>
                                                        {fornecedores.map((f) => (
                                                            <option key={f.id} value={f.id}>
                                                                {f.nome}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Td>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        style={{ width: "90%" }}
                                                        className="form-control"
                                                        placeholder="E-mail"
                                                        onChange={selectEmail}
                                                        value={email}
                                                        disabled
                                                    />
                                                </Td>
                                                <Td>
                                                    <input
                                                        type="text"
                                                        style={{ width: "90%" }}
                                                        className="form-control"
                                                        placeholder="Celular"
                                                        onChange={selectCelular}
                                                        value={celular}
                                                        disabled
                                                    />
                                                </Td>
                                                <Td>
                                                    <button className="confirmButton" style={{ width: "90%" }} onClick={() => salvaNovoFornecedor()}>
                                                        Adicionar
                                                    </button>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
