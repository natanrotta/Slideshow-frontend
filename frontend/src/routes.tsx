import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/index';
import Imagem from './pages/Imagem/index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact={true} />
            <Route component={Imagem} path="/imagem" />
        </BrowserRouter>
    );
}

export default Routes;