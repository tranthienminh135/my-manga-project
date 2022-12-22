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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
document.onkeydown = KeyCheck;
function KeyCheck(event: any) {
    var KeyID = event.keyCode;
    if (KeyID === 116) {
        const a = document.createElement('a');
        a.href = window.location.href;
        a.click();
        return false;
    }
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_YOUTUBE_CLIENT_ID ? process.env.REACT_APP_YOUTUBE_CLIENT_ID : ''}
                >
                    <App />
                </GoogleOAuthProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
