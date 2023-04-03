import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}