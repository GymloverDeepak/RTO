import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import watermarkImage from "../Logo.jpeg"; // Ensure correct path
import { QRCodeCanvas } from "qrcode.react";

const TaxReceipt = ({ data = {} }) => {
  const pdfRef = useRef();

  const formatReceivedDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const taxStartDate = formatReceivedDate(data.taxStartDate);
  const taxEndDate = formatReceivedDate(data.taxEndDate);

  const downloadPDF = () => {
    if (!pdfRef.current) return;
    html2canvas(pdfRef.current, { scale: 1.5, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.6);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let imgHeight = (canvas.height * pdfWidth) / canvas.width;

      if (imgHeight > pdf.internal.pageSize.getHeight()) {
        imgHeight = pdf.internal.pageSize.getHeight();
      }

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
      const regNo = data.registrationNo || "UNKNOWN";
      const lastFourDigits = regNo.slice(-4);
      const fileName = `${lastFourDigits}.pdf`;
      pdf.save(fileName);
    });
  };

  return (
    <div>
      <div
        ref={pdfRef}
        style={{
          position: "relative",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          background: "#fff",
          width: "210mm",
          minHeight: "297mm",
        }}
      >
         <div
          style={{
            position: "absolute",
            top: "0%",
            fontSize: "19px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.2)",
            zIndex: -1,
            whiteSpace: "nowrap",
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            lineHeight: "1.2",
            paddingTop: "20px",
            paddingLeft: "10px",
          }}
        >
          {[...Array(20)].map((_, index) => (
            <div key={index} style={{ width: "100%", display: "flex" }}>
              <span style={{ letterSpacing: "1px" }}>
                {data.registrationNo} / {data.paymentDate}&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span style={{ letterSpacing: "1px" }}>
                {data.registrationNo} / {data.paymentDate}
              </span>
            </div>
          ))}
        </div>
      {/* Adjusted Watermark Position (Top-Middle) & Darker */}
      <img
        src={watermarkImage}
        alt="Watermark"
        style={{
          position: "absolute",
          width: "40%", // Reduced size
          height: "auto",
          left: "50%",
          top: "10%", // Adjusted position
          transform: "translateX(-50%)",
          opacity: 0.5, // Darker watermark
          zIndex: -1,
        }}
      />
        <h2 style={{ textAlign: "center", textTransform: "uppercase", textDecoration: "underline", fontSize: "15px" }}>GOVERNMENT OF HARYANA</h2>
        <h4 style={{ textAlign: "center", fontSize: "12px" }}>Department of Transport</h4>
        <h3 style={{ textAlign: "center", fontSize: "12px" }}>Checkpost Tax e-Receipt</h3>

        <div style={{ textAlign: "left", fontSize: "12px", paddingLeft: "10px" }}>
          <p><strong>Registration No:</strong> {data.registrationNo || "N/A"}</p>
          <p><strong>Receipt No:</strong> {data.receiptNo || "N/A"}</p>
          <p><strong>Payment Date:</strong> {data.paymentDate || "N/A"}</p>
          <p><strong>Owner Name:</strong> {data.ownerName || "N/A"}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "5px" }}>
          <div style={{ width: "50%", textAlign: "left", paddingLeft: "10px" }}>
            <p><strong>Vehicle Type:</strong> {data.vehicleType || "N/A"}</p>
            <p><strong>Mobile No.:</strong> {data.mobileNo || "N/A"}</p>
            <p><strong>Bank Ref. No.:</strong> {data.bankRefrelNo || "N/A"}</p>
          </div>
          <div style={{ width: "50%", textAlign: "left" }}>
            <p><strong>Chassis No.:</strong> {data.chassisNo || "N/A"}</p>
            <p><strong>Tax Mode:</strong> {data.taxMode || "N/A"}</p>
            <p><strong>Vehicle Class:</strong> {data.vehicleClass || "N/A"}</p>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", fontSize: "12px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #000" }}>
              <th style={{ textAlign: "left", padding: "4px" }}>Particular</th>
              <th style={{ padding: "4px" }}>Fees/Tax</th>
              <th style={{ padding: "4px" }}>Fine</th>
              <th style={{ padding: "4px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "left", padding: "4px" }}>MV Tax ({taxStartDate} TO {taxEndDate})</td>
              <td style={{ padding: "4px" }}>{data.taxAmount || "0"}</td>
              <td style={{ padding: "4px" }}>{data.fineAmount || "0"}</td>
              <td style={{ padding: "4px" }}>{data.totalAmount || "0"}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ textAlign: "left", fontSize: "12px" }}><strong>Grand Total:</strong> ₹ {data.totalAmount || "0"} /- ({data.totalAmountWords || "Zero"})</h3>
        <p style={{ textAlign: "left", fontSize: "10px" }}><strong>Note:</strong> This is a computer-generated receipt; no signature is required.</p>
        <p><strong>Scan the QR code for verification:</strong></p>
        <div style={{ position: "absolute", top: "20px", right: "20px", background: "#fff", padding: "5px" }}>
          <QRCodeCanvas value="https://kms.parivahan.gov.in" size={150} />
        </div>
      </div>

      <button onClick={downloadPDF} style={{ padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}>Download PDF</button>
    </div>
  );
};

export default TaxReceipt;