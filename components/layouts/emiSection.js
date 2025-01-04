import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, TextField, Grid, Typography, Box, Card, CardContent, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// Function to calculate EMI
const calculateEmi = (loanAmount, interestRate, loanTenure) => {
  const principal = parseFloat(loanAmount);
  const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
  const tenure = parseInt(loanTenure);

  if (principal && rate && tenure) {
    const emiValue =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);

    const totalAmount = emiValue * tenure;
    const interestPaid = totalAmount - principal;

    return {
      emi: emiValue.toFixed(2),
      totalPayment: totalAmount.toFixed(2),
      totalInterest: interestPaid.toFixed(2),
    };
  }

  return {
    emi: 0,
    totalPayment: 0,
    totalInterest: 0,
  };
};

export default function EmiSection() {
  // State for loan and truck details
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [truckNumberPlate, setTruckNumberPlate] = useState('');
  const [truckPurchaseDate, setTruckPurchaseDate] = useState('');
  const [truckDriverName, setTruckDriverName] = useState('');
  const [truckColor, setTruckColor] = useState('');
  const [truckSizeType, setTruckSizeType] = useState('');
  const [truckType, setTruckType] = useState(''); // New state for truck type (Container or Coil)

  // Loans state
  const [loans, setLoans] = useState([]);
  const [emiDetails, setEmiDetails] = useState(null);

  // Function to handle adding new loan with truck details
  const addLoan = () => {
    const newLoan = {
      loanAmount,
      interestRate,
      loanTenure,
      emiDetails,
      dueDate: moment().add(1, 'months').format('YYYY-MM-DD'), // Next month's EMI due date
      truckDetails: {
        truckModel,
        truckNumberPlate,
        truckPurchaseDate,
        truckDriverName,
        truckColor,
        truckSizeType,
        truckType, // Include the truck type (Container or Coil)
      },
    };
    setLoans([...loans, newLoan]);

    // Clear the form
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setTruckModel('');
    setTruckNumberPlate('');
    setTruckPurchaseDate('');
    setTruckDriverName('');
    setTruckColor('');
    setTruckSizeType('');
    setTruckType('');
    setEmiDetails(null);
  };

  // Function to handle EMI calculation when input changes
  useEffect(() => {
    if (loanAmount && interestRate && loanTenure) {
      const details = calculateEmi(loanAmount, interestRate, loanTenure);
      setEmiDetails(details);
    }
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 4 }}>
            Truck Loan EMI
          </Typography>

          {/* Add New Loan Form */}
          <Typography variant="h6" gutterBottom>Add New EMI with Truck Details</Typography>

          <Grid container spacing={2}>
            {/* Loan Amount */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loan Amount"
                fullWidth
                variant="outlined"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </Grid>

            {/* Interest Rate */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Annual Interest Rate (%)"
                fullWidth
                variant="outlined"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </Grid>

            {/* Loan Tenure */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loan Tenure (months)"
                fullWidth
                variant="outlined"
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                placeholder="Enter tenure in months"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* EMI Calculation Result */}
            <Grid item xs={12} sm={6} md={4}>
              {emiDetails && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Typography variant="body1" color="textSecondary">Calculated EMI:</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">EMI Amount:</Typography>
                    <Typography variant="body2">₹ {emiDetails.emi}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Total Payment:</Typography>
                    <Typography variant="body2">₹ {emiDetails.totalPayment}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Total Interest:</Typography>
                    <Typography variant="body2">₹ {emiDetails.totalInterest}</Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Truck Details */}
          <Typography variant="h6" sx={{ mt: 4 }}>Truck Details</Typography>
          <Grid container spacing={2}>
            {/* Truck Model */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Truck Model"
                fullWidth
                variant="outlined"
                value={truckModel}
                onChange={(e) => setTruckModel(e.target.value)}
                placeholder="Enter truck model"
              />
            </Grid>

            {/* Truck Number Plate */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Truck Number Plate"
                fullWidth
                variant="outlined"
                value={truckNumberPlate}
                onChange={(e) => setTruckNumberPlate(e.target.value)}
                placeholder="Enter truck number plate"
              />
            </Grid>

            {/* Truck Purchase Date */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Truck Purchase Date"
                fullWidth
                variant="outlined"
                type="date"
                value={truckPurchaseDate}
                onChange={(e) => setTruckPurchaseDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Truck Driver Name */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Truck Driver Name"
                fullWidth
                variant="outlined"
                value={truckDriverName}
                onChange={(e) => setTruckDriverName(e.target.value)}
                placeholder="Enter truck driver's name"
              />
            </Grid>

            {/* Truck Color */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Truck Color"
                fullWidth
                variant="outlined"
                value={truckColor}
                onChange={(e) => setTruckColor(e.target.value)}
                placeholder="Enter truck color"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Truck Size Type */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Truck Size</InputLabel>
                <Select
                  value={truckSizeType}
                  onChange={(e) => setTruckSizeType(e.target.value)}
                  label="Truck Size"
                >
                  <MenuItem value="20ft">20 Foot</MenuItem>
                  <MenuItem value="40ft">40 Foot</MenuItem>
                  <MenuItem value="80ft">80 Foot</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Truck Type (Container or Coil) */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Truck Type</InputLabel>
                <Select
                  value={truckType}
                  onChange={(e) => setTruckType(e.target.value)}
                  label="Truck Type"
                >
                  <MenuItem value="Container">Container</MenuItem>
                  <MenuItem value="Coil">Coil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={addLoan}
              disabled={!emiDetails}
            >
              Add Loan
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Loan List */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Loan List</Typography>
        {loans.length === 0 ? (
          <Typography variant="body2">No loans added yet.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {loans.map((loan, index) => {
              const dueDate = moment(loan.dueDate);
              const daysRemaining = dueDate.diff(moment(), 'days');
              const dueIn = daysRemaining <= 0 ? 'Due Today' : `${daysRemaining} Days Left`;

              return (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    boxShadow: 2,
                    borderRadius: 2,
                    bgcolor: daysRemaining <= 0 ? 'error.main' : 'background.paper',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Loan Amount: ₹ {loan.loanAmount}</Typography>
                    <Typography variant="body2">EMI: ₹ {loan.emiDetails.emi}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Due Date: {loan.dueDate} - {dueIn}
                    </Typography>

                    {/* Truck Details */}
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>Truck Details:</Typography>
                    <ul>
                      <li>Model: {loan.truckDetails.truckModel}</li>
                      <li>Plate: {loan.truckDetails.truckNumberPlate}</li>
                      <li>Purchase Date: {loan.truckDetails.truckPurchaseDate}</li>
                      <li>Driver: {loan.truckDetails.truckDriverName}</li>
                      <li>Color: {loan.truckDetails.truckColor}</li>
                      <li>Size: {loan.truckDetails.truckSizeType}</li>
                      <li>Type: {loan.truckDetails.truckType}</li>
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
