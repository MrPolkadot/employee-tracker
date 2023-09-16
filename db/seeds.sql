-- Fills the tables with data columns

INSERT INTO department (name)
VALUES 
("Production"),
("Management"),
("Sales"),
("Shipping");

INSERT INTO role (title, salary, department_id)
VALUES 
("Frame Fabricator", "1000", 1),
("Door Fabricator", "1200", 1),
("Supervisor", "2000", 2),
("Plant Manager", "5000", 2),
("Estimator", "4500", 3),
("Warehouse Associate", "1000", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Dan", "W", 4, null),
("Frank", "Rodriguez", 1, 1),
("Tyler", "J", 3, 1),
("Parker", "P", 6, 1);