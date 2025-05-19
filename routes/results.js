const express = require('express');
const router = express.Router();
const db = require('../database');
const calculateResult = (mse, ese) => {
    if (mse === null || ese === null) return { total: null, grade: 'N/A' };
    const total = (0.3 * mse) + (0.7 * ese);
    let grade = 'F';
    if (total >= 85) grade = 'A+';
    else if (total >= 75) grade = 'A';
    else if (total >= 65) grade = 'B+';
    else if (total >= 55) grade = 'B';
    else if (total >= 40) grade = 'C';
    return { total: total.toFixed(2), grade };
};
router.get('/all', (req, res) => {
    db.query('SELECT * FROM results', (err, results) => {
        if (err) {
            console.error('Error fetching results:', err);
            res.status(500).json({ error: 'Failed to fetch results' });
            return;
        }
        res.json(results.map(result => ({
            id: result.id,
            student_name: result.student_name,
            prn_no: result.prn_no,
            cn: calculateResult(result.computer_networks_mse, result.computer_networks_ese),
            toc: calculateResult(result.theory_of_computation_mse, result.theory_of_computation_ese),
            ads: calculateResult(result.advanced_data_structures_mse, result.advanced_data_structures_ese),
            os: calculateResult(result.operating_systems_mse, result.operating_systems_ese)
        })));
    });
});
router.get('/:prn', (req, res) => {
    const prn = req.params.prn;
    db.query('SELECT * FROM results WHERE prn_no = ?', [prn], (err, results) => {
        if (err) {
            console.error('Error fetching result:', err);
            res.status(500).json({ error: 'Failed to fetch result' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Result not found for this PRN' });
            return;
        }
        const result = results[0];
        res.json({
            id: result.id,
            student_name: result.student_name,
            prn_no: result.prn_no,
            cn: calculateResult(result.computer_networks_mse, result.computer_networks_ese),
            toc: calculateResult(result.theory_of_computation_mse, result.theory_of_computation_ese),
            ads: calculateResult(result.advanced_data_structures_mse, result.advanced_data_structures_ese),
            os: calculateResult(result.operating_systems_mse, result.operating_systems_ese)
        });
    });
});
router.post('/', (req, res) => {
    const { student_name, prn_no, cn_mse, cn_ese, toc_mse, toc_ese, ads_mse, ads_ese, os_mse, os_ese } = req.body;
    const newResult = {
        student_name,
        prn_no,
        computer_networks_mse: cn_mse,
        computer_networks_ese: cn_ese,
        theory_of_computation_mse: toc_mse,
        theory_of_computation_ese: toc_ese,
        advanced_data_structures_mse: ads_mse,
        advanced_data_structures_ese: ads_ese,
        operating_systems_mse: os_mse,
        operating_systems_ese: os_ese
    };
    db.query('INSERT INTO results SET ?', newResult, (err, result) => {
        if (err) {
            console.error('Error adding result:', err);
            res.status(500).json({ error: 'Failed to add result' });
            return;
        }
        res.status(201).json({ message: 'Result added successfully', id: result.insertId });
    });
});

module.exports = router;