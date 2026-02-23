import React, { useEffect } from 'react';
import classNames from 'classnames';
import Backdrop from './Backdrop.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from './IconButton.jsx';
import PropTypes from 'prop-types';
import { TbX } from 'react-icons/tb';

const Modal = ({ isOpen, title, padding = true, onClose, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflowY = 'auto';
  }, [isOpen]);

  const variants = {
    hidden: {
      y: '-100px',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100px',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isOpen && (
        <Backdrop onClick={onClose} className="text-black">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classNames('w-full overflow-hidden mx-auto relative bg-white rounded-lg min-h-52', {
              'p-8': padding,
              'max-w-3xl': size === 'md',
              'max-w-lg': size === 'sm',
            })}
          >
            {!!title && (
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-semibold">{title}</h3>
                <IconButton
                  onClick={onClose}
                  rounded
                  icon={<TbX size="20" />}
                  size="sm"
                  color="red"
                  variant="outlined"
                />
              </div>
            )}
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  padding: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md']),
  children: PropTypes.node.isRequired,
};

export default Modal;
