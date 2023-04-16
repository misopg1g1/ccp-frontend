import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login/login'
import DashboardPage from './pages/dashboard/dashboard'

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}