import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPain, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking = {}, isloading } = useBooking();
  const { checkin, isCheckin } = useCheckin();
  const { settings, isloading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking.isPaid]);

  if (isloading || isLoadingSettings) return <Spinner />;
  const { id: bookingId, guests, totalPrice, numGuests, numNights } = booking;

  const optionalPrice = settings?.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmedPain) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalPrice,
          totalPrice: totalPrice + optionalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(!addBreakfast);
            setConfirmedPaid(false);
          }}
          id="breakfast"
        >
          want to add breakfast for {settings?.breakfastPrice}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          // checked={booking?.isPaid === true || confirmedPain}
          checked={confirmedPain}
          onChange={() => setConfirmedPaid(!confirmedPain)}
          disabled={confirmedPain || isCheckin}
        >
          I confirm that {guests?.fullName} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalPrice)}
          {addBreakfast &&
            ` (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalPrice
            )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPain || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
