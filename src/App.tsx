import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rota de cadastro */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Rota da home */}
      <Route path="/home" element={<HomePage />} />

      {/* Rota padrão */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;