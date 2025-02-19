import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import TaxForm from './Components/TaxReceiptForm';
import PrivateRoute from './PrivateRoute';


function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute>
            <TaxForm />
        </PrivateRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing

















