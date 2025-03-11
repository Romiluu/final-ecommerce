import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CoursesList from "../pages/CoursesList";
import Login from "../auth/Login";
 import Register from "../auth/Register";

 
 const Routing = () => {
   return (
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="*" element={<Navigate to="/" />} /> 
       <Route path="/courses" element={<CoursesList />} />
     </Routes>
   );
 };
 
 export default Routing;