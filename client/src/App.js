import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import './App.css';
import md5 from 'md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';


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
    employeeEmail: '',
    employeeManager: null,
  });

  const [loadAllEmployeeData, setLoadAllEmployeeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false); // Track if a row is being edited
  const [editedEmployee, setEditedEmployee] = useState({}); // Track the edited employee data


  const [errorMessage, setError] = useState(null);

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
        // console.log(response);

        // Check for server-side errors and display them
        if (response.data.error) {
          // Display the error message to the user
          // You can use state to manage and display the error message in your UI
          setError(response.data.error);

        } else {
          // Clear any previous error messages
          setError(null);
          // Close the modal or reset form, etc., on successful submission
          setIsModalOpen(false);
        }
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error(error.response.data.error);
        setError(error.response.data.error);
        alert(error.response.data.error);
      });
  };


  const handleSave = (index) => {
    console.log(editedEmployee.EmployeeNumber);
    Axios.put('http://localhost:3001/api/update/', {
      employeeName: editedEmployee.first_name,
      employeeSurname: editedEmployee.last_name,
      employeeBirthDate: editedEmployee.birth_date,
      employeeNumber: editedEmployee.employee_number,
      employeeSalary: editedEmployee.salary,
      employeeRole: editedEmployee.role,
      employeeEmail: editedEmployee.email,
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  // Function to trigger the file input click event
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Use Axios or any method to upload the selected image
    // You can send it to your server and update the employee's image
    if (selectedFile) {
      // Handle the image upload here
      // You can use Axios to send the file to the server
      // Update the employee's image with the response
    }
  };

  return (
    <div className="container">

      {isModalOpen && (
        <div className="modal">

          <div className="form">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h1 style={{ fontWeight: "400" }}>Enter employee details</h1>
            <FontAwesomeIcon
              icon={faClose}
              className="close-icon"
              onClick={() => setIsModalOpen(false)}
              style={{
                border: "none", width: "25", height: "25px", color: "grey", position: "absolute", right: "33%", top: "20%"
              }}
            />

            <label>Email:</label>
            <input
              type="email"
              name="employeeEmail"
              value={employeeData.employeeEmail}
              onChange={handleChange}
              className='employeeInput'
              placeholder='example@email.com'
            />

            <label>Name:</label>
            <input
              type="text"
              name="employeeName"
              value={employeeData.employeeName}
              onChange={handleChange}
              className='employeeInput'
              placeholder='John'
            />

            <label>Surname:</label>
            <input
              type="text"
              name="employeeSurname"
              value={employeeData.employeeSurname}
              onChange={handleChange}
              className='employeeInput'
              placeholder='Doe'
            />

            <label>Birth Date:</label>
            <input
              type="date"
              name="employeeBirthDate"
              value={employeeData.employeeBirthDate}
              onChange={handleChange}
              className='employeeInput'
            />

            <label>Employee Number:</label>
            <input
              type="text"
              name="employeeNumber"
              value={employeeData.employeeNumber}
              onChange={handleChange}
              className='employeeInput'
              placeholder='123456'
            />

            <label>Salary:</label>
            <input
              type="text"
              name="employeeSalary"
              value={employeeData.employeeSalary}
              onChange={handleChange}
              className='employeeInput'
              placeholder='200000'
            />

            <label>Role:</label>
            <input
              type="text"
              name="employeeRole"
              value={employeeData.employeeRole}
              onChange={handleChange}
              className='employeeInput'
              placeholder='Technical Consultant'
            />

            <label>Reporting Manager:</label>
            <input
              type="text"
              name="employeeManager"
              value={employeeData.employeeManager}
              onChange={handleChange}
              className='employeeInput'
              placeholder='e.g. 75648'
            />

            <button className='submitButton' onClick={handleSubmit}>Submit</button>

          </div>
        </div>
      )}

      <div className="employee-table">

        <div className='main_heading_container'>
          <h1 className='main_heading'>Employee Management System</h1>
        </div>

        <table>
          <thead className='table_head'>
            <tr>
              <th className="center">Employee Picture</th>
              <th className="center">Name</th>
              <th className="center">Surname</th>
              <th className="center">Birth Date</th>
              <th className="center">Employee Number</th>
              <th className="center">Salary</th>
              <th className="center">Role</th>
              <th className="center">Email</th>
              <th className="center">Reporting Manager</th>
              <th className="center">Edit</th>
              <th className="center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loadAllEmployeeData.map((employee, index) => (
              <tr key={index}>
                <td className="center">
                  <div className="profile-image-container">
                    <img
                      src={`https://www.gravatar.com/avatar/${md5(employee.email)}?d=identicon`}
                      alt="Gravatar"
                      className='profile_image'
                    />
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="plus-icon"
                      onClick={handleImageUploadClick}
                      style={{
                        border: "none", borderRadius: "50%", width: "15px", height: "15px", color: "white", backgroundColor: "#0056b3", position: "relative", left: "-15%"
                      }}
                    />
                    {/* Hidden file input for image upload */}
                    < input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </td>
                <td className="center">
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeName"
                      value={editedEmployee.first_name}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, first_name: e.target.value })}
                    />
                  ) : (
                    employee.first_name
                  )}
                </td>
                <td className="center">
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeSurname"
                      value={editedEmployee.last_name}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, last_name: e.target.value })}
                    />
                  ) : (
                    employee.last_name
                  )}
                </td>
                <td className="center">
                  {isEditing === index ? (

                    <input
                      type="text"
                      name="employeeBirthDate"
                      value={formatDate(editedEmployee.birth_date)}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, birth_date: e.target.value })}
                    />
                  ) : (
                    formatDate(employee.birth_date)
                  )}
                </td>
                <td className="center">
                  {employee.employee_number}
                </td>

                <td className="center">
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeSalary"
                      value={editedEmployee.salary}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, salary: e.target.value })}
                    />
                  ) : (
                    employee.salary
                  )}
                </td>

                <td className="center">
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeRole"
                      value={editedEmployee.role}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, role: e.target.value })}
                    />
                  ) : (
                    employee.role
                  )}
                </td>

                <td className="center">
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="employeeEmail"
                      value={editedEmployee.email}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                    />
                  ) : (
                    employee.email
                  )}
                </td>

                <td className="center">
                  {employee.manager_first_name && employee.manager_last_name ? `${employee.manager_first_name} ${employee.manager_last_name}` : "None"}
                  <br />
                  {employee.manager_id ? "(" + employee.manager_id + ")" : ""}

                </td>


                <td className="center">
                  {isEditing === index ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(employee, index)}>Edit</button>
                  )}
                </td>
                <td className="center">
                  {isEditing === index ? (
                    <button onClick={handleCancel}>Cancel</button>
                  ) : (
                    <button onClick={() => handleDelete(employee.employee_number)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Plus icon to toggle the modal */}
        <button onClick={() => setIsModalOpen(true)} className="add-button">
          +
        </button>
      </div>
    </div>

  );
}

export default App;
