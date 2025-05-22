import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTotalDonations();
  }, []);

  const fetchTotalDonations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/total');
      setTotal(res.data.total);
    } catch (error) {
      console.error('Error fetching total:', error);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!name || !amount) {
      setMessage('Please enter both name and amount');
      return;
    }
    try {
      await axios.post('http://localhost:5000/donate', { name, amount: Number(amount) });
      setMessage('Thank you for your donation!');
      setName('');
      setAmount('');
      fetchTotalDonations();
    } catch (error) {
      console.error('Donation error:', error);
      setMessage('Donation failed. Try again later.');
    }
  };

  return (
    <div>
      <header className="header">
        Help-Hands NGO Donation
      </header>

      <main>
        <form onSubmit={handleDonate} className="form-container">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="donate-button">
            Donate
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <h2 className="total-donations">
          💰 Total Donations: ₹{total}
        </h2>
      </main>

      <footer className="footer">
        HelpHands NGO, 123 Charity Street, Kindness City
      </footer>
    </div>
  );
}

export default App;
