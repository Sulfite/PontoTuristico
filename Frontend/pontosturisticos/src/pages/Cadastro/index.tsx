import React, { FormEvent, useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';

import { Button } from "../../components/Button";

import './styles.css';

import LogoTipo from '../../assets/logo512.png';
import { api } from "../../services/api";

export function Cadastro() {

    const [ nome, setNome] = useState('');
    const [ cep, setCep] = useState('');
    const [ endereco, setEndereco] = useState('');
    const [ uf, setUf] = useState('');
    const [ cidade, setCidade] = useState('');
    const [ referencia, setReferencia] = useState('');
    const [ descricao, setDescricao] = useState('');

    const [ redirect, setRedirect] = useState(false);

    function handlerCadastro(e: FormEvent) {
        e.preventDefault();

        console.log({
            nome ,endereco ,uf ,cidade ,referencia ,descricao
        });


        const pontoTuristico = {
            
            "nomePontoTuristico": nome,
            "descricaoPontoTuristico": descricao,
            "enderecoPontoTuristico": endereco,
            "referenciaPontoTuristico": referencia,
            "cidadePontoTuristico": cidade,
            "ufPontoTuristico": uf,
            "dataInclusaoPontoTuristico": new Date()
        }

        api.post("PontoTuristicos", pontoTuristico )
            .then(res => {
                if (res.status === 201) {
                    setRedirect(true);
                }
            });
    }

    useEffect(() => {
        
        fetch(`https://viacep.com.br/ws/${cep}/json/unicode/`)
            .then(function(response) {
                return console.log(response);
            })
        
        // setDescricao(response.data.descricaoPontoTuristico);
        // setEndereco(response.data.enderecoPontoTuristico);
        // setReferencia(response.data.referenciaPontoTuristico);
        // setCidade(response.data.cidadePontoTuristico);
        // setUf(response.data.ufPontoTuristico);
    }, [cep]);

    if (redirect) {
        return <Redirect to='/'/>;
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
                </div>

                <div>
                    <label>Endereço: </label>
                    <input 
                        type="text" 
                        placeholder="Endereço" 
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
                            <option key="SP" value="SP">SP</option>
                            <option key="RJ" value="RJ">RJ</option>
                            <option key="SC" value="SC">SC</option>
                        </select>

                        <label>Cidade: </label>
                        <input 
                            type="text" 
                            placeholder="Cidade" 
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