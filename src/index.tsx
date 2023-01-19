import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './core/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BasicSpeedDial from './shared-components/speed-dial/basic-speed-dial';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './customTheme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ''}
                >
                    <ThemeProvider theme={customTheme}>
                        <BasicSpeedDial />
                        <App />
                    </ThemeProvider>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
