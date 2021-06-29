import React from 'react';
import { Button } from '../../components/Button';

// import './styles.css';

export function Lista() {
    return (
        <main className="container">
            
            <img src="" alt="Logo" />
            <Button title="Cadastrar um ponto Turístico" />

            <input type="text" placeholder="Digite um termo para buscar um ponto turístico" />
            <Button title="Buscar" />



            <h1>1º ponto</h1>
            <p>Descrição do ponto turistico</p>

            <Button title="Ver detalhes" />

            
        </main>
    )
}