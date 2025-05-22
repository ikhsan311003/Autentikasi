import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import 'bulma/css/bulma.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route: redirect ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Halaman user list, add, edit hanya bisa diakses setelah login */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />

        {/* Halaman login dan register bisa diakses langsung */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Fallback jika path tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
