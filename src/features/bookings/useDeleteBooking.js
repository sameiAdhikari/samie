import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isloading: isDeletingBooking } = useMutation({
    mutationFn: (id) => {
      deleteBookingApi(id);
    },
    onSuccess: () => {
      toast.success(`booking is successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("there is error while deleting bookings"),
  });

  return { deleteBooking, isDeletingBooking };
}
