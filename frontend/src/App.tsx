import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import LoginForm from "./auth/form/LoginForm";
import RegisterForm from "./auth/form/RegisterForm";
import DokterCreate from "./components/shared/DokterCreate";
import DokterEdit from "./components/shared/DokterEdit";
import PasienCreate from "./components/shared/PasienCreate";
import PasienEdit from "./components/shared/PasienEdit";
import PendaftaranCreate from "./components/shared/PendaftaranCreate";
import PendaftaranEdit from "./components/shared/PendaftaranEdit";
import RekamMedisCreate from "./components/shared/RekamMedisCreate";
import RekamMedisEdit from "./components/shared/RekamMedisEdit";
import RuangCreate from "./components/shared/RuangCreate";
import RuangEdit from "./components/shared/RuangEdit";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./hooks/useAuth";
import "./index.css";
import LayoutAdmin from "./root/admin/LayoutAdmin";
import DashboardAdmin from "./root/admin/pages/DashboardAdminPage";
import DokterAdminPage from "./root/admin/pages/DokterAdminPage";
import PasienAdminPage from "./root/admin/pages/PasienAdminPage";
import PendaftaranAdminPage from "./root/admin/pages/PendaftaranAdminPage";
import RekamMedisAdminPage from "./root/admin/pages/RekamMedisAdminPage";
import RuangAdminPage from "./root/admin/pages/RuangAdminPage";
import LayoutUser from "./root/user/LayoutUser";
import Dashboard from "./root/user/pages/Dashboard";
import PendaftaranPasien from "./root/user/pages/PendaftaranPasien";
import DokterPage from "./root/user/pages/DokterPage";
import RuangPage from "./root/user/pages/RuangPage";
import Profile from "./root/user/pages/Profile";
import AOS from "aos";
import "aos/dist/aos.css"; 
AOS.init();

function App() {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isUser = JSON.parse(localStorage.getItem("user")!) || null;

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
            path="/admin/dokter/create"
            element={isAdmin ? <DokterCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/dokter/edit/:id"
            element={isAdmin ? <DokterEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pendaftaran/*"
            element={
              isAdmin ? <PendaftaranAdminPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/pendaftaran/create"
            element={isAdmin ? <PendaftaranCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/pendaftaran/edit/:id"
            element={isAdmin ? <PendaftaranEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/ruang/*"
            element={isAdmin ? <RuangAdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/ruang/create"
            element={isAdmin ? <RuangCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/ruang/edit/:id"
            element={isAdmin ? <RuangEdit /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/rekammedis/*"
            element={
              isAdmin ? <RekamMedisAdminPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/rekammedis/create"
            element={isAdmin ? <RekamMedisCreate /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/rekammedis/edit/:id"
            element={isAdmin ? <RekamMedisEdit /> : <Navigate to="/login" />}
          />
        </Route>
        <Route element={<LayoutUser />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/pendaftaran"
            element={isUser ? <PendaftaranPasien /> : <Navigate to="/login" />}
          />
          <Route
            path="/dokter"
            element={isUser ? <DokterPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/ruang"
            element={isUser ? <RuangPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
