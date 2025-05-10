import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "../authentication/useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { logOut, isLoggingOut } = useLogOut();

  return (
    <ButtonIcon onClick={() => logOut()} disabled={isLoggingOut}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
