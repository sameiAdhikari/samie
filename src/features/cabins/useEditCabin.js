import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin successfully editted");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => toast.error("failed to create cabin"),
  });
  return { editCabin, isEditing };
}
