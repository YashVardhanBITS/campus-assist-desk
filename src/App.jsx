
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import RequestsPage from "./pages/RequestsPage";
import ProfilePage from "./pages/ProfilePage";
import HelpPage from "./pages/HelpPage";
import AdminPage from "./pages/AdminPage";
import Register from "./components/Auth/Register";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Request routes */}
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/:type" element={<RequestsPage />} />
          <Route path="/requests/view/:requestId" element={<RequestsPage />} />
          
          {/* Profile route */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Help route */}
          <Route path="/help" element={<HelpPage />} />
          
          {/* Admin route */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
