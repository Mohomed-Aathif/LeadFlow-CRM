import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import LeadsPage from "./pages/leads/LeadsPage";

import CreateLeadPage from "./pages/leads/CreateLeadPage";

import EditLeadPage from "./pages/leads/EditLeadPage";

import LeadDetailsPage from "./pages/leads/LeadDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LeadsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/create"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateLeadPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id/edit"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditLeadPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LeadDetailsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;