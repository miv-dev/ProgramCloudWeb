import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AuthMiddleware from './helpers/AuthMiddleware';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <AuthMiddleware>
            <App />
          </AuthMiddleware>
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
