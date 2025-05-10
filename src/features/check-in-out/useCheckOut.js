import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking ${data.id} is successfully updated`);
      navigate("/");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (data) => toast.error("there was error while checking out"),
  });

  return { checkOut, isCheckOut };
}
