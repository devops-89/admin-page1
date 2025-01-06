import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
)
