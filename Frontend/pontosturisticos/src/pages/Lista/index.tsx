import React, { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import { LinkComponent } from '../../components/LinkComponent'

import './styles.css';

import LogoTipo from '../../assets/logo512.png';
import { api } from '../../services/api';

interface PontoTuristico {
    Id: number,
    NomePontoTuristico: string,
    DescricaoPontoTuristico: string,
    EnderecoPontoTuristico: string,
    ReferenciaPontoTuristico: string,
    CidadePontoTuristico: string,
    UfPontoTuristico: string,
    DataInclusaoPontoTuristico: Date;
}

interface Lista {
    pontosTuristicos: PontoTuristico[]
}

export function Lista({ pontosTuristicos }: Lista) {
    const [pesquisaResultado, setPesquisaResultado] = useState<PontoTuristico[]>([]);

    const [inputPesquisa, setInputPesquisa] = useState('');

    const [quantidadeItensPagina, setQuantidadeItensPagina] = useState(5);
    const [proximaPagina, setProximaPagina] = useState(0);
    const [paginaAnterior, setPaginaAnterior] = useState(0);

    async function handlerPesquisa() {
        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/${quantidadeItensPagina}/1`)
            .then(response => response.data);

        if (response.NextPagina > response.TotalPaginas) {
            setProximaPagina(0);
        } else {
            setProximaPagina(response.NextPagina);
        }
        setPesquisaResultado(response.ponto);
    }

    async function handlerProxima() {
        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/${quantidadeItensPagina}/${proximaPagina}`)
            .then(response => response.data);

        if (response.NextPagina > response.TotalPaginas) {
            setProximaPagina(0);
        } else {
            setProximaPagina(response.NextPagina);
        }

        setPaginaAnterior(response.PaginaAtual - 1);
        setPesquisaResultado(response.ponto);
    }

    async function handlerAnterior() {

        const response = await api.get(`PontoTuristicos/nome/${inputPesquisa}/${quantidadeItensPagina}/${paginaAnterior}`)
            .then(response => response.data);

        if (response.NextPagina > response.TotalPaginas) {
            setProximaPagina(0);
        } else {
            setProximaPagina(response.NextPagina);
        }

        if (response.PaginaAtual <= 1) {
            setPaginaAnterior(0);
        } else {
            setPaginaAnterior(response.PaginaAtual - 1);
        }
        setPesquisaResultado(response.ponto);
    }

    return (
        <main className="container">

            <div className="containerCabecalho">
                <img src={LogoTipo} alt="Logo" />

                <LinkComponent title="Cadastrar um ponto Turístico" caminho="/cadastro" />
            </div>

            <div className="containerPesquisa">

                <input
                    type="text"
                    placeholder="Digite um termo para buscar um ponto turístico"
                    onChange={(e) => { setInputPesquisa(e.target.value) }}
                />

                <select
                    name=""
                    id="ItemPagina"
                    value={quantidadeItensPagina}
                    onChange={(e) => { setQuantidadeItensPagina(Number(e.target.value)) }}
                >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <Button title="Buscar" onClick={handlerPesquisa} />
            </div>

            <div className="containerLista">
                {

                    pesquisaResultado.length ? (
                        pesquisaResultado.map(itemPesquisa => (
                            <div key={itemPesquisa.Id}>
                                <h1>{itemPesquisa.NomePontoTuristico}</h1>
                                <p>{itemPesquisa.DescricaoPontoTuristico}</p>

                                <LinkComponent title="Ver detalhes" caminho={`/editar?id=${itemPesquisa.Id}`} />

                            </div>
                        ))
                    ) :
                        (
                            <div className="naoEncontrei">
                                <p>Não encontrei nenhum resultado para sua busca 😕 </p>
                            </div>
                        )
                }
            </div>

            <div className="containerbutton">
                <div>
                    {
                        paginaAnterior ? (
                            <Button title="Anterior" onClick={handlerAnterior} />
                        ) : ''
                    }
                </div>

                <div>
                    {
                        proximaPagina ? (
                            <Button title="Avançar" onClick={handlerProxima} />
                        ) : ''
                    }
                </div>
            </div>
        </main>
    )
}