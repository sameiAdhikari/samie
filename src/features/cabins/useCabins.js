import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
export default useCabins;
