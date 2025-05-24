import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isLoading: isSigning } = useMutation({
    mutationFn: ({ email, password, fullName }) => {
      signUpApi({ email, password, fullName });
    },
    onSettled: () => {
      toast.success("Account successfully created! Please verify your email.");
      navigate("/dashboard");
    },
    onError: () => toast.error("Error while creating account"),
  });

  return { signUp, isSigning };
}
