import React from "react";
import { Link } from 'react-router-dom';

import { Button } from "../../components/Button";

import './styles.css';

export function Cadastro() {
    return (
        <div>
            <form>
                <div>
                    <label>Nome: </label>
                    <input type="text" placeholder="Nome" />
                </div>

                <div>
                    <h1>Localização</h1>
                    
                    <label>UF:</label>
                    <input type="text" />

                    <label>Cidade: </label>
                    <input type="text" />
                </div>

                <div>
                    <label>Referência:</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Descritivo</label>
                    <textarea />
                </div>

                <div>
                    <Link to="/">
                        Voltar
                    </Link>
                    
                    <Button title="Cadastrar" />
                </div>
            </form>
        </div>
    );
}