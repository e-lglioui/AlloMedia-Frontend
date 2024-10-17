import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import ForgetPassword  from "../pages/forgetPassword.jsx";
import ResetPasswordForm   from "../pages/resetPassword.jsx";
import Redu from "../pages/redux.jsx";
import VerifyEmail from '../pages/verifieEmail.jsx';
import Home from '../pages/home.jsx';
function Router() {
    return (
        <div>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/l" element={<Redu />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
                <Route path="/verify-email" element={<VerifyEmail/>} />
            </Routes>
        </div>
    );
}

export default Router;
