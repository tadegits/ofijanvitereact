import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux';
import { store } from './app/store.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='608370973698-1hih3bj9qnsr0rd2pjiv2pji1g5jo7cu.apps.googleusercontent.com'>
      <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
