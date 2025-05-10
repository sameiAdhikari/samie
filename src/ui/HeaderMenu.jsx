import styled from "styled-components";
import LogOut from "../features/check-in-out/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkMood from "./DarkMood";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.5;
`;
function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkMood />
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
