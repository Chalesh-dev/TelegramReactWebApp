import React from "react";
import { links } from "../config/Links";
import LinkContainer from "../LinkContainer";
import "./RootLayout.css";

const RootLayout = ({
  children,
  bg_img,
}: {
  children: React.ReactNode;
  bg_img: string;
}) => {
  return (
    <>
      <div className="layout" style={{ backgroundImage: `url(${bg_img})` }}>
        <div className="layout_container">
          <main>{children}</main>
          <footer className={"footer sm:gap-4 xs:gap-3"}>
            {links.map((item, index) => (
              <LinkContainer
                link_index={index}
                src={item.src}
                name={item.name}
                href={item.link}
              />
            ))}
          </footer>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
