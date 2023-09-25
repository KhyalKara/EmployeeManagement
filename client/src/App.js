import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';

function App() {

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setLoadAllEmployeeData(response.data);
      console.log(response.data)
    })
  }, [])

  const [employeeData, setEmployeeData] = useState({
    employeeName: '',
    employeeSurname: '',
    employeeBirthDate: '',
    employeeNumber: '',
    employeeSalary: '',
    employeeRole: '',
    employeeReportingLineManager: '',
  });

  const [loadAllEmployeeData, setLoadAllEmployeeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

        ;
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error(error);
      });
  };

  const handleEdit = (index) => {
    // Implement the edit functionality here
    console.log(`Editing row ${index}`);
  };

  const handleDelete = (employeeNumber) => {
    Axios.delete(`http://localhost:3001/api/delete/${employeeNumber}`, employeeNumber);
    // Implement the delete functionality here

  };


  return (
    <div className="container">
      {/* Plus icon to toggle the modal */}
      <button onClick={() => setIsModalOpen(true)} className="add-button">
        +
      </button>

      {isModalOpen && (
        <div className="modal">
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
            <button onClick={() => setIsModalOpen(false)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Birth Date</th>
              <th>Employee Number</th>
              <th>Salary</th>
              <th>Role</th>
              <th>Reporting Line Manager</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loadAllEmployeeData.map((employee, index) => (
              <tr key={index}>
                <td>{employee.Name}</td>
                <td>{employee.Surname}</td>
                <td>{employee.BirthDate}</td>
                <td>{employee.EmployeeNumber}</td>
                <td>{employee.Salary}</td>
                <td>{employee.Role}</td>
                <td>{employee.ReportingLineManager}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(employee.EmployeeNumber)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default App;
