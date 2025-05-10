import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkmood } from "../context/darkMoodContext";

function DarkMood() {
  const { isDarkmood, toggleDarkmood } = useDarkmood();
  return (
    <ButtonIcon onClick={toggleDarkmood}>
      {isDarkmood ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkMood;
