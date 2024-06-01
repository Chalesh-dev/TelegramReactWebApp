import img1 from "../../assets/trophies/Wood.png";
import img2 from "../../assets/trophies/Bronze.png";
import img3 from "../../assets/trophies/Silver.png";
import img4 from "../../assets/trophies/Gold.png";
import img5 from "../../assets/trophies/Platinum.png";
import img6 from "../../assets/trophies/Diamond.png";

export const FindIndexByName = (name: string) => {
  return images.findIndex((image) => image.name === name);
};

export const images = [
  {
    name: "Wood",
    src: img1,
  },
  {
    name: "Bronze",
    src: img2,
  },
  {
    name: "Silver",
    src: img3,
  },
  {
    name: "Gold",
    src: img4,
  },
  {
    name: "Platinum",
    src: img5,
  },
  {
    name: "Diamond",
    src: img6,
  },
];
