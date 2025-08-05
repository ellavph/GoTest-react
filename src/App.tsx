import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/HomePage';
import HomePage from './pages/HomePage'; // 1. Importe a nova página

function App() {
  return (
    <Routes>
      {/* A rota de login continua a mesma */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Adicione a nova rota para a home */}
      <Route path="/home" element={<HomePage />} />

      {/* É uma boa prática definir uma rota "padrão" ou "raiz" */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;