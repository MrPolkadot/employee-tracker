INSERT INTO department (name)
VALUES 
("Production"),
("Management");

INSERT INTO role (title, salary, department_id)
VALUES 
("Fabricator", "1000", 1),
("Supervisor", "2000", 2),
("Plant Manager", "5000", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Frank", "Rodriguez", 1, NULL),
("Tyler", "J", 2, NULL),
("Dan", "W", 3, NULL);