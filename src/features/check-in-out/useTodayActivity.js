import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const {
    data: todayActivity,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["today-Activity"],
    queryFn: getStaysTodayActivity,
  });
  if (error) throw new Error("error while fetching todays stay activity");
  return { todayActivity, isLoading };
}
