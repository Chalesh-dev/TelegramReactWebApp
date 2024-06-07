import React, { useEffect, useState } from "react";
import { links } from "../config/Links";
import LinkContainer from "../LinkContainer";
import "./RootLayout.css";
import LayoutLoading from "../LoadingComp/LayoutLoading";

const RootLayout = ({
  children,
  bg_img,
}: {
  children: React.ReactNode;
  bg_img: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg_img;
    img.onload = () => setImageLoaded(true);
  }, [bg_img]);

  if (!imageLoaded) {
    return <LayoutLoading />;
  }

  return (
    <div className='layout lg:hidden block' style={{ backgroundImage: `url(${bg_img})` }}>
      <div className="layout_container">
        <main>{children}</main>
        <footer className={"footer sm:gap-4 xs:gap-3"}>
          {links.map((item, index) => (
            <LinkContainer
              src={item.src}
              name={item.name}
              href={item.link}
              key={index}
            />
          ))}
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
