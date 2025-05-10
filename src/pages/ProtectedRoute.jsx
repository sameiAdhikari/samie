import { useEffect } from "react";
import { useAuthUser } from "../features/authentication/useAuthUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
const Fullpage = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuthUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [navigate, isLoading, isAuthenticated]
  );

  if (isLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
