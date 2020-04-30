import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import AppProvider from './hooks';

import GlobalStyle from './Styles/global';

const App: React.FC = () => (
    <>
        <AppProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </AppProvider>

        <GlobalStyle />
    </>
);
export default App;
