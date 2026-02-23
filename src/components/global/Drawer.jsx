import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Backdrop from './Backdrop.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from './IconButton.jsx';
import { useMediaQuery } from 'react-responsive';
import { TbX } from 'react-icons/tb';

const Drawer = ({ isOpen, title, padding = true, width = 600, onClose, children }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflowY = 'auto';
  }, [isOpen]);

  const variants = {
    hidden: {
      [isMobile ? 'y' : 'x']: '100%',
      opacity: 0,
    },
    visible: {
      [isMobile ? 'y' : 'x']: '0',
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      [isMobile ? 'y' : 'x']: '100%',
      opacity: 0,
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
            className={classNames(
              'fixed inset-0 sm:inset-y-0 sm:right-0 sm:left-auto overflow-hidden',
              'w-full',
              'rounded-t-xl md:rounded-tr-none md:rounded-l-xl'
            )}
            style={{ width: isMobile ? '100%' : typeof width === 'number' ? `${width}px` : width }}
          >
            <div
              className={classNames(
                'absolute inset-x-0 bottom-0 bg-white h-min max-h-full sm:h-full overflow-x-hidden overflow-y-auto',
                'rounded-t-xl md:rounded-tr-none md:rounded-l-xl',
                { 'p-8 md:p-10': padding }
              )}
            >
              {!!title && (
                <div className="flex items-center justify-between mb-6">
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
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  padding: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Drawer;
