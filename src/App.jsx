import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersonalPage from "./pages/PersonalPage";
import Modal from "./ui/Modal";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import PostPage from "./pages/PostPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute requireAuth={true}>
                  <Modal>
                    <AppLayout />
                  </Modal>
                </ProtectedRoute>
              }
            >
              <Route index replace element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/user/:userId" element={<PersonalPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "color-grey-0",
              color: "color-grey-700",
            },
          }}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;
