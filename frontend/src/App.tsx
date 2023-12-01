import "./index.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import LoginForm from "./auth/form/LoginForm";
import RegisterForm from "./auth/form/RegisterForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
