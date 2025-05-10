import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiLogin";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserApi({ fullName, avatar, password }),
    onSuccess: ({ user }) => {
      toast.success("user successfully updated");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("error while updating user information"),
  });

  return { updateUser, isUpdating };
}
