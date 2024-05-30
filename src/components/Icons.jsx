import { VscFlame } from "react-icons/vsc";
import { IoFlashSharp } from "react-icons/io5";
import { IoMdBatteryCharging } from "react-icons/io";
import { FaHandPeace } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdBatteryCharging30 } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const TaskIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="#99B8D0"
      version="1.1"
      viewBox="0 0 220 220"
      xmlSpace="preserve"
    >
      <path d="M211.5 15.022C211.5 6.726 204.774 0 196.478 0H23.522C15.226 0 8.5 6.726 8.5 15.022v189.955C8.5 213.274 15.226 220 23.522 220h172.955c8.297 0 15.022-6.726 15.022-15.022V15.022zM88.5 199h-49v-45h49v45zm0-67h-49V88h49v44zm0-66h-49V21h49v45zm56.303 133.63l-26.306-26.306 11.205-11.205 15.101 15.102 23.65-23.65 11.205 11.205-34.855 34.854zm0-66.6l-26.306-26.306 11.205-11.205 15.101 15.101 23.65-23.65 11.205 11.205-34.855 34.855zm0-66.601l-26.306-26.306 11.205-11.205 15.101 15.101 23.65-23.65 11.205 11.205-34.855 34.855z"></path>
    </svg>
  );
};

export const BatteryIcon = ({ color, size }) => {
  return <MdBatteryCharging30 color={color} size={size} />;
};

export const FlameIcon = ({ color, size }) => {
  return <VscFlame color={color} size={size} />;
};

export const FlashIcon = ({ color, size }) => {
  return <IoFlashSharp color={color} size={size} />;
};

export const EnergyLimit = ({ color, size }) => {
  return <IoMdBatteryCharging color={color} size={size} />;
};

export const Hand = ({ color, size }) => {
  return <FaHandPeace color={color} size={size} />;
};

export const Robot = ({ color, size }) => {
  return <FaRobot color={color} size={size} />;
};

export const Close = ({ color, size, onClick }) => {
  return <IoMdClose onClick={onClick} color={color} size={size} />;
};

export const Trophy = ({ color, size, onClick }) => {
  return <GiLaurelsTrophy onClick={onClick} color={color} size={size} />;
};

export const ArrowRight = ({ color, size, onClick }) => {
  return (
    <MdOutlineKeyboardArrowRight onClick={onClick} color={color} size={size} />
  );
};
