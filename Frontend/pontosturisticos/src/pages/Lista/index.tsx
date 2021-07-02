import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button';

import './styles.css';

import LogoTipo from '../../assets/logo512.png';
import { api } from '../../services/api';

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

interface Lista {
    pontosTuristicos: PontoTuristico[]
}

export function Lista({ pontosTuristicos }: Lista) {
    const [pesquisaResultado, setPesquisaResultado] = useState<PontoTuristico[]>([]);

    const [inputPesquisa, setInputPesquisa] = useState('');

    const [proximaPagina, setProximaPagina] = useState(0);
    const [paginaAnterior, setPaginaAnterior] = useState(0);


    async function handlerPesquisa() {

        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/5/1`)
            .then(response => response);

        setProximaPagina(2); // console.log(response.headers['x-next-pagina'])

        setPesquisaResultado(response.data);
    }

    async function handlerProxima() {

        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/5/${proximaPagina}`)
            .then(response => response);

            
        // console.log(response.headers);
        setProximaPagina(2); // console.log(response.headers['x-next-pagina'])
        // console.log(response.headers['x-pages-totalpages'])
        
        setPaginaAnterior(1) // console.log(response.headers['x-pagina-atual']) - console.log(response.headers['x-pages-totalpages'])
        
        setPesquisaResultado(response.data);
    }

    async function handlerAnterior() {

        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/5/${paginaAnterior}`)
            .then(response => response);

            
        // console.log(response.headers);
        // console.log(response.headers['x-next-pagina'])
        // console.log(response.headers['x-pages-totalpages'])
        // console.log(response.headers['x-pagina-atual'])
        
        setPesquisaResultado(response.data);
    }

    return (
        <main className="container">

            <div className="containerCabecalho">
                <img src={LogoTipo} alt="Logo" />

                <Link to="/cadastro">
                    <span>
                        Cadastrar um ponto Turístico
                    </span>
                </Link>
            </div>

            <div className="containerPesquisa">

                <input
                    type="text"
                    placeholder="Digite um termo para buscar um ponto turístico"
                    onChange={(e) => { setInputPesquisa(e.target.value) }}
                />
                <Button title="Buscar" onClick={handlerPesquisa} />
            </div>

            <div className="containerLista">

                {
                    pesquisaResultado.length ? (

                        pesquisaResultado.map(itemPesquisa => (
                            <div key={itemPesquisa.id}>
                                <h1>{itemPesquisa.nomePontoTuristico}</h1>
                                <p>{itemPesquisa.descricaoPontoTuristico}</p>

                                <Link to={`/editar?id=${itemPesquisa.id}`}>
                                    <span>
                                        Ver detalhes
                                    </span>
                                </Link>
                            </div>
                        ))

                    ) : (
                        <p>Não encontrei nenhum resultado para sua busca :( </p>
                    )
                }

            </div>




            <div className="containerbutton">

                {
                    paginaAnterior ? (
                        <Button title="Anterior" onClick={handlerAnterior} />
                    ) : ''

                }

                {
                    paginaAnterior ? (
                        <Button title="Avançar" onClick={handlerProxima} />
                    ) : ''
                }

            </div>

        </main>
    )
}