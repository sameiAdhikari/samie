import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmStays, last: numDays, cabinCount }) {
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkIns = confirmStays?.length;
  const occupacy =
    confirmStays?.reduce((acc, el) => acc + el.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numOfBookings}
        title="Bookings"
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupacy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
