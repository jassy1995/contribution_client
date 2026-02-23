import React from 'react';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SimpleDropdown = ({ trigger, items, direction = 'bottom-right' }) => {
  const variants = {
    hidden: { y: '-10px', opacity: 0 },
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
      y: '-10px',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
  };
  return (
    <Menu>
      {({ open }) => (
        <div className={classNames('relative block z-10', { 'z-20': open })}>
          <Menu.Button as="div" className="w-full">
            {trigger}
          </Menu.Button>
          <AnimatePresence initial={false} mode="wait">
            {open && (
              <Menu.Items
                as={motion.div}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                static
                className={classNames(
                  'absolute bg-white text-gray-900 shadow border border-gray-200 p-2 rounded-xl flex flex-col z-50 min-w-[200px]',
                  { 'top-full right-0 mt-2': direction === 'bottom-right' },
                  { 'bottom-full right-0 mb-2': direction === 'top-right' },
                  { 'left-full bottom-0 ml-2': direction === 'right-bottom' }
                )}
              >
                {items.map((item, i) => (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          `whitespace-nowrap flex items-center px-3 py-2 rounded-lg space-x-4 transition-all`,
                          { 'bg-zinc-900/5': active }
                        )}
                        onClick={item?.onClick ?? null}
                      >
                        {!!item.icon && <span>{item.icon}</span>}
                        <span>{item.text}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            )}
          </AnimatePresence>
        </div>
      )}
    </Menu>
  );
};

SimpleDropdown.propTypes = {
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      icon: PropTypes.element,
      onClick: PropTypes.func,
    })
  ),
  direction: PropTypes.oneOf(['bottom-right', 'top-right', 'right-bottom']),
};

export default SimpleDropdown;
