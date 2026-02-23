import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Tabs = ({ index, onChange, tabs, compact = false, ...props }) => {
  return (
    <Tab.Group as="div" {...props} selectedIndex={index} onChange={onChange} className={compact ? 'w-fit inline-block' : undefined}>
      <Tab.List className={`${compact ? 'inline-flex w-fit' : 'flex'} p-1.5 space-x-1 bg-blue-900/5 rounded-full`}>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className={({ selected }) =>
              classNames(
                'py-1.5 px-6 text-[.96rem] leading-5 font-medium rounded-full focus:outline-none transition-all duration-150',
                selected ? 'bg-white text-primary-800 shadow' : 'text-slate-500 hover:bg-white/12'
              )
            }
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={`mt-6 px-1 ${compact ? 'w-fit' : ''}`}>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.key}>{tab.panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

Tabs.propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      name: PropTypes.string,
      panel: PropTypes.element,
    })
  ),
  compact: PropTypes.bool,
};

export default Tabs;
