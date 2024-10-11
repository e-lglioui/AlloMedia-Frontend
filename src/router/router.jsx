import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import ForgetPassword  from "../pages/forgetPassword.jsx";
import ResetPasswordForm   from "../pages/resetPassword.jsx";
import Redu from "../pages/redux.jsx";
function Router() {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/l" element={<Redu />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
            </Routes>
        </div>
    );
}

export default Router;
