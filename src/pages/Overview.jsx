import PageTitle from '../components/PageTitle.jsx';
import Card from '../components/global/Card.jsx';
import { useGetOverview, useGetContributionsQuery } from '@/lib/api/collections.js';
import ContributionsTable from '@/components/core/collections/ContributionsTable.jsx';

const Overview = () => {
  const { data: { users = 0, contributedAmount = 0, walletBalance = 0, debitTransaction = 0, creditTransaction = 0 } = {}, isLoading } = useGetOverview();
  const {
    data: { pages = [] } = {},
    isLoading: isCollectionsLoading,
  } = useGetContributionsQuery({ limit: 10 });
  const collections = pages.flatMap((p) => p?.contributions || []);
  return (
    <>
      <PageTitle>Overview</PageTitle>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-slate-200 rounded-3xl animate-pulse min-h-[100px]"></div>
          <div className="bg-slate-200 rounded-3xl animate-pulse min-h-[100px]"></div>
          <div className="bg-slate-200 rounded-3xl animate-pulse min-h-[100px]"></div>
          <div className="bg-slate-200 rounded-3xl animate-pulse min-h-[100px]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            <Card className="px-6 py-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">{Number(walletBalance).toLocaleString('en-NG')}</div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">Wallet balance</p>
              </div>
            </Card>
            <Card className="px-6 py-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">{Number(contributedAmount).toLocaleString('en-NG')}</div>
              <div className="flex items-center mb-1">
                <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden mt-1">Contributed Amount</p>
              </div>
            </Card>
             <Card className="px-6 py-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">{Number(creditTransaction).toLocaleString('en-NG')}</div>
              <div className="flex items-center mb-1">
                <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden mt-1">Credit Transaction</p>
              </div>
            </Card>
            <Card className="px-6 py-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">{Number(debitTransaction).toLocaleString('en-NG')}</div>
              <div className="flex items-center mb-1">
                <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden mt-1">Debit Transaction</p>
              </div>
            </Card>
            <Card className="px-6 py-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">{users}</div>
              <div className="flex items-center mb-1">
                <p className="text-sm text-ellipsis whitespace-nowrap overflow-hidden mt-1">Users</p>
              </div>
            </Card>
          </div>
          <div className="mt-10">
            {isCollectionsLoading ? (
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
            ) : (
              <ContributionsTable collections={collections} showDownload={false} showTotal={false} exportName="Latest Contributions" />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
