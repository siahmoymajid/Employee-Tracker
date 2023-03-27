const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Leeya$12",
  database: "employees",
});

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department ",
        "Add Role",
        "Add Employee",
        "Update an Employee Role",
      ],
    })
    .then((answer) => {
      if (answer.action == "View All Departments") {
        viewAllDepartments();
      }
      if (answer.action == "View All Roles") {
        viewAllRoles();
      }
      if (answer.action == "View All Employees") {
        viewAllemployees();
      }
      if (answer.action == "Add Department ") {
        addDepartment();
      }
      if (answer.action == "Add Role") {
        addRole();
      }
      if (answer.action == "Add Employee") {
        addemployee();
      }
      if (answer.action == "Update an Employee Role") {
        updateEmployeeRole();
      }
    });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department;", function (err, data) {
    console.table(data);
    mainMenu();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT * FROM role JOIN department ON role.department_id=department.id;",
    function (err, data) {
      console.table(data);
      mainMenu();
    }
  );
}

function viewAllemployees() {
  try {
    db.promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
      )
      .then((data) => {
        console.table(data[0]);
        mainMenu();
      });
  } catch (err) {
    console.error(err);
  }
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    })
    .then((answer) => {
      db.query(
        `INSERT INTO department(name) VALUES("${answer.name}");`,
        function (err, data) {
          console.log("Department has been added!");
          mainMenu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department_id of the role?",
      },
    ])

    .then((answer) => {
      db.query(
        `INSERT INTO role(title,salary, department_id) VALUES("${answer.title}", "${answer.salary}", "${answer.department_id}");`,
        function (err, data) {
          console.log("Role has been added!");
          mainMenu();
        }
      );
    });
}

function addemployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last Name?",
      },
      {
        type: "input",        
        name: "role",
        message: "What is the employee's role id?",
      },
      {
        type: "input",
        name: "manager",
        message: "who is the employee's manager id?",
      },
    ])

    .then((answer) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${answer.firstName}", "${answer.lastName}", "${answer.role}", "${answer.manager}");`,
        function (err, data) {
          if (err) {
            console.log(err)
          }
          console.log("Employee has been added!");
          mainMenu();
        }
      );
    });
}

function updateEmployeeRole() {
  // getting all employees SELECT *
  // getting all roles
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the id of the employee that you want to update?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the id of the role that you want apply as an update?",
      },
    ])
    .then((answer) => {
      // UPDATE fiction SET name = "Candide" WHERE id = 2;
      db.query(
        `UPDATE employee SET role_id = "${answer.role_id}" WHERE id = ${answer.employee_id};`,
        function (err, data) {
          console.log("Employee has been updated");
          mainMenu();
        }
      );
    });
}

mainMenu();
