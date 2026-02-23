import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-999 m-0! p-0"
    >
      {children}
    </motion.div>
  );
};

Backdrop.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
