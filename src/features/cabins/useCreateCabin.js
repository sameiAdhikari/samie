import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => toast.error("failed to create cabin"),
  });
  return { createCabin, isCreating };
}
