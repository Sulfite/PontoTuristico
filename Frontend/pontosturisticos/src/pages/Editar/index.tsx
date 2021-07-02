import React, { FormEvent, useEffect, useState } from "react";
import { Link, Redirect, useParams } from 'react-router-dom';

import { Button } from "../../components/Button";

import './styles.css';

import LogoTipo from '../../assets/logo512.png';
import { api } from "../../services/api";
import { useQuery } from "../../hook/query";

interface PontoTuristico {
    id: number,
    nomePontoTuristico: string,
    descricaoPontoTuristico: string,
    enderecoPontoTuristico: string,
    referenciaPontoTuristico: string,
    cidadePontoTuristico: string,
    ufPontoTuristico: string,
    dataInclusaoPontoTuristico: Date;
}

const Editar: React.FC<PontoTuristico> = () => {

    const query = useQuery();
    console.log(query.get("id"));

    const [ redirect, setRedirect] = useState(false);

    const [ nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [ endereco, setEndereco] = useState('');
    const [ uf, setUf] = useState('');
    const [ cidade, setCidade] = useState('');
    const [ referencia, setReferencia] = useState('');
    const [ descricao, setDescricao] = useState('');

    const [ pontoTuristico, setPontoTuristico] = useState([]);

    useEffect(() => {
        api.get(`PontoTuristicos/${query.get("id")}`)
            .then((response) =>  {
                console.log(response.data);
                
                setNome(response.data.nomePontoTuristico);
                setDescricao(response.data.descricaoPontoTuristico);
                setCep(response.data.cepPontoTuristico);
                setEndereco(response.data.enderecoPontoTuristico);
                setReferencia(response.data.referenciaPontoTuristico);
                setCidade(response.data.cidadePontoTuristico);
                setUf(response.data.ufPontoTuristico);
            });
    },[]);

    function handlerEditar(e: FormEvent) {
        e.preventDefault();

        console.log({
            nome ,endereco ,uf ,cidade ,referencia ,descricao
        });

        const pontoTuristico = {
            "id": Number(query.get("id")),
            "nomePontoTuristico": nome,
            "descricaoPontoTuristico": descricao,
            "cepPontoTuristico": cep,
            "enderecoPontoTuristico": endereco,
            "referenciaPontoTuristico": referencia,
            "cidadePontoTuristico": cidade,
            "ufPontoTuristico": uf,
            "dataInclusaoPontoTuristico": new Date()
        }

        api.put(`PontoTuristicos/${query.get("id")}`, pontoTuristico )
            .then(res => {
                if (res.status === 204) {
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
        return <Redirect to='/'/>;
    }

    return (
        <div className="containerCadastro">

            <img src={LogoTipo} alt="Logo" />
            <form id="formCadastro" onSubmit={handlerEditar}>
                <div>
                    <label>Nome: </label>
                    <input 
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                </div>

                <div>
                    <label>Cep: </label>
                    <input
                        type="text"
                        placeholder="Cep"
                        value={cep}
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
                            <option key="SP" value="SP">SP</option>
                            <option key="RJ" value="RJ">RJ</option>
                            <option key="SC" value="SC">SC</option>
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
                        value={referencia}
                        onChange={(e) => { setReferencia(e.target.value) }}
                    />
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea 
                        value={descricao}
                        onChange={(e) => { setDescricao(e.target.value) }} 
                    />
                </div>

                <div>
                    <Link to="/">
                        <span>
                            Voltar
                        </span>
                    </Link>
                    
                    <Button type="submit" title="Editar" />
                </div>
            </form>
        </div>
    );
}

export default Editar;