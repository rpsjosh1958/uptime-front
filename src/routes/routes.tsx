import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUpForm } from "../components/auth/signUpForm";
import { SignInForm } from "../components/auth/signInForm";
import { Dashboard } from "../pages/dashboard";
import { PrivateRoute } from "../components/privateRoute";
import { CreateMonitorForm } from "../components/monitor/createMonitorForm";

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-monitor" element={<CreateMonitorForm />} />
          </Route>
          <Route path="/" element={<SignInForm />} />
        </Routes>
      </BrowserRouter>
    );
  };