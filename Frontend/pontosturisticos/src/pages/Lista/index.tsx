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

    const [proximapagina, setproximapagina] = useState(null);
    const [paginaAnterior, setPaginaAnterior] = useState(null);


    async function handlerPesquisa() {

        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}`)
            .then(response => response.data);

        setPesquisaResultado(response);

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
                        <Button title="Anterior" />
                    ) : ''

                }

                {
                    paginaAnterior ? (
                        <Button title="Avançar" />
                    ) : ''
                }

            </div>

        </main>
    )
}