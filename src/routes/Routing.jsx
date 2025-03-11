import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
 import Register from "../auth/Register";
 
 const Routing = () => {
   return (
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="*" element={<Navigate to="/" />} /> 
     </Routes>
   );
 };
 
 export default Routing;