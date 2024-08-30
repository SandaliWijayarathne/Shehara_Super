import React, { useState } from 'react';
import './Paytype.css';
import visa from '../Assets/visaB.png';
import mastercard from '../Assets/Mastercard.png';
import cvv from '../Assets/cvv.jpg';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [errors, setErrors] = useState({});

  const handlePayClick = () => {
    const newErrors = {};
    if (!cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    if (!securityCode) newErrors.securityCode = 'Security code is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit payment details to the backend
    const authToken = localStorage.getItem('auth-token');
    fetch('/processPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      },
      body: JSON.stringify({
        cardNumber: cardNumber,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        cardholderName: cardholderName,
        securityCode: securityCode,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Your Payment is Successful and package is on the way');
      } else {
        alert('Payment failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    });
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card number <span className="required">*</span></label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleInputChange(setCardNumber, 'cardNumber')}
            required
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
          <div className="card-icons">
            <img src={mastercard} alt="Mastercard" />
            <img src={visa} alt="Visa" />
          </div>
        </div>

        <div className="form-group expiry-labels">
          <label>Expiry month <span className="required">*</span></label>
          <label>Expiry year <span className="required">*</span></label>
        </div>
        <div className="form-group">
          <div className="expiry-date">
            <select value={expiryMonth} onChange={handleInputChange(setExpiryMonth, 'expiryMonth')} required>
              <option value="" disabled>MM</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
              ))}
            </select>
            <select value={expiryYear} onChange={handleInputChange(setExpiryYear, 'expiryYear')} required>
              <option value="" disabled>YY</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + new Date().getFullYear()}>{i + new Date().getFullYear()}</option>
              ))}
            </select>
          </div>
          {errors.expiryMonth && <span className="error">{errors.expiryMonth}</span>}
          {errors.expiryYear && <span className="error">{errors.expiryYear}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder name <span className="required">*</span></label>
          <input
            type="text"
            id="cardholderName"
            value={cardholderName}
            onChange={handleInputChange(setCardholderName, 'cardholderName')}
            required
          />
          {errors.cardholderName && <span className="error">{errors.cardholderName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="securityCode">Security code <span className="required">*</span></label>
          <input
            type="text"
            id="securityCode"
            value={securityCode}
            onChange={handleInputChange(setSecurityCode, 'securityCode')}
            required
          />
          {errors.securityCode && <span className="error">{errors.securityCode}</span>}
          <div className="security-code-info">
            <img src={cvv} alt="Security Code" />
            <span><span className="highlight">3 digits</span> on back of your card</span>
          </div>
        </div>

        <button type="button" className="pay-button" onClick={handlePayClick}>Pay</button>
      </form>
    </div>
  );
}

export default PaymentForm;
