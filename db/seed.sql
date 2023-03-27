USE employees;
INSERT INTO department (name)
VALUES ("HR"),
("test", "test"),
("test1","test2"); 

INSERT INTO role(title, salary, department_id) values ("test", 2000, 1);
INSERT INTO employee(first_name, last_name, role_id) values ("Alex", "Test", 1);
