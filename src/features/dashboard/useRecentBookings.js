import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const last = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), last);

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", `last${last}`],
    queryFn: () => getBookingsAfterDate(queryDate.toISOString()),
  });
  // console.log(bookings?.at(0));
  if (error) throw new Error("error while getting booking from database");
  return { bookings, isLoading };
}
