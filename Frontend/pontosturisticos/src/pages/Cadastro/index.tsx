import React, { FormEvent, useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';

import { Button } from "../../components/Button";

import './styles.css';

import LogoTipo from '../../assets/logo512.png';
import { api } from "../../services/api";

export function Cadastro() {

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [referencia, setReferencia] = useState('');
    const [descricao, setDescricao] = useState('');

    const [redirect, setRedirect] = useState(false);

    function handlerCadastro(e: FormEvent) {
        e.preventDefault();

        const pontoTuristico = {

            "nomePontoTuristico": nome,
            "descricaoPontoTuristico": descricao,
            "cepPontoTuristico": cep,
            "enderecoPontoTuristico": endereco,
            "referenciaPontoTuristico": referencia,
            "cidadePontoTuristico": cidade,
            "ufPontoTuristico": uf,
            "dataInclusaoPontoTuristico": new Date()
        }

        api.post("PontoTuristicos", pontoTuristico)
            .then(res => {
                if (res.status === 201) {
                    setRedirect(true);
                }
            });
    }

    async function handleProcurar() {
        const response = await  fetch(`https://viacep.com.br/ws/${cep}/json/unicode/`)
        .then(response => response.json())
        .then(data => data)

        
        setEndereco(response.logradouro);
        setCidade(response.localidade);
        setUf(response.uf);
    }

    if (redirect) {
        return <Redirect to='/' />;
    }
    return (
        <div className="containerCadastro">
            <img src={LogoTipo} alt="Logo" />
            <form id="formCadastro" onSubmit={handlerCadastro}>
                <div>
                    <label>Nome: </label>
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                </div>

                <div>
                    <label>Cep: </label>
                    <input
                        type="text"
                        placeholder="Cep"
                        onChange={(e) => { setCep(e.target.value) }}
                    />
                    <Button title="procurar" type="button" onClick={handleProcurar} />
                </div>

                <div>
                    <label>Endereço: </label>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={endereco}
                        onChange={(e) => { setEndereco(e.target.value) }}
                    />
                </div>

                <div className="containerLocalizacao">
                    <h1>Localização</h1>

                    <div>
                        <label>UF:</label>

                        <select
                            value={uf}
                            onChange={(e) => { setUf(e.target.value) }}
                        >
                            <option value="" disabled hidden>Selecione uma opção</option>
                            <option key="AC" value="AC">AC</option>
                            <option key="AL" value="AL">AL</option>
                            <option key="AP" value="AP">AP</option>
                            <option key="AM" value="AM">AM</option>
                            <option key="BA" value="BA">BA</option>
                            <option key="CE" value="CE">CE</option>
                            <option key="ES" value="ES">ES</option>
                            <option key="GO" value="GO">GO</option>
                            <option key="MA" value="MA">MA</option>
                            <option key="MT" value="MT">MT</option>
                            <option key="MS" value="MS">MS</option>
                            <option key="MG" value="MG">MG</option>
                            <option key="PA" value="PA">PA</option>
                            <option key="PB" value="PB">PB</option>
                            <option key="PR" value="PR">PR</option>
                            <option key="PE" value="PE">PE</option>
                            <option key="PI" value="PI">PI</option>
                            <option key="RJ" value="RJ">RJ</option>
                            <option key="RN" value="RN">RN</option>
                            <option key="RS" value="RS">RS</option>
                            <option key="RO" value="RO">RO</option>
                            <option key="RR" value="RR">RR</option>
                            <option key="SC" value="SC">SC</option>
                            <option key="SP" value="SP">SP</option>
                            <option key="SE" value="SE">SE</option>
                            <option key="TO" value="TO">TO</option>
                            <option key="DF" value="DF">DF</option>
                        </select>

                        <label>Cidade: </label>
                        <input
                            type="text"
                            placeholder="Cidade"
                            value={cidade}
                            onChange={(e) => { setCidade(e.target.value) }}
                        />
                    </div>
                </div>

                <div>
                    <label>Referência:</label>
                    <input
                        type="text"
                        onChange={(e) => { setReferencia(e.target.value) }}
                    />
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea onChange={(e) => { setDescricao(e.target.value) }} />
                </div>

                <div>
                    <Link to="/">
                        <span>
                            Voltar
                        </span>
                    </Link>

                    <Button type="submit" title="Cadastrar" />
                </div>
            </form>
        </div>
    );
}