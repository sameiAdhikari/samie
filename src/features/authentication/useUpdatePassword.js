import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/apiLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useUpdatePassword() {
  const navigate = useNavigate();

  const { mutate: updatePassword, error } = useMutation({
    mutationFn: ({ password }) => updateUser({ password }),
    onSuccess: () => {
      toast.success("Account password successfully updated");
      navigate("/login");
    },
    onError: () => toast.error("error while updating password"),
  });

  if (error) throw new Error(error.message);

  return { updatePassword };
}
