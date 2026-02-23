import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGetTransactionsQuery } from '@/lib/api/transactions.js';
import NoData from '@/components/global/NoData.jsx';
import { TbAlertCircle, TbDownload, TbFileTypePdf, TbFileText } from 'react-icons/tb';
import { format } from 'date-fns';
import Button from '@/components/global/Button';
import SimpleDropdown from '@/components/global/SimpleDropdown.jsx';
import { firstUpperCase } from '@/lib/utils';
 
const TransactionsList = ({ type, month, year, typeName }) => {
  const {
    data: { pages = [] } = {},
    isFetching,
    isLoading: isTransactionsLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetTransactionsQuery({ type: type === 'all' ? undefined : type, month, year, limit: 10 });
 
  const transactions = useMemo(() => {
    return pages.flatMap((p) => p?.transactions || []);
  }, [pages]);
 
  const totalAmount = useMemo(() => {
    return transactions.reduce((acc, t) => acc + (t?.transactionAmount || 0), 0);
  }, [transactions]);
 
  if (isTransactionsLoading) {
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
 
  if (!transactions.length) {
    return <NoData icon={<TbAlertCircle />} text="No transaction found" />;
  }
 
  const formatName = (creator) => {
    const f = firstUpperCase(creator?.firstName);
    const l = firstUpperCase(creator?.lastName);
    const full = [f, l].filter(Boolean).join(' ').trim();
    return full || '-';
  };
 
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
  const exportName = !!mNum && !!year ? `${monthNames[(mNum || 1) - 1]} ${year} ${typeName ?? ''} Transactions` : 'Transactions';
 
  const buildHtmlTable = () => {
    const rows = transactions
      .map(
        (t) =>
          `<tr>
            <td>${formatName(t?.creator)}</td>
            <td>${t?.description || '-'}</td>
            <td>${firstUpperCase(t?.type || '')}</td>
            <td>${t?.transactionDate ? format(new Date(t.transactionDate), 'MMM d, yyyy') : '-'}</td>
            <td>${Number(t.transactionAmount ?? 0).toLocaleString('en-NG')}</td>
          </tr>`
      )
      .join('');
    const totalAmount = transactions.reduce((acc, t) => acc + (t?.transactionAmount || 0), 0);
    const totalRow = `<tr>
      <td colspan="4" style="text-align:right;font-weight:600;">Total Amount</td>
      <td style="font-weight:600;">₦${Number(totalAmount).toLocaleString('en-NG')}</td>
    </tr>`;
    return `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>${exportName}</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; font-family: Arial, sans-serif; font-size: 12px; }
            th { background: #f3f4f6; text-align: left; }
          </style>
        </head>
        <body>
          <h2>${exportName}</h2>
          <table>
            <thead>
              <tr>
                <th>Creator</th>
                <th>Description</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
              ${totalRow}
            </tbody>
          </table>
        </body>
      </html>`;
  };
 
  const handleDownloadDoc = () => {
    const html = buildHtmlTable();
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportName}.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
 
  const handleDownloadPdf = () => {
    const html = buildHtmlTable();
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    doc.title = exportName;
    const prevTitle = document.title;
    document.title = exportName;
    const tryPrint = () => {
      if (!iframe.contentWindow) return cleanup();
      iframe.contentWindow.focus();
      setTimeout(() => {
        iframe.contentWindow.print();
        cleanup(prevTitle);
      }, 300);
    };
    const cleanup = (prevTitle) => {
      setTimeout(() => {
        if (typeof prevTitle === 'string') {
          document.title = prevTitle;
        }
        if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 500);
    };
    if (doc.readyState === 'complete') {
      setTimeout(tryPrint, 300);
    } else {
      doc.addEventListener('readystatechange', () => {
        if (doc.readyState === 'complete') setTimeout(tryPrint, 300);
      });
    }
  };
 
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-3">
        <SimpleDropdown
          trigger={
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50">
              <TbDownload size={18} />
              <span className="text-sm">Download</span>
            </button>
          }
          items={[
            { text: (<span className="inline-flex items-center gap-2"><TbFileText size={16}/> <span>DOC</span></span>), onClick: handleDownloadDoc },
            { text: (<span className="inline-flex items-center gap-2"><TbFileTypePdf size={16}/> <span>PDF</span></span>), onClick: handleDownloadPdf },
          ]}
          direction="bottom-right"
        />
      </div>
      <table className="min-w-[700px] w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3 text-sm font-medium">Creator</th>
            <th className="text-left p-3 text-sm font-medium">Description</th>
            <th className="text-left p-3 text-sm font-medium">Type</th>
            <th className="text-left p-3 text-sm font-medium">Date</th>
            <th className="text-left p-3 text-sm font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t border-gray-200">
              <td className="p-3 text-sm">{formatName(t?.creator)}</td>
              <td className="p-3 text-sm">{t?.description || '-'}</td>
              <td className="p-3 text-sm capitalize">{t?.type || '-'}</td>
              <td className="p-3 text-sm">{t?.transactionDate ? format(new Date(t.transactionDate), 'MMM d, yyyy') : '-'}</td>
              <td className="p-3 text-sm">₦{Number(t.transactionAmount ?? 0).toLocaleString('en-NG')}</td>
            </tr>
          ))}
          <tr className="border-t border-gray-200">
            <td colSpan={4} className="p-3 text-sm font-medium text-right">Total Amount</td>
            <td className="p-3 text-sm font-medium">₦{Number(totalAmount).toLocaleString('en-NG')}</td>
          </tr>
        </tbody>
      </table>
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
 
TransactionsList.propTypes = {
  type: PropTypes.string,
  month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeName: PropTypes.string,
};
 
export default TransactionsList;
