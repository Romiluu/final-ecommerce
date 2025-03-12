import {Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CoursesList from "../pages/CoursesList";
import CoursesDetails from"../pages/CoursesDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../pages/ProtectedRoutes";
import Data from "../pages/Data";

 
 const Routing = () => {
   return (
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/courses" element={<CoursesList />} />
       <Route path="/courses/:id" element={<CoursesDetails/>} />
       <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
       <Route path="/datos" element={<ProtectedRoute><Data/></ProtectedRoute>}/>
       <Route path="*" element={<NotFound />} />
     </Routes>
   );
 };
 
 export default Routing;  