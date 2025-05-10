import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const last = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), last);

  const {
    data: stays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stays", `last${last}`],
    queryFn: () => getStaysAfterDate(queryDate.toISOString()),
  });
  if (error) throw new Error("error while getting booking from database");
  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { stays, isLoading, confirmStays, last };
}
