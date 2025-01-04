import React, { useState } from 'react';

export default function EmiSection() {
  // State to store input values and result
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  // EMI Calculation function
  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const tenure = parseInt(loanTenure);

    if (principal && rate && tenure) {
      // EMI formula
      const emiValue =
        (principal * rate * Math.pow(1 + rate, tenure)) /
        (Math.pow(1 + rate, tenure) - 1);

      // Calculate total payment and total interest
      const totalAmount = emiValue * tenure;
      const interestPaid = totalAmount - principal;

      setEmi(emiValue.toFixed(2));
      setTotalPayment(totalAmount.toFixed(2));
      setTotalInterest(interestPaid.toFixed(2));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded">
        <div className="card-body">
          <h3 className="text-center mb-4">EMI Calculator</h3>

          {/* Loan Amount */}
          <div className="mb-3">
            <label className="form-label">Loan Amount</label>
            <input
              type="number"
              className="form-control"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-3">
            <label className="form-label">Annual Interest Rate (%)</label>
            <input
              type="number"
              className="form-control"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          {/* Loan Tenure */}
          <div className="mb-3">
            <label className="form-label">Loan Tenure (months)</label>
            <input
              type="number"
              className="form-control"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              placeholder="Enter tenure in months"
            />
          </div>

          {/* Calculate EMI Button */}
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={calculateEmi}
              disabled={!loanAmount || !interestRate || !loanTenure}
            >
              Calculate EMI
            </button>
          </div>

          {/* Display EMI Result */}
          {emi && (
            <div className="mt-4">
              <h4 className="text-center">EMI Breakdown</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>EMI Amount</span>
                <span>₹ {emi}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Payment</span>
                <span>₹ {totalPayment}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Interest</span>
                <span>₹ {totalInterest}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
