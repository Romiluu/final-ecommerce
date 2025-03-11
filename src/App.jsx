import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Register from "./auth/Register"; // Asegúrate de que el archivo existe
import Login from "./auth/Login";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Login />} />
      </Routes>
    </AppLayout>
  );
}

export default App;