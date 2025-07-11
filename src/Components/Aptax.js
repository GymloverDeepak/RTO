import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import watermarkImage from "../Apt.webp"; // Ensure correct path
import { QRCodeCanvas } from "qrcode.react";

const Aptax = ({ data }) => {
  const pdfRef = useRef();
  const formatReceivedDate = (dateString) => {
    const date = new Date(dateString);
  
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).replace(",", "");
  };
  const taxStartDate = formatReceivedDate(data.taxStartDate);
  const taxEndDate = formatReceivedDate(data.taxEndDate);
  const downloadPDF = () => {
    const input = pdfRef.current;
  
    html2canvas(input, { scale: 1.5, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.6); // Use JPEG & reduce quality
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let imgHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
  
      // Ensure the image fits within the PDF page
      if (imgHeight > pdf.internal.pageSize.getHeight()) {
        imgHeight = pdf.internal.pageSize.getHeight();
      }
  
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
      
      // Dynamic file name using last 4 digits of registration number
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
          padding: "10px", // Reduced padding
          fontFamily: "Arial",
          background: "#fff",
          width: "210mm",
          minHeight: "297mm",
        }}
      >
        {/* Watermark */}
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

        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            textDecoration: "underline",
            marginBottom: "-14px",
            fontSize:"15px"
          }}
        >
          ANDHRA PRADESH
        </h2>
        <h4 style={{ textAlign: "center", fontSize: "12px",marginBottom: "-12px"}}>
          Department of Transport
        </h4>
        <h3 style={{ textAlign: "center", fontSize: "12px"  }}>
          Checkpost Tax e-Receipt
        </h3>

        <div style={{ textAlign: "left", fontSize: "12px", marginBottom: "2px" ,paddingLeft:"10px" }}>
          <p><strong>Registration No : &nbsp; {data.registrationNo}</strong></p>
          <p><strong>Receipt No :  &nbsp;{data.receiptNo}</strong></p>
          <p><strong>Payment Date : &nbsp; {data.paymentDate}</strong></p>
          <p><strong>Owner Name : &nbsp;{data.ownerName}</strong> </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "5px",
          }}
        >
          {/* Left Section */}
          <div style={{ width: "50%", textAlign: "left" ,paddingLeft:"10px" }}>
          <p><strong>Chassis No.: {data.chassisNo}</strong> </p>
            <p><strong>Vehicle Type:  &nbsp;{data.vehicleType}</strong></p>
            <p><strong>Mobile No : &nbsp;{data.mobileNo}</strong> </p>
            <p><strong>Sleeper Cap : &nbsp;{data.seatCapacity}</strong></p>
            <p><strong>Bank Ref. No : {data.bankRefrelNo}</strong></p>
            <p><strong>Service Type: {data.serviceType}</strong> </p>
            <p><strong>Permit Type:</strong> &nbsp;</p>
          </div>

          {/* Right Section */}
          <div style={{ width: "50%", textAlign: "left" }}>
            <p><strong>Tax Mode:{data.taxMode} </strong></p>
            <p><strong>Vehicle Class: {data.vehicleClass}</strong></p>
            <p><strong>Checkpost Name: {data.checkpostName}</strong></p>
            <p><strong>Seat Cap(Ex.Driver):  {data.seatCapacity}</strong></p>
            <p><strong>Payment Mode: ONLINE</strong> </p>
          </div>
        </div>
        {/* <h4 style={{ marginBottom: "5px" }}>Tax Details</h4> */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #000",
            fontSize: "12px",
          }}
        >
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
              <td style={{ textAlign: "left", padding: "4px" }}>
                MV Tax   <strong>({taxStartDate} TO {taxEndDate})</strong>
              </td>
              <td style={{ padding: "4px" }}>{data.taxAmount}</td>
              <td style={{ padding: "4px" }}>{data.fineAmount}</td>
              <td style={{ padding: "4px" }}>{data.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ textAlign: "left", fontSize: "12px", fontWeight: "normal" }}>
          <strong style={{ fontWeight: "bold" }}>Grand Total: </strong>₹ {data.totalAmount} /-
          ({data.totalAmountWords})
        </h3>

        <p style={{ textAlign: "left", fontSize: "10px", marginBottom: "5px" }}>
          <strong>Note: </strong> This is a computer-generated receipt; no signature is required.
        </p>
        <p
          style={{ textAlign: "left", fontSize: "10px", marginBottom: "5px" }}
        >
          <strong>2) </strong>Incorrect mentioning of vehicle class or seating
          capacity may lead to tax evasion and defaulter shall be liable for
          penal action
        </p>
        <p
         style={{ textAlign: "left", fontSize: "10px", marginBottom: "5px" }}
        >
          For any Payment / Refund related issues please contact to concerned
          Check Post Terminal.
        </p>
        <p
          style={{ textAlign: "left", fontSize: "10px", marginBottom: "5px" }}
        >
          You will also receive the payment conrmation message.
        </p>
        <p><strong>
          Scan the QR code for genuinity of the receipt, It should land at
          https://kms.parivahan.gov.in site. In case the URL is different, then
          receipt could be a fake one, please raise a complain.</strong>
        </p>
        {/* QR Code */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#fff",
            padding: "5px",
          }}
        >
          <QRCodeCanvas value="https://kms.parivahan.gov.in" size={150} />
        </div>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default Aptax;
