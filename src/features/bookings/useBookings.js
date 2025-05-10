import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export default function useBooking() {
  const queryCLient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const sorted = { field, direction };

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  // query
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sorted, page],
    queryFn: () => getBookings({ filter, sorted, page }),
  });

  // preFetchQuery
  const lastPage = Math.ceil(count / PAGE_SIZE);
  if (page < lastPage)
    queryCLient.prefetchQuery({
      queryKey: ["bookings", filter, sorted, page + 1],
      queryFn: () => getBookings({ sorted, filter, page: page + 1 }),
    });

  if (page > 1)
    queryCLient.prefetchQuery({
      queryKey: ["bookings", filter, sorted, page - 1],
      queryFn: () => getBookings({ sorted, filter, page: page - 1 }),
    });

  return { bookings, error, isLoading, count };
}
