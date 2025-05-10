import styled from "styled-components";
import { useRecentBooking } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isRecentBooking } = useRecentBooking();
  const { confirmStays, last, error3 } = useRecentStays();
  const { cabins, error: error2 } = useCabins();

  if (isRecentBooking || error2 || error3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        cabinCount={cabins?.length}
        confirmStays={confirmStays}
        last={last}
      />
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={last} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
