/*
-Точка входа React-application
-Отрисовывает компонент App
-Обертка над App является провайдером store
*/


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/index.scss';
import store from './redux/store';

window._store_ = store;


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


