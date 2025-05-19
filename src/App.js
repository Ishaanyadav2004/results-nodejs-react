import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ResultCard from './components/ResultCard';

function App() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchResult = async (prn) => {
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await fetch(`http://localhost:5000/api/results/${prn}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch result');
            }
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <h1>VIT Semester Result</h1>
            <SearchForm onSearch={fetchResult} />
            {loading && <p>Loading result...</p>}
            {error && <p className="error-message">{error}</p>}
            {result && <ResultCard result={result} />}
        </div>
    );
}

export default App;