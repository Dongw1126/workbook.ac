import React from "react";
import ConfettiDot from "./ConfettiDot";

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max));

const colors = ["DarkBlue", "Crimson", "MediumSeaGreen", "Purple"]

const ConfettiCannon = ({ anchorRef, dotCount }) => (
  <>
    {new Array(dotCount).fill().map((_, index) => (
      <ConfettiDot
        key={index}
        anchorRef={anchorRef}
        color={colors[randomIntInRange(0, colors.length)]}
        initialHorizontal={randomInRange(-300, 1000)}
        initialUpwards={randomInRange(400, 2500)}
        rotate={randomInRange(0, 360)}
        size={randomInRange(50, 100)}
      />
    ))}
  </>
);

export default ConfettiCannon;
