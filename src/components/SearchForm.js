import React, { useState } from 'react';
function SearchForm({ onSearch }) {
    const [prn, setPrn] = useState('');
    const handleChange = (event) => {
        setPrn(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(prn);
    };
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                placeholder="Enter PRN"
                value={prn}
                onChange={handleChange}
                className="prn-input"
            />
            <button type="submit" className="search-button">Search Result</button>
        </form>
    );
}

export default SearchForm;