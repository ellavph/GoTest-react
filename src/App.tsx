import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { CreateCompanyPage } from './pages/CreateCompanyPage';

function App() {
  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rota de cadastro */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Rota para criar empresa */}
      <Route path="/create-company" element={<CreateCompanyPage />} />

      {/* Rota da home */}
      <Route path="/home" element={<HomePage />} />

      {/* Rota padrão - redireciona para home */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;