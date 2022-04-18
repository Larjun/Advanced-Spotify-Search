import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/reducer";

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode> 
        <StateProvider initialState = {initialState} reducer={reducer}>
            <App /> 
        </StateProvider>
    </React.StrictMode>, 
    document.getElementById('root'));
