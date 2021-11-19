import React from "react";
import styled from "styled-components";
import { animated, config, to, useSpring } from "react-spring";

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max));
const randomFromArray = array => array[randomIntInRange(0, array.length)];
const flipCoin = () => Math.round(Math.random()) === 1;

const StyledConfettiDot = styled.svg`
  height: 10px;
  pointer-events: none;
  position: absolute;
  width: 10px;
  will-change: transform;
`;

const AnimatedConfettiDot = animated(StyledConfettiDot);

const alignWithAnchor = anchorRef => {
  if (anchorRef.current == null) {
    return {
      initialX: 0,
      initialY: 0
    };
  }

  const { height, width } = anchorRef.current.getBoundingClientRect();

  return {
    initialX: width / 2,
    initialY: height / 2
  };
};

const Circle = ({ color, size }) => (
  <circle
    cx={`${size / 2}`}
    cy={`${size / 2}`}
    r={`${(size / 2) * 0.6}`}
    fill={color}
  />
);

const Triangle = ({ color, size }) => {
  const flipped = flipCoin();
  return (
    <polygon
      points={`${size / 2},0 ${size},${randomInRange(
        flipped ? size / 2 : 0,
        size
      )} 0,${randomInRange(flipped ? 0 : size / 2, size)}`}
      fill={color}
    />
  );
};

const Square = ({ color, size }) => {
  const flipped = flipCoin();
  return (
    <rect
      height={`${randomInRange(0, flipped ? size : size / 2)}`}
      width={`${randomInRange(0, flipped ? size / 2 : size)}`}
      fill={color}
    />
  );
};

const getRandomShape = (color, size) => {
  const Shape = randomFromArray([Circle, Square, Triangle]);
  return <Shape color={color} size={size} />;
};

const Dot = ({
  anchorRef,
  color,
  initialHorizontal,
  initialUpwards,
  rotate,
  size
}) => {
  const { initialX, initialY } = alignWithAnchor(anchorRef);
  const { horizontal, opacity, upwards } = useSpring({
    config: config.default,
    from: {
      horizontal: initialHorizontal,
      opacity: 80,
      upwards: initialUpwards
    },
    to: {
      horizontal: 0,
      opacity: 0,
      upwards: 0
    }
  });

  let totalUpwards = 0;
  let totalHorizontal = 0;
  const startTime = new Date().getTime() / 1000;
  let lastTime = startTime;
  const gravityPerSecond = 30;

  return (
    <AnimatedConfettiDot
      style={{
        opacity,
        transform: to([upwards, horizontal], (v, h) => {
          const currentTime = new Date().getTime() / 1000;
          const duration = currentTime - lastTime;
          const totalDuration = currentTime - startTime;
          const verticalTraveled = v * duration;
          const horizontalTraveled = h * duration;
          totalUpwards += verticalTraveled;
          totalHorizontal += horizontalTraveled;
          lastTime = currentTime;

          const totalGravity = gravityPerSecond * totalDuration;
          const finalX = initialX + totalHorizontal;
          const finalY = initialY - totalUpwards + totalGravity;

          return `translate3d(${finalX}px, ${finalY}px, 0) rotate(${rotate}deg)`;
        })
      }}
    >
      {getRandomShape(color, size)}
    </AnimatedConfettiDot>
  );
};

export default Dot;
