import React from 'react';
import PropTypes from 'prop-types';

const NoData = ({ icon, text }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-x-2 md:space-y-0 text-center rounded-3xl border-2 border-dashed border-zinc-300 py-16 px-8 text-zinc-500">
      {!!icon && icon}
      <p>{text || 'No data'}</p>
    </div>
  );
};

NoData.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
};

export default NoData;
