const express = require('express');
const router = express.Router();
const dbConnection = require('../db/dbConnection');
const jwt = require('jsonwebtoken');

// Get all employees
router.get('/get', async (req, res) => {
    try {
        const connection = await dbConnection; // Assuming dbConnection returns a promise resolving to a database connection
        const [rows, fields] = await connection.promise().query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific employee by ID
router.get('/getId/:id', async (req, res) => {
    const employeeId = parseInt(req.params.id);
    try {
        const connection = await dbConnection; // Assuming dbConnection returns a promise resolving to a database connection
        const [rows, fields] = await connection.promise().query('SELECT * FROM employees WHERE id = ?', [employeeId]);

        if (rows.length === 0) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new employee
router.post('/add', async (req, res) => {
    const { name, position } = req.body;
    try {
        const connection = await dbConnection;
        const [result] = await connection.promise().query('INSERT INTO employees (name, position) VALUES (?, ?)', [name, position]);

        const newEmployee = {
            id: result.insertId,
            name,
            position,
        };

        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing employee
router.put('/update/:id', async (req, res) => {
    const employeeId = parseInt(req.params.id);
    const { name, position } = req.body;
    try {
        const connection = await dbConnection; // Assuming dbConnection returns a promise resolving to a database connection
        const [result] = await connection.promise().query('UPDATE employees SET name = ?, position = ? WHERE id = ?', [name, position, employeeId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.json({ message: 'Employee updated successfully' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an employee
router.delete('/delete/:id', async (req, res) => {
    const employeeId = parseInt(req.params.id);
    try {
        const connection = await dbConnection; // Assuming dbConnection returns a promise resolving to a database connection
        const [result] = await connection.promise().query('DELETE FROM employees WHERE id = ?', [employeeId]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.json({ message: 'Employee deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
