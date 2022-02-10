import React from "react";
import { useTrail, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "../../assets/css/animation/animation.css";
const Trails = ({ children, config }) => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : -40,
    from: { opacity: 0 },
  });

  return (
    <>
      <div className="list-cards-nfts" ref={ref}>
        {trail.map(({ x, opacity }, index) => (
          <animated.div
            key={index}
            className="trailsText"
            style={{
              transform: x.interpolate((x) => `translate3d(${x}px,0px,0)`),
              position: "relative",
            }}
          >
            <animated.div style={{ opacity }} key={items[index]._id}>
              {items[index]}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default Trails;
