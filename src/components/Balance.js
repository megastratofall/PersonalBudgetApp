import React from "react";

const Balance = ({ balance }) => {
  function formatNumber(number) {
  return new Intl.NumberFormat("ES-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
}



  return (
    <div>
      <div>
        <h1>BALANCE</h1>
        <h2>{formatNumber(balance)}</h2>
      </div>
    </div>
  );
};

export default Balance;
