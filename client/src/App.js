import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';

function App() {
  const [employeeData, setEmployeeData] = useState({
    employeeName: '',
    employeeSurname: '',
    employeeBirthDate: '',
    employeeNumber: '',
    employeeSalary: '',
    employeeRole: '',
    employeeReportingLineManager: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    Axios.post('http://localhost:3001/api/insert', {
      ...employeeData // Spread the employeeData object to send all fields
    })
      .then(response => {
        // Handle the response if needed
        console.log(response);
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error(error);
      });
  };

  return (
    <div>
      <div className="form">
        <label>Name:</label>
        <input
          type="text"
          name="employeeName"
          value={employeeData.employeeName}
          onChange={handleChange}
        />

        <label>Surname:</label>
        <input
          type="text"
          name="employeeSurname"
          value={employeeData.employeeSurname}
          onChange={handleChange}
        />

        <label>Birth Date:</label>
        <input
          type="text"
          name="employeeBirthDate"
          value={employeeData.employeeBirthDate}
          onChange={handleChange}
        />

        <label>Employee Number:</label>
        <input
          type="text"
          name="employeeNumber"
          value={employeeData.employeeNumber}
          onChange={handleChange}
        />

        <label>Salary:</label>
        <input
          type="text"
          name="employeeSalary"
          value={employeeData.employeeSalary}
          onChange={handleChange}
        />

        <label>Role:</label>
        <input
          type="text"
          name="employeeRole"
          value={employeeData.employeeRole}
          onChange={handleChange}
        />

        <label>Reporting Line Manager:</label>
        <input
          type="text"
          name="employeeReportingLineManager"
          value={employeeData.employeeReportingLineManager}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
