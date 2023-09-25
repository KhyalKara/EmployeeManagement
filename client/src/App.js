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

  const [isEditing, setIsEditing] = useState(false); // Track if a row is being edited
  const [editedEmployee, setEditedEmployee] = useState({}); // Track the edited employee data




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

  const handleEdit = (employee, index) => {
    // Initialize editedEmployee with the values from the selected employee
    setEditedEmployee({ ...employee });

    // Set edit mode for the specified index
    setIsEditing(index);
  };


  const handleDelete = (employeeNumber) => {
    Axios.delete(`http://localhost:3001/api/delete/${employeeNumber}`, employeeNumber);
    // Implement the delete functionality here

  };

  const handleCancel = () => {
    setEditedEmployee({});
    setIsEditing(false);
  };

  const handleSave = (index) => {
    console.log(editedEmployee.EmployeeNumber);
    Axios.put('http://localhost:3001/api/update/', {
      employeeName: editedEmployee.Name,
      employeeSurname: editedEmployee.Surname,
      employeeBirthDate: editedEmployee.BirthDate,
      employeeNumber: editedEmployee.EmployeeNumber,
      employeeSalary: editedEmployee.Salary,
      employeeRole: editedEmployee.Role,
      employeeReportingLineManager: editedEmployee.ReportingLineManager,
    })
      .then((response) => {
        // Handle the response if needed
        console.log(response);
        setIsEditing(false); // Disable editing mode
        // Update the local state with the edited employee data
        setLoadAllEmployeeData((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = editedEmployee;
          return updatedData;
        });
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error(error);
      });
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
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeName"
                      value={editedEmployee.Name}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, Name: e.target.value })}
                    />
                  ) : (
                    employee.Name
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeSurname"
                      value={editedEmployee.Surname}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, Surname: e.target.value })}
                    />
                  ) : (
                    employee.Surname
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeBirthDate"
                      value={editedEmployee.BirthDate}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, BirthDate: e.target.value })}
                    />
                  ) : (
                    employee.BirthDate
                  )}
                </td>
                <td>{employee.EmployeeNumber}</td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeSalary"
                      value={editedEmployee.Salary}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, Salary: e.target.value })}
                    />
                  ) : (
                    employee.Salary
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeRole"
                      value={editedEmployee.Role}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, Role: e.target.value })}
                    />
                  ) : (
                    employee.Role
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeReportingLineManager"
                      value={editedEmployee.ReportingLineManager}
                      onChange={(e) =>
                        setEditedEmployee({ ...editedEmployee, ReportingLineManager: e.target.value })
                      }
                    />
                  ) : (
                    employee.ReportingLineManager
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(employee, index)}>Edit</button>
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <button onClick={handleCancel}>Cancel</button>
                  ) : (
                    <button onClick={() => handleDelete(employee.EmployeeNumber)}>Delete</button>
                  )}
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
