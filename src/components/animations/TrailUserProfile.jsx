import React from "react";
import { useTrail, animated, config } from "react-spring";
import Loading from "../loading/Loading";
const TrailUserProfile = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 180, friction: 15 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 40 },
  });
  if (items.length === 0) return <Loading />;
  return (
    <>
      <div className="list-cards-profile">
        {trail.map(({ y, opacity }, index) => (
          <animated.div
            key={index}
            style={{
              transform: y.interpolate((y) => `translate3d(0px,${y}px,0)`),
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

export default TrailUserProfile;
