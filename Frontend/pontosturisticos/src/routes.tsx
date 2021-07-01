import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';


// Server=localhost;Database=master;Trusted_Connection=True;

import { Lista } from './pages/Lista/index';
import { Cadastro } from './pages/Cadastro/index';
import Editar from "./pages/Editar/index";



function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Lista} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/editar" component={Editar} />

        </BrowserRouter>
    )
}

export default Routes;