import React from 'react';

const DownloadButtons = ({ downloadPDF, printList }) => {
    return (
        <div className="download-buttons">
            <button onClick={downloadPDF}>Export PDF</button>
            <button onClick={printList}>Print</button>
        </div>
    );
};

export default DownloadButtons;