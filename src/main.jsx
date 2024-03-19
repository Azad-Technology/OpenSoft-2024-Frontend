import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import reducer, { initialState } from './MyContexts/Reducer.jsx';
import { StateProvider } from './MyContexts/StateProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App /> 
    </StateProvider>
  </React.StrictMode>,
)
