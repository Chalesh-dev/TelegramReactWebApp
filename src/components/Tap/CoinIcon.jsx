import React, { useEffect, useState } from "react";

const CoinIcon = ({ balance, increment, onCoinClick, currentSpark }) => {
  // console.log('incre',increment);
  const [texts, setTexts] = useState([]);

  const fadeOutText = (index) => {
    setTexts((prevTexts) =>
      prevTexts.map((text, i) => (i === index ? { ...text, opacity: 0 } : text))
    );
  };

  const handleClickText = (event) => {
    if (currentSpark === 0) {
      return;
    }
    // if (increment) {
      const { clientX, clientY } = event;
      const newText = {
        value: `+${increment}`,
        position: { x: clientX, y: clientY },
        opacity: 1,
      };
      setTexts((prevTexts) => [...prevTexts, newText]);
    // }
  };

  function handleClick() {
    if (currentSpark === 0) {
      return;
    }
    // balance = Math.round((balance + increment) * 100) / 100;
    onCoinClick();
  }

  useEffect(() => {
    // Simulate the floating effect using setInterval
    const intervalId = setInterval(() => {
      setTexts((prevTexts) =>
        prevTexts.map((text) => ({
          ...text,
          position: { ...text.position, y: text.position.y - 1 },
        }))
      );
    }, 10);

    // Clear the interval after a short duration
    setTimeout(() => {
      clearInterval(intervalId);
    }, 500);

    // Fade out the last text after it's added
    if (texts.length > 0) {
      const lastTextIndex = texts.length - 1;
      setTimeout(() => {
        fadeOutText(lastTextIndex);
      }, 1000);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [texts]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[150px] h-[150px] rounded-full relative">
        <img
          className="cursor-pointer w-full h-full"
          src="./images/coin.png"
          alt="coin"
        />
        <div
          id="LinkArea"
          onClick={(e) => {
            handleClick();
            handleClickText(e);
          }}
          className="absolute w-[150px] h-[150px] rounded-full bg-transparent z-20 top-0 right-0"
        />
      </div>
      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            color: "#c72d70",
            fontSize: "2rem",
            fontWeight: "bold",
            position: "absolute",
            top: text.position.y - 30,
            left: text.position.x - 16,
            padding: "5px",
            zIndex: 9999,
            pointerEvents: "none",
            transition: "opacity 0.5s ease", // Add a smooth fading transition
            opacity: text.opacity,
          }}
        >
          {text.value}
        </div>
      ))}
    </div>
  );
};

export default CoinIcon;
