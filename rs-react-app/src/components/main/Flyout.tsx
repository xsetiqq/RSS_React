import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectAll } from '../../store/selectedItemsSlice';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selected
  );
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  if (selectedItems.length === 0) return null;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    if (selectedItems.length === 0) return;

    const csvHeaders = ['ID', 'Name', 'URL'];

    const csvRows = selectedItems.map((item) => {
      const idParts = item.id.split('/'); //
      const shortId = idParts[idParts.length - 2] || 'Unknown';

      return [
        `"${shortId}"`,
        `"${item.name}"`,
        `"${item.url || 'No URL'}"`,
      ].join(';');
    });

    const csvContent = '\uFEFF' + [csvHeaders.join(';'), ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${selectedItems.length}_items.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flyout active">
      <p>{selectedItems.length} items selected</p>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}>
        Download CSV
      </a>
    </div>
  );
};

export default Flyout;
