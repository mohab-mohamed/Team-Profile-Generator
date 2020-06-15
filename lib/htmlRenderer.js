const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replaceTemplate(template, "name", manager.getName());
  template = replaceTemplate(template, "role", manager.getRole());
  template = replaceTemplate(template, "email", manager.getEmail());
  template = replaceTemplate(template, "id", manager.getId());
  template = replaceTemplate(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replaceTemplate(template, "name", engineer.getName());
  template = replaceTemplate(template, "role", engineer.getRole());
  template = replaceTemplate(template, "email", engineer.getEmail());
  template = replaceTemplate(template, "id", engineer.getId());
  template = replaceTemplate(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replaceTemplate(template, "name", intern.getName());
  template = replaceTemplate(template, "role", intern.getRole());
  template = replaceTemplate(template, "email", intern.getEmail());
  template = replaceTemplate(template, "id", intern.getId());
  template = replaceTemplate(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replaceTemplate(template, "team", html);
};

const replaceTemplate = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
