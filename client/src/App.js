import './App.css';

function App() {
  return (
    <div>
      <div className="form">
        <label>Name:</label>
        <input type="text" name="employeeName" />

        <label>Surname:</label>
        <input type="text" name="employeeSurname" />

        <label>Birth Date:</label>
        <input type="text" name="employeeBirthDate" />

        <label>Employee Number:</label>
        <input type="text" name="employeeNumber" />

        <label>Salary:</label>
        <input type="text" name="employeeSalary" />

        <label>Role:</label>
        <input type="text" name="employeeRole" />

        <label>Reporting Line Manager:</label>
        <input type="text" name="employeeReportingLineManager" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
