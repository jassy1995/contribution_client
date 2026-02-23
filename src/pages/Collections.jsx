import React, { useState } from 'react';
import PageTitle from '../components/PageTitle.jsx';
import NewCollection from '../components/core/collections/NewCollection.jsx';
import Tabs from '../components/global/Tabs.jsx';
import CollectionsList from '@/components/core/collections/CollectionsList.jsx';
import { TbPlus} from 'react-icons/tb';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import { useGetCategoriesQuery } from '@/lib/api/collections.js';

const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

const Collections = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const { data: { categories = [] } = {}} = useGetCategoriesQuery();


  const tabs = [{ name: 'All', key: 'all' }, ...categories.map((c) => ({ name: c.name, key: c._id }))];

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <PageTitle className="mb-0!">Collections</PageTitle>
        <Button className={cn('px-4 py-2 rounded-xl bg-blue-800 text-white transition-all duration-200 flex items-center gap-3')}
          variant="outline"
          leftIcon={<TbPlus size="20" />}
          onClick={() => setIsOpen(true)}
        >
          <TbPlus size="20" />
          New
        </Button>
      </div>
      <div className='flex items-start justify-between mb-6'>
        <div className="w-fit">
          <Tabs compact index={selectedIndex} onChange={setSelectedIndex} tabs={tabs} />
        </div>
          <div className="flex items-center space-x-4">
            <div className="w-[160px]">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="py-2.5 px-5 rounded-xl w-full transition duration-300 focus-within:ring-1 ring-offset-[2px] ring-blue-800 ring-opacity-60 relative bg-transparent border border-zinc-300"
              >
                <option value="">All months</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[160px]">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="py-2.5 px-5 rounded-xl w-full transition duration-300 focus-within:ring-1 ring-offset-[2px] ring-blue-800 ring-opacity-60 relative bg-transparent border border-zinc-300"
              >
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
      </div>

      <CollectionsList
        categoryId={tabs[selectedIndex]?.key}
        categoryName={tabs[selectedIndex]?.name}
        month={month}
        year={year}
      />

      <NewCollection isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Collections;
