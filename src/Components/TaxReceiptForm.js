import React, { useState, useEffect } from "react";
import MhTaxReceipt from "./MhTaxReceipt";
import PunjabTaxReceipt from "./PunjabTaxReceipt";
import RjTaxReceipt from "./RjTaxReceipt";
import TaxReceipt from "./TaxReceipt"; // Ensure correct path
import UkTaxReceipt from "./UkTaxReceipt";
import UpTaxReceipt from "./UpTaxReceipt";
import WbTaxReceipt from "./WbTaxReceipt";
const numberToWords = (num) => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  if (num === 0) return "Zero Only";

  const convert = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
  };

  return convert(num) + " Only";
};

const formatDateTimeForInput = (date) => {
  return date.toISOString().slice(0, 16);
};

const TaxForm = () => {
  const [selectedTaxRegion, setSelectedTaxRegion] = useState("");
  const [formData, setFormData] = useState({
    registrationNo: "",
    receiptNo: "",
    paymentDate: new Date().toLocaleString("en-GB"),
    ownerName: "",
    chassisNo: "",
    paymentMode: "ONLINE",
    taxMode: "Days", // Default value
    taxStartDate: formatDateTimeForInput(new Date()) ||"",
    taxEndDate: formatDateTimeForInput(new Date()) || "",
    vehicleType: "",
    vehicleClass: "",
    mobileNo: "",
    checkpostName: "",
    seatCapacity: "",
    serviceType:"",
    bankRefrelNo: "",
    taxAmount: "",
    fineAmount: "",
    totalAmount: "",
    totalAmountWords: "",
  });

  useEffect(() => {
    if (formData.totalAmount) {
      const total = parseInt(formData.totalAmount, 10);
      if (!isNaN(total)) {
        setFormData((prevData) => ({
          ...prevData,
          totalAmountWords: numberToWords(total),
        }));
      }
    }
  }, [formData.totalAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Tax Receipt Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Tax Region Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>Tax Region:</label>
          <select
            name="taxRegion"
            value={selectedTaxRegion}
            onChange={(e) => setSelectedTaxRegion(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="UP">UP TAX</option>
            <option value="WESTBENGAL">WEST-BENGAL</option>
            <option value="UTTARAKHAND">UTTARAKHAND TAX</option>
            <option value="HARYANA">HARYANA TAX</option>
            <option value="RAJASTHAN">RAJASTHAN TAX</option>
            <option value="PUNJAB">PUNJAB TAX</option>
            <option value="MAHARASHTRA">MAHARASHTRA TAX</option>
          </select>
        </div>

        {/* Two Inputs per row */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
          {Object.keys(formData).map(
            (key) =>
              key !== "taxRegion" &&
              key !== "taxMode" &&
              key !== "taxStartDate" &&
              key !== "taxEndDate" && (
                <div key={key} style={{ flex: "1 1 calc(50% - 10px)", marginBottom: "10px" , justifyContent: "space-between", gap: "10px", alignItems: "center"}}>
                  <label style={{ display: "block", fontWeight: "bold" }}>
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    style={{
                      width: "90%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    readOnly={key === "paymentDate" || key === "totalAmountWords"}
                  />
                </div>
              )
          )}
        </div>

        {/* Tax Mode & Tax Date Fields */}
{/* Tax Mode & Tax Date Fields */}
<div style={{ display: "flex", flexWrap: "wrap",  justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
  {/* Tax Mode */}
  <div style={{ flex: "1 1 calc(50% - 10px)", marginBottom: "10px", marginRight: "10px" }}>
    <label style={{ display: "block", fontWeight: "bold" }}>Tax Mode:</label>
    <select
      name="taxMode"
      value={formData.taxMode}
      onChange={handleChange}
      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    >
      <option value="Days">Days</option>
      <option value="Weekly">Weekly</option>
      <option value="Monthly">Monthly</option>
      <option value="Quarter">Quarter</option>
      <option value="Half Year">Half Year</option>
      <option value="Yearly">Yearly</option>
    </select>
  </div>

  {/* Tax Start Date */}
  <div style={{ flex: "1 1 calc(50% - 10px)", marginBottom: "10px", marginRight: "10px" }}>
    <label style={{ display: "block", fontWeight: "bold" }}>Tax Start Date:</label>
    <input
      type="datetime-local"
      name="taxStartDate"
      value={formData.taxStartDate}
      onChange={handleChange}
      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    />
  </div>

  {/* Tax End Date */}
  <div style={{ flex: "1 1 calc(50% - 10px)", marginBottom: "10px" }}>
    <label style={{ display: "block", fontWeight: "bold" }}>Tax End Date:</label>
    <input
      type="datetime-local"
      name="taxEndDate"
      value={formData.taxEndDate}
      onChange={handleChange}
      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    />
  </div>
</div>



        <button
          type="submit"
          style={{
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generate Receipt
        </button>
      </form>
      <br />

{/* Conditionally Render Tax Receipt */}
{selectedTaxRegion === "UP" && <UpTaxReceipt data={formData} />}
{selectedTaxRegion === "UTTARAKHAND" && <UkTaxReceipt data={formData} />}
{selectedTaxRegion === "HARYANA" && <TaxReceipt data={formData} />}
{selectedTaxRegion === "RAJASTHAN" && <RjTaxReceipt data={formData} />}
{selectedTaxRegion === "WESTBENGAL" && <WbTaxReceipt data={formData} />}
{selectedTaxRegion === "PUNJAB" && <PunjabTaxReceipt data={formData} />} {selectedTaxRegion === "MAHARASHTRA" && <MhTaxReceipt data={formData} />}
    </div>
  );
};

export default TaxForm;
