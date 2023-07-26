import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling
import './Loader.css'

function App() {
	const [stockSymbol, setStockSymbol] = useState('');
	const [selectedDate, setSelectedDate] = useState('');
	const [stockData, setStockData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false); // State to manage loading

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post('http://localhost:5000/api/fetchStockData', {
				stockSymbol,
				date: selectedDate,
			});
			if (response.data) {
				setStockData(response.data);
				setError(null); // Reset error if previous attempt was successful
			} else {
				setError('Stock data not available for the selected date.'); // Set the error message in state
				setStockData(null); // Reset stockData to null to prevent displaying old data
			}
		} catch (error) {
			setStockData(null);
			setError('Stock data not available for the selected date.'); // Set the error message in state
		}
		finally {
			setLoading(false); // Set loading back to false after request completes (whether it's successful or not)
		} 
	};

	return (
		<div className="App">
			<h1>STOCK INFORMATION</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="stockSymbol">Stock Symbol:</label>
					<input
						type="text"
						id="stockSymbol"
						className="form-control"
						value={stockSymbol}
						onChange={(e) => setStockSymbol(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="selectedDate">Date:</label>
					<input
						type="date"
						id="selectedDate"
						className="form-control"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			{loading ?(
				<div className="loader-container">
					<div className="spinner"></div>
				</div>
			): 
			stockData ? (
				<div className="stock-data">
					<h2>Stock Data:</h2>
					<p><strong>Open:</strong> {stockData.open}</p>
					<p><strong>High:</strong> {stockData.high}</p>
					<p><strong>Low:</strong> {stockData.low}</p>
					<p><strong>Close:</strong> {stockData.close}</p>
					<p><strong>Volume:</strong> {stockData.volume}</p>
				</div>
			): <p>{error}</p>}
		</div>
	);
}

export default App;