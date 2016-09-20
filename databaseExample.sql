CREATE TABLE tasks (
task_id SERIAL PRIMARY KEY NOT NULL,
task_name VARCHAR(200),
task_description VARCHAR(500),
task_completed BOOLEAN,
task_start timestamp(0)
);


INSERT INTO tasks (task_name, task_description, task_completed, task_start) VALUES ('Dishes', 'Clean dishes in sink before making breakfast', FALSE, now());
INSERT INTO tasks (task_name, task_description, task_completed, task_start) VALUES ('Laundry', 'Do laundry before evening', FALSE, now());
INSERT INTO tasks (task_name, task_description, task_completed, task_start) VALUES ('Pet the cat', 'make the kitty happy!', FALSE, now());
INSERT INTO tasks (task_name, task_description, task_completed, task_start) VALUES ('Charge phone', 'so I have a useful brick', TRUE, now());
