import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register.jsx";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default Router;
