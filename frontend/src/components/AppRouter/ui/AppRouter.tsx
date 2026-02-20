import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../../pages/HomePage";
import { CompanyPage } from "../../../pages/CompanyPage/ui/CompanyPage";
import { PrivateRoute } from "../../PrivateRoute";
import { UserPage } from "../../../pages/UserPage";
import { LoginPage } from "../../../pages/LoginPage";
import { RegisterPage } from "../../../pages/RegisterPage";
import { SettingsPage } from "../../../pages/SettingsPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/company/:ticker" element={<CompanyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/cabinet" element={<UserPage />} />
        <Route path="/cabinet/settings" element={<SettingsPage />}/>
      </Route>
    </Routes>
  );
};
