const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config()

const db = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
)



app.use(cors());

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    /*  const sqlInsert = "INSERT INTO Employee (Name, Surname, BirthDate, EmployeeNumber, Salary, Role) VALUES ('a', 'a','a','a','a', 'a','a');"
      db.query(sqlInsert, (err, result) => {
          res.send(result);
      }) */
})

app.post("/api/insert", (req, res) => {
    const {
        employeeName,
        employeeSurname,
        employeeBirthDate,
        employeeNumber,
        employeeSalary,
        employeeRole,
        employeeEmail,
        employeeManager
    } = req.body;

    const formattedBirthDate = new Date(employeeBirthDate).toISOString().split('T')[0];
    console.log(formattedBirthDate);

    const sqlInsert = "INSERT INTO Employee (first_name, last_name, birth_date, employee_number, salary, role, email, manager_id) VALUES (?,?,?,?,?,?,?, ?);";

    db.query(sqlInsert, [employeeName, employeeSurname, employeeBirthDate, employeeNumber, employeeSalary, employeeRole, employeeEmail, employeeManager],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
    // Rest of your code to insert the employee into the database
});


app.get("/api/get", (req, res) => {
    const sqlSelect = `
    SELECT e.*, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM Employee e
    LEFT JOIN Employee m ON e.manager_id = m.employee_number;
`;

    db.query(sqlSelect, (err, result) => {
        res.send(result)
        console.log(result);
    })
})

app.delete("/api/delete/:employeeNumber", (req, res) => {
    const employeeID = req.params.employeeNumber;

    const sqlDelete = "DELETE FROM Employee WHERE employee_number = ?";

    db.query(sqlDelete, employeeID, (err, result) => {
        if (err) {
            console.log(err);
        }

    });
})

app.put("/api/update", (req, res) => {
    const {
        employeeName,
        employeeSurname,
        employeeBirthDate,
        employeeNumber,
        employeeSalary,
        employeeRole,
        employeeEmail,
    } = req.body;

    const sqlUpdate = `
          UPDATE Employee SET first_name = ?, last_name = ?, birth_date = ?, salary = ?, role = ?, email= ? WHERE employee_number = ?;
      `;

    db.query(
        sqlUpdate,
        [
            employeeName,
            employeeSurname,
            employeeBirthDate,
            employeeSalary,
            employeeRole,
            employeeEmail,
            employeeNumber
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/api/employeeHierarchy", (req, res) => {
    const sqlHierarchy = `WITH RECURSIVE cte AS (
        SELECT
          employee_number,
          first_name,
          last_name,
          manager_id
        FROM EmployeeDatabase.Employee
        WHERE manager_id IS NULL
        UNION ALL
        SELECT
          e.employee_number,
          e.first_name,
          e.last_name,
          e.manager_id
        FROM EmployeeDatabase.Employee e
        INNER JOIN cte ON e.manager_id = cte.employee_number
      )
      
      
      SELECT * from cte`;

    db.query(sqlHierarchy, (err, result) => {
        if (err) {
            console.log(err);
            console.log("SERVER ERROR HIEARCHY")
            res.status(500).json({ error: "An error occurred while fetching the employee hierarchy." });
        } else {
            res.json(result);
            console.log("HIERACRCHY SERVER");
            console.log(result);
        }
    });
});





app.listen(process.env.BACKEND_PORT, () => {
    console.log(`running on port ${process.env.BACKEND_PORT}`);
})