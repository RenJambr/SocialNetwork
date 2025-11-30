import { useUser } from "../authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requireAuth = true }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useUser();

  useEffect(() => {
    if (!isLoading && user === undefined) {
      return;
    }

    // if authentication is require and user isn't authenticated redirect to login page
    if (requireAuth && !isAuthenticated) {
      navigate("/login", { replace: true });
      // if authentication isn't require and user is authenticated redirect to home page (e.g. user try to go to the login page while it's authenticated)
    } else if (!requireAuth && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, isLoading, user, navigate, requireAuth]);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center bg-gray-700">
        <Spinner />
      </div>
    );

  if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated))
    return children;
}

export default ProtectedRoute;
