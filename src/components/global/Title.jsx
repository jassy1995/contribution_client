import React from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton.jsx';
import classNames from 'classnames';
import { TbChevronLeft } from 'react-icons/tb';

const Title = ({ text, onBack, className, disabled }) => {
  return (
    <div className={classNames('flex items-center mb-10', className)}>
      {!!onBack && (
        <IconButton
          onClick={onBack}
          variant="outlined"
          color="black"
          icon={<TbChevronLeft />}
          className="mr-4"
          disabled={disabled}
        />
      )}
      <h2 className="text-xl font-medium">{text}</h2>
    </div>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Title;
