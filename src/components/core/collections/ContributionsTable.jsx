import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import SimpleDropdown from '@/components/global/SimpleDropdown.jsx';
import { TbDownload, TbFileTypePdf, TbFileText } from 'react-icons/tb';
import { firstUpperCase } from '@/lib/utils';

const ContributionsTable = ({ collections, showDownload = true, showTotal = true, exportName = 'Contributions' }) => {
  const totalAmount = useMemo(() => {
    return collections.reduce((acc, c) => acc + (c?.amount || 0), 0);
  }, [collections]);

  const formatName = (contributor) => {
    const f = firstUpperCase(contributor?.firstName);
    const l = firstUpperCase(contributor?.lastName);
    const full = [f, l].filter(Boolean).join(' ').trim();
    return full || '-';
  };

  const buildHtmlTable = () => {
    const rows = collections
      .map(
        (c) =>
          `<tr>
            <td>${formatName(c?.contributor)}</td>
            <td>${c?.category?.name || '-'}</td>
            <td>${firstUpperCase(c?.status || '')}</td>
            <td>${c?.collectedAt ? format(new Date(c.collectedAt), 'MMM d, yyyy') : '-'}</td>
            <td>${Number(c.amount ?? 0).toLocaleString('en-NG')}</td>
          </tr>`
      )
      .join('');
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
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
              ${showTotal ? totalRow : ''}
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
      {showDownload && (
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
      )}
      <table className="min-w-[700px] w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3 text-sm font-medium">Name</th>
            <th className="text-left p-3 text-sm font-medium">Category</th>
            <th className="text-left p-3 text-sm font-medium">Status</th>
            <th className="text-left p-3 text-sm font-medium">Date</th>
            <th className="text-left p-3 text-sm font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((c) => (
            <tr key={c._id} className="border-t border-gray-200">
              <td className="p-3 text-sm">{formatName(c?.contributor)}</td>
              <td className="p-3 text-sm">{c?.category?.name || '-'}</td>
              <td className="p-3 text-sm capitalize">{c.status}</td>
              <td className="p-3 text-sm">{c?.collectedAt ? format(new Date(c.collectedAt), 'MMM d, yyyy') : '-'}</td>
              <td className="p-3 text-sm">₦{Number(c.amount ?? 0).toLocaleString('en-NG')}</td>
            </tr>
          ))}
          {showTotal && (
            <tr className="border-t border-gray-200">
              <td colSpan={4} className="p-3 text-sm font-medium text-right">Total Amount</td>
              <td className="p-3 text-sm font-medium">₦{Number(totalAmount).toLocaleString('en-NG')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

ContributionsTable.propTypes = {
  collections: PropTypes.array.isRequired,
  showDownload: PropTypes.bool,
  showTotal: PropTypes.bool,
  exportName: PropTypes.string,
};

export default ContributionsTable;
