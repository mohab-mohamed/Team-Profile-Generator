const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "list",
    name: "role",
    message: "What is your role?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
    when: function (answers) {
      return answers.role === "Manager";
    },
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
    when: function (answers) {
      return answers.role === "Engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "Where do you go to school?",
    when: function (answers) {
      return answers.role === "Intern";
    },
  },
  {
    type: "confirm",
    name: "again",
    message: "Add more Employee?",
    default: true,
  },
];

async function createEmployees(employeesInput = []) {
  try {
    const { again, ...answers } = await inquirer.prompt(questions);

    const newEmployee = [...employeesInput, answers];

    return again ? createEmployees(newEmployee) : newEmployee;
  } catch (err) {
    throw err;
  }
}

async function init() {
  try {
    const employees = [];
    const employeesData = await createEmployees();

    employeesData.map((employee) => {
      const { name, id, email, role, officeNumber, github, school } = employee;

      if (role === "Manager") {
        const newManager = new Manager(name, id, email, officeNumber);

        employees.push(newManager);
      } else if (role === "Engineer") {
        const newEngineer = new Engineer(name, id, email, github);

        employees.push(newEngineer);
      } else {
        const newIntern = new Intern(name, id, email, school);

        employees.push(newIntern);
      }
    });

    const renderEmployee = render(employees);

    fs.writeFile(outputPath, renderEmployee, () =>
      console.log("Rendered all employees")
    );
  } catch (err) {
    throw new Error(err);
  }
}

init();
