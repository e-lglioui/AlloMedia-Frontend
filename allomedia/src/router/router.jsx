import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import ForgetPassword  from "../pages/forgetPassword.jsx";
function Router() {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
            </Routes>
        </div>
    );
}

export default Router;
