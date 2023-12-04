import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import LoginForm from "./auth/form/LoginForm";
import RegisterForm from "./auth/form/RegisterForm";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./hooks/useAuth";
import LayoutAdmin from "./root/admin/LayoutAdmin";
import DashboardAdmin from "./root/admin/pages/DashboardAdminPage";
import PasienAdminPage from "./root/admin/pages/PasienAdminPage";
import Dashboard from "./root/user/pages/Dashboard";
import PendaftaranPasien from "./root/user/pages/PendaftaranPasien";
import LayoutUser from "./root/user/LayoutUser";
import RekamMedisAdminPage from "./root/admin/pages/RekamMedisAdminPage";
import RuangAdminPage from "./root/admin/pages/RuangAdminPage";
import PendaftaranAdminPage from "./root/admin/pages/PendaftaranAdminPage";
import DokterAdminPage from "./root/admin/pages/DokterAdminPage";
import PasienEdit from "./components/shared/PasienEdit";
import PasienCreate from "./components/shared/PasienCreate";

function App() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  const isLogin = () => {
    if (!user) return <LoginForm />;
    if (isAdmin) return <Navigate to="/admin/dashboard" />;
    if (isUser) return <Navigate to="/" />;
  };

  const isRegister = () => {
    if (!user) return <RegisterForm />;
    if (isAdmin) return <Navigate to="/admin/dashboard" />;
    if (isUser) return <Navigate to="/" />;
  };

  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={isLogin()} />
          <Route path="/register" element={isRegister()} />
        </Route>
        <Route element={<LayoutAdmin />}>
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <DashboardAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pasien/*"
            element={isAdmin ? <PasienAdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pasien/create"
            element={isAdmin ? <PasienCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pasien/edit/:id"
            element={isAdmin ? <PasienEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/dokter/*"
            element={isAdmin ? <DokterAdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pendaftaran/*"
            element={
              isAdmin ? <PendaftaranAdminPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/ruang/*"
            element={isAdmin ? <RuangAdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/rekam-medis/*"
            element={
              isAdmin ? <RekamMedisAdminPage /> : <Navigate to="/login" />
            }
          />
        </Route>
        <Route element={<LayoutUser />}>
          <Route
            path="/"
            element={isUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/pendaftaran"
            element={isUser ? <PendaftaranPasien /> : <Navigate to="login" />}
          />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
