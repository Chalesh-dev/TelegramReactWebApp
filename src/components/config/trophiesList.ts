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
    name: "Wood",
    src: img1,
    amount: 500,
  },
  {
    name: "Bronze",
    src: img2,
    amount: 1000,
  },
  {
    name: "Silver",
    src: img3,
    amount: 5000,
  },
  {
    name: "Gold",
    src: img4,
    amount: 10000,
  },
  {
    name: "Platinum",
    src: img5,
    amount: 25000,
  },
  {
    name: "Diamond",
    src: img6,
    amount: 50000,
  },
];
