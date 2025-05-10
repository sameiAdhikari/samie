import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Provided email and password are incorrect"),
  });
  return { login, isLoading };
}
