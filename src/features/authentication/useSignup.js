import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiLogin";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signUp, isLoading: isSigning } = useMutation({
    mutationFn: ({ email, password, fullName }) => {
      signUpApi({ email, password, fullName });
    },
    onSettled: () => {
      toast.success("Account successfully created! Please verify your email.");
    },
    onError: () => toast.error("Error while creating account"),
  });

  return { signUp, isSigning };
}
