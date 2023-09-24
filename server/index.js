const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = mysql.createPool(
    {
        host: 'localhost',
      
    }
)

app.use(cors());

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    /*  const sqlInsert = "INSERT INTO Employee_Data (Name, Surname, BirthDate, EmployeeNumber, Salary, Role, ReportingLineManager) VALUES ('a', 'a','a','a','a', 'a','a');"
      db.query(sqlInsert, (err, result) => {
          res.send(result);
      }) */
})

app.post("/api/insert", (req, res) => {
    const sqlInsert = "INSERT INTO Employee_Data (Name, Surname, BirthDate, EmployeeNumber, Salary, Role, ReportingLineManager) VALUES (?,?,?,?,?,?,?);"
    const employeeName = req.body.employeeName;
    const employeeSurname = req.body.employeeSurname;
    const BirthDate = req.body.employeeBirthDate;
    const employeeNumber = req.body.employeeNumber;
    const employeeSalary = req.body.employeeSalary;
    const employeeRole = req.body.employeeRole;
    const reportingLineManager = req.body.employeeReportingLineManager;

    db.query(sqlInsert, [employeeName, employeeSurname, BirthDate, employeeNumber, employeeSalary, employeeRole, reportingLineManager], (err, result) => {
        console.log(err);
    })
})

app.listen(3001, () => {
    console.log('running on port 3001');
})