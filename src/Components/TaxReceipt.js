import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import watermarkImage from "../HrNew.png"; // Ensure correct path
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
  
    html2canvas(pdfRef.current, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // 🔥 30px margin
      const margin = 9.26;  
  
      const usableWidth = pdfWidth - margin * 2;
      const usableHeight = pdfHeight - margin * 2;
  
      let imgHeight = (canvas.height * usableWidth) / canvas.width;
  
      if (imgHeight > usableHeight) {
        imgHeight = usableHeight;
      }
  
      pdf.addImage(
        imgData,
        "JPEG",
        margin,   // left
        margin,   // top
        usableWidth,
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
    overflow: "hidden"
  }}
>

{/* ===== repeating background text watermark ===== */}
{/* ===== repeating background text watermark ===== */}
<div
  style={{
    position: "absolute",
    top: 0,
    left: "25px",        // 🔥 SAME as container padding
    width: "calc(100% - 50px)", // 🔥 left+right padding adjust
    height: "100%",
    fontSize: "18px",
    color: "rgba(0,0,0,0.08)",
    zIndex: 0,
    lineHeight: "28px",
    fontWeight: "bold",
    margin: 0,
    padding: 0,
    textAlign: "left"
  }}
>
  {[...Array(25)].map((_, i) => (
    <div key={i}>
      {data.registrationNo} {data.paymentDate} {data.registrationNo} {data.paymentDate}
    </div>
  ))}
</div>


{/* ===== BIG CENTER RED LOGO WATERMARK ===== */}
<img
  src={watermarkImage}
  alt=""
  style={{
    position: "absolute",
    width: "180px",
    height: "250px",
    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    opacity: 0.35,
    zIndex: 0
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
    marginBottom: "10px"
  }}
>

  {/* LEFT SIDE GOVT LOGO */}
  <img
    src={watermarkImage}
    style={{
      width: 150,   // same size as QR
      height: 170,
      objectFit: "contain"
    }}
  />

  {/* CENTER TEXT */}
  <div style={{ textAlign: "center", flex: 1 }}>
    <h2 style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>
      GOVERNMENT OF HARYANA
    </h2>
    <div style={{ fontSize: 13 }}>Department of Transport</div>
    <div style={{ fontSize: 13, fontWeight: "bold", marginTop: 4 }}>
      Checkpost Tax e-Receipt
    </div>
  </div>

  {/* RIGHT SIDE QR */}
 <div style={{display:"flex", justifyContent:"flex-end", marginTop:10}}>
  <QRCodeCanvas
    value="https://kms.parivahan.gov.in"
    size={150}
    style={{marginRight:20}}   // 👉 right margin set
  />
</div>


</div>


{/* ===== INFO SECTION ===== */}
<div 
style={{ 
  marginTop:10,
  fontSize:11,
  zIndex:2,
  position:"relative",
  color:"#222",
  fontWeight:"bold",
  lineHeight:"16px"   // 🔥 compact line height
}}>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Registration No.</b> : {data.registrationNo}</p>
<p style={{margin:2}}><b>Receipt No.</b> : {data.receiptNo}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Owner Name</b> : {data.ownerName}</p>
<p style={{margin:2}}><b>Payment Date</b> : {data.paymentDate}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Chassis No.</b> : {data.chassisNo}</p>
<p style={{margin:2}}><b>Tax Mode</b> : {data.taxMode}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Vehicle Type</b> : {data.vehicleType}</p>
<p style={{margin:2}}><b>Vehicle Class</b> : {data.vehicleClass}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Mobile No.</b> : {data.mobileNo}</p>
<p style={{margin:2}}><b>CheckPost Name</b> : {data.checkpostName}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Seating Capacity</b> : {data.seatCapacity}</p>
<p style={{margin:2}}><b>Sleeper Cap</b> : {data.sleeperCap || 0}</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Bank Ref. No.</b> : {data.bankRefrelNo}</p>
<p style={{margin:2}}><b>Payment Mode</b> : ONLINE</p>
</div>

<div style={{display:"flex",justifyContent:"space-between"}}>
<p style={{margin:2}}><b>Service Type</b> : {data.serviceType}</p>
<p style={{margin:2}}><b>Permit Type</b> : NOT APPLICABLE</p>
</div>

</div>


{/* ===== TAX TABLE ===== */}
<table style={{
  width:"100%",
  borderCollapse:"collapse",
  marginTop:5,      // 🔥 table gap kam
  fontSize:13,
  zIndex:2,
  position:"relative"
}}>

<thead>
<tr style={{border:"1px solid #3f51b5"}}>
<th style={{border:"1px solid #3f51b5",padding:6,textAlign:"left"}}>Tax/Fee Particular</th>
<th style={{border:"1px solid #3f51b5",textAlign:"left"}}>Tax/Fees</th>
<th style={{border:"1px solid #3f51b5",textAlign:"left"}}>Fine</th>
<th style={{border:"1px solid #3f51b5",textAlign:"left"}}>Total</th>
</tr>
</thead>

<tbody>
<tr>
<td style={{border:"1px solid #3f51b5",padding:6,textAlign:"left"}}>
MV Tax ({taxStartDate} TO {taxEndDate})
</td>

<td style={{border:"1px solid #3f51b5",padding:6,}}>
{data.taxAmount}
</td>

<td style={{border:"1px solid #3f51b5",padding:6}}>
{data.fineAmount}
</td>

<td style={{border:"1px solid #3f51b5",padding:6}}>
{data.totalAmount}
</td>
</tr>
</tbody>
</table>


{/* ===== TOTAL ===== */}
<p style={{marginTop:8,fontSize:13,textAlign:"left"}}>
<b>Grand Total:</b> {data.totalAmount}/- ({data.totalAmountWords})
</p>


{/* ===== NOTE ===== */}
<div style={{marginTop:12,fontSize:12,lineHeight:"18px",textAlign:"left"}}>
<b>Note :</b>

<div style={{marginTop:4,textAlign:"left"}}>
<b>Terms and Conditions:</b>
<ol style={{marginTop:4,paddingLeft:18}}>
<li>This is a computer generated printout and no signature is required.</li>
<li>Should not carry unlawful/unaccompanied goods.</li>
<li>If any false information/discrepancies are found later, necessary action will be taken.</li>
</ol>
</div>
</div>


{/* ===== SCAN QR TEXT ===== */}
<p
  style={{
    marginTop:20,
    fontSize:18,
    fontWeight:"bold",
    textAlign:"left"
  }}
>
Scan the QR code for genuinity of the receipt.
</p>


</div>

      <button onClick={downloadPDF} style={{ padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}>Download PDF</button>
    </div>
  );
};

export default TaxReceipt;