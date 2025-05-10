import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isLoading: isLoggingOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("successfully logout");
    },
  });
  return { logOut, isLoggingOut };
}
