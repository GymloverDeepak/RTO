import './App.css';
import TaxReceipt from './Components/TaxReceipt';

function App() {
  const taxData = {
    registrationNo: "JK12C8989",
    receiptNo: "HRT250212460893",
    paymentDate: "12-FEB-2025 12:59 AM",
    ownerName: "MOHAMMAD HAMID",
    chassisNo: "MB1PCEHD0PALN9033",
    taxMode: "DAYS",
    vehicleType: "CONTRACT CARRIAGE/PASSENGER VEHICLES",
    vehicleClass: "BUS",
    mobileNo: "9596703618",
    checkpostName: "GURUGRAM",
    seatCapacity: "37",
    paymentMode: "ONLINE",
    taxStartDate: "12-FEB-2025 12:59 AM",
    taxEndDate: "13-FEB-2025 12:59 AM",
    taxAmount: 900,
    fineAmount: 0,
    totalAmount: 900,
    totalAmountWords: "NINE HUNDRED ONLY"
};

{/* <TaxReceipt data={taxData} /> */}

  return (
    <div className="App">
    <TaxReceipt data={taxData} />
    </div>
  );
}

export default App;
