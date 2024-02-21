// HardwareCheckout.js
import React from 'react';

const HardwareCheckout = ({ hardwareData }) => {
  return (
    <div>
      <h2>Hardware Checkout</h2>
      <div>
        <h3>Available Hardware</h3>
        <ul>
          {hardwareData.available.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Checked Out Hardware</h3>
        <ul>
          {hardwareData.checkedOut.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HardwareCheckout;
