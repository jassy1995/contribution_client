import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const VerifiedTag = ({ verified }) => {
  return (
    <div
      className={classNames(
        'px-2.5 py-1 text-xs ml-2 leading-none inline-block rounded-full border',
        verified ? 'border-teal-600 text-teal-600' : 'border-red-600 text-red-600'
      )}
    >
      {verified ? 'Verified' : 'Unverified'}
    </div>
  );
};

VerifiedTag.propTypes = {
  verified: PropTypes.bool,
};
export default VerifiedTag;
