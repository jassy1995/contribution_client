import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { TbChevronRight } from 'react-icons/tb';

const Collapsible = ({ header, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden">
      <div
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        className={classNames(
          'flex justify-between items-center py-3 px-4 cursor-pointer border border-gray-300 hover:bg-slate-100 rounded-lg',
          { 'border-accent-400': expanded }
        )}
      >
        {header}
        <TbChevronRight
          size="20"
          className={classNames('text-gray-600 transition-all duration-300', { 'rotate-90': expanded })}
        />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {!!expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto' },
              collapsed: { height: 0 },
            }}
          >
            <div className="px-4 pt-2 pb-3">{content}</div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

Collapsible.propTypes = {
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default Collapsible;
