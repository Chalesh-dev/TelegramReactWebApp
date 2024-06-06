import img1 from "../../assets/trophies/Wood.png";
import img2 from "../../assets/trophies/Bronze.png";
import img3 from "../../assets/trophies/Silver.png";
import img4 from "../../assets/trophies/Gold.png";
import img5 from "../../assets/trophies/Platinum.png";
import img6 from "../../assets/trophies/Diamond.png";

export const FindIndexByName = (name: string) => {
  return trophies.findIndex((image) => image.name === name);
};

export const trophies = [
  {
    name: "Wooden",
    src: img1,
    reward: 500,
    threshold: 1,
  },
  {
    name: "Bronze",
    src: img2,
    reward: 1000,
    threshold: 500,
  },
  {
    name: "Silver",
    src: img3,
    reward: 5000,
    threshold: 5000,
  },
  {
    name: "Gold",
    src: img4,
    reward: 10000,
    threshold: 10000,
  },
  {
    name: "Platinum",
    src: img5,
    reward: 25000,
    threshold: 25000,
  },
  {
    name: "Diamond",
    src: img6,
    reward: 50000,
    threshold: 2500000,
  },
];
