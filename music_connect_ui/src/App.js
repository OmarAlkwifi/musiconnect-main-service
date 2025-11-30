import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from './services/authentication/AuthContext';
import PrivateRoute from './services/authentication/PrivateRoute';
import './App.css';
import LoginPage from './services/authentication/Login';
import CreateAccountPage from "./services/authentication/CreateAccount";
import ForgotPasswordPage from "./services/authentication/ForgotPassword";
import ResetPasswordPage from "./services/authentication/ResetPassword";
import VerifyEmail from "./services/authentication/VerifyEmail"; // ADD THIS
import AccountPage from "./pages/AccountPage";
import Dashboard from "./services/Dashboard";
import SpotifyServicePage from "./services/SpotifyServicePage";
import YouTubeMusicServicePage from "./services/YouTubeMusicServicePage";
import SearchServicePage from "./services/SearchServicePage";
import ExportServicePage from "./services/ExportServicePage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/music-connect/login" element={<LoginPage type="music-connect" />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/music-connect/reset-password" element={<ResetPasswordPage />} />
            <Route path="/music-connect/verify-email" element={<VerifyEmail />} /> {/* ADD THIS */}
            <Route path="/spotify/login" element={<LoginPage type="spotify" />} />
            <Route path="/youtube-music/login" element={<LoginPage type="youtube-music" />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/spotify" element={<SpotifyServicePage />} />
              <Route path="/youtube-music" element={<YouTubeMusicServicePage />} />
              <Route path="/search" element={<SearchServicePage />} />
              <Route path="/export" element={<ExportServicePage />} />
            </Route>

            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/music-connect/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;