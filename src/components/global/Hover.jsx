import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Hover = ({ children, className }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={className} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children(hovered)}
    </div>
  );
};

Hover.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Hover;
