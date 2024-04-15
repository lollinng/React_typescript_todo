import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { TodosProvider } from './store/todos.tsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TodosProvider>
        {/* Adding browser router for reat-router-dom */}
        <App />
      </TodosProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
