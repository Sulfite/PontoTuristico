import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button';

import './styles.css';

export function Lista() {
    return (
        <main className="container">
            
            <div className="containerCabecalho">
                <img src="" alt="Logo" />

                <Link to="/cadastro">
                    Cadastrar um ponto Turístico
                </Link>
            </div>

            <input type="text" placeholder="Digite um termo para buscar um ponto turístico" />
            <Button title="Buscar" />



            <h1>1º ponto</h1>
            <p>Descrição do ponto turistico</p>

            <Button title="Ver detalhes" />


            <p>Não encontrei nenhum resultado para sua busca :( </p>

            <Button title="Anterior" />
            <Button title="Avançar" />

        </main>
    )
}