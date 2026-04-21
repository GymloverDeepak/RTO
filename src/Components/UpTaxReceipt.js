import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import watermarkImage from "../Upnew.png"; // Ensure correct path
import { QRCodeCanvas } from "qrcode.react";

const UpTaxReceipt = ({ data }) => {
  const pdfRef = useRef();
  const itemsPerRow = 4;
  const rows = 25;
  const formatDate = (date) => {
    return new Date(date)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .toUpperCase();
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const clean = dateString.replace(",", "").trim();

    const [datePart, timePart] = clean.split(" ");

    const [day, month, year] = datePart.split("/");

    const date = new Date(`${year}-${month}-${day}T${timePart}`);

    const formattedDay = day.padStart(2, "0");

    const formattedMonth = date.toLocaleString("en-GB", { month: "short" });

    const formattedYear = year;

    const formattedTime = date
      .toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase(); // 🔥 THIS MAKES AM/PM CAPITAL

    return `${formattedDay}-${formattedMonth}-${formattedYear} ${formattedTime}`;
  };
  const paymentDate = formatDateTime(data.paymentDate);
  // const formatReceivedDate = (dateString) => {
  //   const date = new Date(dateString);

  //   return date
  //     .toLocaleString("en-GB", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     })
  //     .replace(",", "");
  // };
  const formatDateMv = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };
  const taxStartDate = formatDateMv(data.taxStartDate);
  const taxEndDate = formatDateMv(data.taxEndDate);

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input, { scale: 1.5, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.6);

      const pdf = new jsPDF("p", "mm", "a4");

      const margin = 8; // ≈ 30px
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const usableWidth = pageWidth - margin * 2;

      let imgHeight = (canvas.height * usableWidth) / canvas.width;

      if (imgHeight > pageHeight - margin * 2) {
        imgHeight = pageHeight - margin * 2;
      }

      pdf.addImage(
        imgData,
        "JPEG",
        margin, // left margin
        margin, // top margin
        usableWidth, // width with margins
        imgHeight
      );

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
          padding: "25px",
          fontFamily: "Arial",
          background: "#fff",
          width: "210mm",
          minHeight: "297mm",
          overflow: "hidden",
        }}
      >
        {/* ===== repeating background text watermark ===== */}
        {/* ===== repeating background text watermark ===== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            marginBottom: "5px",
            marginTop: "-10px",
          }}
        >
          {/* LEFT - TIME */}
          <div>{paymentDate}</div>

          {/* CENTER - SOFTWARE NAME */}
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            CheckPost V4.7.0
          </div>

          {/* RIGHT - PRINTED ON */}
          <div style={{ textAlign: "right" }}>
            Printed on : {formatDate(new Date())}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "25px",
            width: "calc(100% - 50px)",
            height: "100%",
            fontSize: "15px",
            color: "rgba(0,0,0,0.15)",
            zIndex: 0,
            lineHeight: "28px",
            fontWeight: "bold",
          }}
        >
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "12px", // 🔥 control space here
                whiteSpace: "nowrap",
              }}
            >
              {[...Array(itemsPerRow)].map((_, colIndex) => (
                <span key={colIndex}>
                  {data.registrationNo} {paymentDate}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* ===== BIG CENTER RED LOGO WATERMARK ===== */}
        <img
          src={watermarkImage}
          alt=""
          style={{
            position: "absolute",
            width: "280px",
            height: "280px",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            opacity: 0.45,
            zIndex: 0,
          }}
        />

        {/* ===== QR CODE ===== */}
        {/* ===== HEADER ROW ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
            marginBottom: "10px",
          }}
        >
          {/* LEFT SIDE GOVT LOGO */}
          <img
            src={watermarkImage}
            alt="Haryana Government Logo"
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
              backgroundColor: "white",
              padding: "5px",
            }}
          />

          {/* CENTER TEXT */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <h2
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  borderBottom: "2px solid black",
                  display: "inline-block",
                  paddingBottom: "3px",
                  marginBottom: "4px",
                }}
              >
                GOVERNMENT OF UTTAR PRADESH
              </span>
            </h2>
            <div style={{ fontSize: 13, fontWeight: "bold" }}>
              Department of Transport
            </div>
            <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 4 }}>
              Checkpost Tax e-Receipt
            </div>
          </div>

          {/* RIGHT SIDE QR */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <QRCodeCanvas
              value="https://kms.parivahan.gov.in"
              size={150}
              style={{ marginRight: 20 }} // 👉 right margin set
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            zIndex: 2,
            position: "relative",
            color: "#222",
            fontWeight: "bold",
            lineHeight: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Registration No.</b> : {data.registrationNo}
            </p>
            <p style={{ margin: 2 }}>
              <b>Receipt No.</b> : {data.receiptNo}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Payment Initialization Date</b> : {data.paymentDate}
            </p>
            <p style={{ margin: 2 }}>
              <b>Owner Name</b> : {data.ownerName}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Chassis No.</b> : {data.chassisNo}
            </p>
            <p style={{ margin: 2 }}>
              <b>Tax Mode</b> : {data.taxMode}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Vehicle Type</b> : {data.vehicleType}
            </p>
            <p style={{ margin: 2 }}>
              <b>Vehicle Class</b> : {data.vehicleClass}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Vehicle Category.</b> : {data.vehicleCatogry}
            </p>
            <p style={{ margin: 2 }}>
              <b>Mobile No.</b> : {data.mobileNo}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>CheckPost Name</b> : {data.checkpostName}
            </p>
            <p style={{ margin: 2 }}>
              <b>Seating Capacity</b> : {data.seatCapacity}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Sleeper Cap</b> : {data.sleeperCap || 0}
            </p>
            <p style={{ margin: 2 }}>
              <b>Bank Ref. No.</b> : {data.bankRefrelNo}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Payment Mode</b> : ONLINE
            </p>
            <p style={{ margin: 2 }}>
              <b>Permit Number</b> : {data.permitNumber}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Permit Validity </b> : {data.permitValidity}\
            </p>
            <p style={{ margin: 2 }}>
              <b>Fitness Validity </b> : {data.fitnessValidity}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Insurance Validity </b> : {data.insuranceValidity}
            </p>
            <p style={{ margin: 2 }}>
              \<b>PUCC Validity</b> : {data.puccValidity}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Service Type</b> : {data.serviceType}
            </p>
            <p style={{ margin: 2 }}>
              <b>Permit Type</b> : {data.permitType}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 2 }}>
              <b>Payment Confirmation Date</b> : {data.paymentDate}
            </p>
            {/* <p style={{ margin: 2 }}>
              <b>Permit Type</b> : {data.permitType}
            </p> */}
          </div>
        </div>

        {/* ===== TAX TABLE ===== */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 5, // 🔥 table gap kam
            fontSize: 13,
            zIndex: 2,
            position: "relative",
          }}
        >
          <thead>
            <tr style={{ border: "1px solid #3f51b5" }}>
              <th
                style={{
                  border: "1px solid #3f51b5",
                  padding: 6,
                  textAlign: "Center",
                }}
              >
                Tax/Fee Particular
              </th>
              <th style={{ border: "1px solid #3f51b5", textAlign: "Center" }}>
                Tax/Fees
              </th>
              <th style={{ border: "1px solid #3f51b5", textAlign: "Center" }}>
                Fine
              </th>
              <th style={{ border: "1px solid #3f51b5", textAlign: "Center" }}>
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #3f51b5",
                  padding: 6,
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight:"bold"
                }}
              >
                MV Tax ({taxStartDate} TO {taxEndDate})
              </td>

              <td style={{ border: "1px solid #3f51b5", padding: 6 }}>
                {data.taxAmount}
              </td>

              <td style={{ border: "1px solid #3f51b5", padding: 6 }}>
                {data.fineAmount}
              </td>

              <td style={{ border: "1px solid #3f51b5", padding: 6 }}>
                {data.totalAmount}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ===== TOTAL ===== */}
        <p style={{ marginTop: 8, fontSize: 13, textAlign: "left" }}>
          <b>Grand Total:</b> {data.totalAmount}/- ({data.totalAmountWords})
        </p>

        {/* ===== NOTE ===== */}
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            lineHeight: "18px",
            textAlign: "left",
          }}
        >
          <b>Note :</b>

          <div style={{ marginTop: 4, textAlign: "left" }}>
            <b>Terms and Conditions:</b>
            <ol style={{ marginTop: 4, paddingLeft: 18 }}>
              <li>
                This is a computer generated printout and no signature is
                required.
              </li>
              <li>Should not carry unlawful/unaccompanied goods.</li>
              <li>
                If any false information/discrepancies are found later,
                necessary action will be taken against the vehicle owner/driver.
              </li>
            </ol>
          </div>
        </div>

        {/* ===== SCAN QR TEXT ===== */}
        <p
          style={{
            marginTop: 20,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Scan the QR code for genuinity of the receipt.
        </p>
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

export default UpTaxReceipt;
