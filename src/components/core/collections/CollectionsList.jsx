import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGetContributionsQuery} from '@/lib/api/collections.js';
import NoData from '@/components/global/NoData.jsx';
import { TbAlertCircle } from 'react-icons/tb';
import Button from '@/components/global/Button';
import ContributionsTable from './ContributionsTable.jsx';

const CollectionsList = ({ categoryId, month, year, categoryName }) => {
    const {
      data: { pages = [] } = {},
      isFetching,
      isLoading: isCollectionsLoading,
      hasNextPage,
      fetchNextPage,
    } = useGetContributionsQuery({ category: categoryId === 'all' ? undefined : categoryId, month, year, limit: 10 });
 
   const collections = useMemo(() => {
      return pages.flatMap((p) => p?.contributions || []);
    }, [pages]);

 

  if (isCollectionsLoading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-6 bg-slate-200 animate-pulse rounded" />
            <div className="h-6 bg-slate-200 animate-pulse rounded" />
            <div className="h-6 bg-slate-200 animate-pulse rounded" />
            <div className="h-6 bg-slate-200 animate-pulse rounded" />
            <div className="h-6 bg-slate-200 animate-pulse rounded" />
          </div>
          <div className="mt-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4">
                <div className="h-10 bg-slate-200 animate-pulse rounded" />
                <div className="h-10 bg-slate-200 animate-pulse rounded" />
                <div className="h-10 bg-slate-200 animate-pulse rounded" />
                <div className="h-10 bg-slate-200 animate-pulse rounded" />
                <div className="h-10 bg-slate-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!collections.length) {
    return <NoData icon={<TbAlertCircle />} text="No collection found" />;
  }
  
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const mNum = Number.parseInt(month, 10);
  const exportName = !!mNum && !!year ? `${monthNames[(mNum || 1) - 1]} ${year} ${categoryName} Contributions` : 'Contributions';

 

  return (
    <div className="w-full overflow-x-auto">
      <ContributionsTable collections={collections} showDownload exportName={exportName} showTotal />
      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={fetchNextPage}
            variant="outlined"
            color="black"
            loading={isFetching}
            className="!rounded-full mx-auto"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

CollectionsList.propTypes = {
  categoryId: PropTypes.string,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  categoryName: PropTypes.string,
};

export default CollectionsList;
