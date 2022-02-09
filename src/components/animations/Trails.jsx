import React from "react";
import { useTrail, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import "../../assets/css/animation/animation.css";
const Trails = ({ children }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.75,
  });
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 20,
    height: inView ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <>
      <div className="list-cards-nfts" ref={ref}>
        {trail.map(({ x }, index) => (
          <animated.div
            key={index}
            className="trailsText"
            style={{
              transform: x.interpolate((x) => `translate3d(${x}px,0px,0)`),
            }}
          >
            <animated.div key={items[index]._id}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default Trails;
