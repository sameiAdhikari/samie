import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
