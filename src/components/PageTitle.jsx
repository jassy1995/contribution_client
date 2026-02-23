import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageTitle = ({ children, className }) => {
  return <h2 className={classNames('text-2xl font-semibold mb-12', className)}>{children}</h2>;
};

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageTitle;
