import React from "react";
import jsPDF from "jspdf";

const DownloadPDF = () => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("Sample PDF Document", 10, 20);

        // Body text
        doc.setFontSize(12);
        doc.text("This is a sample PDF generated using jsPDF in React.", 10, 30);

        // Add a line
        doc.line(10, 35, 200, 35);

        // Add some more text
        doc.text("You can add text, images, and more here.", 10, 45);

        // Save it
        doc.save("sample.pdf");
    };

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={generatePDF} style={{ padding: "10px 20px" }}>
                Download PDF
            </button>
        </div>
    );
};

export default DownloadPDF;
