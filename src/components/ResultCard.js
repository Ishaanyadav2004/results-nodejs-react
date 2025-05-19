import React from 'react';
import './ResultCard.css';

function ResultCard({ result }) {
    return (
        <div className="result-card">
            <h2>{result.student_name}</h2>
            <p>PRN: {result.prn_no}</p>
            <div className="subject-results">
                <div className="subject">
                    <h3>Computer Networks</h3>
                    <p>Total: {result.cn.total || 'N/A'}</p>
                    <p>Grade: {result.cn.grade}</p>
                </div>
                <div className="subject">
                    <h3>Theory of Computation</h3>
                    <p>Total: {result.toc.total || 'N/A'}</p>
                    <p>Grade: {result.toc.grade}</p>
                </div>
                <div className="subject">
                    <h3>Advanced Data Structures</h3>
                    <p>Total: {result.ads.total || 'N/A'}</p>
                    <p>Grade: {result.ads.grade}</p>
                </div>
                <div className="subject">
                    <h3>Operating Systems</h3>
                    <p>Total: {result.os.total || 'N/A'}</p>
                    <p>Grade: {result.os.grade}</p>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;