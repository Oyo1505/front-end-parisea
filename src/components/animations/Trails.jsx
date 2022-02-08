import React from 'react';
import { useTrail, a } from 'react-spring';

const Trails = ({  children, ...props }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
      config: { duration : 300},
      opacity:  1,
      x:  0,
      from: { opacity: 0, x: -30},
    })
    return (
      <div style={{display : 'flex', flexDirection : "row"}} {...props}>
        <div>
          {trail.map(({ x }, index) => (
            <a.div
              key={items[index]}
              style={{ transform: x.interpolate((x) => `translate3d(${x}px,0px,0)`) }}>
              <a.div>{items[index]}</a.div>
            </a.div>
          ))}
        </div>
      </div>
    )
};

export default Trails;
